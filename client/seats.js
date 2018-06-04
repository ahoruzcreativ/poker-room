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
	if (clientPlayer[0]) {
		return (
			<div>
				<div key={clientPlayer[0].id} className="seat-1">
					<div>
						<img className="avatar" src="/avatars/rat.png" />
					</div>
					<div className="player">
						<div>{clientPlayer[0].id}</div>
						<div>${clientPlayer[0].bankroll}</div>
					</div>
				</div>
				{players.map((player) => {
					if (player.id !== props.id) {
						return (
							<div key={player.id} className={'seat-2'}>
								<div>
									<img className="avatar" src="/avatars/rabbit.png" />
								</div>
								<div className="player">
									<div> {player.id}</div>
									<div>${player.bankroll}</div>
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
