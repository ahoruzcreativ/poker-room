import React from 'react';
import Button from '@material-ui/core/Button';

const Join = (props) => {
	if (props.players.length < 2 && props.joined === false) {
		return (
			<div>
			<Button style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px', marginBottom: '50px' }} onClick={props.join} variant="contained" color="secondary">
				Take a Seat
			</Button>
			</div>
		);
	} else {
		return <div />;
	}
};

export default Join;
