import React from 'react';
import Blinds from './Blinds';
import PlayerCards from './playerCards'

const Seats = (props) => {
	const players = props.players;
	const clientPlayer = props.clientPlayer

	const clientPosition = players.map((player) => player.id).indexOf(props.id);
	for (let i = 0; i < players.length; i++) {
		if (i < clientPosition) {
			players[i].seat = clientPosition - i + 1;
		} else if (i > clientPosition) {
			players[i].seat = (i - clientPosition) * -1 + 7;
		}
	}
	if (clientPlayer[0]) {
		return (
			<div>
				<div key={clientPlayer[0].id} className="seat-1">
				<PlayerCards player={clientPlayer[0]} />
					{clientPlayer[0].id}
					<Blinds key={clientPlayer[0].id} bigBlind={clientPlayer[0].bigBlind} button={clientPlayer[0].button} />
				</div>
				{players.map((player) => {
					if (player.id !== props.id) {
						return (
							<div key={player.id} className={'seat-' + player.seat}>
							<PlayerCards player={player} />
								{player.id}
								<Blinds key={player.id} bigBlind={player.bigBlind} button={player.button} />
							</div>
						);
					}
				})}
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
};

export default Seats;
