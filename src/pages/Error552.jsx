import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ButtonPrimary from "../styled-components/buttons/ButtonPrimary";


const Error552 = () => {

    const navigate = useNavigate()

    return (
        <div style={{width: "100%",
            display: 'flex',
            height: '100vh',
            placeContent: 'center',
            alignItems: 'center',
            flexDirection:'column'}}>
            <span>
                Vuelva a loguearse 
            </span>
            
            <ButtonPrimary style={{width: '6rem', marginTop: '1rem'}} onClick={() => navigate('/')}>Volver</ButtonPrimary>
        </div>
    )

}

export default Error552