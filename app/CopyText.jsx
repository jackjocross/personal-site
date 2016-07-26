import React from 'react';

class CopyText extends React.Component {
	constructor(props) {
		super(props);

		let selectText = false;

		this.state = {
			selectText
		};
		console.log(this.state);
	}
	render() {
		console.log(this.state);
		if (this.state.selectText) {
			return this.renderSelectableText();
		} else {
			return this.renderStaticText();
		}
	}
	renderStaticText = () => {
		return (
			<div ref={(ref) => this.text = ref} onClick={this.selectText}>
				{this.props.text}
			</div>
		);
	};
	renderSelectableText = () => {
		return (
			<input type='text' defaultValue={this.props.text} ref={(ref) => this.text = ref} onClick={this.selectText}></input>
		);
	};
	selectText = () => {
		let selectText = !this.state.selectText;

		this.setState({selectText});

		console.dir(this.text);

	};
}

export default CopyText;