import React from 'react';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			topFlex: 1, 
			rightFlex: 1,
			bottomFlex: 1,
			leftFlex: 1,
		};
	}
	render() {

		const topStyle = {
			flexGrow: this.state.topFlex
		};

		const rightStyle = {
			flexGrow: this.state.rightFlex
		};

		const bottomStyle = {
			flexGrow: this.state.bottomFlex
		};

		const leftStyle = {
			flexGrow: this.state.leftFlex
		};

		return (
			<div className="layout">
				<div style={leftStyle} className="left-col" onClick={this.leftClick}>
					<div style={topStyle} className="top-row"></div>
					<div className="middle-row"></div>
					<div style={bottomStyle} className="bottom-row"></div>
				</div>

				<div className="center-col">
					<div style={topStyle} className="top-row" onClick={this.topClick}></div>
					<div className="middle-row" onClick={this.centerClick}></div>
					<div style={bottomStyle} className="bottom-row" onClick={this.bottomClick}></div>
				</div>

				<div style={rightStyle} className="right-col" onClick={this.rightClick}>
					<div style={topStyle} className="top-row"></div>
					<div className="middle-row"></div>
					<div style={bottomStyle} className="bottom-row"></div>
				</div>
			</div>
		);
	};
	leftClick = () => {
		let leftFlex = 13, 
		rightFlex = 1;
		if (this.state.leftFlex > 1) {
			leftFlex = 1;
		}

		this.setState({leftFlex, rightFlex});
	};
	rightClick = () => {
		let rightFlex = 13, 
		leftFlex = 1;
		if (this.state.rightFlex > 1) {
			rightFlex = 1;
		}

		this.setState({rightFlex, leftFlex});
	};
	centerClick = () => {
		let leftFlex = 1, 
		rightFlex = 1, 
		topFlex = 1,
		bottomFlex = 1;

		this.setState({leftFlex, rightFlex, topFlex, bottomFlex});
	};
	topClick = () => {
		let topFlex = 13, 
		bottomFlex = 1;
		if (this.state.topFlex > 1) {
			topFlex = 1;
		}

		this.setState({topFlex, bottomFlex});
	};
	bottomClick = () => {
		let bottomFlex = 13, 
		topFlex = 1;
		if (this.state.bottomFlex > 1) {
			bottomFlex = 1;
		}

		this.setState({bottomFlex, topFlex});
	};
} 