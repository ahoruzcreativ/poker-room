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
	gameDeck
};

io.on('connection', (socket) => {
	console.log('a user connected:', socket.id);
	socket.emit('clientId', socket.id);
	gameState.players.push({
		id: socket.id,
		bankroll: 1000,
		cards: []
	});
	io.sockets.emit('gameState', gameState);
	socket.on('shuffle', () => {
		gameState.gameDeck.shuffleDeck();
		io.sockets.emit('gameState', gameState);
	});
	socket.on('deal', () => {
		for (let i = 0; i < gameState.players.length; i++) {
			gameState.players[i].cards = gameState.gameDeck.dealCards(2);
		}
		io.sockets.emit('gameState', gameState);
	});
	socket.on('disconnect', () => {
		console.log('user disconnected', socket.id);
		gameState.players = gameState.players.filter((player) => player.id !== socket.id);
		io.sockets.emit('gameState', gameState);
	});
});
