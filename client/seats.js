import React from 'react';
import Button from './Button';

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
					{clientPlayer[0].id}
					<Button key={clientPlayer[0].id} button={clientPlayer[0].button} />
				</div>
				{players.map((player) => {
					if (player.id !== props.id) {
						return (
							<div key={player.id} className={'seat-' + player.seat}>
								{player.id}
								<Button button={player.button} />
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
