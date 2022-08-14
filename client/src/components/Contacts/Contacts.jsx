import React , { useState } from 'react';

export default function Contacts({contacts, user, changeSelected}) {

	const [currentView, setCurrentView] = useState()

	const handleContactClick = (contact) => {
		setCurrentView(contact._id)
		changeSelected(contact)
	}

	return (
	<div className='contacts'>
		{user && contacts && (contacts.map((contact, id) => {
			if (user._id === contact._id) {
				return <div key={id}></div>
			}
			else{
				return (
				<div className={currentView === contact._id ? 'contact active' : 'contact'} key={id} onClick={() => handleContactClick(contact)}>
					{contact.username}
				</div>
				)
			}
		}))}
	</div>
	)
}
