import React from 'react';
import Button from '@material-ui/core/Button';

const Call = (props) => {
	let callAmount = props.activeBet - props.playerActiveBet
	if (callAmount > props.bankroll) {
		callAmount = props.bankroll + props.playerActiveBet
	}

	return (
		<Button variant="contained" color="primary" onClick={props.call}>
			Call: ${callAmount}
		</Button>
	);
};

export default Call;
