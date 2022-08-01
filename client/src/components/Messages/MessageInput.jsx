import React, { useState } from 'react';
import {BiSend} from 'react-icons/bi';

function MessageInput({sendMessage}) {

	const [message, setMessage] = useState();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		sendMessage(message)
		setMessage('')
	}

	return (
		<div>
			<form onSubmit={(e) => handleFormSubmit(e)} className='message-input'>
				<input type="text" className='message-form' value={message} onChange={(e) => setMessage(e.target.value)}/>
				<button type="submit" className='send-message'><BiSend /></button>
			</form>
		</div>
	)
}

export default MessageInput