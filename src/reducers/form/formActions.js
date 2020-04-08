import { v4 as uuidv4 } from 'uuid';
import produce from 'immer';

import {
	formSchema,
	scoreLabelSchema,
	scoreSchema,
	itemSchema,
	fields
} from './formSchemas';
import { calcAverage, updateRanks } from '../../utils/formUtils';

export const createForm = (state, action) => {
	const newForm = { ...formSchema };

	for (let i = 0; i < action.newForm.numItems; i++) {
		newForm.items.push({ ...itemSchema, id: uuidv4() });
	}

	for (let i = 0; i < action.newForm.numScoreLabels; i++) {
		newForm.scoreLabels.push({ ...scoreLabelSchema, id: uuidv4() });
	}

	newForm.sort = action.newForm.sort;

	return produce(state, draftState => {
		draftState.form = newForm;
	});
};

export const addField = (state, action) => {
	if (fields[action.field]) {
		const newField = { ...fields[action.field].schema, id: uuidv4() };
		const stateLocation = fields[action.field].stateLocation;

		return produce(state, draftState => {
			draftState.form[stateLocation] = [
				...state.form[stateLocation],
				newField
			];
		});
	} else {
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
		});
	} else {
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
		});
	} else {
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
				average: calcAverage(newScores, 'score')
			};
		}
		return item;
	});

	return produce(state, draftState => {
		draftState.form.items = updateRanks(updatedItems, state.form.sort);
	});
};

export const mapScores = state => {
	const mappedItems = state.form.items.map(item => {
		// If score exists on item already, return item, if not create a new score
		const scores = state.form.scoreLabels.map(label => {
			const existingScore = item.scores.findIndex(
				score => score.label === label.label
			);
			if (existingScore >= 0) {
				return item.scores[existingScore];
			} else {
				return { ...scoreSchema, id: uuidv4(), label: label.label };
			}
		});

		return { ...item, scores };
	});

	return produce(state, draftState => {
		draftState.form.items = mappedItems;
	});
};

export const calcResults = state => {
	const updatedScoreLabels = state.form.scoreLabels.map(scoreLabel => {
		const newScores = state.form.items
			.map(item => {
				const itemScores = item.scores
					.filter(score => score.label === scoreLabel.label)
					.map(score => {
						return {
							...scoreSchema,
							id: uuidv4(),
							score: score.score,
							label: item.label
						};
					});

				return itemScores;
			})
			.flat();
		return {
			...scoreLabel,
			scores: newScores,
			average: calcAverage(newScores, 'score')
		};
	});

	return produce(state, draftState => {
		draftState.form.scoreLabels = updatedScoreLabels;
		draftState.form.overallAverage = calcAverage(
			updatedScoreLabels,
			'average'
		);
	});
};

export const setSort = (state, action) => {
	return produce(state, draftState => {
		draftState.form.sort = action.sort;
	});
};
