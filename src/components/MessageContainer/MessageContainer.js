import React, { useEffect } from 'react';

import useMessage from './useMessage';

import './MessageContainer.scss';
const MessageContainer = ({ description, type, duration }) => {
	const [ message, setMessage, clearMessage ] = useMessage(
		description,
		type,
		duration
	);

	useEffect(
		() => {
			setMessage({
				description,
				type
			});

			if (duration) {
				clearMessage();
			}
		},
		[ description, type, duration, setMessage, clearMessage ]
	);

	let text;
	if (Array.isArray(message.description)) {
		text = message.description.map(message => {
			return <div key={message}>{message}</div>;
		});
	} else {
		text = message.description;
	}

	return (
		<div className={`message-container message-container--${message.type}`}>
			{text}
		</div>
	);
};

export default MessageContainer;
