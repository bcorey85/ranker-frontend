const updateRanks = (updatedItems, state) => {
	let sorted;
	if (state.sort === 'desc') {
		sorted = [ ...updatedItems ].sort((a, b) => b.average - a.average);
	} else {
		sorted = [ ...updatedItems ].sort((a, b) => a.average - b.average);
	}
	const ranked = sorted.map((item, index) => {
		item.rank = index + 1;
		return item;
	});

	updatedItems.forEach(item => {
		const index = ranked.findIndex(rankedItem => rankedItem.id === item.id);
		item.rank = ranked[index].rank;
		return item;
	});

	return updatedItems;
};

export default updateRanks;
