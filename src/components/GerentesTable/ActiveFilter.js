import React from 'react'

function ActiveFilter({column }) {
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

export default ActiveFilter