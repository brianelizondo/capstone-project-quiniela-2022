import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// component to protect access to routes that the user must be logged in
function ProtectedRoute({ component: Component, ...restOfProps }){
    const user = useSelector((state) => state.user);    

    return (
        <Route
            {...restOfProps} 
            render={(props) => user.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" /> }
        />
    );
}

export default ProtectedRoute;