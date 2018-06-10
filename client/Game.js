import React, { Component } from 'react';
import io from 'socket.io-client';
import { getPlayer } from './store/clientPlayer';
import { connect } from 'react-redux';
import Seats from './seats';
import Actions from './playerActions';
import Board from './Board';
import SoundEffects from './SoundEffects';
import { setTimeout } from 'timers';
import Chip from './Chips';
import Chatbox from './Chatbox';
import Lobby from './Lobby';
import Join from './buttons/Join';
import PlayerCards from './playerCards';
import OpponentCards from './opponentCards';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

let socket;
const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({ getPlayer: (id) => dispatch(getPlayer(id)) });

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			gameState: {
				spectators: [],
				players: [],
				gameDeck: '',
				board: [],
				activeBet: 0,
				pot: 0,
				messages: [],
				showdown: false
			},
			sound: 'none',
			joined: false,
			spectator: true,
			betAmount: 10,
			rebuyWindow: false
		};
		this.check = this.check.bind(this);
		this.fold = this.fold.bind(this);
		this.call = this.call.bind(this);
		this.bet = this.bet.bind(this);
		this.raise = this.raise.bind(this);
		this.messageSubmit = this.messageSubmit.bind(this);
		this.addName = this.addName.bind(this);
		this.join = this.join.bind(this);
		this.changeBet = this.changeBet.bind(this);
		socket = io.connect();
		socket.on('clientId', (id) => {
			this.setState({ id });
		});
		socket.on('gameState', (gameState) => {
			this.setState({ gameState, betAmount: gameState.minBet });
		});
		socket.on('sound', (soundEffect) => {
			this.setState({ sound: soundEffect });
			setTimeout(() => {
				this.setState({ sound: 'none' });
			}, 500);
		});
		socket.on('rebuy', (id) => {
			if (id === this.state.id) {
				this.setState({ rebuyWindow: true });
			}
		});
	}

	fold() {
		const action = { type: 'fold' };
		socket.emit('action', action);
	}

	check() {
		const action = { type: 'check' };
		socket.emit('action', action);
	}

	call() {
		const action = { type: 'call' };
		socket.emit('action', action);
	}

	bet() {
		const action = { type: 'bet', amount: this.state.betAmount };
		socket.emit('action', action);
		//clear bet after player action
		this.setState({ betAmount: 0 });
	}

	changeBet(amount) {
		this.setState({ betAmount: amount });
	}

	raise() {
		const action = { type: 'raise', amount: this.state.betAmount };
		socket.emit('action', action);
	}

	messageSubmit(message) {
		socket.emit('message', message);
	}

	addName(name) {
		this.setState({ name });
		socket.emit('addName', name);
	}

	join() {
		socket.emit('join');
		this.setState({ joined: true, spectator: false });
	}

	handleRebuy = () => {
		socket.emit('playerRebuy')
		this.setState({ rebuyWindow: false });
	}

	handleClose = () => {
		socket.emit('spectatePlayer')
		this.setState({ rebuyWindow: false, joined: false });
	}

	render() {
		const players = this.state.gameState.players;
		const id = this.state.id;
		const clientPlayer = players.filter((player) => player.id === id);
		if (this.state.name === '') {
			return <Lobby players={players} spectators={this.state.gameState.spectators} addName={this.addName} />;
		} else {
			return (
				<div>
					<div className="container">
						<img className="table" src="poker_table.svg" />
						<SoundEffects sound={this.state.sound} />
						<Seats clientPlayer={clientPlayer} id={id} players={players} />
						<Board pot={this.state.gameState.pot} players={players} board={this.state.gameState.board} />
						<PlayerCards players={this.state.gameState.players} id={this.state.id} />
						<OpponentCards
							spectator={this.state.spectator}
							showdown={this.state.gameState.showdown}
							players={this.state.gameState.players}
							id={this.state.id}
						/>
						<Chip
							spectator={this.state.spectator}
							players={this.state.gameState.players}
							id={this.state.id}
						/>
					</div>
					<Actions
						minBet={this.state.gameState.minBet}
						betAmount={this.state.betAmount}
						changeBet={this.changeBet}
						showdown={this.state.gameState.showdown}
						raise={this.raise}
						bet={this.bet}
						call={this.call}
						fold={this.fold}
						clientPlayer={clientPlayer}
						check={this.check}
						activeBet={this.state.gameState.activeBet}
					/>
					<Chatbox messages={this.state.gameState.messages} messageSubmit={this.messageSubmit} />
					<Join joined={this.state.joined} players={this.state.gameState.players} join={this.join} />
					<Dialog open={this.state.rebuyWindow} onClose={this.handleClose}>
						<DialogTitle>
							{' '}
							<Typography align="center" variant="subheading" gutterBottom>
								Would you like to rebuy?
							</Typography>
						</DialogTitle>
						<DialogContent>
							<TextField margin="normal" onChange={this.handleChange} style={{ width: '100%' }} />
						</DialogContent>
						<DialogActions>
							<div style={{ alignContent: 'center' }}>
								<Button variant="contained" color="secondary" onClick={this.handleRebuy}>
									Yes
								</Button>
								<Button variant="contained" color="secondary" onClick={this.handleClose}>
									No
								</Button>
							</div>
						</DialogActions>
					</Dialog>
				</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
