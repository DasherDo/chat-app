import React , { useState , useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { route } from '../utils/apiRoutes';
import axios from 'axios';

function Register() {

    const [userInfo, setUserInfo] = useState({
        'username' : '',
        'password' : '',
        'confirmedPassword' : ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(handleValidation()){
            const { username , password , confirmedPassword } = userInfo;
            const { data } = await axios.post(route, {
                username, password
            });
        }
    }

    const handleValidation = () => {
        const { username , password , confirmedPassword } = userInfo
        if (password !== confirmedPassword) {
            toast.error('The passwords do not match.', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return false;
        }

        return true;
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
                <button>Submit</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register