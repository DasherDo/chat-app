import React , { useState } from 'react';

export default function Contacts({contacts, user, changeSelected}) {

	const [username, setUsername] = useState();

	const [currentView, setCurrentView] = useState()

	const handleContactClick = (contact) => {
		setCurrentView(contact._id)
		changeSelected(contact)
	}

	return (
	<div className='contacts'>
		{user && contacts && (contacts.map((contact, id) => {
			return (
			<div className={currentView === contact._id ? 'contact active' : 'contact'} key={id} onClick={() => handleContactClick(contact)}>
				{contact.username}
			</div>
			)
		}))}
	</div>
	)
}
