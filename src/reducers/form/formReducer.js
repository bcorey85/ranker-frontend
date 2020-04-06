import {
	createForm,
	addItem,
	addScoreLabel,
	updateItemLabel,
	updateScoreLabel,
	updateItemScore,
	mapScores,
	deleteItem,
	deleteScoreLabel,
	calcLabelAverages
} from './formActions';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'CREATE_FORM':
			return createForm(state, action);
		case 'ADD_ITEM':
			return addItem(state);
		case 'ADD_SCORE':
			return addScoreLabel(state);
		case 'UPDATE_ITEM_LABEL':
			return updateItemLabel(state, action);
		case 'UPDATE_SCORE_LABEL':
			return updateScoreLabel(state, action);
		case 'UPDATE_ITEM_SCORE':
			return updateItemScore(state, action);
		case 'DELETE_ITEM':
			return deleteItem(state, action);
		case 'DELETE_SCORE_LABEL':
			return deleteScoreLabel(state, action);
		case 'MAP_SCORES':
			return mapScores(state, action);
		case 'CALC_LABEL_AVERAGES':
			return calcLabelAverages(state, action);
		default: {
			return state;
		}
	}
};

export default formReducer;
