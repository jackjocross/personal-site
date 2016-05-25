import React from 'react';
import styles from './panel.css';

export default class Panel extends React.Component {
	constructor(props) {
		super(props);

		this.children = React.Children.toArray(this.props.children);

		this.state = {
			hidden: true,
		};
	}
	render() {
		let {column, row, size, clickedColumn, clickedRow, panelClick, wait} = this.props;

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
			// If something was clicked, height and width are 100
			//let scale = 100 / size;
			let scale = 1 / size;

			// Update the transform stylings
			this.transformStyle = {
				transform: `scale(${scale.toString()}) translate3d(${(columnShift * scale * 100).toString()}%,${(rowShift * scale * 100).toString()}%, 0)`,
			};
		}

		// Wait to render the text the animation is complete
		if (isTarget && !this.state.hidden) {
			return this.renderContent();
		} else if (isTarget && this.state.hidden) {
			this.delayContentShow(wait);
			return this.renderIcon();
		} else {
			this.state.hidden = true;
			return this.renderIcon();
		}
	}
	shiftCenter = (column, row, size) => {
		// Odd case 
		if (size % 2) {
			return [column - size / 2, row - size / 2];
		} else { // Even case
			let columnShift = column - (size - 1) / 2;
			if (columnShift > 0) {
				columnShift = Math.ceil(columnShift);
			} else {
				columnShift = Math.floor(columnShift);
			}

			let rowShift = row - (size - 1) / 2;
			if (rowShift > 0) {
				rowShift = Math.ceil(rowShift);
			} else {
				rowShift = Math.floor(rowShift);
			}

			return [columnShift, rowShift];
		}
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
	delayContentShow = (wait) => {
		setTimeout(() => {
			let hidden = false;
            this.setState({hidden});
        }, wait);
	};
	renderIcon = () => {
		return(
			<div onClick={this.props.panelClick.bind(null, this.props.column, this.props.row)} style={this.transformStyle} className={this.panelClass}>
				{this.children[0]}
			</div>
		);
	};
	renderContent = () => {
		return(
			<div onClick={this.props.panelClick.bind(null, this.props.column, this.props.row)} style={this.transformStyle} className={this.panelClass}>
				{this.children[1]}
			</div>
		);
	};
}