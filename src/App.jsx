import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import usePersistedState from './hooks/usePersistedState';

import Home from './components/pages/Home/Home';
import SignUp from './components/pages/SignUp/SignUp';
import Login from './components/pages/Login/Login';
import NewTransaction from './components/pages/NewTransaction/NewTransaction';
import EditTransaction from './components/pages/EditTransaction/EditTransaction';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UserContext from './contexts/UserContext';
import light from './styles/themes/light';
import dark from './styles/themes/dark';

const App = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    const [theme, setTheme] = usePersistedState('theme', light);

    const toggleTheme = () => {
        setTheme(theme.title === 'light' ? dark : light);
    };

    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{ user, setUser }}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home toggleTheme={toggleTheme} />
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
        </ThemeProvider>
    );
};

export default App;
