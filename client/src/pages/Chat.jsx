import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
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
	const [messages, setMessages] = useState([]);
	const socket = io.connect("http://localhost:5000");

    const navigate = useNavigate();

	useEffect(() => {
		socket.on("receive-msg", (data) => {
			const msg = [...messages]
			msg.push(data)
			setMessages((prev) => [...prev, msg])
		})}, [messages, socket]);

	//Checks to see if user is logged in, redirects to login page if not
    useEffect(() => {
    	if(!localStorage.getItem('user')) {
        navigate('/login');
		}
		else {
			const userInfo = JSON.parse(localStorage.getItem('user'));
			setUser(userInfo);
		}
    }, [navigate]);

	// Gets contact list for logged in user
    useEffect(() => {
      if(user) {
        axios.get(`${contactRoute}/${user._id}`)
          .then((data) => {
            setContacts(data.data);
          })
      }
    }, [user])


	//Shows different chats depending on selected contact
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
			socket.emit("send-msg", {
				body: message,
				sender: user._id,
				recipient: selected._id
			})
			console.log(data.msg)
		}catch(ex){
			console.log(ex)
		}
    }

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