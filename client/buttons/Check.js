import React from 'react';
import Button from '@material-ui/core/Button';

const Check = (props) => {
	return (
		<Button variant="contained" color="primary" onClick={props.check}>
			Check
		</Button>
	);
};

export default Check;
