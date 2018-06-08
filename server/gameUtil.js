const Deck = require('../client/deck/deck.js');
const Ranker = require('handranker');

const gameDeck = new Deck();
const gameState = {
	players: [],
	spectators: [],
	gameDeck,
	action: false,
	board: [],
	pot: 0,
	bigBlindValue: 10,
	smallBlindValue: 5,
	activeBet: 0,
	messages: [],
	showdown: false,
	minBet: 20
};

const addSpectators = (socketId) => {
	gameState.spectators.push({
		id: socketId,
		name: '',
		bankroll: 1000,
		cards: [],
		action: false,
		button: false,
		smallBlind: false,
		bigBlind: false,
		active: false,
		activeBet: 0
	});
};

const addPlayer = (socketId) => {
	const newPlayer = gameState.spectators.filter((player) => player.id === socketId)[0];
	gameState.players.push(newPlayer);
	gameState.spectators = gameState.spectators.filter((player) => player.id !== socketId);
};

const dealPlayers = () => {
	gameState.board = [];
	gameState.gameDeck.shuffleDeck();
	for (let i = 0; i < gameState.players.length; i++) {
		gameState.players[i].cards = gameState.gameDeck.dealCards(2);
	}
	gameState.action = 'preflop';
};

const blindsToPot = () => {
	// clear pot
	gameState.pot = 0;
	gameState.players.forEach((player) => {
		if (player.smallBlind) {
			player.bankroll -= gameState.smallBlindValue;
			player.activeBet = gameState.smallBlindValue;
			gameState.pot += gameState.smallBlindValue;
		} else if (player.bigBlind) {
			player.bankroll -= gameState.bigBlindValue;
			player.activeBet = gameState.bigBlindValue;
			gameState.pot += gameState.bigBlindValue;
		}
	});

	// set initial bet to join in as BB value
	gameState.activeBet = gameState.bigBlindValue;
};

const setInitialBlinds = () => {
	gameState.players[0].button = true;
	gameState.players[0].smallBlind = true;
	gameState.players[1].bigBlind = true;
	gameState.players[0].active = true;
	blindsToPot();
};

const moveBlinds = () => {
	for (let i = 0; i < gameState.players.length; i++) {
		if (gameState.players[i].button === true) {
			// reset active player to match blinds
			gameState.players.forEach((player) => {
				player.active = false;
			});

			// set current button to false and switch to BB
			gameState.players[i].button = false;
			gameState.players[i].smallBlind = false;
			gameState.players[i].bigBlind = true;

			// edge case if BB is last in the array
			if (i + 1 < gameState.players.length) {
				gameState.players[i + 1].button = true;
				gameState.players[i + 1].active = true;
				gameState.players[i + 1].smallBlind = true;
				gameState.players[i + 1].bigBlind = false;
			} else {
				gameState.players[0].button = true;
				gameState.players[0].active = true;
				gameState.players[0].smallBlind = true;
				gameState.players[0].bigBlind = false;
			}
			blindsToPot();
			break;
		}
	}
};

const check = (socketId) => {
	for (let i = 0; i < gameState.players.length; i++) {
		if (gameState.players[i].id === socketId) {
			gameState.players[i].action = true;
			if (i + 1 < gameState.players.length) {
				gameState.players[i + 1].active = true;
				gameState.players[i].active = false;
			} else {
				gameState.players[0].active = true;
				gameState.players[i].active = false;
			}
		}
	}
};

const playerActionCheck = () => {
	for (let i = 0; i < gameState.players.length; i++) {
		if (gameState.players[i].action === false) {
			return false;
		}
	}
	return true;
};

const resetPlayerAction = () => {
	gameState.players.forEach((player) => {
		player.action = false;
		player.activeBet = 0;
	});

	// reset active bet as well
	gameState.activeBet = 0;
};

const potToPlayer = (player) => {
	player.bankroll += gameState.pot;
	gameState.pot = 0;
};

const potToTie = () => {
	const halfPot = gameState.pot / 2;
	gameState.players.forEach((player) => {
		player.bankroll += halfPot;
	});
	gameState.pot = 0;
};

const determineWinner = () => {
	const hands = gameState.players;
	const board = gameState.board;

	const results = Ranker.orderHands(hands, board);
	// check for tie
	if (results[0].length > 1) {
		potToTie();
		const tieMsg = 'Tie pot, both players have ' + results[0][0].description;
		gameState.messages.push({ text: tieMsg, author: 'Game' });
	} else {
		const winnerId = results[0][0].id;
		const winner = gameState.players.filter((player) => player.id === winnerId)[0];
		const winnerMsg = winner.name + ' won $' + gameState.pot + ' with ' + results[0][0].description;
		gameState.messages.push({ text: winnerMsg, author: 'Game' });
		potToPlayer(winner);
	}
};

const resetActive = () => {
	gameState.players.forEach((player) => {
		if (player.bigBlind) {
			player.active = true;
		} else if (player.button) {
			player.active = false;
		}
	});
};

const changeBoard = () => {
	if (gameState.action === 'preflop') {
		gameState.action = 'flop';
		resetActive();
		resetPlayerAction();
		gameState.minBet = 10
		gameState.gameDeck.dealCards(3).forEach((card) => gameState.board.push(card));
	} else if (gameState.action === 'flop') {
		gameState.action = 'turn';
		resetActive();
		resetPlayerAction();
		gameState.minBet = 10
		gameState.gameDeck.dealCards(1).forEach((card) => gameState.board.push(card));
	} else if (gameState.action === 'turn') {	
		gameState.action = 'river';
		resetActive();
		resetPlayerAction();
		gameState.minBet = 10
		gameState.gameDeck.dealCards(1).forEach((card) => gameState.board.push(card));
	} else if (gameState.action === 'river') {
		// determineWinner();
		gameState.showdown = true
		// dealPlayers();
		// resetPlayerAction();
		// moveBlinds();
	}
};

const resetGame = () => {
	gameState.board = [];
	gameState.messages = [];
	gameState.minBet = 20
	gameState.players.forEach((player) => {
		player.cards = [];
		player.activeBet = 0;
		player.active = false
	});
}

const removePlayer = (socketId) => {
	const oldPlayers = gameState.players.length
	gameState.players = gameState.players.filter((player) => player.id !== socketId);
	if (gameState.players.length !== oldPlayers) {
		resetGame()
		// give pot to remaining player
		gameState.players.forEach((player) => potToPlayer(player));
	}
	gameState.spectators = gameState.spectators.filter((player) => player.id !== socketId);
};

const fold = (socketId) => {
	const winner = gameState.players.filter((player) => player.id !== socketId)[0];
	potToPlayer(winner);
	dealPlayers();
	resetPlayerAction();
	moveBlinds();
};

const call = (socketId) => {
	const callingPlayer = gameState.players.filter((player) => player.id === socketId)[0];
	const callAmount = gameState.activeBet - callingPlayer.activeBet;

	// add to pot call amount
	gameState.pot += callAmount;
	callingPlayer.activeBet += callAmount;

	// subtract from player stack
	callingPlayer.bankroll -= callAmount;

	// use check function to move to next player
	check(socketId);
};

const bet = (socketId, actionAmount) => {
	const bettingPlayer = gameState.players.filter((player) => player.id === socketId)[0];

	// currently static for now
	const betAmount = actionAmount;

	// adjust minimum raise
gameState.minBet = betAmount * 2 + gameState.activeBet

	// add to pot bet amount
	gameState.pot += betAmount;
	bettingPlayer.activeBet += betAmount;

	// adjust game active bet
	gameState.activeBet = betAmount;

	//subtract from player stack
	bettingPlayer.bankroll -= betAmount;

	// reset action
	gameState.players.forEach((player) => {
		player.action = false;
	});
console.log('betting set the minbet to:', gameState.minBet)
	// use check function to move to next player
	check(socketId);
};

const raise = (socketId, actionAmount) => {
	const raisingPlayer = gameState.players.filter((player) => player.id === socketId)[0];

	// currently static for now
	const raiseAmount = actionAmount;
console.log('raise amount', raiseAmount)
console.log('active bet', gameState.activeBet)
	// adjust minimum raise
	gameState.minBet = raiseAmount

	// calculating difference in raise
	const raiseDifference = gameState.minBet - gameState.activeBet
console.log('raise difference', raiseDifference)
	// add to pot bet amount
	gameState.pot += raiseDifference;

	//subtract from player stack
	raisingPlayer.bankroll -= raiseDifference;

	raisingPlayer.activeBet = gameState.minBet
	// adjust game active bet
	gameState.activeBet = gameState.minBet
	console.log('raising set the minbet to:', gameState.minBet)

	// set up minBet for next player
	gameState.minBet = raiseDifference + gameState.activeBet
	// reset action
	gameState.players.forEach((player) => {
		player.action = false;
	});

	// use check function to move to next player
	check(socketId);
};

const addMessage = (message, socketId) => {
	// find if player is active or a spectator
	const activePlayer = gameState.players.filter((player) => player.id === socketId);
	const spectatorPlayer = gameState.spectators.filter((player) => player.id === socketId);

	let name = '';

	if (activePlayer.length > 0) {
		name = activePlayer[0].name;
	} else if (spectatorPlayer.length > 0) {
		name = '(Spectator) ' + spectatorPlayer[0].name;
	}

	gameState.messages.push({ text: message, author: name });
};

const addName = (name, socketId) => {
	const changePlayer = gameState.spectators.filter((player) => player.id === socketId)[0];
	changePlayer.name = name;
};


module.exports = {
	gameState,
	addPlayer,
	dealPlayers,
	setInitialBlinds,
	moveBlinds,
	check,
	playerActionCheck,
	changeBoard,
	removePlayer,
	fold,
	determineWinner,
	call,
	bet,
	raise,
	addMessage,
	addName,
	addSpectators,
	resetPlayerAction
};
