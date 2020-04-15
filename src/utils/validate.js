export const isMatch = match => ({ type: 'isMatch', match });
export const isRequired = () => ({ type: 'isRequired' });
export const isMinLength = min => ({ type: 'isMinLength', min });
export const isEmail = () => ({ type: 'isEmail' });
export const isUnique = (array, path) => ({ type: 'isUnique', array, path });

export const validate = (value, validators) => {
	let isValid = true;
	for (const validator of validators) {
		if (validator.type === 'isMatch') {
			isValid = isValid && value === validator.match;
		}
		if (validator.type === 'isRequired') {
			isValid = isValid && value.trim().length > 0;
		}
		if (validator.type === 'isMinLength') {
			isValid = isValid && value.length >= validator.min;
		}
		if (validator.type === 'isEmail') {
			isValid =
				isValid &&
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
		}
		if (validator.type === 'isUnique') {
			const match = validator.array.filter(
				item => item[validator.path] === value
			);

			isValid = isValid && match.length === 0;
		}
	}

	return isValid;
};
