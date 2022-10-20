import React, {useEffect, useMemo, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllModelos, reset, deleteModelos,  getAllTipoPlan } from '../../../reducers/ConfigDatosGenerales/Modelos/modelosSlice';
import TableContainer from '../../../styled-components/tables/TableContainer';
import { Link, useNavigate } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters} from 'react-table';
import styles from '../../../styles/Table.module.css';
import Swal from 'sweetalert2';
import { ExportCSV } from '../../../helpers/exportCSV';

import './modelos.module.css';


const ModelosContainer = ({columns, modelos}) => {

  const [pageHistory, setPageHistory] = useState('')
  const {roles} = useSelector((state) => state.login.user)
const rolAltayModif = roles.find(e => e.rl_codigo === '1.2.2' || e.rl_codigo === '1')

useEffect(() => {
  setPageHistory(pageIndex)})

  const { getTableProps, getTableBodyProps, 
    headerGroups, page,  nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    state,
    setGlobalFilter,
    prepareRow,
  } =
    useTable({ columns:columns , data: modelos , initialState:{pageSize:15, pageIndex:JSON.parse(localStorage.getItem('pageIndex'))} }, useGlobalFilter, 
        useFilters,useSortBy, usePagination,
        );
        const {pageIndex, pageSize} = state
const {globalFilter} = state
  
  return (
    

    <div className={styles.container} >
      

      
  <div className={styles.title}>
      <span className={styles.titleContainer}>
        <h3>Modelos</h3>
      <div className={styles.buttonContainer}>
      {rolAltayModif ?
       <><Link to={'/altaModelos'}><button>Nuevo</button></Link>
        <ExportCSV csvData={modelos} fileName={'Modelos'} /></> :
         <Link to={'/altaModelos'}><button disabled>Nuevo</button></Link>
      }
      </div> 
      </span>
      <>
      <TableContainer>
      <div className={styles.tableContainer}>
      <table style={{
            display: 'block',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
      }} {...getTableProps()}>

        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                
                <th {...column.getHeaderProps(/*column.getSortByToggleProps()*/)}>
                <span >{column.isSorted? (column.isSortedDesc? column.render("ShortHeader") +' ▼' : column.render("ShortHeader")+ '▲'  ): column.render("Header")}</span>
                                <div style={{display:"flex"}}>{column.canFilter ? column.render('Filter') : null}</div>

                </th>
                
               
              ))}
              
            </tr>
          ))}
          
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <div>
        <span className={styles.pageIndex}>Página {' '}
        <strong>
          {pageIndex + 1} de {pageOptions.length}
        </strong>{' '}
        </span>
        <button className={styles.pageButton} onClick={()=> (previousPage(), setPageHistory(prevState=>prevState-1), window.localStorage.setItem("pageIndex",JSON.stringify(pageHistory-1)) ) } disabled={!canPreviousPage} >Anterior</button>
        <button className={styles.pageButton} onClick={()=> (nextPage(), setPageHistory(prevState=>prevState+1), window.localStorage.setItem("pageIndex",JSON.stringify(pageHistory+1))) } disabled={!canNextPage} >Siguiente</button>
      </div>
      
       </TableContainer>
       </>
       
       </div>    
    </div> 
       
   

        
    

  )
}
  export default ModelosContainer

