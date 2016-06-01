import React from 'react';
import styles from './layout.css';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
	
		this.childrenArr = React.Children.toArray(this.props.children);

		let sqrt = Math.sqrt(React.Children.count(this.props.children));
		let roundedSqrt = Math.round(sqrt);

		this.size = roundedSqrt;

		this.state = {
			clickedColumn: null,
			clickedRow: null
		};
	}
	render() {
		let {closeFnStack, ...other} = this.props;

		// console.log(closeFnStack, other, this.panelClick);

		let backArrowContainerStyle = styles.backArrowContainer;
		if (this.state.backClear) {
			backArrowContainerStyle += ' ' + styles.backArrowClear;
		}

		console.log(this.childrenArr);

		return (
				<div className={styles.layout}>
					{ this.childrenArr.map((child, childIndex) => {
							if (typeof child === 'undefined') return;
							console.log(child);
							let childWithProps = React.cloneElement(child, {
								column: childIndex % this.size, 
								row: Math.floor(childIndex / this.size),
								size: this.size,
								clickedColumn: this.state.clickedColumn, 
								clickedRow: this.state.clickedRow,
								panelClick: this.panelClick,
								...other
							});
							return childWithProps;
					})}
				</div>
		);
	};
	panelClick = (clickedColumn, clickedRow) => {
		this.props.closeFnStack.push(this.closeFn);
		this.setState({clickedColumn, clickedRow});
	};
	closeFn = () => {
		let clickedColumn = null,
			clickedRow = null;
		this.setState({clickedColumn, clickedRow});
	}
} 