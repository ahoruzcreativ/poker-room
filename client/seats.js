import React from 'react';

const Seats = (props) => {
	const players = props.players;
	const clientPlayer = props.clientPlayer;

	const clientPosition = players.map((player) => player.id).indexOf(props.id);
	for (let i = 0; i < players.length; i++) {
		if (i < clientPosition) {
			players[i].seat = clientPosition - i + 1;
		} else if (i > clientPosition) {
			players[i].seat = (i - clientPosition) * -1 + 7;
		}
	}
	console.log(clientPlayer)
	if (clientPlayer[0]) {
		console.log(clientPlayer[0])
		return (
			<div>
				<div key={clientPlayer[0].id} className="seat-1">
					<div className="player">
						<div className="player-font">{clientPlayer[0].name}</div>
						<div className="player-font">${clientPlayer[0].bankroll}</div>
					</div>
				</div>
				{players.map((player) => {
					if (player.id !== props.id) {
						return (
							<div key={player.name} className={'seat-2'}>
								<div className="player">
								<div className="player-font"> {player.name}</div>
								<div className="player-font">${player.bankroll}</div>
								</div>
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
