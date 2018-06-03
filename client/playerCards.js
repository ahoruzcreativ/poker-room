import React from 'react';

const PlayerCards = (props) => {
	const player = props.player;
	let cards = '';
	player.cards.forEach((card) => (cards += ' ' + card));
	return (
		<div>
			<div>${player.bankroll}</div>
			<div>{cards}</div>
		</div>
	);
};

export default PlayerCards;
