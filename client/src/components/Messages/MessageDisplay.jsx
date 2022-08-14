import React, { useRef , useEffect } from 'react';
import "./message.css";

function MessageDisplay({messages, selected}) {

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	  }, [messages]);

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
			<div ref={messagesEndRef} />
		</div>
	)
}

export default MessageDisplay