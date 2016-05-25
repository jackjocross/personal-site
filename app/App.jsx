import React from 'react';
import Background from './Background.jsx';
import Layout from './Layout.jsx';
import About from './About.jsx';
import Work from  './Work.jsx';
import Resume from './Resume.jsx';
import Contact from './Contact.jsx';
import Panel from './Panel.jsx';
import PanelIcon from './PanelIcon.jsx';
import styles from './app.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			backgroundHue: Math.floor(Math.random() * 360)
		};

		this.wait = 650;
	}
	render() {
		return (
			<div className={styles.container}>
				<Background hue={this.state.backgroundHue} />
				<Layout updateBackground={this.updateBackground}>
					<Panel wait={this.wait}>
						<PanelIcon text={'About Me'} iconPath={'M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM22 8c1.105 0 2 0.895 2 2s-0.895 2-2 2-2-0.895-2-2 0.895-2 2-2zM10 8c1.105 0 2 0.895 2 2s-0.895 2-2 2-2-0.895-2-2 0.895-2 2-2zM16.994 21.23c-0.039-0.035-0.078-0.072-0.115-0.109-0.586-0.586-0.878-1.353-0.879-2.121-0 0.768-0.293 1.535-0.879 2.121-0.038 0.038-0.076 0.074-0.115 0.109-2.704 2.453-9.006-0.058-9.006-3.23 1.938 1.25 3.452 0.306 4.879-1.121 1.172-1.172 3.071-1.172 4.243 0 0.586 0.586 0.879 1.353 0.879 2.121 0-0.768 0.293-1.535 0.879-2.121 1.172-1.172 3.071-1.172 4.243 0 1.427 1.427 2.941 2.371 4.879 1.121 0 3.173-6.302 5.684-9.006 3.23z'} />
						<About />
					</Panel>
					<Panel wait={this.wait}>
						<PanelIcon text={'Work'} iconPath={'M29.884 25.14l-9.884-16.47v-6.671h1c0.55 0 1-0.45 1-1s-0.45-1-1-1h-10c-0.55 0-1 0.45-1 1s0.45 1 1 1h1v6.671l-9.884 16.47c-2.264 3.773-0.516 6.86 3.884 6.86h20c4.4 0 6.148-3.087 3.884-6.86zM7.532 20l6.468-10.779v-7.221h4v7.221l6.468 10.779h-16.935z'} />
						<Work />
					</Panel>
					<Panel wait={this.wait}>
						<PanelIcon text={'Resume'} iconPath={'M27 0h-24c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h24c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM26 28h-22v-24h22v24zM8 18h14v2h-14zM8 22h14v2h-14zM10 9c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zM15 12h-4c-1.65 0-3 0.9-3 2v2h10v-2c0-1.1-1.35-2-3-2z'} />
						<Resume />
					</Panel>
					<Panel wait={this.wait}>
						<PanelIcon text={'Contact'} iconPath={'M22 20c-2 2-2 4-4 4s-4-2-6-4-4-4-4-6 2-2 4-4-4-8-6-8-6 6-6 6c0 4 4.109 12.109 8 16s12 8 16 8c0 0 6-4 6-6s-6-8-8-6z'} />
						<Contact />
					</Panel>
				</Layout>
			</div>
		);
	};
	updateBackground = () => {
		const backgroundHue = Math.floor(Math.random() * 360);
		this.setState({backgroundHue});
	};
}
