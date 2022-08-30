import React from "react";
import { Link } from "react-router-dom";
const NotPermission = () => {
    return (
        <div style={{width: "100%",
            display: 'flex',
            placeContent: 'center',
            flexDirection:'column'}}>
            <span style={{
                placeSelf: 'center'
            }}>
                No tienes el rol necesario para realizar esta acción :/ 
            </span>
            
            <Link style={{
                placeSelf: 'center'
            }} to={'/'}>Volver al inicio</Link>
        </div>
    )
}

export default NotPermission