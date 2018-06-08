import React from 'react';
import Button from '@material-ui/core/Button';

const Call = (props) => {
	return (
		<Button variant="contained" color="primary" onClick={props.call}>
			Call: ${props.activeBet - props.playerActiveBet}
		</Button>
	);
};

export default Call;
