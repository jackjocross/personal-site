import React from 'react';
import styles from './layout.css';

export default class Panel {
	constructor(height, width, xPlacement, yPlacement, target) {
		this.panelClass = styles.panel;
		if (xPlacement === 0) {
			this.panelClass += ' ' + styles.clearBorderLeft;
		} else if (xPlacement === Panel.columns - 1) {
			this.panelClass += ' ' + styles.clearBorderRight;
		} 

		if (yPlacement === 0) {
			this.panelClass += ' ' + styles.clearBorderTop;
		} else if (yPlacement === Panel.rows - 1) {
			this.panelClass += ' ' + styles.clearBorderBottom;
		}

		if (target) {
			this.panelClass += ' ' + styles.clearBorder;
		}

		this.style = {
			height: `${height.toString()}%`,
			width: `${width.toString()}%`,
			left: `${(xPlacement * Panel.horizontalUnit).toString()}%`,
			top: `${(yPlacement * Panel.verticalUnit).toString()}%`
		};
	}
	static setDimensions(columns, rows, horizontalUnit, verticalUnit) {
		this.columns = columns,
		this.rows = rows, 
		this.horizontalUnit = horizontalUnit,
		this.verticalUnit = verticalUnit;
	}
}

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
	
		this.childrenArr = React.Children.toArray(this.props.children);

		let sqrt = Math.sqrt(React.Children.count(this.props.children));
		let roundedSqrt = Math.round(sqrt);

		this.columns = roundedSqrt
		this.rows = sqrt > roundedSqrt ? roundedSqrt + 1 : roundedSqrt;

		this.horizontalUnit = 100 / this.columns;
		this.verticalUnit = 100 / this.rows;

		Panel.setDimensions(this.columns, this.rows, this.horizontalUnit, this.verticalUnit);

		this.state = {
			layoutGrid: []
		};

		this.initialGrid = [];
		
		// Create initialGrid and layoutGrid of panels
		for (let i = 0;i < this.rows;i++) {
			this.state.layoutGrid.push([]);
			this.initialGrid.push([]);
			for (let j = 0;j < this.columns;j++) {
				this.state.layoutGrid[i].push(new Panel(this.verticalUnit, this.horizontalUnit, j, i));
				this.initialGrid[i].push(new Panel(this.verticalUnit, this.horizontalUnit, j, i));
			}
		}
	}
	render() {
		return (
			<div>
				<div className={styles.header}>
					<button type="button" onClick={this.close}>Back</button>
					<button type="button" onClick={this.props.updateBackground}>Update background color</button>
				</div>
				<div className={styles.layout}>
					{this.state.layoutGrid.map((row, rowIndex) => {
						return row.map((panel, columnIndex) => {
							let child = this.childrenArr[columnIndex + this.columns * rowIndex];
							let childWithProps = React.cloneElement(child, {
								doSomething: 'do something'
							});
							return (
								<div style={this.state.layoutGrid[rowIndex][columnIndex].style} 
									className={this.state.layoutGrid[rowIndex][columnIndex].panelClass} 
									onClick={() => {this.panelClick(panel, child, columnIndex, rowIndex)}}>
									{childWithProps}
								</div>
							);
						})
					})}
				</div>
			</div>
		);
	};
	panelClick = (panel, child, targetColumn, targetRow) => {
		if (typeof child === 'undefined') {
			return;
		}

		let layoutGrid = [];

		this.state.layoutGrid.map((row, rowIndex) => {
			layoutGrid.push([]);
			row.map((panel, columnIndex) => {
				let colTargetDist = columnIndex - targetColumn;
				let rowTargetDist = rowIndex - targetRow;

				let isTarget = targetColumn === columnIndex && targetRow === rowIndex ? true : false;

				layoutGrid[rowIndex][columnIndex] = new Panel(100, 100, (colTargetDist * this.columns), (rowTargetDist * this.rows), isTarget);
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
	};
} 