import React, { useState , useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import "./App.css"

function App() {

  
    return (
      <div>
        {/* {(typeof apiData.users === 'undefined') ? (<p>Loading . . .</p>)
        : (
          apiData.users.map((user, i) => (<div key={i}>{user}</div>))
        )} */}
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<Chat/>} />
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App