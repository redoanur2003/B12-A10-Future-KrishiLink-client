import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../AuthContext/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    // console.log(user);

    if (loading) {
        return (<LoadingSpinner></LoadingSpinner>)
    }
    if (user) {
        return children;
    }
    return (
        <Navigate state={location.pathname} to='/login'></Navigate>
    );
};

export default PrivateRoute;