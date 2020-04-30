import produce from 'immer';

import { Form, Score, fields } from './formSchemas';
import { updateRanks } from '../../utils/formUtils';
import { average } from '../../utils/math';

const setLocalStorage = form => {
	localStorage.setItem('RankerAppForm', JSON.stringify(form));
};

export const createForm = (state, action) => {
	const { numItems, numScoreLabels, sort } = action.newForm;
	const newForm = Form(numItems, numScoreLabels, sort);

	return produce(state, draftState => {
		draftState.form = newForm;
		setLocalStorage(draftState);
	});
};

export const resumeForm = (state, action) => {
	return produce(state, draftState => {
		draftState.form = action.form;
		setLocalStorage(draftState);
	});
};

export const editForm = (state, action) => {
	return produce(state, draftState => {
		draftState.form = action.form;
		draftState.form.editMode = true;
		setLocalStorage(draftState);
	});
};

export const addField = (state, action) => {
	if (fields[action.field]) {
		const newField = fields[action.field].schema();
		const stateLocation = fields[action.field].stateLocation;

		return produce(state, draftState => {
			draftState.form[stateLocation] = [
				...state.form[stateLocation],
				newField
			];
			setLocalStorage(draftState);
		});
	} else {
		setLocalStorage(state);
		return state;
	}
};

export const updateFieldLabel = (state, action) => {
	if (fields[action.field]) {
		const stateLocation = fields[action.field].stateLocation;
		const updatedFields = state.form[stateLocation].map(field => {
			if (field.id === action.id) {
				return {
					...field,
					label: action.value
				};
			}
			return field;
		});

		return produce(state, draftState => {
			draftState.form[stateLocation] = updatedFields;
			setLocalStorage(draftState);
		});
	} else {
		setLocalStorage(state);
		return state;
	}
};

export const deleteField = (state, action) => {
	if (fields[action.field]) {
		const stateLocation = fields[action.field].stateLocation;
		const filteredFields = state.form[stateLocation].filter(
			field => field.id !== action.id
		);

		return produce(state, draftState => {
			draftState.form[stateLocation] = filteredFields;
			setLocalStorage(draftState);
		});
	} else {
		setLocalStorage(state);
		return state;
	}
};

export const updateItemScore = (state, action) => {
	const updatedItems = state.form.items.map(item => {
		if (item.id === action.itemId) {
			const newScores = item.scores.map(score => {
				if (score.id === action.scoreId) {
					return {
						...score,
						score: action.value
					};
				}
				return score;
			});

			return {
				...item,
				scores: newScores,
				average: average(newScores, 'score')
			};
		}
		return item;
	});

	return produce(state, draftState => {
		draftState.form.items = updateRanks(updatedItems, state.form.sort);
		setLocalStorage(draftState);
	});
};

export const mapScores = state => {
	let items, scoreLabels;
	// Remove empty labels
	const filterEmptyItems = state.form.items.filter(item => item.label !== '');
	const filterEmptyScoreLabels = state.form.scoreLabels.filter(
		label => label.label !== ''
	);

	// If all items empty, return default state
	if (filterEmptyItems.length === 0) {
		items = state.form.items;
	} else {
		const mappedItems = filterEmptyItems.map(item => {
			// If score exists on item already, return item, if not create a new score
			const scores = filterEmptyScoreLabels.map(label => {
				const existingScore = item.scores.findIndex(
					score => score.label === label.label
				);
				if (existingScore >= 0) {
					return item.scores[existingScore];
				} else {
					return Score(label.label);
				}
			});

			return { ...item, scores };
		});

		items = mappedItems;
	}

	// If all scorelabels empty, return default state
	if (filterEmptyScoreLabels.length === 0) {
		scoreLabels = state.form.scoreLabels;
	} else {
		scoreLabels = filterEmptyScoreLabels;
	}

	return produce(state, draftState => {
		draftState.form.items = items;
		draftState.form.scoreLabels = scoreLabels;
		setLocalStorage(draftState);
	});
};

export const calcResults = state => {
	const updatedScoreLabels = state.form.scoreLabels.map(scoreLabel => {
		const newScores = state.form.items
			.map(item => {
				const itemScores = item.scores
					.filter(score => score.label === scoreLabel.label)
					.map(score => {
						return Score(item.label, score.score);
					});

				return itemScores;
			})
			.flat();
		return {
			...scoreLabel,
			scores: newScores,
			average: average(newScores, 'score')
		};
	});

	return produce(state, draftState => {
		draftState.form.scoreLabels = updatedScoreLabels;
		draftState.form.overallAverage = average(updatedScoreLabels, 'average');
		setLocalStorage(draftState);
	});
};

export const setSort = (state, action) => {
	return produce(state, draftState => {
		draftState.form.sort = action.sort;
		setLocalStorage(draftState);
	});
};

export const updateMetaInfo = (state, action) => {
	return produce(state, draftState => {
		draftState.form[action.field] = action.value;
		setLocalStorage(draftState);
	});
};
