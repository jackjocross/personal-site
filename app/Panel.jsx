import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './panel.css';

export default class Panel extends React.Component {
	constructor(props) {
		super(props);

		this.children = React.Children.toArray(this.props.children);
	}
	render() {
		let {column, row, size, clickedColumn, clickedRow, panelClick, ...other} = this.props;

		// We are the target if we match the clicked panel
		let isTarget = clickedColumn === column && clickedRow === row;

		// Add edge styles if the panel is an edge
		this.panelClass = this.addEdgeClasses(column, row, size, isTarget);

		// Shift the location according to a center of zero
		let [columnShift, rowShift] = this.shiftCenter(column, row, size);
		
		// If a panel was clicked
		if (clickedColumn !== null && clickedRow !== null) {
			// Calculate the column distance 
			let colDist = column - clickedColumn;
			let rowDist = row - clickedRow;

			// Scale is 1 in this case
			let scale = 1;

			// Update the transform stylings
			this.transformStyle = {
				transform: `scale(${scale.toString()}) translate3d(${(colDist * scale * 100).toString()}%,${(rowDist * scale * 100).toString()}%, 0)`,
			};
		} else {
			let scale = 1 / size;

			// Update the transform stylings
			this.transformStyle = {
				transform: `scale(${scale.toString()}) translate3d(${(columnShift * 100).toString()}%,${(rowShift * 100).toString()}%, 0)`,
			};
		}

		if (isTarget) {
			return this.renderContent(other);
		} else {
			return this.renderIcon();
		}
	}
	shiftCenter = (column, row, size) => {
		let columnShift = column - (size - 1) / 2;
		let rowShift = row - (size - 1) / 2;

		return [columnShift, rowShift];
	};
	addEdgeClasses = (column, row, size, isTarget) => {
		let panelClass = styles.panel;

		if (isTarget) {
			panelClass += ' ' + styles.clearBorder;
			return panelClass;
		}

		// Is it an edge column
		if (column === 0) {
			panelClass += ' ' + styles.clearBorderLeft;
		} else if (column === size - 1) {
			panelClass += ' ' + styles.clearBorderRight;
		} 

		// Is it an edge row
		if (row === 0) {
			panelClass += ' ' + styles.clearBorderTop;
		} else if (row === size - 1) {
			panelClass += ' ' + styles.clearBorderBottom;
		}

		return panelClass;
	};
	renderIcon = () => {
		return(
			<div onClick={this.props.panelClick.bind(null, this.props.column, this.props.row)} style={this.transformStyle} className={this.panelClass}>
				<ReactCSSTransitionGroup transitionName="panel" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					{this.children[0]}
				</ReactCSSTransitionGroup>
			</div>
		);
	};
	renderContent = (other) => {
		let childWithProps = React.cloneElement(this.children[1], other);
		return(
			<div onClick={this.props.panelClick.bind(null, this.props.column, this.props.row)} style={this.transformStyle} className={this.panelClass}>
				<ReactCSSTransitionGroup transitionName="panel" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					{childWithProps}
				</ReactCSSTransitionGroup>
			</div>
		);
	};
}