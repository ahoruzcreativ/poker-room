import React from 'react';

const Board = (props) => {
	const pot = props.pot;
	const board = props.board;
	while (board.length < 5) {
		board.push('empty');
	}
	return (
		<div className="board">
			<div className="boardInner">
				{props.board.map((card) => {
					if (card === 'empty') {
						return <img className="hiddenBoardCards" src={`/cardImages/${card}.png`} />;
					} else {
						return <img className="boardCards" src={`/cardImages/${card}.png`} />;
					}
				})}
			</div>
			<div className="pot">${pot}</div>
		</div>
	);
};

export default Board;
