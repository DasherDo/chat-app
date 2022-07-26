import React, { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Window from '../components/Text/Window';
import axios from 'axios';
import { contactRoute } from '../utils/apiRoutes';
import Contacts from '../components/Contacts/Contacts';

function Chat() {

	const [contacts, setContacts] = useState();
    const [user, setUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('user')) {
        navigate('/login');
      }
      else {
        setUser(localStorage.getItem('user')
        )
      }
    }, [navigate]);

	useEffect(() => {
		if(user) {
			axios.get(`${contactRoute}/${user._id}`)
				.then((data) => {
					setContacts(data.data);
				})
		}
	}, [user])

    const logout = () => {
      localStorage.removeItem('user');
    };

    return (
      <div>
        <Link to='/login' onClick={() => logout()}>Logout</Link>
			<Contacts />
    		<Window />
      </div>
    )
}

export default Chat