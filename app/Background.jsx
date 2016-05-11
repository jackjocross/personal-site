import React from 'react';
import styles from './main.css';

export default class Background extends React.Component {
	render() {
		const {hue} = this.props;

		const colorString = `hsla(${hue}, 100%, 50%, 1), hsla(${hue + 75}, 100%, 50%, 1)`;

		const backgroundStyle = {
			background: `hsla(${hue}, 100%, 50%, 1)`,
			background: `-webkit-linear-gradient(left top, ${colorString})`,
			background: `-o-linear-gradient(bottom right, ${colorString})`,
			background: `-moz-linear-gradient(bottom right, ${colorString})`,
			background: `linear-gradient(to bottom right, ${colorString})`,
		};

		return (
			<div style={backgroundStyle} className={styles.background} onClick={this.backgroundClick}>
			</div>
		);
	};
} 