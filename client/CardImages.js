import React from 'react';

const Cards = (props) => {
	return (
		<div>
			{props.cards.map((card) => {
    return <img src={`/cardImages/${card}.png`} />;
			})}
		</div>
	);
};

export default Cards;
