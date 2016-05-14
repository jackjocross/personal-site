import React from 'react';
import Background from './Background.jsx';
import Layout from './Layout.jsx';
import styles from './app.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			backgroundHue: Math.floor(Math.random() * 360)
		};
	}
	render() {
		return (
			<div className={styles.container}>
				<Background hue={this.state.backgroundHue} />
				<Layout updateBackground={this.updateBackground}/>
			</div>
		);
	};
	updateBackground = () => {
		const backgroundHue = Math.floor(Math.random() * 360);
		this.setState({backgroundHue});
	};
} 
