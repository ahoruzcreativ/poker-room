import React from 'react';

const Chip = (props) => {
	const spectator = props.spectator;
	const id = props.id;
	const players = props.players;
	if (!spectator) {
		return (
			<div>
				{players.map((player) => {
					if (player.activeBet === 0) {
						return <div />;
					} else if (player.id === id) {
						return (
							<div className="chip-1">
								<div style={{ marginRight: '5px' }}>${player.activeBet}</div>
								<img className="chipImg" src="/chips/chip.png" />
							</div>
						);
					} else if (player.id !== id) {
						return (
							<div className="chip-2">
								<div style={{ marginRight: '5px' }}>${player.activeBet}</div>
								<img className="chipImg" src="/chips/chip.png" />
							</div>
						);
					}
				})}
			</div>
		);
	} else {
		return (
			<div>
				{players.map((player) => {
					if (player.activeBet === 0) {
						return <div />;
					} else if (players.indexOf(player) === 0) {
						return (
							<div className="chip-1">
								<div style={{ marginRight: '5px' }}>${player.activeBet}</div>
								<img className="chipImg" src="/chips/chip.png" />
							</div>
						);
					} else if (players.indexOf(player) === 1) {
						return (
							<div className="chip-2">
								<div style={{ marginRight: '5px' }}>${player.activeBet}</div>
								<img className="chipImg" src="/chips/chip.png" />
							</div>
						);
					}
				})}
			</div>
		);
	}
};

export default Chip;
