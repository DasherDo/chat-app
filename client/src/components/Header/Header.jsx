import React from 'react';

function Header({ user, logout }) {
	return (
		<div className='header'>
			<button onClick={logout} className='logout'>
				Logout
			</button>
			<h1>Hello, {user && user.username}!</h1>
		</div>
	);
}

export default Header;
