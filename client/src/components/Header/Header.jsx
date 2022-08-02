import React from 'react'

function Header({user, logout}) {
  return (
	<div className='header'>
		<button onClick={logout}>Logout</button>
		<h3>
			Hello, {user && user.username}!
		</h3>
	</div>
  )
}

export default Header