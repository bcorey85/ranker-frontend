import {
	CREATE_FORM,
	RESUME_FORM,
	EDIT_FORM,
	ADD_FIELD,
	UPDATE_FIELD_LABEL,
	UPDATE_WEIGHTED_AVG,
	DELETE_FIELD,
	UPDATE_ITEM_SCORE,
	MAP_SCORES,
	CALC_RESULTS,
	SET_OPTION,
	UPDATE_META_INFO
} from './formConstants';

export const createForm = newForm => ({
	type: CREATE_FORM,
	newForm
});

export const resumeForm = form => ({
	type: RESUME_FORM,
	form
});

export const editForm = form => ({
	type: EDIT_FORM,
	form
});

export const addField = field => ({ type: ADD_FIELD, field });

export const updateFieldLabel = (value, id, field) => ({
	type: UPDATE_FIELD_LABEL,
	value,
	id,
	field
});

export const updateWeightedAverage = (value, id) => ({
	type: UPDATE_WEIGHTED_AVG,
	value,
	id
});

export const deleteField = (id, field) => ({
	type: DELETE_FIELD,
	id,
	field
});

export const updateItemScore = (value, scoreId, itemId) => ({
	type: UPDATE_ITEM_SCORE,
	value,
	scoreId,
	itemId
});

export const mapScores = () => ({ type: MAP_SCORES });

export const calcResults = () => ({ type: CALC_RESULTS });

export const setOption = (option, value) => ({
	type: SET_OPTION,
	option,
	value
});

export const updateMetaInfo = (field, value) => ({
	type: UPDATE_META_INFO,
	field,
	value
});
