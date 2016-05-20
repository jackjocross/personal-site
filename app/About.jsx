import React from 'react';
import styles from './about.css';

export default class About extends React.Component {
	render() {
		let {isTarget} = this.props;

		if (isTarget) {
			return this.renderContent();
		} else {
			return this.renderIcon();
		}
	}
	renderIcon = () => {
		return (
			<div className={styles.container}>
				Icon &#xe9e1;
			</div>
		);
	};
	renderContent = () => {
		return (
			<div className={styles.container}>
				Content
			</div>
		);
	};
}