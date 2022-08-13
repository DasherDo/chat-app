import React from 'react';
import "./message.css";

function MessageDisplay({messages, selected}) {
	
	return (
		<div className='display'>
			{messages && messages.map((item, id) => {
				if (item.sender === selected._id) {
					return (
						<div className='message from' key={id}>{item.body}</div>
					)
				}
				else {
					return (
						<div className='message to' key={id}>{item.body}</div>
					)
				}
			})}
		</div>
	)
}

export default MessageDisplay