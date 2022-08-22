import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import * as BiIcons from 'react-icons/bi'
import styles from './RecoveryPass.module.css'
import { recoveryPass } from '../../reducers/Login/loginSlice';

export const RecoveryPass = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")

    const {recoveryMessage} = useSelector(
        (state) => state.login)
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(recoveryPass(username))
        setUsername("")
      }
    return (
        <div className={styles.container}>
            
          <h3 className={styles.title}>Planes de Ahorro 7</h3>
            <form className={styles.form} action="">
            <span>Coloque su nombre de usuario</span>
            <div style={{position:'relative', margin: '1rem'}}>
            <BiIcons.BiUser className={styles.icon}/>
            <input type="text" className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Nombre de usuario' />
            </div>
            <button className={styles.btn} onClick={onSubmit}>Enviar</button>
            {
                recoveryMessage ? <p style={{marginTop:'1rem'}}>{recoveryMessage.message}</p> : null
            }
            </form>
            
        </div>
    )
}