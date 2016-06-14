const layout = (state = {closeFnStack: []}, action) => {
	let closeFnStack;
	switch (action.type) {
		case 'ADD_CLOSE_FN':
			closeFnStack = [...state.closeFnStack, action.closeFn];
			return Object.assign({}, state, {closeFnStack});
		case 'REMOVE_CLOSE_FN':
			closeFnStack = state.closeFnStack.slice(0, state.closeFnStack.length - 1);
			return Object.assign({}, state, {closeFnStack});
		default:
			return state;
	}
}

export default layout;