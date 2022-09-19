import React from "react";
import styles from '../GerentesTable/Gerentes.module.css'


export function InactiveFilter({column }) {
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
        className={styles.filter}
        onChange={e => {
          setFilter(e.target.value || null);
        }}
      >
        <option value="">Todos</option>
        {options.map((option, i) => {
           
            if(option === 0){
               return <option key={0} value={0}>Si</option>
            } else if(option === 1){
                return <option key={1} value={1}>No</option>
            }
               
        }
        )}
      </select>
    );
  }
  export function THNFilter({column }) {
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
        className={styles.filter}
        onChange={e => {
          setFilter(e.target.value || null);
        }}
      >
        <option value="">Todos</option>
        {options.map((option, i) => {
           
            if(option === 0){
               return <option key={0} value={0}>Menor a 40.000</option>
            } else if(option === 1){
                return <option key={1} value={1}>Mayor a 40.000</option>
            }
               
        }
        )}
      </select>
    );
  }

  export function TOMFilter({column }) {
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
        className={styles.filter}
        onChange={e => {
          setFilter(e.target.value || null);
        }}
      >
        <option value="">Todos</option>
        {options.map((option, i) => {
           
            if(option === 1){
               return <option key={1} value={1}>Temprana</option>
            } else if(option === 2){
                return <option key={2} value={2}>Especializada</option>
            } else if(option === 3){
              return <option key={3} value={3}>Encuadre</option>
          }else if(option === 0){
            return <option key={0} value={0}>none</option>
          }
               
        }
        )}
      </select>
    );
  }
