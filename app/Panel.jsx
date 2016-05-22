import React from 'react';
import styles from './panel.css';

export default class Panel extends React.Component {
	constructor(props) {
		super(props);

		this.children = React.Children.toArray(this.props.children);

		this.state = {
			hidden: true,
		};
	}
	render() {
		let {isTarget, wait} = this.props;
		
		// Wait to render the text the animation is complete
		if (isTarget && !this.state.hidden) {
			return this.renderContent();
		} else if (isTarget && this.state.hidden) {
			this.delayContentShow(wait);
			return this.renderIcon();
		} else {
			this.state.hidden = true;
			return this.renderIcon();
		}
	}
	delayContentShow = (wait) => {
		setTimeout(() => {
			let hidden = false;
            this.setState({hidden});
        }, wait);
	};
	renderIcon = () => {
		return this.children[0];
		};
	renderContent = () => {
		return this.children[1];
	};
}