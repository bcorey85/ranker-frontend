import { v4 as uuidv4 } from 'uuid';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_CATEGORY':
			return {
				...state,
				category: action.value
			};
		case 'ADD_ITEM':
			return {
				...state,
				items: [
					...state.items,
					{
						id: uuidv4(),
						label: '',
						scores: [],
						average: null,
						rank: null
					}
				]
			};
		case 'ADD_SCORE':
			return {
				...state,
				scoreLabels: [
					...state.scoreLabels,
					{ id: uuidv4(), label: '', average: null }
				]
			};
		case 'UPDATE_ITEM_LABEL':
			const updatedItemLabels = state.items.map(item => {
				if (item.id === action.id) {
					return { ...item, label: action.value };
				}
				return item;
			});
			return { ...state, items: updatedItemLabels };
		case 'UPDATE_SCORE_LABEL':
			const updatedScoreLables = state.scoreLabels.map(item => {
				if (item.id === action.id) {
					return { ...item, label: action.value };
				}
				return item;
			});

			return { ...state, scoreLabels: updatedScoreLables };
		case 'UPDATE_ITEM_SCORE':
			const updatedItems = state.items.map(item => {
				if (item.id === action.itemId) {
					const newScores = item.scores.map(score => {
						if (score.id === action.scoreId) {
							const newScore = {
								...score,
								score: action.value
							};
							return newScore;
						}
						return score;
					});

					const scoreSum = newScores
						.filter(score => {
							if (score.score !== '' && !isNaN(score.score)) {
								return score;
							}
							return false;
						})
						.reduce((acc, cur) => {
							return acc + parseFloat(cur.score);
						}, 0);

					return {
						...item,
						scores: newScores,
						average: scoreSum / newScores.length
					};
				}
				return item;
			});

			return { ...state, items: updatedItems };
		case 'DELETE_ITEM':
			const filteredItems = state.items.filter(
				item => item.id !== action.id
			);
			return { ...state, items: filteredItems };
		case 'DELETE_SCORE':
			const filteredScores = state.scoreLabels.filter(
				item => item.id !== action.id
			);
			return { ...state, scoreLabels: filteredScores };
		case 'MAP_SCORES':
			const mappedItems = state.items.map(item => {
				const scoreObjects = state.scoreLabels.map(label => {
					const existingScore = item.scores.findIndex(
						score => score.label === label.label
					);
					if (existingScore >= 0) {
						return item.scores[existingScore];
					} else {
						console.log(label);

						return {
							id: label.id,
							label: label.label,
							score: ''
						};
					}
				});

				return { ...item, scores: [ ...scoreObjects ] };
			});

			return { ...state, items: mappedItems };
		case 'CALC_LABEL_AVERAGES':
			const updatedLabels = state.scoreLabels.map(label => {
				const labelScores = state.items
					.map(item => {
						const itemScores = item.scores.filter(
							score => score.label === label.label
						);
						return itemScores;
					})
					.flat();

				const sum = labelScores.reduce((acc, cur) => {
					return acc + parseFloat(cur.score);
				}, 0);

				label.average = sum / labelScores.length;
				return label;
			});

			const overallAverage =
				state.items.reduce((acc, cur) => {
					return acc + cur.average;
				}, 0) / state.items.length;

			return { ...state, scoreLabels: updatedLabels, overallAverage };
		default: {
			return state;
		}
	}
};

export default formReducer;
