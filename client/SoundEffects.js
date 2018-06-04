import React from 'react';
import Sound from 'react-sound';

const SoundEffects = (props) => {
	if (props.sound === 'check') {
		return <Sound url="check.wav" playStatus={Sound.status.PLAYING} />;
	} else if (props.sound === 'chips') {
		return <Sound url="chips.wav" playStatus={Sound.status.PLAYING} />;
	} else if (props.sound === 'dealCards') {
		return <Sound url="dealCards.wav" playStatus={Sound.status.PLAYING} />;
	} else if (props.sound === 'none') {
		return <div />;
	}
};

export default SoundEffects
