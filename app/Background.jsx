import React from 'react';

export default class Background extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			randHue: Math.floor(Math.random() * 360)
		};
	};
	render() {
		const colorString = `hsla(${this.state.randHue}, 100%, 50%, 1), hsla(${this.state.randHue + 75}, 100%, 50%, 1)`;

		const backgroundStyle = {
			background: `hsla(${this.state.randHue}, 100%, 50%, 1)`,
			background: `-webkit-linear-gradient(left top, ${colorString})`,
			background: `-o-linear-gradient(bottom right, ${colorString})`,
			background: `-moz-linear-gradient(bottom right, ${colorString})`,
			background: `linear-gradient(to bottom right, ${colorString})`,
		};

		return (
			<div style={backgroundStyle} className="background" onClick={this.backgroundClick}></div>
		);
	};
	backgroundClick = () => {
		let randHue = Math.floor(Math.random() * 360);
		this.setState({randHue});
	};
} 