import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import * as BiIcons from 'react-icons/bi';
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
            text: message.message
          })
        }
        if (user?.newUser === true) {
          Swal.fire({
            icon: 'info',
            title: `${user.message}`,
            showConfirmButton: true,
            timer: 5000
          }).then((result) => {
            if(result.isConfirmed)
            navigate('/recovery')
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
   

         <form className={styles.form}>
         <h3 className={styles.title}>Planes de Ahorro 7</h3>

         <span>Iniciar sesión</span>
          <select className={styles.input} name="empresa" value={input.empresa} onChange={handleChange} aria-required>
                <option value="" >--Elegir empresa--</option>
                <option value="pa7" id="carGroup">Car Group S.A.</option>
                <option value="pa7_gf_test_2" id="gestionFinanciera">Gestion Financiera S.A.</option>
                <option value="Auto Net S.A." id="autoNet">AutoNet S.A</option>
                <option value="Autos del Plata S.A." id="autosDelPlata">Autos del Plata S.A.</option>
                <option value="Detroit S.A." id="detroit">Detroit S.A.</option>
                <option value="Gestion Financiera Luxcar" id="gestionFinancieraLuxcar">Gestión Financiera Luxcar</option>
                <option value="Alizze S.A." id="alizze">Alizze S.A.</option>
          </select>
          <div style={{position:'relative', margin: '1rem'}}>
            <BiIcons.BiUser className={styles.icon}/>
            <input value={input.login} name='login' onChange={handleChange} className={styles.input} placeholder='Usuario' type="text" />
          </div>
          <div style={{position:'relative', margin: '1rem'}}>
            <BiIcons.BiLockAlt className={styles.icon}/>
            <input value={input.password} name='password' onChange={handleChange} className={styles.input} type="password" placeholder='Contraseña'/>
          </div>
         <hr className={styles.hr} />
          <Link to={'/recovery'} className={styles.forgotLink}>Olvido su contraseña?</Link>
         <button onClick={onSubmit} className={styles.btn}>Loguearse</button>
         
         </form>
      
    </div>
   
  )
}
