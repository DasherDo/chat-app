import React, { useState } from 'react';

export default function Form () {

    const [message, setMessage] = useState({'subject' : '' , 'body' : '' , 'recipient' : ''});

    const handleChange = (e) => {
        const {name, value} = e.target
        setMessage((message) => ({
            ...message,
            [name] : value
        }));
    }


    const handleTextSend = (subject, body, recipient) => {
        console.log(`Message Sent: ${subject}, ${body}, ${recipient}`)
    }


    return (
        <div>
            <form>

                <input name='subject' placeholder='Subject . . .' value={message['subject']} onChange={(e) => (handleChange(e))} />
                <input name='body' placeholder='' value={message['body']} onChange={(e) => handleChange(e)}/>
                <button type='submit' onClick={handleTextSend(message['subject'], message['body'], message['recipient'])}/>
            </form>
            
        </div>
    )
}