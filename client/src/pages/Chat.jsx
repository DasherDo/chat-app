import React, { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { contactRoute } from '../utils/apiRoutes';
import Contacts from '../components/Contacts/Contacts';

function Chat() {

	const [contacts, setContacts] = useState();
    const [user, setUser] = useState();
	const [selected, setSelected] = useState();

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

	const handleSelectedChange = (selected) => {
		setSelected(selected)
	}

    const logout = () => {
      localStorage.removeItem('user');
    };

    return (
      <div className='contact-container'>
        <Link to='/login' onClick={() => logout()}>Logout</Link>
			<Contacts contacts={contacts} user={user} changeSelected={handleSelectedChange}/>
			
      </div>
    )
}

export default Chat