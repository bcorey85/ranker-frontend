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

	mapScores(state) {
		const scores = state.scoreLabels.map(label => {
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

	updateLabelScores(state) {
		const labelScores = state.items
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
}
