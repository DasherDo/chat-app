import React , { useState , useEffect } from 'react'
import './text.css';

function Text() {

    const [text, setText] = useState([{}]);

    const [user, setUser] = useState({_id : 'josh'})

    useEffect(() => {
        fetch(`/text/josh`)
            .then(
                response => response.json()
            ).then (
                data => setText(data)
            )
    }, [])

    return (
        <div>
            {(typeof text['body'] === 'undefined') ? (<div>Loading . . .</div>) : 
            (<div>{text['body']}</div>)}
        </div>
    )
}

export default Text