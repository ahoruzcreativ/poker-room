import React from 'react';
import Bet from './buttons/Bet';
import Raise from './buttons/Raise'

const Actions = (props) => {
	const showdown = props.showdown
	const clientPlayer = props.clientPlayer;
	const activeBet = props.activeBet;
console.log('game activeBet', activeBet) 
console.log(clientPlayer)
	return (
		<div>
			{clientPlayer.map((player) => {
				if (player.active && activeBet <= player.activeBet && showdown === false) {
					return (
						<div key={player.id}>
							<Bet bet={props.bet} activeBet={activeBet} />
							<Raise raise={props.raise} activeBet={activeBet} player={clientPlayer} />
							<button onClick={props.check}>Check</button>
							<button onClick={props.fold}>Fold</button>
						</div>
					);
				} else if (player.active && activeBet > player.activeBet && showdown === false) {
					return (
						<div key={player.id}>
						<Bet bet={props.bet} activeBet={activeBet} />
						<Raise raise={props.raise} activeBet={activeBet} player={clientPlayer} />
							<button onClick={props.call}>Call: ${activeBet - player.activeBet}</button>
							<button onClick={props.fold}>Fold</button>
						</div>
					);
				}
			})}
		</div>
	);
};

export default Actions;
