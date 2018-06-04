import React from 'react';

const Board = (props) => {
	const pot = props.pot;
	let totalChips = 0;
	totalChips += pot;
	props.players.forEach((player) => (totalChips += player.bankroll));
	return (
		<div className='board'>
		
				{props.board.map((card) => {
					return <img className='boardCards' src={`/cardImages/${card}.png`} />;
				})}
			
			<div>Pot:{pot}</div>
			<div>Total chips in play: {totalChips}</div>
		</div>
	);
};

export default Board;
