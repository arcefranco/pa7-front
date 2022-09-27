import React, {useState} from "react";
import * as MdIcons from 'react-icons/md';
import styles from './Estructura.module.css'

const EstructuraItem = ({Nombre, Childrens, Title}) => {

    const [activo, setActivo] = useState(true)   

    return (
        <div className={Title === 'Gerente' ? styles.item  : styles.subItem} style={{marginLeft: Title === 'Vendedor' && '15px'}}>
            {
                Title !== 'Vendedor' ? 
                activo ? <MdIcons.MdOutlineKeyboardArrowDown className={styles.arrow}  onClick={() => setActivo(!activo)} /> 
                :<MdIcons.MdOutlineKeyboardArrowDown className={styles.arrowDown} onClick={() => setActivo(!activo)} /> : null
               
            }
            <span className={styles.text} style={{color: Title === 'Gerente' ? 'cornflowerblue' : Title === 'Supervisor' ? '#ed6464' : Title === 'Team Leader' ? '#ed9064' : 'black'}} onClick={() => setActivo(!activo)}>{Title}:</span><span> {Nombre}</span>
            {
                activo && Childrens ? Childrens.map(e => {
                    return (
                        <EstructuraItem Nombre={e.Nombre} Childrens={e.Childrens} Title={e.Title}/>
                    )
                }) : null
            }
        </div>
    )
}

export default EstructuraItem