import React from 'react';
import styles from './main.css';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);

		this.closed = '10%';
		this.expanded = '50%';

		this.state = {
			topHeight: this.closed, 
			rightWidth: this.closed,
			bottomHeight: this.closed,
			leftWidth: this.closed,
		};
	}
	render() {

		const topStyle = {
			height: this.state.topHeight
		};

		const rightStyle = {
			width: this.state.rightWidth
		};

		const bottomStyle = {
			height: this.state.bottomHeight
		};

		const leftStyle = {
			width: this.state.leftWidth
		};

		return (
			<div className={ styles.layout }>
				<div style={leftStyle} className={styles.leftCol} onClick={this.leftClick}>
					<div style={topStyle} className={styles.topRow}></div>
					<div className={styles.middleRow}></div>
					<div style={bottomStyle} className={styles.bottomRow}></div>
				</div>

				<div className={styles.centerCol}>
					<div style={topStyle} className={styles.topRow} onClick={this.topClick}></div>
					<div className={styles.middleRow} onClick={this.centerClick}></div>
					<div style={bottomStyle} className={styles.bottomRow} onClick={this.bottomClick}></div>
				</div>

				<div style={rightStyle} className={styles.rightCol} onClick={this.rightClick}>
					<div style={topStyle} className={styles.topRow}></div>
					<div className={styles.middleRow}></div>
					<div style={bottomStyle} className={styles.bottomRow}></div>
				</div>
			</div>
		);
	};
	leftClick = () => {
		let leftWidth = this.expanded, 
		rightWidth = this.closed;
		if (this.state.leftFlex === this.expanded) {
			leftWidth = this.closed;
		}

		this.setState({leftWidth, rightWidth});
	};
	rightClick = () => {
		let rightWidth = this.expanded, 
		leftWidth = this.closed;
		if (this.state.rightWidth === this.expanded) {
			rightWidth = this.closed;
		}

		this.setState({rightWidth, leftWidth});
	};
	centerClick = () => {
		let leftWidth = this.closed, 
		rightWidth = this.closed, 
		topHeight = this.closed,
		bottomHeight = this.closed;

		this.setState({leftWidth, rightWidth, topHeight, bottomHeight});
	};
	topClick = () => {
		let topHeight = this.expanded, 
		bottomHeight = this.closed;
		if (this.state.topHeight === this.expanded) {
			topHeight = this.closed;
		}

		this.setState({topHeight, bottomHeight});
	};
	bottomClick = () => {
		let bottomHeight = this.expanded, 
		topHeight = this.closed;
		if (this.state.bottomHeight === this.expanded) {
			bottomHeight = this.closed;
		}

		this.setState({bottomHeight, topHeight});
	};
} 