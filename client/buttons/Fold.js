import React from 'react';
import Button from '@material-ui/core/Button';

const Fold = (props) => {
	return (
		<Button variant="contained" color="primary" onClick={props.fold}>
			Fold
		</Button>
	);
};

export default Fold;
