import { v4 as uuidv4 } from 'uuid';

export class Item {
	constructor(label) {
		this.id = uuidv4();
		this.label = label;
		this.scores = [];
		this.average = null;
		this.rank = null;
	}

	updateScore(action) {
		const index = this.scores.findIndex(
			score => score.id === action.scoreId
		);
		this.scores[index].score = action.value;
		this.average = this.calcAverage();
		return this;
	}

	mapScores(form) {
		const scores = form.scoreLabels.map(label => {
			const existingScore = this.scores.findIndex(
				score => score.label === label.label
			);
			if (existingScore >= 0) {
				return this.scores[existingScore];
			} else {
				return new Score('', label.label);
			}
		});

		this.scores = [ ...scores ];
		this.average = this.calcAverage();
		return this;
	}

	calcAverage() {
		const sum = this.scores
			.filter(score => {
				if (score.score !== '' && !isNaN(score.score)) {
					return score;
				}
				return false;
			})
			.reduce((acc, cur) => {
				return acc + parseFloat(cur.score);
			}, 0);
		return sum / this.scores.length;
	}
}

export class ScoreLabel {
	constructor(label) {
		this.id = uuidv4();
		this.label = label;
		this.scores = [];
		this.average = null;
	}

	updateLabelScores(form) {
		const labelScores = form.items
			.map(item => {
				const itemScores = item.scores
					.filter(score => score.label === this.label)
					.map(score => {
						return new Score(score.score, item.label);
					});

				return itemScores;
			})
			.flat();
		return labelScores;
	}

	calcAverage() {
		const sum = this.scores.reduce((acc, cur) => {
			if (cur.score !== '') {
				return acc + parseFloat(cur.score);
			} else {
				return acc + 0;
			}
		}, 0);
		return sum / this.scores.length;
	}
}

export class Score {
	constructor(score, label) {
		this.id = uuidv4();
		this.label = label;
		this.score = score;
	}
}

export class RankForm {
	constructor() {
		this.items = [ new Item(''), new Item(''), new Item('') ];
		this.scoreLabels = [
			new ScoreLabel(''),
			new ScoreLabel(''),
			new ScoreLabel('')
		];
		this.overallAverage = null;
		this.sort = 'desc';
	}

	addItem() {
		return [ ...this.items, new Item('') ];
	}

	updateItemLabel(action) {
		const updatedItemLabels = this.items.map(item => {
			if (item.id === action.id) {
				item.label = action.value;
				return item;
			}
			return item;
		});
		return updatedItemLabels;
	}

	updateItemScore(action) {
		const updatedItems = this.items.map(item => {
			if (item.id === action.itemId) {
				item.updateScore(action);
			}
			return item;
		});
		return updatedItems;
	}

	deleteItem(action) {
		const filteredItems = this.items.filter(item => item.id !== action.id);
		return filteredItems;
	}

	addScoreLabel() {
		return [ ...this.scoreLabels, new ScoreLabel('') ];
	}

	updateScoreLabel(action) {
		const updatedScoreLabels = this.scoreLabels.map(label => {
			if (label.id === action.id) {
				label.label = action.value;
				return label;
			}
			return label;
		});
		return updatedScoreLabels;
	}

	deleteScoreLabel(action) {
		const filteredScores = this.scoreLabels.filter(
			item => item.id !== action.id
		);
		return filteredScores;
	}

	updateScoreLabels() {
		return this.scoreLabels.map(label => {
			label.scores = label.updateLabelScores(this);
			label.average = label.calcAverage();
			return label;
		});
	}

	mapScores() {
		const mappedItems = this.items.map(item => {
			return item.mapScores(this);
		});
		return mappedItems;
	}

	updateRanks(updatedItems) {
		let sorted;
		if (this.sort === 'desc') {
			sorted = [ ...updatedItems ].sort((a, b) => b.average - a.average);
		} else {
			sorted = [ ...updatedItems ].sort((a, b) => a.average - b.average);
		}
		const ranked = sorted.map((item, index) => {
			item.rank = index + 1;
			return item;
		});

		updatedItems.forEach(item => {
			const index = ranked.findIndex(
				rankedItem => rankedItem.id === item.id
			);
			item.rank = ranked[index].rank;
			return item;
		});

		return updatedItems;
	}

	calcOverallAverage() {
		const sum = this.items.reduce((acc, cur) => {
			return acc + cur.average;
		}, 0);
		return sum / this.items.length;
	}
}
