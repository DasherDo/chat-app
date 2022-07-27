import React , { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/apiRoutes';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        'username' : '',
        'password' : '',
    })

    const toastStyle = {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    useEffect(() => {
      if (localStorage.getItem('user')) {
        navigate('/')
      }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(handleValidation()){
            const { username , password} = userInfo;
            const { data } = await axios.post(loginRoute, {
                username , password
            });
            if (data.status === false){
                toast.error(data.msg, toastStyle )
            };
            if (data.status === true){
                console.log('Login successful')
                localStorage.setItem('user', JSON.stringify(data.user.username));
                navigate('/')
            }
        }
    }

    const handleValidation = () => {
        const { username , password } = userInfo
        if (password === '') {
            toast.error('Enter Password.', toastStyle);
            return false;
        }
        if (username.length === '') {
            toast.error('Enter Username', toastStyle)
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
                <button>Submit</button>
                <Link to='/register'>Register</Link>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login