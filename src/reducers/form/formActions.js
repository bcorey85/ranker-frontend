import { v4 as uuidv4 } from 'uuid';
import produce from 'immer';

import {
	formSchema,
	scoreLabelSchema,
	scoreSchema,
	itemSchema
} from './formSchemas';

import {
	calcOverallAverage,
	calcScoreAverage,
	updateRanks
} from '../../utils/formUtils';

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

export const addItem = state => {
	const newItem = { ...itemSchema, id: uuidv4() };

	return produce(state, draftState => {
		draftState.form.items = [ ...state.form.items, newItem ];
	});
};

export const addScoreLabel = (state, action) => {
	const newScoreLabel = { ...scoreLabelSchema, id: uuidv4() };

	return produce(state, draftState => {
		draftState.form.scoreLabels = [
			...state.form.scoreLabels,
			newScoreLabel
		];
	});
};

export const updateItemLabel = (state, action) => {
	const updatedItemLabels = state.form.items.map(item => {
		if (item.id === action.id) {
			return {
				...item,
				label: action.value
			};
		}
		return item;
	});

	return produce(state, draftState => {
		draftState.form.items = updatedItemLabels;
	});
};

export const updateScoreLabel = (state, action) => {
	const updatedScoreLabels = state.form.scoreLabels.map(label => {
		if (label.id === action.id) {
			return {
				...label,
				label: action.value
			};
		}
		return label;
	});

	return produce(state, draftState => {
		draftState.form.scoreLabels = updatedScoreLabels;
	});
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
				average: calcScoreAverage(newScores)
			};
		}
		return item;
	});

	return produce(state, draftState => {
		draftState.form.items = updateRanks(updatedItems, state.form.sort);
	});
};

export const deleteItem = (state, action) => {
	const filteredItems = state.form.items.filter(
		item => item.id !== action.id
	);

	return produce(state, draftState => {
		draftState.form.items = filteredItems;
	});
};

export const deleteScoreLabel = (state, action) => {
	const filteredScoreLabels = state.form.scoreLabels.filter(
		item => item.id !== action.id
	);

	return produce(state, draftState => {
		draftState.form.scoreLabels = filteredScoreLabels;
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

export const calcLabelAverages = state => {
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
			average: calcScoreAverage(newScores)
		};
	});

	return produce(state, draftState => {
		draftState.form.scoreLabels = updatedScoreLabels;
		draftState.form.overallAverage = calcOverallAverage(updatedScoreLabels);
	});
};
