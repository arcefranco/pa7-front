import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ButtonPrimary from "../styled-components/buttons/ButtonPrimary";


const Error404 = () => {

    const navigate = useNavigate()

    return (
        <div style={{width: "100%",
            display: 'flex',
            height: '100vh',
            placeContent: 'center',
            alignItems: 'center',
            flexDirection:'column'}}>
            <span>
                Error 404 :/ 
            </span>
            
            <ButtonPrimary style={{width: '6rem', marginTop: '1rem'}} onClick={() => navigate(-1)}>Volver</ButtonPrimary>
        </div>
    )

}

export default Error404