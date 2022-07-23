import React, { useState , useEffect } from 'react'

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

    console.log(apiData)

    return (
      <div>
        {(typeof apiData.users === 'undefined') ? (<p>Loading . . .</p>)
        : (
          apiData.users.map((user, i) => (<div key={i}>{user}</div>))
        )}
      </div>
    )
}

export default App