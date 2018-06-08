import React from 'react';
import Button from '@material-ui/core/Button';

//player activeBet
const Raise = (props) => {
let playerActiveBet = 0
props.player.forEach(player => playerActiveBet+= player.activeBet)
	if (props.activeBet > 0) {
		return (
			<Button variant="contained" color="primary" onClick={props.raise}>
				Raise ${props.betAmount}
			</Button>
		);
	} else {
		return <div />;
	}
};

export default Raise;
