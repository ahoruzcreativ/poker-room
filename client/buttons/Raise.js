import React from 'react';

//player activeBet
const Raise = (props) => {
let playerActiveBet = 0
props.player.forEach(player => playerActiveBet+= player.activeBet)
	if (props.activeBet > 0) {
		return (
			<button onClick={props.raise}>
				Raise ${props.activeBet + 100}
			</button>
		);
	} else {
		return <div />;
	}
};

export default Raise;
