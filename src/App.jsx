import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NewTransaction from './components/NewTransaction';
import EditTransaction from './components/EditTransaction';
import UserContext from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './components/PageNotFound';

const App = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/newtransaction/:type"
                    element={
                        <ProtectedRoute>
                            <NewTransaction />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditTransaction />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </UserContext.Provider>
    );
};

export default App;
