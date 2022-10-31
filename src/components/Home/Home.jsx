import React, {useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Home.module.css'
import { reset } from '../../reducers/Login/loginSlice'
import '../../App.css';
import fiatLogo from '../../images/fiat_logo.jpg'
import peugeotLogo from '../../images/peugeot.jpg'
import VWLogo from '../../images/volkswagen.png'
import cheryLogo from '../../images/logo_chery.jpg'
import jeepLogo from '../../images/logo_jeep.jpg'
import citroenLogo from '../../images/logo_citroen.png'

const Home = () => {
    
const {user, toggle } = useSelector(
        (state) => state.login)
const dispatch = useDispatch()
const empresa = user.empresaReal;
let logo;
let cssClass;

/*     React.useEffect(() => {
        dispatch(reset())
    }, []) */

/*---------CONDICION DE MARCA POR EMPRESA------*/
switch(empresa)
{
  case "Car Group S.A.":
  case "Gestión Financiera S.A.":
  case "AutoNet S.A.":
  logo = fiatLogo;
  cssClass = "logoShort"
  break;
  case "Gestión Financiera Luxcar":
  logo = VWLogo;
  cssClass = "logo"
  break;
  case "Alizze S.A.":
  logo = peugeotLogo;
  cssClass = "logoShort"
  break;
  case "Autos del Plata S.A.":
  logo = cheryLogo;
  cssClass = "logo"
  break;
  case "Detroit S.A.":
  logo = jeepLogo;
  cssClass = "logoShort"
  break;
  case "Elysees S.A.":
  logo = citroenLogo;
  cssClass = "logo"
  break;
  }

  return (
    <div className={styles.home}>        
        <div className={styles.background}></div>
             <div style={{display: 'flex', flexDirection: 'column', justifyContent:'start', textAlign:'center',
              height: '100vh'}} className="home">
                <img src={logo} className={cssClass} />
                <h1>{user.empresaReal}</h1>
                <h4>Bienvenid@, {user.Nombre}</h4>


                </div>  

        
        

    </div>
  )
}

export default Home