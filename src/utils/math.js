export const sum = (array, unit) => {
	return array.reduce((acc, cur) => {
		if (cur[unit] !== '' && !isNaN(cur[unit])) {
			return acc + parseFloat(cur[unit]);
		} else {
			return acc + 0;
		}
	}, 0);
};

export const average = (array, unit) => {
	return sum(array, unit) / array.length;
};
