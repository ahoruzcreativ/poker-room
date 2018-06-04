import React from 'react';

const Board = (props) => {
	const board = props.board;
	const pot = props.pot;
	let totalChips = 0
	totalChips+= pot
	props.players.forEach(player => totalChips+= player.bankroll)
	let tempBoard = '';
	board.forEach((card) => {
		tempBoard += ' ' + card;
	});
	return (
		<div>
			<div>{tempBoard}</div>
			<div>Pot:{pot}</div>
			<div>Total chips in play: {totalChips}</div>
		</div>
	);
};

export default Board;
