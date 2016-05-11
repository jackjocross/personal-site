import React from 'react';
import Background from './Background.jsx';
import Layout from './Layout.jsx';
import styles from './main.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			backgroundHue: Math.floor(Math.random() * 360)
		};
	}
	render() {
		return (
			<div className={styles.container} onClick={this.containerClick}>
				<Background hue={this.state.backgroundHue} />
				<Layout />
			</div>
		);
	};
	containerClick = () => {
		const backgroundHue = Math.floor(Math.random() * 360);
		this.setState({backgroundHue});
	};
} 
