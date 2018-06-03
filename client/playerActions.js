import React from 'react';

const Actions = (props) => {
	const clientPlayer = props.clientPlayer;

	return (
		<div>
			{clientPlayer.map((player) => {
				if (player.active) {
					return (
						<div key={player.id}>
							<button onClick={props.check}>Check</button>
							<button onClick={props.fold}>Fold</button>
						</div>
					);
				}
			})}
		</div>
	);
};

export default Actions;
