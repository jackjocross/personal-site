import React from 'react';
import styles from './about.css';

export default class About extends React.Component {
	constructor(props) {
		super(props);

		console.log(props.doSomething);
	}
	render() {
		if (true) {
			return this.renderIcon();
		} else {
			return this.renderContent();
		}
	}
	renderIcon = () => {
		return (
			<div className={styles.container}>
				Icon
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