import React, { useState , useEffect } from 'react'
import Window from './components/Text/Window';
import Form from './components/Form/Form';

function App() {

    const [apiData , setApiData] = useState([{}]);

    useEffect(() => {
      fetch('/api').then(
        response => response.json()
      ).then(
        data => {
          setApiData(data)
        }
      )
    }, []);

    return (
      <div>
        {/* {(typeof apiData.users === 'undefined') ? (<p>Loading . . .</p>)
        : (
          apiData.users.map((user, i) => (<div key={i}>{user}</div>))
        )} */}
        <Window />
        <Form />
      </div>
    )
}

export default App