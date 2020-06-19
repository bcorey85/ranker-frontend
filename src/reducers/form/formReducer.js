import {
	createForm,
	resumeForm,
	editForm,
	addField,
	updateFieldLabel,
	updateWeightedAverage,
	deleteField,
	updateItemScore,
	mapScores,
	calcResults,
	setOption,
	updateMetaInfo
} from './formCaseReducers';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'CREATE_FORM':
			return createForm(state, action);
		case 'RESUME_FORM':
			return resumeForm(state, action);
		case 'EDIT_FORM':
			return editForm(state, action);
		case 'ADD_FIELD':
			return addField(state, action);
		case 'UPDATE_FIELD_LABEL':
			return updateFieldLabel(state, action);
		case 'UPDATE_WEIGHTED_AVG':
			return updateWeightedAverage(state, action);
		case 'DELETE_FIELD':
			return deleteField(state, action);
		case 'UPDATE_ITEM_SCORE':
			return updateItemScore(state, action);
		case 'MAP_SCORES':
			return mapScores(state, action);
		case 'CALC_RESULTS':
			return calcResults(state, action);
		case 'SET_OPTION':
			return setOption(state, action);
		case 'UPDATE_META_INFO':
			return updateMetaInfo(state, action);
		default: {
			return state;
		}
	}
};

export default formReducer;
