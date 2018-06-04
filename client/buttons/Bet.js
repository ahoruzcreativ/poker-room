import React from 'react';

const Bet = (props) => {
	if (props.activeBet === 0) {
		return <button onClick={props.bet}>Bet $100</button>;
	} else {
		return <div />;
	}
};

export default Bet
