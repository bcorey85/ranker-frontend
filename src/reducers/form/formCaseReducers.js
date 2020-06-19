import produce from 'immer';

import { Form, Score, fields } from './formSchemas';
import { updateRanks } from '../../utils/formUtils';
import {
	average,
	weightedScore,
	weightedAverage,
	checkValidNumber
} from '../../utils/math';
import { updateObject, updateItemInArray } from '../../utils/updateObject';

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

		const updatedFields = updateItemInArray(
			state.form[stateLocation],
			action.id,
			field => {
				return updateObject(field, { label: action.value });
			}
		);

		return produce(state, draftState => {
			draftState.form[stateLocation] = updatedFields;
			setLocalStorage(draftState);
		});
	} else {
		setLocalStorage(state);
		return state;
	}
};

export const updateWeightedAverage = (state, action) => {
	const weight = checkValidNumber(action.value);

	if (!weight) {
		return state;
	}

	// Update weight
	const scoreLabelId = action.id;
	const scoreLabelString = state.form.scoreLabels.find(
		label => label.id === scoreLabelId
	).label;

	const updatedLabels = updateItemInArray(
		state.form.scoreLabels,
		scoreLabelId,
		label => {
			return updateObject(label, { weight });
		}
	);

	// Update child scores
	const updatedItems = state.form.items.map(item => {
		if (item.scores.length > 0) {
			const updatedScores = updateItemInArray(
				item.scores,
				scoreLabelString,
				score => {
					return updateObject(score, {
						weight,
						weightedScore: weightedScore(weight, score.score)
					});
				}
			);

			return updateObject(item, {
				scores: updatedScores,
				weightedAverage: weightedAverage(updatedScores, 'weightedScore')
			});
		}
		return item;
	});

	return produce(state, draftState => {
		draftState.form.scoreLabels = updatedLabels;
		draftState.form.items = updatedItems;
		setLocalStorage(draftState);
	});
};

export const deleteField = (state, action) => {
	if (fields[action.field]) {
		const stateLocation = fields[action.field].stateLocation;
		const filteredFields = state.form[stateLocation].filter(
			field => field.id !== action.id
		);

		// Remove child scores from items after score label delete
		if (action.field === 'scoreLabel') {
			const label = state.form.scoreLabels.find(
				label => label.id === action.id
			).label;

			const updatedItems = state.form.items.map(item => {
				const updatedScores = item.scores.filter(
					score => score.label !== label
				);

				return updateObject(item, { scores: updatedScores });
			});

			return produce(state, draftState => {
				draftState.form[stateLocation] = filteredFields;
				draftState.form.items = updatedItems;
				setLocalStorage(draftState);
			});
		}

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
	const updatedItems = updateItemInArray(
		state.form.items,
		action.itemId,
		item => {
			const newScores = updateItemInArray(
				item.scores,
				action.scoreId,
				score => {
					return updateObject(score, {
						score: action.value,
						weightedScore: weightedScore(score.weight, action.value)
					});
				}
			);

			return updateObject(item, {
				scores: newScores,
				average: average(newScores, 'score'),
				weightedAverage: weightedAverage(newScores, 'weightedScore')
			});
		}
	);

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
		// Fix lingering average bug
		const updatedItems = state.form.items.map(item => {
			return {
				...item,
				average: average(item.scores, 'score'),
				weightedAverage: weightedAverage(item.scores, 'weightedScore')
			};
		});

		items = updatedItems;
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
					return Score(label.label, null, label.weight);
				}
			});

			return {
				...item,
				scores,
				average: average(item.scores, 'score'),
				weightedAverage: weightedAverage(item.scores, 'weightedScore')
			};
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
						return Score(
							item.label,
							score.score,
							scoreLabel.weight
						);
					});

				return itemScores;
			})
			.reduce((acc, val) => acc.concat(val), []);
		return {
			...scoreLabel,
			scores: newScores,
			average: average(newScores, 'score')
		};
	});

	return produce(state, draftState => {
		draftState.form.scoreLabels = updatedScoreLabels;
		draftState.form.overallAverage = average(state.form.items, 'average');
		draftState.form.overallWeightedAverage = average(
			state.form.items,
			'weightedAverage'
		);
		setLocalStorage(draftState);
	});
};

export const setOption = (state, action) => {
	return produce(state, draftState => {
		draftState.form.options[action.option] = action.value;
		setLocalStorage(draftState);
	});
};

export const updateMetaInfo = (state, action) => {
	return produce(state, draftState => {
		draftState.form[action.field] = action.value;
		setLocalStorage(draftState);
	});
};
