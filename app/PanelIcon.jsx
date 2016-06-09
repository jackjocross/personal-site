import React, { PropTypes } from 'react';
import styles from './panelIcon.css';

const PanelIcon = ({text, iconPath}) => (
	<div className={styles.iconContainer}>
		<svg className={styles.panelIcon} viewBox="0 0 32 32">
			<path className={styles.svgPath} d={iconPath}></path>
		</svg>
		<svg className={styles.iconTextContainer} viewBox="0 0 100 20">
			<text className={styles.iconText + ' ' + styles.svgPath} x="50" y="18">{text}</text>
		</svg>

	</div>
);

PanelIcon.propTypes = {
	text: PropTypes.string.isRequired,
	iconPath: PropTypes.string.isRequired
}

export default PanelIcon;