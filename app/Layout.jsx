import React from 'react';
import PageSettings from './PageSettings.jsx';
import styles from './layout.css';

export default class Panel {
	constructor(height, width, xPlacement, yPlacement, horizontalUnit, verticalUnit, columns, rows, target) {

		this.panelClass = styles.panel;
		if (xPlacement === 0) {
			this.panelClass += ' ' + styles.clearBorderLeft;
		} else if (xPlacement === columns - 1) {
			this.panelClass += ' ' + styles.clearBorderRight;
		} 

		if (yPlacement === 0) {
			this.panelClass += ' ' + styles.clearBorderTop;
		} else if (yPlacement === rows - 1) {
			this.panelClass += ' ' + styles.clearBorderBottom;
		}

		if (target) {
			this.panelClass += ' ' + styles.clearBorder;
		}

		this.style = {
			height: `${height.toFixed(2).toString()}%`,
			width: `${width.toFixed(2).toString()}%`,
			left: `${(xPlacement * horizontalUnit).toFixed(2).toString()}%`,
			top: `${(yPlacement * verticalUnit).toFixed(2).toString()}%`
		};
	}
}

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
	
		this.columns = 4;
		this.rows = 4;

		this. verticalUnit = 100 / this.rows;
		this. horizontalUnit = 100 / this.columns;

		this.state = {
			layoutGrid: []
		};

		this.initialGrid = [];
		
		// Create initialGrid and layoutGrid of panels
		for (let i = 0;i < this.columns;i++) {
			this.state.layoutGrid.push([]);
			this.initialGrid.push([]);
			for (let j = 0;j < this.rows;j++) {
				this.state.layoutGrid[i].push(new Panel(this.verticalUnit, this.horizontalUnit, i, j, this.horizontalUnit, this.verticalUnit, this.columns, this.rows));
				this.initialGrid[i].push(new Panel(this.verticalUnit, this.horizontalUnit, i, j, this.horizontalUnit, this.verticalUnit, this.columns, this.rows));
			}
		}
	}
	render() {
		return (
			<div>
				<div className={styles.header}>
					<button type="button" onClick={this.close}>Back</button>
				</div>
				<div className={styles.layout}>
					{this.state.layoutGrid.map((column, columnIndex) => {
						return column.map((panel, rowIndex) => {
							return <div style={this.state.layoutGrid[columnIndex][rowIndex].style} className={this.state.layoutGrid[columnIndex][rowIndex].panelClass} onClick={() => {this.panelClick(panel, columnIndex, rowIndex)}}></div>;
						})
					})}	
				</div>
			</div>
		);
	};
	panelClick = (panel, targetColumn, targetRow) => {
		let layoutGrid = [];

		this.state.layoutGrid.map((column, columnIndex) => {
			layoutGrid.push([]);
			column.map((panel, rowIndex) => {
				let colTargetDist = columnIndex - targetColumn;
				let rowTargetDist = rowIndex - targetRow;

				let isTarget = targetColumn === columnIndex && targetRow === rowIndex ? true : false;

				layoutGrid[columnIndex][rowIndex] = new Panel(100, 100, (colTargetDist * this.columns), (rowTargetDist * this.rows), this.horizontalUnit, this.verticalUnit, this.columns, this.rows, isTarget);
			});
		});

		this.setState({layoutGrid});
	};
	close = () => {
		let layoutGrid = this.state.layoutGrid;

		layoutGrid.map((column, columnIndex) => {
			column.map((panel, rowIndex) => {
				layoutGrid[columnIndex][rowIndex] = Object.create(this.initialGrid[columnIndex][rowIndex]);
			});
		});

		this.setState({layoutGrid});
		this.forceUpdate();
	};
} 