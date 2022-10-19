import React, {useState} from "react";
import styles from './PreSol.module.css'
import { useSelector, useDispatch } from "react-redux";
import PreSolItem from "./PreSolItem";
import PreSolTableTotal from "./PreSolTableTotal";
import * as MdIcons from 'react-icons/md';


const PreSolItemZona = ({title, arrayPropioSucursal, arrayMiniSucursal, arrayPropioTotal, arrayMiniTotal }) => {

const [activoZona, setActivoZona] = useState(true)
const [activoPropio, setActivoPropio] = useState(true)
const [activoMini, setActivoMini] = useState(true)

    return (
        <div className={styles.item}>
        <span>{title}</span>
        {
        !activoZona? <MdIcons.MdOutlineKeyboardArrowDown className={styles.arrow} onClick={() => setActivoZona(true)}  /> 
        : <MdIcons.MdOutlineKeyboardArrowUp className={styles.arrowDown} onClick={() => setActivoZona(false)} /> 
        }
        {
            activoZona ? 
        <div>

        <div className={styles.item}>
            <span>Equipos propios</span>
        {
        !activoPropio ? <MdIcons.MdOutlineKeyboardArrowDown className={styles.arrow} onClick={() => setActivoPropio(true)}  /> 
        : <MdIcons.MdOutlineKeyboardArrowUp className={styles.arrowDown} onClick={() => setActivoPropio(false)} /> 
        }

        {
             
        }
        {
        Object.keys(arrayPropioSucursal) && activoPropio ? Object.keys(arrayPropioSucursal).map((e) => 
                <PreSolItem title={e} array={arrayPropioSucursal[e]}/>) : null
        }
        {
            
        }
        {
            arrayPropioTotal.length && activoPropio ? <PreSolTableTotal array={arrayPropioTotal}/> : null
        }
        
        </div>

        <div className={styles.item}>
            <span>Micro Emprendedores</span>
            {
        !activoMini ? <MdIcons.MdOutlineKeyboardArrowDown className={styles.arrow} onClick={() => setActivoMini(true)}  /> 
        : <MdIcons.MdOutlineKeyboardArrowUp className={styles.arrowDown} onClick={() => setActivoMini(false)} /> 
        }
        {
             Object.keys(arrayMiniSucursal) && activoMini ? Object.keys(arrayMiniSucursal).map((e) => 
                <PreSolItem title={e} array={arrayMiniSucursal[e]}/>) : null
        }

        {
            arrayMiniTotal.length && activoMini  ? <PreSolTableTotal array={arrayMiniTotal}/> : null
        }
        
        
        </div>
        {
            [...arrayPropioTotal, ...arrayMiniTotal].length  ? 
            <div className={styles.item}>
                <PreSolTableTotal array={[...arrayPropioTotal, ...arrayMiniTotal]}/>
            </div> 
            :
            null
        }
        </div> : null
        }
    </div>
    )
}


export default PreSolItemZona