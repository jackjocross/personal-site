import React from 'react';
import styles from './pageSettings.css';

export default class PageSettings extends React.Component {
	render() {
		
		return (
			<div className={styles.container}>
				<button type="button" onClick={this.props.updateBackground}>Update background color</button>
				<button type="button" onClick={this.props.closeFn}>Close</button>
			</div>
		);
	};
} 