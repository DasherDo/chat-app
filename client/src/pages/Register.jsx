import React , { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/apiRoutes';
import axios from 'axios';

function Register() {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        'username' : '',
        'password' : '',
        'confirmedPassword' : ''
    })

    const toastStyle = {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(handleValidation()){
            const { username , password } = userInfo;
            const { data } = await axios.post(registerRoute, {
                username, password
            });
            if (data.status === false){
                toast.error(data.msg, toastStyle )
            };
            if (data.status === true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate('/')
            }
        }
    }

    const handleValidation = () => {
        const { username , password , confirmedPassword } = userInfo
        if (password !== confirmedPassword) {
            toast.error('The passwords do not match.', toastStyle);
            return false;
        }
        if (username.length < 3) {
            toast.error('Username must be longer than 3 characters', toastStyle)
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
                <Link to='/login'>Login</Link>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register