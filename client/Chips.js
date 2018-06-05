import React from 'react';

const Chip = (props) => {
 const bet = props.bet;
	if (bet === 0) {
		return <div />;
	} else if (bet > 0 && bet < 16) {
		return (
			<div>
    <img  src="/chips/chip.png" />
			</div>
		);
	} else if (bet > 15 && bet < 50) {
		return (
			<div>
			   <img  src="/chips/chip.png" />
      <img  src="/chips/chip.png" />
			</div>
		);
	} else if (bet > 49 && bet < 200) {
		return (
			<div>
	  <img  src="/chips/chip.png" />
   <img  src="/chips/chip.png" />
   <img  src="/chips/chip.png" />
			</div>
		);
	} else if (bet > 199 && bet < 500) {
		return (
			<div>
	  <img  src="/chips/chip.png" />
   <img  src="/chips/chip.png" />
   <img  src="/chips/chip.png" />
   <img  src="/chips/chip.png" />
			</div>
		);
	} else if (bet > 499 && bet < 3000) {
		return (
			<div>
	  <img  src="/chips/chip.png" />
   <img  src="/chips/chip.png" />
   <img  src="/chips/chip.png" />
   <img  src="/chips/chip.png" />
   <img  src="/chips/chip.png" />
			</div>
		);
	}
};

export default Chip
