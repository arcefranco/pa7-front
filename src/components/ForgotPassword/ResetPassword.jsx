import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { verify, updatePass } from "../../reducers/Login/loginSlice";
import { useSelector } from "react-redux";
import styles from './RecoveryPass.module.css'
import { useParams, Link } from "react-router-dom";

export const ResetPassword = () => {
    const dispatch = useDispatch()
   
    React.useEffect(() => {
        dispatch(verify(verifyData))
    
    }, [])
    const { id, token } = useParams();
    const verifyData = {
        id: id,
        token: token
    }
    
    
    const {tokenForgot, isLoading, updateStatus} = useSelector(
        (state) => state.login)
    
    const [input, setInput]= useState({
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState({})
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = { ...input, [name]: value };
        setInput(newForm);
        const errors = validateform(newForm);
        setError(errors);
    };

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            newPass: input.password, 
            confirmPass: input.confirmPassword, 
            id: id 
        }
        dispatch(updatePass(userData))
        setInput({
            password: '',
            confirmPassword: ''
        })
    }
    const validateform = function (form) {
        const errors = {};

        if (form.password !== form.confirmPassword) {
          errors.contrasenaConfirm = "Las contraseñas deben coincidir";
        }
        return errors;
      };   
    


    return (
        
        tokenForgot.status === false && isLoading === false ? 
        <div className={styles.container}><h1 className={styles.title}>Su token de recupero ha expirado :( </h1>
        <Link to={'/'}>Volver al inicio</Link>
        </div> :
        <div>
            <div className={styles.container}>
                {
                isLoading ? <span>...Cargando</span> : 
                <div>
                <h1 className={styles.title}>Planes de Ahorro 7</h1>
                <form className={styles.form}>
                <span>Ingrese su nueva contraseña</span>
                <input className={styles.input} type="password" value={input.password} name="password" onChange={handleChange}  placeholder="Nueva contraseña"/>
                <input className={styles.input} type="password" value={input.confirmPassword} name="confirmPassword" onChange={handleChange}   placeholder="Confirmar contraseña" />
                {error.contrasenaConfirm && <span style={{marginTop:'1rem', fontWeight:'bold', color:'red'}}>{error.contrasenaConfirm}</span>}

                {
                    error.contrasenaConfirm || input.password.length < 1 ? <button className={styles.btnDisabled} disabled type="submit" onClick={onSubmit}>Enviar</button> :
                    <button className={styles.btn} type="submit" onClick={onSubmit}>Enviar</button>
                }
                {
                updateStatus && updateStatus.status === true ? 
                
                <Link style={{marginTop:'1rem'}} to={'/'}>Inicie sesion con su nueva contraseña</Link> : 
                
                <div style={{marginTop:'1rem'}}>{updateStatus ? updateStatus.message : null}</div>
                
                }
            </form>
                </div>
                
                
                }
                </div>
            
        </div> 
    )
}