import React from 'react';
import styles from './background.css';

const Background = ({hue}) => {
	const colorString = `hsla(${hue}, 100%, 50%, 1), hsla(${hue + 75}, 100%, 50%, 1)`;

	const backgroundStyle = {
		background: `${colorString}`,
		background: `-webkit-linear-gradient(left top, ${colorString})`,
		background: `-o-linear-gradient(bottom right, ${colorString})`,
		background: `-moz-linear-gradient(bottom right, ${colorString})`,
		background: `linear-gradient(to bottom right, ${colorString})`,
	};

	return (
		<div style={backgroundStyle} className={styles.background}>
		</div>
	);
}

export default Background;