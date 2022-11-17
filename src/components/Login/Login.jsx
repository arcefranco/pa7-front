import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import * as BiIcons from 'react-icons/bi';
import { useSelector } from 'react-redux/es/exports'
import styles from './Login.module.css'
import { login, reset, resetToken } from '../../reducers/Login/loginSlice'
import { useDispatch } from 'react-redux'
 

export const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    var d = document.getElementById("select")
    const {user, isError, message, isSuccess} = useSelector(
        (state) => state.login)
    const [input, setInput] = useState({
        empresa:'',
        empresaReal: '',
        login: '',
        password: '',
        codigoMarca:'',
        marca:'',
        codigoEmpresa: ''
    })

    React.useEffect(() => {
      dispatch(resetToken())
    }, [])
    
    React.useEffect(() => {
      dispatch(reset()) 
      if (isError) {
          Swal.fire({
            icon: 'error',
            title: message,
           
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
            window.localStorage.setItem('db', user.empresa)
            navigate(user.link)
          })
          dispatch(reset())
          localStorage.removeItem('user')
          localStorage.removeItem('userToken')
          
        }
        },
        
        [user, isError, isSuccess, message, navigate]
        )
        
        
        const handleChange = (e) => {
          const { name, value } = e.target;
          const newForm = { ...input, empresa: d?.options[d.selectedIndex].id, [name]: value };
          
          setInput(newForm);
        };

         


    const onSubmit = (e) => {
        e.preventDefault()
        switch(input.empresaReal){
          case "Car Group S.A.":          
          setInput(input.codigoMarca = 2,
            input.codigoEmpresa = 8,
            input.marca = "FIAT")
            break;
          case "Gestión Financiera S.A.":
          setInput(input.codigoMarca = 2,
            input.codigoEmpresa = 1,
            input.codigoEmpresa = 8,
            input.marca = "FIAT")
            break;
          case "AutoNet S.A":
            setInput(input.codigoMarca = 2,
              input.codigoEmpresa = 3,
              input.codigoEmpresa = 8,
              input.marca = "FIAT")
              break;
          case "Alizze S.A.":
          setInput(input.codigoMarca = 11,
            input.codigoEmpresa = 14,
            input.marca = "PEUGEOT")
            break;
          case "Gestión Financiera Luxcar":
          setInput(input.codigoMarca = 10,
            input.codigoEmpresa = 14, 
            input.marca = "VOLKSWAGEN")
            break;
          case "Autos del Plata S.A.":
          setInput(input.codigoMarca = 6,
            input.codigoEmpresa = 7,
            input.marca = "CHERY")
            break;
          case "Detroit S.A.":
          setInput(input.codigoMarca = 7,
            input.codigoEmpresa = 9,
            input.marca = "JEEP")
            break;
          case "Elysees S.A.":
          setInput(input.codigoMarca = 12,
            input.codigoEmpresa = 15,
            input.marca = "CITROEN")
            break;
        }
        console.log(input)
        dispatch(login(input))
        setInput({
          empresa:'',
          empresaReal: '',
          login: '',
          password: '',
          codigoMarca:'',
          marca:'',
      })
      }
    
  return (
    <div className={styles.container}>


         <form className={styles.form} onSubmit={onSubmit}>
         <h3 className={styles.title}>Planes de Ahorro 7</h3>

         <span>Iniciar sesión</span>
         <div style={{position:'relative', margin: '1rem'}}>
          <select className={styles.input} id="select" name="empresaReal" value={input.empresaReal} onChange={handleChange} required>
                <option value="" >-Elegir empresa-</option>
                <option id="pa7" value="Car Group S.A.">Car Group S.A.</option>
                <option id="pa7" value="Gestión Financiera S.A.">Gestion Financiera S.A.</option>
                <option id="pa7" value="AutoNet S.A.">AutoNet S.A</option>
                <option id="pa7" value="Autos del Plata S.A.">Autos del Plata S.A.</option>
                <option id="pa7" value="Detroit S.A.">Detroit S.A.</option>
                <option id="pa7" value="Elysees S.A.">Elysees S.A.</option>
                <option id="pa7" value="Gestión Financiera Luxcar">Gestión Financiera Luxcar</option>
                <option id="pa7" value="Alizze S.A.">Alizze S.A.</option>
          </select>
          </div>
          <div style={{position:'relative', margin: '1rem'}}>
            <BiIcons.BiUser className={styles.icon}/>
            <input value={input.login} name='login' onChange={handleChange} className={styles.input} placeholder='Usuario' type="text" />
          </div>
          <div style={{position:'relative', margin: '1rem'}}>
            <BiIcons.BiLockAlt className={styles.icon}/>
            <input value={input.password} name='password' onChange={handleChange} className={styles.input} type="password" placeholder='Contraseña'/>
          </div>
         <hr className={styles.hr} />
          <Link to={'/recovery'} className={styles.forgotLink}>Olvidó su contraseña?</Link>
         <button  type="submit" className={styles.btn}>Loguearse</button>
         
         </form>
      
    </div>
   
  )
}
