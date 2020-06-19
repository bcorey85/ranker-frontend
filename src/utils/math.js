export const sum = (array, unit) => {
	return array.reduce((acc, cur) => {
		const parsed = parseFloat(cur[unit]);
		if (cur[unit] !== '' && !isNaN(parsed)) {
			return acc + parsed;
		} else {
			return acc + 0;
		}
	}, 0);
};

export const average = (array, unit) => {
	const average = sum(array, unit) / array.length;
	if (isNaN(average)) {
		return null;
	}
	return sum(array, unit) / array.length;
};

export const weightedScore = (weight, score) => {
	const parsedWeightFactor = parseFloat(weight);
	const parsedScore = parseFloat(score);

	if (isNaN(parsedWeightFactor) || isNaN(parsedScore)) {
		return null;
	}
	const weightedScore = parsedWeightFactor * parsedScore;

	return weightedScore;
};

export const weightedAverage = (
	array,
	scoreUnit = 'weightedScore',
	weightUnit = 'weight'
) => {
	const weightedScores = array.filter(score => {
		if (score === undefined || score === null) {
			return null;
		}

		if (!isNaN(parseFloat(score[scoreUnit]))) {
			return score;
		}

		return null;
	});

	const weightFactorSum = sum(weightedScores, weightUnit);
	const weightScoreSum = sum(weightedScores, scoreUnit);
	const weightedAverage = weightScoreSum / weightFactorSum;

	if (isNaN(weightedAverage)) {
		return null;
	}

	return weightedAverage;
};

export const checkValidNumber = num => {
	let value;
	if (num === '') {
		return (value = null);
	}

	value = parseFloat(num);

	if (isNaN(value)) {
		return;
	}

	return value;
};
