import { combineReducers } from 'redux';
import background from './background';
import layout from './layout';

const personalApp = combineReducers({
	background,
	layout
});

export default personalApp;