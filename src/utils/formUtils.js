import { rank } from './sort.js';

export const updateRanks = (array, sortDir) => {
	let unit;
	if (array[0].weightedAverage) {
		unit = 'weightedAverage';
	} else {
		unit = 'average';
	}

	// Add ranks to each item in duplicate array
	const ranked = rank(array, sortDir, unit);

	// Add ranks to original array to prevent UI jumping
	const updatedRanks = array.map(item => {
		const index = ranked.findIndex(rankedItem => rankedItem.id === item.id);
		return {
			...item,
			rank: ranked[index].rank
		};
	});

	console.log(updatedRanks);
	return updatedRanks;
};
