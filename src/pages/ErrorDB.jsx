import React from "react";
import ButtonPrimary from "../styled-components/buttons/ButtonPrimary";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/Login/loginSlice";
import fiat from "../fiat500.png";
import "../App.css"


const ErrorDB = () => {
const dispatch = useDispatch()
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center',height: '100vh'}}>
            <img src={fiat} className="img" />
            <h1>Conexión Agotada</h1>
            <span>Por favor, iniciar sesión de nuevo</span>

            <ButtonPrimary onClick={() => dispatch(logout())} style={{width: '3rem', alignSelf: 'center', marginTop: '1rem'}}>Salir</ButtonPrimary>
        </div>
    )
}

export default ErrorDB