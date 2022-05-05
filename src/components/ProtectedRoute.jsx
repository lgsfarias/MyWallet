import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
    const { user: currentUser } = useContext(UserContext);
    if (!currentUser) {
        console.log('Não autorizado');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
