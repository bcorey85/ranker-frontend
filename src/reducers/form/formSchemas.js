import { v4 as uuidv4 } from 'uuid';

export const Form = (numItems = 3, numScoreLabels = 3, sort = 'desc') => {
	const items = [];
	const scoreLabels = [];

	for (let i = 0; i < numItems; i++) {
		items.push(Item());
	}

	for (let i = 0; i < numScoreLabels; i++) {
		scoreLabels.push(ScoreLabel());
	}

	return {
		date: '',
		title: '',
		category: '',
		items,
		scoreLabels,
		overallAverage: null,
		sort
	};
};

export const Score = (label = '', score = '') => {
	return {
		id: uuidv4(),
		label,
		score
	};
};

export const ScoreLabel = (label = '') => {
	return {
		id: uuidv4(),
		label,
		scores: [],
		average: null
	};
};

export const Item = (label = '') => {
	return {
		id: uuidv4(),
		label,
		scores: [],
		rank: null,
		average: null
	};
};

export const fields = {
	item: {
		schema: Item,
		stateLocation: 'items'
	},
	scoreLabel: {
		schema: ScoreLabel,
		stateLocation: 'scoreLabels'
	}
};
