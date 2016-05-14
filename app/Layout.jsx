import React from 'react';
import PageSettings from './PageSettings.jsx';
import styles from './layout.css';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
	
		this.columns = 2;
		this.rows = 2;

		let verticalUnit = 100 / this.rows;
		let horizontalUnit = 100 / this.columns;

		this.createPanel = function Panel(heightIn, widthIn, xPlacementIn, yPlacementIn) {
			
			this.setStyle = (height, width, xPlacement, yPlacement) => {
				this.style = {
					height: `${height.toFixed(2).toString()}%`,
					width: `${width.toFixed(2).toString()}%`,
					left: `${(xPlacement * horizontalUnit).toFixed(2).toString()}%`,
					top: `${(yPlacement * verticalUnit).toFixed(2).toString()}%`
				};
			};

			this.setStyle(heightIn, widthIn, xPlacementIn, yPlacementIn);
		};

		this.state = {
			layoutGrid: []
		};

		this.initialGrid = [];

		for (let i = 0;i < this.columns;i++) {
			this.state.layoutGrid.push([]);
			this.initialGrid.push([]);
			for (let j = 0;j < this.rows;j++) {
				this.state.layoutGrid[i].push(new this.createPanel(verticalUnit, horizontalUnit, i, j));
				this.initialGrid[i].push(new this.createPanel(verticalUnit, horizontalUnit, i, j));
			}
		}
	}
	render() {
		return (
			<div>
				<button type="button" onClick={this.close}></button>
				<div className={styles.layout}>
					{this.state.layoutGrid.map((column, columnIndex) => {
						return column.map((panel, rowIndex) => {
							return <div style={this.state.layoutGrid[columnIndex][rowIndex].style} className={styles.panel} onClick={() => {this.panelClick(panel, columnIndex, rowIndex)}}></div>;
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
				
				layoutGrid[columnIndex][rowIndex] = new this.createPanel(100, 100, (colTargetDist * this.columns), (rowTargetDist * this.rows));
			});
		});

		this.setState({layoutGrid});
	};
	close = () => {
		let layoutGrid = this.state.layoutGrid;

		layoutGrid.map((column, columnIndex) => {
			column.map((panel, rowIndex) => {
				layoutGrid[columnIndex][rowIndex] = Object.assign({}, this.initialGrid[columnIndex][rowIndex]);
			});
		});

		this.setState({layoutGrid});
		this.forceUpdate();
	};
} 