import React from 'react';

const Seats = (props) => {
	const players = props.players;
	const clientPlayer = players.filter((player) => player.id === props.id);

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
				<div className="seat-1">{clientPlayer[0].id}</div>
				{players.map((player) => {
					if (player.id !== props.id) {
						return <div className={'seat-' + player.seat}>{player.id}</div>;
					}
				})}
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
};

export default Seats;
