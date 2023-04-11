import React from 'react'
// import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({IdToken, children}) => {
    
    if(IdToken) {
        return children;
    }
    else {
        toast("Please Login First");
        return <Navigate to='/auth' />
    }
}

export default PrivateRoute;