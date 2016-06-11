const background = (state, action) => {
	switch (action.type) {
		case 'UPDATE_BACKGROUND':
			return Object.assign({}, state, {
				hue: action.hue
			});
		default: 
			return state;
	}
};

export default background;