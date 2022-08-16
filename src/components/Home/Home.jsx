import React, {useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Home.module.css'
import { reset } from '../../reducers/Login/loginSlice'



const Home = () => {
    
const {user, toggle } = useSelector(
        (state) => state.login)
const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(reset())
    }, [])
  return (
    <div>
        
        
             <div className={toggle ? styles.HomeSmall : styles.HomeBig}>
                
                
                <h1>Bienvenido! cris</h1>

                
                </div>  

        


    </div>
  )
}

export default Home