import React from 'react';

function MessageDisplay({messages, selected}) {



	return (
		<div className='display'>
			{messages && messages.map((item) => (<div>{item.body}</div>))}
		</div>
	)
}

export default MessageDisplay