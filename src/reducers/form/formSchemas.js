export const formSchema = {
	items: [],
	scoreLabels: [],
	overallAverage: null,
	sort: 'desc'
};

export const scoreSchema = {
	id: '',
	label: '',
	score: ''
};

export const scoreLabelSchema = {
	id: '',
	label: '',
	scores: [],
	average: null
};

export const itemSchema = {
	id: '',
	label: '',
	scores: [],
	rank: null,
	average: null
};

export const fields = {
	item: {
		schema: itemSchema,
		stateLocation: 'items'
	},
	scoreLabel: {
		schema: scoreLabelSchema,
		stateLocation: 'scoreLabels'
	}
};
