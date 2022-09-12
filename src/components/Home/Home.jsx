import React, {useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Home.module.css'
import { reset } from '../../reducers/Login/loginSlice'
import '../../App.css';
import fiatLogo from '../../images/fiat_logo.jpg'
import peugeotLogo from '../../images/peugeot.jpg'
import VWLogo from '../../images/volkswagen.jpeg'


const Home = () => {
    
const {user, toggle } = useSelector(
        (state) => state.login)
const dispatch = useDispatch()
const empresa = user.empresaReal;
let logo;

    React.useEffect(() => {
        dispatch(reset())
    }, [])

/*---------CONDICION DE MARCA POR EMPRESA------*/
switch(empresa)
{
  case "Car Group S.A.":
  logo = fiatLogo;
  break;
  case "Gestion Financiera S.A.":
  logo = peugeotLogo;
  break;
  default:
  logo = fiatLogo;
  break;
}

  return (
    <div className={styles.home}>        
        <div className={styles.background}></div>
             <div style={{display: 'flex', flexDirection: 'column', justifyContent:'start', textAlign:'center',
              height: '100vh'}} className="home">
                <img src={logo} className="logo" />
                <h1>{user.empresaReal}</h1>
                <h4>Bienvenido {user.Nombre}!</h4>

                
                </div>  

        
        

    </div>
  )
}

export default Home