import { v4 as uuidv4 } from 'uuid';
import { weightedScore } from '../../utils/math';

export const Form = (
	numItems = 3,
	numScoreLabels = 3,
	sort = 'desc',
	weightedAverage = false
) => {
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
		overallWeightedAverage: null,
		options: {
			sort,
			weightedAverage
		},
		sort
	};
};

export const Score = (label = '', score = null, weight = null) => {
	return {
		id: uuidv4(),
		label,
		score,
		weight,
		weightedScore: weightedScore(weight, score)
	};
};

export const ScoreLabel = (label = '') => {
	return {
		id: uuidv4(),
		label,
		scores: [],
		weight: null,
		average: null
	};
};

export const Item = (label = '') => {
	return {
		id: uuidv4(),
		label,
		scores: [],
		rank: null,
		average: null,
		weightedAverage: null
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
