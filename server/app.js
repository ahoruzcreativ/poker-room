const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;
const Deck = require('../client/deck/deck.js');

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// If you want to add routes, they should go here!

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('/*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Handle 404s
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handling endware
app.use((err, req, res, next) => {
	console.error(err.message);
	console.error(err.stack);
	res.status(err.status || 500);
	res.send(err.message || 'Internal server error');
});

db.sync().then(() => {
	console.log('The database is synced');
});

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = require('socket.io')(server, { pingInterval: 2000, pingTimeout: 5000 });

// server state
// game state storage
const gameDeck = new Deck();
const gameState = {
	players: [],
	gameDeck,
	action: false,
	board: []
};

let players = gameState.players;

io.on('connection', (socket) => {
	console.log('a user connected:', socket.id);
	socket.emit('clientId', socket.id);
	players.push({
		id: socket.id,
		bankroll: 1000,
		cards: [],
		check: false,
		button: false,
		smallBlind: false,
		bigBlind: false,
		active: false
	});
	io.sockets.emit('gameState', gameState);

	socket.on('shuffle', () => {
		gameState.gameDeck.shuffleDeck();
		io.sockets.emit('gameState', gameState);
	});

	socket.on('deal', () => {
		for (let i = 0; i < players.length; i++) {
			if (i === 0) {
				players[i].button = true;
				players[i].smallBlind = true;
				players[i + 1].bigBlind = true;
				players[i].active = true;
			}
			players[i].cards = gameState.gameDeck.dealCards(2);
		}
		gameState.action = 'preflop';
		io.sockets.emit('gameState', gameState);
	});

	socket.on('check', () => {
		// update player state action

		for (let i = 0; i < players.length; i++) {
			if (players[i].id === socket.id) {
				players[i].check = true;
				players[i].active = false;
				if (i + 1 < players.length) {
					players[i + 1].active = true;
				} else {
					players[0].active = true;
				}
			}
		}

		//send state
		io.sockets.emit('gameState', gameState);

		// scan if all players have completed an action, exit out if not
		for (let i = 0; i < players.length; i++) {
			if (players[i].check === false) {
				return false;
			}
		}

		// change gamestate action if all players have completed an action and reset player actions
		if (gameState.action === 'preflop') {
			gameState.action = 'flop';
			players.forEach((player) => {
				player.check = false;
			});
			gameState.gameDeck.dealCards(3).forEach( card => gameState.board.push(card))
			
		} else if (gameState.action === 'flop') {
			gameState.action = 'turn';
			players.forEach((player) => {
				player.check = false;
			});
			gameState.gameDeck.dealCards(2).forEach( card => gameState.board.push(card))
		} else if (gameState.action === 'turn') {
			gameState.action = 'river';
			players.forEach((player) => {
				player.check = false;
			});
			gameState.gameDeck.dealCards(1).forEach( card => gameState.board.push(card))
		} else if (gameState.action === 'river') {
			gameState.action = 'preflop';
			// clear the board
			gameState.board = []
			// move the blinds
			for (let i = 0; i < players.length; i++) {
				if (players[i].button === true) {
					players[i].button = false;
					players[i].smallBlind = false;
					if (i + 1 < players.length) {
						players[i + 1].button = true;
						players[i + 1].smallBlind = true;
						players[i + 1].bigBlind = false;
						if (i + 2 < players.length) {
							players[i + 2].bigBlind = true;
						} else {
							players[0].bigBlind = true;
						}
					} else {
						players[0].button = true;
						players[0].smallBlind = true;
						players[0].bigBlind = false;
						players[1].bigBlind = true;
					}
					break;
				}
			}

			players.forEach((player) => {
				player.check = false;
			});
		}

		// send updated state
		io.sockets.emit('gameState', gameState);
	});

	socket.on('disconnect', () => {
		gameState.players = players.filter((player) => player.id !== socket.id);
		// need to re-assign players variable
		players = gameState.players;
		io.sockets.emit('gameState', gameState);
	});
});
