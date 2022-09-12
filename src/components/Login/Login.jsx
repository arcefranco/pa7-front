import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import * as BiIcons from 'react-icons/bi';
import { useSelector } from 'react-redux/es/exports'
import styles from './Login.module.css'
import { login, reset } from '../../reducers/Login/loginSlice'
import { useDispatch } from 'react-redux'
// import {Howl, Howler} from 'howler'
// import mp3 from '../../s'
 

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
        password: ''
    })

    /*const sound= new Howl({
      src:['/src/sounds/intro.mp3'],
      html5:true,
    });*/
    
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
          const newForm = { ...input, empresaReal: d?.options[d?.selectedIndex].text, [name]: value };
          
          setInput(newForm);
        };

/*          React.useEffect(() => {
          setEmpresaReal(d ? d.options[d.selectedIndex].text : null)
        }, [handleChange]) */
         


    const onSubmit = (e) => {
        e.preventDefault()
        // sound.play()
        dispatch(login(input))
      }
    
  return (
    <div className={styles.container}>


         <form className={styles.form} onSubmit={onSubmit}>
         <h3 className={styles.title}>Planes de Ahorro 7</h3>

         <span>Iniciar sesión</span>
         <div style={{position:'relative', margin: '1rem'}}>
          <select className={styles.input} id="select" name="empresa" value={input.empresa} onChange={handleChange} required>
                <option value="" >-Elegir empresa-</option>
                <option value="pa7" id="Car Group S.A.">Car Group S.A.</option>
                <option value="pa7_gf_test_2" id="Gestion Financiera S.A.">Gestion Financiera S.A.</option>
                <option value="pa7" id="AutoNet S.A.">AutoNet S.A</option>
                <option value="pa7" id="Autos del Plata S.A.">Autos del Plata S.A.</option>
                <option value="pa7" id="Detroit S.A.">Detroit S.A.</option>
                <option value="pa7" id="Gestion Financiera Luxcar">Gestión Financiera Luxcar</option>
                <option value="pa7" id="Alizze S.A.">Alizze S.A.</option>
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
