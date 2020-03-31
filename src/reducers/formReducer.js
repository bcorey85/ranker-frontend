import { Item, ScoreLabel } from '../classes/FormClasses';
import updateRanks from '../utils/updateRanks';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM':
			return {
				...state,
				items: [ ...state.items, new Item('') ]
			};
		case 'ADD_SCORE':
			return {
				...state,
				scoreLabels: [ ...state.scoreLabels, new ScoreLabel('') ]
			};
		case 'UPDATE_ITEM_LABEL':
			const updatedItemLabels = state.items.map(item => {
				if (item.id === action.id) {
					item.label = action.value;
					return item;
				}
				return item;
			});
			return { ...state, items: updatedItemLabels };
		case 'UPDATE_SCORE_LABEL':
			const updatedScoreLabels = state.scoreLabels.map(label => {
				if (label.id === action.id) {
					label.label = action.value;
					return label;
				}
				return label;
			});

			return { ...state, scoreLabels: updatedScoreLabels };
		case 'UPDATE_ITEM_SCORE':
			const updatedItems = state.items.map(item => {
				if (item.id === action.itemId) {
					item.updateScore(action);
				}
				return item;
			});

			const updatedAndRanked = updateRanks(updatedItems, state);

			return { ...state, items: updatedAndRanked };
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
				return item.mapScores(state);
			});

			return { ...state, items: mappedItems };
		case 'CALC_LABEL_AVERAGES':
			const updatedLabels = state.scoreLabels.map(label => {
				label.scores = label.updateLabelScores(state);
				label.average = label.calcAverage();
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
