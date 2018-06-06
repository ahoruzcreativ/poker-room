import React from 'react';

const OpponentCards = (props) => {
	const showdown = props.showdown;
	const players = props.players;
	const id = props.id;

	const otherPlayer = players.filter((player) => player.id !== id);
	// player view
	if (!props.spectator) {
		return (
			<div className="opponentBoard">
				{otherPlayer.map((player) => {
					if (player.cards.length > 0 && showdown === false) {
						return (
							<div className="boardInner">
								<img className="playerCards" src={`/cardImages/blank.png`} />
								<img className="playerCards" src={`/cardImages/blank.png`} />
							</div>
						);
					} else if (player.cards.length > 0 && showdown === true) {
						return (
							<div className="boardInner">
								<img className="playerCards" src={`/cardImages/${player.cards[0]}.png`} />
								<img className="playerCards" src={`/cardImages/${player.cards[1]}.png`} />
							</div>
						);
					} else {
						return <div />;
					}
				})}
			</div>
		); // spectator view
	} else {
  console.log('we are in spectator view!!')
		return (
			<div>
				<div className="opponentBoard">
					{otherPlayer.map((player) => {
						if (player.cards.length > 0 && showdown === false && otherPlayer.indexOf(player) === 1) {
							return (
								<div className="boardInner">
									<img className="playerCards" src={`/cardImages/blank.png`} />
									<img className="playerCards" src={`/cardImages/blank.png`} />
								</div>
							);
						} else if (player.cards.length > 0 && showdown === true && otherPlayer.indexOf(player) === 1) {
							return (
								<div className="boardInner">
									<img className="playerCards" src={`/cardImages/${player.cards[0]}.png`} />
									<img className="playerCards" src={`/cardImages/${player.cards[1]}.png`} />
								</div>
							);
						} else {
							return <div />;
						}
					})}
				</div>
				<div className="playerBoard">
					{otherPlayer.map((player) => {
						if (player.cards.length > 0 && showdown === false && otherPlayer.indexOf(player) === 0) {
							return (
								<div className="boardInner">
									<img className="playerCards" src={`/cardImages/blank.png`} />
									<img className="playerCards" src={`/cardImages/blank.png`} />
								</div>
							);
						} else if (player.cards.length > 0 && showdown === true && otherPlayer.indexOf(player) === 0) {
							return (
								<div className="boardInner">
									<img className="playerCards" src={`/cardImages/${player.cards[0]}.png`} />
									<img className="playerCards" src={`/cardImages/${player.cards[1]}.png`} />
								</div>
							);
						} else {
							return <div />;
						}
					})}
				</div>
			</div>
		);
	}
};

export default OpponentCards;
