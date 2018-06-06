import React from 'react';
import Button from '@material-ui/core/Button';

const Join = (props) => {
	if (props.players.length < 2 && props.joined === false) {
		return (
			<Button onClick={props.join} variant="contained" color="secondary">
				Take a Seat
			</Button>
		);
	} else {
		return <div />;
	}
};

export default Join;
