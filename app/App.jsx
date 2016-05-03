import React from 'react';
import Background from './Background.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			backgroundHue: Math.floor(Math.random() * 360)
		};
	};
	render() {
		return (
			<div className="container" onClick={this.containerClick}>
				<Background hue={this.state.backgroundHue} />

				<div className="layout">
					<div className="left-col">
						<div className="top-row"></div>
						<div className="middle-row"></div>
						<div className="bottom-row"></div>
					</div>

					<div className="center-col">
						<div className="top-row"></div>
						<div className="middle-row"></div>
						<div className="bottom-row"></div>
					</div>

					<div className="right-col">
						<div className="top-row"></div>
						<div className="middle-row"></div>
						<div className="bottom-row"></div>
					</div>
				</div>
			</div>
		);
	};
	containerClick = () => {
		const backgroundHue = Math.floor(Math.random() * 360);
		this.setState({backgroundHue});
	};
} 
