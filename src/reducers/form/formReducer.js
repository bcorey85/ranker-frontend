import {
	createForm,
	addField,
	updateFieldLabel,
	deleteField,
	updateItemScore,
	mapScores,
	calcResults,
	setSort,
	saveForm
} from './formActions';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'CREATE_FORM':
			return createForm(state, action);
		case 'ADD_FIELD':
			return addField(state, action);
		case 'UPDATE_FIELD_LABEL':
			return updateFieldLabel(state, action);
		case 'DELETE_FIELD':
			return deleteField(state, action);
		case 'UPDATE_ITEM_SCORE':
			return updateItemScore(state, action);
		case 'MAP_SCORES':
			return mapScores(state, action);
		case 'CALC_RESULTS':
			return calcResults(state, action);
		case 'SET_SORT':
			return setSort(state, action);
		default: {
			return state;
		}
	}
};

export default formReducer;
