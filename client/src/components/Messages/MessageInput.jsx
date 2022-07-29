import React, { useState } from 'react';
import {BiSend} from 'react-icons/bi';

function MessageInput({sendMessage}) {

	const [message, setMessage] = useState();

	return (
		<div>
			<form onSubmit={() => sendMessage(message)} className='message-input'>
				<input type="text" className='message-form' onChange={(e) => setMessage(e.target.value)}/>
				<button type="submit" className='send-message'><BiSend /></button>
			</form>
		</div>
	)
}

export default MessageInput