import React, {useEffect} from "react";
import styles from '../GerentesTable/Gerentes.module.css'

export const GlobalFilter = ({filter, setFilter}) => {
    useEffect(() => {
        console.log(filter)
      }, [filter])
    return (
        <div className={styles.containerGlobalFilter} >
            {/* <span>
                Buscar:{' '}
            </span> */}
             <input type="text" className={styles.globalSearch} value={filter/*  || '' */} onChange={e => setFilter(e.target.value)} placeholder="Buscar..."></input>
        </div>
    )
}