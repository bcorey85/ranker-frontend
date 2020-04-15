export const isEmail = value => {
	return /^\S+@\S+\.\S+$/.test(value);
};

export const isRequired = value => {
	if (value === null || value === undefined) {
		return false;
	}
	return value.trim().length > 0;
};

export const isMatch = (value, match) => {
	return value === match;
};
