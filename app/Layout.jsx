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
			backClear: true,
			backHidden: true,
			clickedColumn: null,
			clickedRow: null
		};
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
					{ this.childrenArr.map((child, childIndex) => {
							if (typeof child === 'undefined') return;
							let childWithProps = React.cloneElement(child, {
								column: childIndex % this.size, 
								row: Math.floor(childIndex / this.size),
								size: this.size,
								clickedColumn: this.state.clickedColumn, 
								clickedRow: this.state.clickedRow,
								panelClick: this.panelClick
							});
							return childWithProps;
					})}
				</div>
			</div>
		);
	};
	panelClick = (clickedColumn, clickedRow) => {
		let backClear = false;
		this.setState({clickedColumn, clickedRow, backClear});
	};
	close = () => {
		// Hide the back button after animation
		setTimeout(() => {
			this.hideClose();
		}, 500);

		let clickedColumn = null,
			clickedRow = null,
			backClear = true;

		this.setState({clickedColumn, clickedRow, backClear});
	};
	hideClose = () => {
		let backHidden = true;
		this.setState({backHidden});
	}
} 