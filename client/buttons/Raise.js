import React from 'react';
import Button from '@material-ui/core/Button';

//player activeBet
const Raise = (props) => {
	let betAmount = props.betAmount
	if (betAmount > props.bankroll) {
		betAmount = props.bankroll
	}
console.log('bankroll', props.bankroll)
	if (props.activeBet > 0 && (props.activeBet < props.bankroll)) {
		return (
			<Button variant="contained" color="primary" onClick={props.raise}>
				Raise ${betAmount}
			</Button>
		);
	} else {
		return <div />;
	}
};

export default Raise;
