import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NewTransaction from './components/NewTransaction';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/newtransaction/:type" element={<NewTransaction />} />
        </Routes>
    );
};

export default App;
