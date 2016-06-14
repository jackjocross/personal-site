export const updateBackground = (hue) => {
	return {
		type: 'UPDATE_BACKGROUND',
		hue
	};
};

export const addCloseFn = (closeFn) => {
	return {
		type: 'ADD_CLOSE_FN',
		closeFn
	}
}

export const removeCloseFn = () => {
	return {
		type: 'REMOVE_CLOSE_FN'
	}
}