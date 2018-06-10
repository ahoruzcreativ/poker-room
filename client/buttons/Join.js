import React from 'react';
import Button from '@material-ui/core/Button';

const Join = (props) => {
	if (props.players.length < 2 && props.joined === false) {
		return (
			<div style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', paddingTop: '50px', paddingBottom: '50px' }} >
			<Button onClick={props.join} variant="contained" color="secondary">
				Take a Seat
			</Button>
			</div>
		);
	} else {
		return <div />;
	}
};

export default Join;
