import React, { Component } from 'react';
import io from 'socket.io-client';
import { getPlayer } from './store/clientPlayer';
import { connect } from 'react-redux';
import Seats from './seats';
import Actions from './playerActions';
import Board from './Board';

let socket;
const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({ getPlayer: (id) => dispatch(getPlayer(id)) });

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			gameState: {
				players: [],
				gameDeck: '',
				board: []
			}
		};
		this.check = this.check.bind(this);
		this.fold = this.fold.bind(this);
		socket = io.connect();
		socket.on('clientId', (id) => {
			this.setState({ id });
		});
		socket.on('gameState', (gameState) => {
			this.setState({ gameState });
		});
	}

	fold() {
		const action = { type: 'fold' };
		socket.emit('action', action);
	}

	check() {
		const action = { type: 'check' };
		socket.emit('action', action);
		console.log(this.state.gameState);
	}

	render() {
		const players = this.state.gameState.players;
		const id = this.state.id;
		const clientPlayer = players.filter((player) => player.id === id);
		return (
			<div>
				<div className="container">
					<img src="poker_table.svg" />
					<Seats clientPlayer={clientPlayer} id={id} players={players} />
					<Actions fold={this.fold} clientPlayer={clientPlayer} check={this.check} />
				</div>
				<p>Number of players: {players.length} </p>
				<Board pot={this.state.gameState.pot} board={this.state.gameState.board} />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
