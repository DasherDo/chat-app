import React, { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { contactRoute, createMessageRoute } from '../utils/apiRoutes';
import Contacts from '../components/Contacts/Contacts';
import MessageInput from '../components/Messages/MessageInput';
import MessageDisplay from '../components/Messages/MessageDisplay';

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
			setUser(JSON.parse(localStorage.getItem('user')));
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
    };

    const logout = () => {
      localStorage.removeItem('user');
    };

    const handleMessageSend = async (message) => {
		console.log(message, user._id, selected._id)
		try{
			const { data } = await axios.post(createMessageRoute, {
				body: message,
				sender: user._id,
				recipient: selected._id
			})
			console.log(data.status)
		}catch(err){
			console.log(err)
		}
    }

    return (
		<>
			<Link to='/login' onClick={() => logout}>Logout</Link>
			<div className='container'>
				<Contacts contacts={contacts} user={user} changeSelected={handleSelectedChange}/>
				<MessageDisplay />
				<MessageInput user={user} selected={selected} sendMessage={handleMessageSend}/>
			</div>
		</>
	)
       
}

export default Chat