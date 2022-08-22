import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports'
import styles from './Login.module.css'
import { login, reset } from '../../reducers/Login/loginSlice'
import { useDispatch } from 'react-redux'


export const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, message, isSuccess} = useSelector(
        (state) => state.login)
    const [input, setInput] = useState({
        empresa:'',
        login: '',
        password: ''
    })

    React.useEffect(() => {
        dispatch(reset())
        if (isError) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message
          })
        }
        if (user?.newUser === true) {
          Swal.fire({
            icon: 'info',
            title: `${user.message} en /recovery`,
            showConfirmButton: false,
            timer: 1500
          })
          dispatch(reset())
          localStorage.removeItem('user')
          localStorage.removeItem('userToken')
          
        }
        if (isSuccess && user !== null) {
          Swal.fire({
            icon: 'success',
            title: 'You have successfully logged in',
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/')
          dispatch(reset())
        }
        },

       [user, isError, isSuccess, message, navigate]
       )

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = { ...input, [name]: value };
        setInput(newForm);
    };


    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login(input))
      }
    
  return (
    <div className={styles.container}>
         <h1>Login</h1>

         <form className={styles.form}>
          <select className={styles.input} name="empresa" value={input.empresa} onChange={handleChange} required>
                <option value="">--Elegir empresa--</option>
                <option value="Car Group S.A." id="carGroup">Car Group S.A.</option>
                <option value="Gestion Financiera S.A." id="gestionFinanciera">Gestion Financiera S.A.</option>
                <option value="Auto Net S.A." id="autoNet">AutoNet S.A</option>
                <option value="Autos del Plata S.A." id="autosDelPlata">Autos del Plata S.A.</option>
                <option value="Detroit S.A." id="detroit">Detroit S.A.</option>
                <option value="Gestion Financiera Luxcar" id="gestionFinancieraLuxcar">Gestión Financiera Luxcar</option>
                <option value="Alizze S.A." id="alizze">Alizze S.A.</option>
          </select>
        <input value={input.login} name='login' onChange={handleChange} className={styles.input} placeholder='User' type="text" />
         <input value={input.password} name='password' onChange={handleChange} className={styles.input} type="password" placeholder='Password'/>
          <Link to={'/recovery'} className={styles.forgotLink}>Olvido su contraseña?</Link>
         <button onClick={onSubmit} className={styles.buttonSubmit}>Log in</button>
         
         </form>
      
    </div>
   
  )
}
