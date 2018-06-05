const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;
const {
	gameState,
	addPlayer,
	dealPlayers,
	setInitialBlinds,
	check,
	playerActionCheck,
	changeBoard,
	removePlayer,
	fold,
	call,
	bet,
	raise,
	addMessage,
	addName
} = require('./gameUtil');

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

io.on('connection', (socket) => {
	console.log('a user connected:', socket.id);
	socket.emit('clientId', socket.id);
	addPlayer(socket.id);
	if (gameState.players.length > 1) {
		setInitialBlinds();
		dealPlayers();
		io.sockets.emit('sound', 'dealCards');
	}
	io.sockets.emit('gameState', gameState);

	socket.on('action', (action) => {
		if (action.type === 'check') {
			check(socket.id);
			io.sockets.emit('sound', 'check');
		}

		if (action.type === 'fold') {
			fold(socket.id);
		}

		if (action.type === 'call') {
			call(socket.id);
			io.sockets.emit('sound', 'chips');
		}

		if (action.type === 'bet') {
			bet(socket.id);
			io.sockets.emit('sound', 'chips');
		}

		if (action.type === 'raise') {
			raise(socket.id);
			io.sockets.emit('sound', 'chips');
		}

		io.sockets.emit('gameState', gameState);

		// check if all players have completed an action
		if (playerActionCheck()) {
			changeBoard();
			io.sockets.emit('sound', 'dealCards');
			// send updated state
			io.sockets.emit('gameState', gameState);
		}
	});

	socket.on('message', (message) => {
		addMessage(message, socket.id);

		// send updated state
		io.sockets.emit('gameState', gameState);
	});

	socket.on('addName', (name) => {
		addName(name, socket.id)
		io.sockets.emit('gameState', gameState);
	})

	socket.on('disconnect', () => {
		console.log('player has disconnected', socket.id);
		removePlayer(socket.id);
		io.sockets.emit('gameState', gameState);
	});
});
