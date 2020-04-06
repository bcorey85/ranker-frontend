export const calcAverage = (array, unit) => {
	const sum = array.reduce((acc, cur) => {
		if (cur[unit] !== '' && !isNaN(cur[unit])) {
			return acc + parseFloat(cur[unit]);
		} else {
			return acc + 0;
		}
	}, 0);
	return sum / array.length;
};

export const updateRanks = (array, sort) => {
	// Sort duplicate array to prevent UI jumping
	const sorted = sortScores(array, sort, 'average');

	// Add ranks to each item in duplicate array
	const ranked = sorted.map((item, index) => {
		return { ...item, rank: index + 1 };
	});

	// Add ranks to original array to prevent UI jumping
	const updatedRanks = array.map(item => {
		const index = ranked.findIndex(rankedItem => rankedItem.id === item.id);
		return {
			...item,
			rank: ranked[index].rank
		};
	});

	return updatedRanks;
};

// Sort scores for UI only, do not modify formState sort to prevent UI jumping on previous pages
export const sortScores = (array, sort, unit) => {
	let sorted;
	if (sort === 'desc') {
		sorted = [ ...array ].sort((a, b) => b[unit] - a[unit]);
	} else {
		sorted = [ ...array ].sort((a, b) => a[unit] - b[unit]);
	}

	return sorted;
};
