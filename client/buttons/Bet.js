import React from 'react';
import Button from '@material-ui/core/Button';

const Bet = (props) => {
	if (props.activeBet === 0) {
		return <Button variant="contained" color="primary" onClick={props.bet}>Bet ${props.betAmount}</Button>;
	} else {
		return <div />;
	}
};

export default Bet
