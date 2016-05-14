import React from 'react';
import PageSettings from './PageSettings.jsx';
import styles from './layout.css';

export default class Layout extends React.Component {
	


	constructor(props) {
		super(props);

		this.leftParams = ['leftCol', 'rightCol', 'expandWidth', 'closeWidth'];
		this.rightParams = ['rightCol', 'leftCol', 'expandWidth', 'closeWidth'];
		this.topParams = ['topRow', 'bottomRow', 'expandHeight', 'closeHeight'];
		this.bottomParams = ['bottomRow', 'topRow', 'expandHeight', 'closeHeight'];

		this.initialState = {
			leftCol: styles.leftCol + ' ' + styles.closeWidth,
			topRow: styles.topRow + ' ' + styles.closeHeight,
			bottomRow: styles.bottomRow + ' ' + styles.closeHeight,
			rightCol: styles.rightCol + ' ' + styles.closeWidth
		};

		this.state = this.initialState;
	}
	render() {
		return (
			<div className={styles.layout}>
				<div className={this.state.leftCol} >
					<div className={this.state.topRow}></div>
					<div className={styles.middleRow} onClick={() => this.openSide(...this.leftParams)}>
					</div>
					<div className={this.state.bottomRow}></div>
				</div>

				<div className={styles.centerCol}>
					<div className={this.state.topRow} onClick={() => this.openSide(...this.topParams)}>
					</div>
					<div className={styles.middleRow} onClick={this.centerClick}></div>
					<div className={this.state.bottomRow} onClick={() => this.openSide(...this.bottomParams)}>
						<PageSettings updateBackground={this.props.updateBackground} closeFn={() => this.closeSide(...this.bottomParams)}/>
					</div>
				</div>

				<div className={this.state.rightCol}>
					<div className={this.state.topRow}></div>
					<div className={styles.middleRow} onClick={() => this.openSide(...this.rightParams)}>
					</div>
					<div className={this.state.bottomRow}></div>
				</div>
			</div>
		);
	};
	openSide = (side, oppSide, expandStyle, closeStyle) => {
		let sideStyle = styles[side] + ' ' + styles[expandStyle];
		let oppSideStyle = styles[oppSide] + ' ' + styles[closeStyle];

		if (this.state[side] === sideStyle) {
			return;
		}

		this.setState({[side]: sideStyle, [oppSide]: oppSideStyle});
	};
	closeSide = (side, oppSide, expandStyle, closeStyle) => {
		let sideStyle = styles[side] + ' ' + styles[closeStyle];

		this.setState({[side]: sideStyle})
	};
	centerClick = () => {
		this.setState(this.initialState);
	}
} 