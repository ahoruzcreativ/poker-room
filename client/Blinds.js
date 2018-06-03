import React from 'react';

const Blinds = (props) => {
	if (props.button === true) {
		return <div>Button</div>;
	} else if (props.bigBlind === true) {
		return <div>BB</div>;
	} else {
		return <div />;
	}
};

export default Blinds;
