import { useEffect } from 'react';

const useScrollToTop = args => {
	useEffect(
		() => {
			window.scrollTo(0, 0);
		},
		[ args ]
	);
};

export default useScrollToTop;
