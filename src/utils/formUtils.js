import { rank } from './sort.js';

export const updateRanks = (array, sortDir) => {
	// Add ranks to each item in duplicate array
	const ranked = rank(array, sortDir, 'average');

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
