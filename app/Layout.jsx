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

		let xTemp = xPlacement - (Panel.columns - 1) / 2;
		if (xTemp > 0) {
			xTemp = Math.ceil(xTemp);
		} else {
			xTemp = Math.floor(xTemp);
		}

		let yTemp = yPlacement - (Panel.rows - 1) / 2;
		if (yTemp > 0) {
			yTemp = Math.ceil(yTemp);
		} else {
			yTemp = Math.floor(yTemp);
		}

		let scale = height / 100;

		console.log(xTemp, xPlacement, yTemp, yPlacement)

		this.style = {
			transform: `scale(${scale.toString()}) translate3d(${(xTemp * 100 + height).toString()}%,${(yTemp * 100 + width).toString()}%, 0)`,
		};

		this.isTarget = target;
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

		this.columns = roundedSqrt;
		this.rows = sqrt > roundedSqrt ? roundedSqrt + 1 : roundedSqrt;

		this.horizontalUnit = 100 / this.columns;
		this.verticalUnit = 100 / this.rows;

		Panel.setDimensions(this.columns, this.rows, this.horizontalUnit, this.verticalUnit);

		this.state = {
			layoutGrid: [],
			backClear: true,
			backHidden: true
		};

		this.initialGrid = [];
		
		// Create initialGrid and layoutGrid of panels
		for (let i = 0;i < this.rows;i++) {
			this.state.layoutGrid.push([]);
			this.initialGrid.push([]);
			for (let j = 0;j < this.columns;j++) {

				this.state.layoutGrid[i].push(new Panel(this.verticalUnit, this.horizontalUnit, j * Panel.horizontalUnit / 100, i * Panel.verticalUnit / 100, false));
				this.initialGrid[i].push(new Panel(this.verticalUnit, this.horizontalUnit, j * Panel.horizontalUnit / 100, i * Panel.verticalUnit / 100, false));
			}
		}
	}
	render() {
		let backArrowContainerStyle = styles.backArrowContainer;
		if (this.state.backClear) {
			backArrowContainerStyle += ' ' + styles.backArrowClear;
		}

		return (
			<div>
				<div className={styles.header}>
					<div className={backArrowContainerStyle} onClick={this.close}>
						<svg className={styles.backArrow} viewBox="0 0 32 32">
							<defs xmlns="http://www.w3.org/2000/svg">
								<filter id="dropshadow" width="140%" height="140%">
								<feGaussianBlur in="SourceAlpha" stdDeviation="3"/> 
								<feOffset dx="2" dy="2" result="offsetblur"/>
								<feComponentTransfer>
									<feFuncA type="linear" slope="0.2"/>
								</feComponentTransfer>
								<feMerge> 
									<feMergeNode/>
									<feMergeNode in="SourceGraphic"/> 
								</feMerge>
								</filter>
							</defs>
							<path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
						</svg>
					</div>
					<div className={styles.updateBackgroundContainer} onClick={this.props.updateBackground} >
						<svg className={styles.updateBackground} viewBox="0 0 32 32">
							<path d="M24 22h-3.172l-5-5 5-5h3.172v5l7-7-7-7v5h-4c-0.53 0-1.039 0.211-1.414 0.586l-5.586 5.586-5.586-5.586c-0.375-0.375-0.884-0.586-1.414-0.586h-6v4h5.172l5 5-5 5h-5.172v4h6c0.53 0 1.039-0.211 1.414-0.586l5.586-5.586 5.586 5.586c0.375 0.375 0.884 0.586 1.414 0.586h4v5l7-7-7-7v5z"></path>
						</svg>
					</div>

				</div>
				<div className={styles.layout}>
					{this.state.layoutGrid.map((row, rowIndex) => {
						return row.map((panel, columnIndex) => {
							let child = this.childrenArr[columnIndex + this.columns * rowIndex];
							let childWithProps = React.cloneElement(child, {
								isTarget: this.state.layoutGrid[rowIndex][columnIndex].isTarget,
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

		let layoutGrid = [], 
			backClear = false,
			backHidden = false;

		this.state.layoutGrid.map((row, rowIndex) => {
			layoutGrid.push([]);
			row.map((panel, columnIndex) => {
				let colTargetDist = columnIndex - targetColumn;
				let rowTargetDist = rowIndex - targetRow;

				let isTarget = targetColumn === columnIndex && targetRow === rowIndex ? true : false;

				layoutGrid[rowIndex][columnIndex] = new Panel(100, 100, colTargetDist, rowTargetDist, isTarget);
			});
		});

		this.setState({layoutGrid, backClear, backHidden});
	};
	close = () => {
		let layoutGrid = this.state.layoutGrid,
			backClear = true;

		layoutGrid.map((column, columnIndex) => {
			column.map((panel, rowIndex) => {
				layoutGrid[columnIndex][rowIndex] = Object.create(this.initialGrid[columnIndex][rowIndex]);
			});
		});

		// Hide the back button after animation
		setTimeout(() => {
			this.hideClose();
		}, 500);

		this.setState({layoutGrid, backClear});
	};
	hideClose = () => {
		let backHidden = true;
		this.setState({backHidden});
	}
} 