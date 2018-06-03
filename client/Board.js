import React from 'react';

const Board = (props) => {
	const board = props.board;
	const pot = props.pot;
	let tempBoard = '';
	board.forEach((card) => {
		tempBoard += ' ' + card;
	});
	return (
		<div>
			<div>{tempBoard}</div>
			<div>Pot:{pot}</div>
		</div>
	);
};

export default Board;
