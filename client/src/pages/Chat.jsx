import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Window from '../components/Text/Window';

function Chat() {

  const logout = () => {
    localStorage.removeItem('user');
    
  };

  return (
    <div>
      <Link to='/login' onClick={() => logout()}>Logout</Link>
        <Window />
    </div>
  )
}

export default Chat