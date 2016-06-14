import React from 'react';
import { connect } from 'react-redux';
import { addCloseFn } from './actions';
import styles from './layout.css';

class Layout extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			clickedColumn: null,
			clickedRow: null
		};
	}
	render() {
		let {children, ...other} = this.props;

		let childrenArr = React.Children.toArray(this.props.children);
		let sqrt = Math.sqrt(React.Children.count(this.props.children));
		let size = Math.round(sqrt);

		let backArrowContainerStyle = styles.backArrowContainer;
		if (this.state.backClear) {
			backArrowContainerStyle += ' ' + styles.backArrowClear;
		}

		return (
				<div className={styles.layout}>
					{ childrenArr.map((child, childIndex) => {
							if (typeof child === 'undefined') return;
							let childWithProps = React.cloneElement(child, {
								column: childIndex % size, 
								row: Math.floor(childIndex / size),
								size: size,
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
	panelClick = (clickedColumn, clickedRow, event) => {
		if (clickedRow === this.state.clickedRow && clickedColumn === this.state.clickedColumn) {
			return;
		}
		event.stopPropagation();
		
		this.props.onPanelClick(this.closeFn);

		this.setState({clickedColumn, clickedRow});
	};
	closeFn = () => {
		let clickedColumn = null,
			clickedRow = null;
		this.setState({clickedColumn, clickedRow});
	}
}

const mapStateToProps = (state) => {
	const {closeFnStack} = state;
	return {closeFnStack};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onPanelClick: (closeFn) => {
			dispatch(addCloseFn(closeFn));
		}
	}
}

const ConnectedLayout = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default ConnectedLayout;