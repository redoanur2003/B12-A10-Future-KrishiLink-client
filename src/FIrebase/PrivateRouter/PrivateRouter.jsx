import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../../Components/Loading/LoadingSpinner';
import { AuthContext } from '../AuthContext/AuthContext';

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