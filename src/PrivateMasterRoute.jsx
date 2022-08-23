import React from 'react';
import { Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateMasterRoute = ({component: Component, rol: rol, path, ...rest}) => {

    const {roles} = useSelector((state) => state.login.user)
    const neccesaryRol = roles.find(e => e.rl_codigo === rol || e.rl_codigo === '1')

    return (
        neccesaryRol ?
                <Outlet/>
            : <Navigate to={'/permission'}/>
    )
            
        
    
};

export default PrivateMasterRoute;