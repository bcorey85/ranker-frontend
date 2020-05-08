const checkEmptyForm = form => {
	const emptyItems = form.items.every(item => item.label === '');
	const emptyScoreLabels = form.scoreLabels.every(
		label => label.label === ''
	);

	return {
		empty: emptyItems && emptyScoreLabels,
		itemsEmpty: emptyItems,
		scoreLabelsEmpty: emptyScoreLabels
	};
};

export default checkEmptyForm;
