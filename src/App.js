import { useState } from 'react';
import './assets/css/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import Home from './Home';
import { Route, Routes } from 'react-router';
import Login from './Login';
import List from './List';
import FeedBack from './FeedBack';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {localStorage.getItem('Token') && <Route path="/list" element={<List />} />}
        {localStorage.getItem('Token') && <Route path="/feedback" element={<FeedBack />} />}
      </Routes>
    </div >
  );
}

export default App;
