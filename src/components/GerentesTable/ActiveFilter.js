import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table';
import styles from './Gerentes.module.css'


export function ActiveFilter({column }) {
    const { filterValue, setFilter, preFilteredRows, id } = column
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach(row => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || null);
        }}
      >
        <option value="">Todos</option>
        {options.map((option, i) => {
           
            if(option === 0){
               return <option key={0} value={0}>No</option>
            } else if(option === 1){
                return <option key={1} value={1}>Si</option>
            }else{
                return <option key={i} value={option}>{option}</option>
            }
               
        }
        )}
      </select>
    );
  }

  export function SearchFilter({column }) {
    const { filterValue, setFilter,  } = column
    // Calculate the options for filtering
    // using the preFilteredRows
      const [value, setValue] = useState(filterValue)  
      const onChange = useAsyncDebounce(value => {setFilter(value || undefined)}, 1000)
  
    // Render a multi-select box
    return (
      <input
        type="text" 
        style={{height:"17px", borderRadius: "10px", border: "groove"}}
        className={styles.search}
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder="Buscar..."
      
        />
    );
  }