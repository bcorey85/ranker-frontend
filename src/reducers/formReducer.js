const formReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM':
			state.form.items = state.form.addItem();
			return { ...state };
		case 'ADD_SCORE':
			state.form.scoreLabels = state.form.addScoreLabel();
			return { ...state };
		case 'UPDATE_ITEM_LABEL':
			state.form.items = state.form.updateItemLabel(action);
			return {
				...state
			};
		case 'UPDATE_SCORE_LABEL':
			state.form.scoreLabels = state.form.updateScoreLabel(action);
			return { ...state };
		case 'UPDATE_ITEM_SCORE':
			state.form.items = state.form.updateRanks(
				state.form.updateItemScore(action)
			);
			return { ...state };
		case 'DELETE_ITEM':
			state.form.items = state.form.deleteItem(action);
			return { ...state };
		case 'DELETE_SCORE_LABEL':
			state.form.scoreLabels = state.form.deleteScoreLabel(action);
			return { ...state };
		case 'MAP_SCORES':
			state.form.items = state.form.mapScores();
			return { ...state };
		case 'CALC_LABEL_AVERAGES':
			state.form.labels = state.form.updateScoreLabels();
			state.form.overallAverage = state.form.calcOverallAverage();
			return { ...state };
		default: {
			return state;
		}
	}
};

export default formReducer;
