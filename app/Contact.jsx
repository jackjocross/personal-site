import React from 'react';
import PanelIcon from './PanelIcon.jsx';
import styles from './about.css';

export default class Contact extends React.Component {
	render() {
		return (
			<div className={styles.scrollableContainer}>
				<div className={styles.contentContainer}>
					<h1>
						Contact
					</h1>
					<p>
						Creativity is a fucking work-ethic. Make your work consistent but not fucking predictable. If you fucking give up, you will achieve nothing. Think about all the fucking possibilities. Saul Bass on failure: Failure is built into creativity… the creative act involves this element of ‘newness’ and ‘experimentalism,’ then one must expect and accept the fucking possibility of failure. You are not your fucking work. Respect your fucking craft. You are not your fucking work.
					</p>		
				</div>
			</div>
		);
	}
}