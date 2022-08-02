import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { contactRoute, createMessageRoute, getMessageRoute } from '../utils/apiRoutes';
import Contacts from '../components/Contacts/Contacts';
import MessageInput from '../components/Messages/MessageInput';
import MessageDisplay from '../components/Messages/MessageDisplay';
import Header from '../components/Header/Header';

function Chat() {

    const [contacts, setContacts] = useState();
    const [user, setUser] = useState();
    const [selected, setSelected] = useState();
	const [messages, setMessages] = useState()

    const navigate = useNavigate();

    useEffect(() => {
		console.log(JSON.parse(localStorage.getItem('user')))
    	if(!localStorage.getItem('user')) {
        navigate('/login');
		}
		else {
			const userInfo = JSON.parse(localStorage.getItem('user'));
			console.log(userInfo)
			setUser(userInfo);
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

    const handleSelectedChange = async (selected) => {
		setSelected(selected)
		const { data } = await axios.post(getMessageRoute, {
			recipient: user._id,
			sender: selected._id
			})
		let selectedMessages = data.filter((item, index) => {
			return (item.sender === selected._id && item.recipient === user._id) || (item.recipient === selected._id && item.sender === user._id)
		})
		setMessages(selectedMessages)
    };

    const logout = () => {
      localStorage.removeItem('user');
	  navigate('/login')
    };

    const handleMessageSend = async (message) => {

		try{
			const { data } = await axios.post(createMessageRoute, {
				body: message,
				sender: user._id,
				recipient: selected._id
			})
			console.log(data.msg)
		}catch(ex){
			console.log(ex)
		}
    }

	// const getMessage = async () => {
	// 	const { data } = await axios.post(getMessageRoute, {
	// 		recipient: user._id
	// 	})
	// 	let selectedMessages = data.filter((item, index) => {
	// 		return item.sender === selected._id
	// 	})
	// 	setMessages(selectedMessages)
	// 	console.log(selectedMessages)
	// }

    return (
		<>
			<Header user={user} logout={logout}/>
			<div className='container'>
				<Contacts contacts={contacts} user={user} changeSelected={handleSelectedChange}/>
				<MessageDisplay messages={messages} selected={selected}/>
				<MessageInput user={user} selected={selected} sendMessage={handleMessageSend}/>
			</div>
		</>
	)
       
}

export default Chat