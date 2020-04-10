export const sort = (array, sortDir, unit) => {
	let sorted;
	if (sortDir === 'desc') {
		sorted = [ ...array ].sort((a, b) => b[unit] - a[unit]);
	} else if (sortDir === 'asc') {
		sorted = [ ...array ].sort((a, b) => a[unit] - b[unit]);
	} else {
		return array;
	}

	return sorted;
};

export const rank = (array, sortDir, unit) => {
	const sorted = sort(array, sortDir, unit);

	return sorted.map((item, index) => {
		return { ...item, rank: index + 1 };
	});
};
