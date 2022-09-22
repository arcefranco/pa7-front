import styles from '../GerentesTable/Gerentes.module.css'
import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table';

export const GlobalFilter = ({filter, setFilter}) => {
    const [value, setValue] = useState(filter)  
      const onChange = useAsyncDebounce(value => {setFilter(value || undefined)}, 1000)
    return (
        <div className={styles.containerGlobalFilter} >
            {/* <span>
                Buscar:{' '}
            </span> */}
             <input type="text" className={styles.globalSearch} value={value  || '' } 
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
          window.localStorage.removeItem("pageIndex")
        }} placeholder="Buscar..."></input>
        </div>
    )
}