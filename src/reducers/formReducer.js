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
				items: [ ...state.items, { id: uuidv4(), label: '' } ]
			};
		case 'ADD_SCORE':
			return {
				...state,
				scores: [
					...state.scores,
					{ id: uuidv4(), label: '', value: '' }
				]
			};
		case 'UPDATE_ITEM':
			const updatedItems = state.items.map(item => {
				if (item.id === action.id) {
					return { ...item, label: action.value };
				}
				return item;
			});

			return { ...state, items: updatedItems };
		case 'UPDATE_SCORE':
			const updatedScores = state.scores.map(item => {
				if (item.id === action.id) {
					return { ...item, label: action.value };
				}
				return item;
			});

			return { ...state, scores: updatedScores };
		case 'DELETE_ITEM':
			const filteredItems = state.items.filter(
				item => item.id !== action.id
			);
			return { ...state, items: filteredItems };
		case 'DELETE_SCORE':
			const filteredScores = state.scores.filter(
				item => item.id !== action.id
			);
			return { ...state, scores: filteredScores };
		case 'MAP_SCORES':
			const mappedItems = state.items.map(item => {
				return (item.scores = [ ...state.scores ]);
			});
		default: {
			return state;
		}
	}
};

export default formReducer;
