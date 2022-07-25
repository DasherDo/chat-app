import React , { useState , useEffect } from 'react'

function Register() {

    const [userInfo, setUserInfo] = useState({
        'username' : '',
        'password' : '',
        'confirmedPassword' : ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]:e.target.value })
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type='text' placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
                <input type='text' placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                <input type='text' placeholder='Confirm Password' name='confirmedPassword' onChange={(e) => handleChange(e)} />
                <button></button>
            </form>
        </div>
    )
}

export default Register