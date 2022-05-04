import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NewTransaction from './components/NewTransaction';
import UserContext from './contexts/UserContext';

const App = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/newtransaction/:type"
                    element={<NewTransaction />}
                />
            </Routes>
        </UserContext.Provider>
    );
};

export default App;
