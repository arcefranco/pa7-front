import React from "react";
import ButtonPrimary from "../styled-components/buttons/ButtonPrimary";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/Login/loginSlice";


const ErrorDB = () => {
const dispatch = useDispatch()
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center',height: '100vh'}}>
            <h1>Error</h1>
            <span>Volvé a loguearte</span>

            <ButtonPrimary onClick={() => dispatch(logout())} style={{width: '3rem', alignSelf: 'center', marginTop: '1rem'}}>Salir</ButtonPrimary>
        </div>
    )
}

export default ErrorDB