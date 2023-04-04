import React from 'react';
import CustomLayout from './components/CustomLayout/CustomLayout';
import Login from './components/Login/Login';

const App = () => {

  let cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='));

  if (cookie) cookie = cookie.split('=')[1];

  if (!cookie) return <div className='app'><Login /></div>
  else return <div className='app'><CustomLayout /></div>
}

export default App;