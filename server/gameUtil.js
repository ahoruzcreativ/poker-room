const Deck = require('../client/deck/deck.js');
const Ranker = require('handranker');

const gameDeck = new Deck();
const gameState = {
	players: [],
	gameDeck,
	action: false,
	board: [],
	pot: 0,
	bigBlindValue: 10,
	smallBlindValue: 5
};

const addPlayer = (socketId) => {
	gameState.players.push({
		id: socketId,
		bankroll: 1000,
		cards: [],
		action: false,
		button: false,
		smallBlind: false,
		bigBlind: false,
		active: false
	});
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
	gameState.players.forEach((player) => {
		if (player.smallBlind) {
			player.bankroll -= gameState.smallBlindValue;
			gameState.pot += gameState.smallBlindValue;
		} else if (player.bigBlind) {
			player.bankroll -= gameState.bigBlindValue;
			gameState.pot += gameState.bigBlindValue;
		}
	});
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
			const lastActivePlayer =
				gameState.players.map((player) => player.action).filter((action) => action === false).length < 1;

			// edge case for preflop player order, BB needs to switch to first to act after preflop
			if (!(lastActivePlayer && gameState.action === 'preflop')) {
				if (i + 1 < gameState.players.length) {
					gameState.players[i + 1].active = true;
					gameState.players[i].active = false;
				} else {
					gameState.players[0].active = true;
					gameState.players[i].active = false;
				}
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
	});
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
 console.log('hands', hands)
 console.log('board', board)
 const results = Ranker.orderHands(hands, board);
 console.log('results', results)
	// check for tie
	if (results[0].length > 1) {
		potToTie();
	} else {
		const winnerId = results[0][0].id;
		console.log('winnerId',winnerId);
		const winner = gameState.players.filter((player) => player.id === winnerId)[0];
		console.log('winner', winner);
		potToPlayer(winner);
	}
};

const changeBoard = () => {
	if (gameState.action === 'preflop') {
		gameState.action = 'flop';
		resetPlayerAction();
		gameState.gameDeck.dealCards(3).forEach((card) => gameState.board.push(card));
	} else if (gameState.action === 'flop') {
		gameState.action = 'turn';
		resetPlayerAction();
		gameState.gameDeck.dealCards(1).forEach((card) => gameState.board.push(card));
	} else if (gameState.action === 'turn') {
		gameState.action = 'river';
		resetPlayerAction();
		gameState.gameDeck.dealCards(1).forEach((card) => gameState.board.push(card));
	} else if (gameState.action === 'river') {
		determineWinner();
		dealPlayers();
		moveBlinds();
		resetPlayerAction();
	}
};

const removePlayer = (socketId) => {
	gameState.players = gameState.players.filter((player) => player.id !== socketId);
};

const fold = (socketId) => {
	const winner = gameState.players.filter((player) => player.id !== socketId)[0];
	potToPlayer(winner);
	dealPlayers();
	moveBlinds();
	resetPlayerAction();
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
	determineWinner
};
