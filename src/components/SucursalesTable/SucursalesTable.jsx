import React, {useEffect, useMemo, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllSucursales, reset, deleteSucursal } from '../../reducers/Sucursales/SucursalesSlice';
import TableContainer from '../GerentesTable/TableContainer';
import { Link, useNavigate } from 'react-router-dom';
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters} from 'react-table';
import styles from '../../styles/Table.module.css';
import Swal from 'sweetalert2';
import { ExportCSV } from '../../helpers/exportCSV';
import TitleLogo from '../../styled-components/containers/TitleLogo';
import TitlePrimary from '../../styled-components/h/TitlePrimary';
import { ReturnLogo } from '../../helpers/ReturnLogo';
import { SearchFilter } from '../GerentesTable/ActiveFilter';
const SucursalesTable = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const {roles, empresaReal} = useSelector((state) => state.login.user)
const rolAltayModif = roles.find(e => e.rl_codigo === '1.2.2' || e.rl_codigo === '1')
const [pageHistory, setPageHistory] = useState('')

  useEffect(() => {

  dispatch(getAllSucursales())
  dispatch(reset())  
    
  }, [dispatch])





 const {sucursales, sucursalStatus} = useSelector(
    (state) => state.sucursales)


    useEffect(() => {
      setPageHistory(pageIndex)
        if(sucursalStatus && sucursalStatus.status === false){
          Swal.fire({
            icon:'error',
            text: sucursalStatus.data
          })
        }
        if(sucursalStatus && sucursalStatus.status === true){
          Swal.fire({
            icon:'success',
            showConfirmButton: true,
            text: sucursalStatus.data
          }).then((result) => {
            if(result.isConfirmed){
              window.location.reload()
            }
          })
        }
      }, [sucursalStatus])



  const columns = useMemo(
    () => [
      {
        Header: "Código",
        ShortHeader: 'Código',
        accessor: "Codigo",
        Cell: ({ value }) => <strong>{value}</strong>,
        Filter: false
        
      },      
      {
        Header: "Nombre",
        ShortHeader: 'Nombre',
        accessor: "Nombre",
        Filter: SearchFilter
      },

      {
        Header: "",
        accessor: "Codigo",
        id: 'modify',
        Cell: (value) => ( rolAltayModif ? 
        <button style={{background:'#3dc254bf'}} className={styles.buttonRows} onClick={(()=> navigate(`/modifSucursales/${value.value}`))}>Modificar</button> :
        <button style={{background:"silver"}} className={styles.buttonRows} disabled>Modificar</button>
        ),
        Filter: false
      },
      {
        Header: "",
        accessor: "Codigo",
        id: 'delete',
        Cell: (value) => (
          rolAltayModif ? 
          <button style={{background:"red"}} onClick={(()=> {
            Swal.fire({
              icon:'info',
              showConfirmButton: true,
              showCancelButton:true,
              text: 'Esta seguro que desea eliminar?'
            }).then((result) => {
              if(result.isConfirmed){
                dispatch(deleteSucursal({id: value.value}))
              }
            })

        })} className={styles.buttonRows} >Eliminar</button> : <button style={{background:"silver"}} className={styles.buttonRows} disabled>Eliminar</button> ),
        Filter: false
      },

         
    ],
    []
  );

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
    useTable({ columns: columns, data: sucursales, initialState:{pageSize:15, pageIndex:JSON.parse(localStorage.getItem('pageIndex'))} }, useGlobalFilter, useFilters,
        useSortBy, usePagination,
        );
        const {pageIndex, pageSize} = state
const {globalFilter} = state

  return (
    

    <div className={styles.container} >
      

      
  <div className={styles.title}>
      <span className={styles.titleContainer}>
        <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Sucursales</TitlePrimary>
        </TitleLogo>
      <div className={styles.buttonContainer}>
      {rolAltayModif ?
       <><Link to={'/altaSucursal'}><button>Nuevo</button></Link>
        <ExportCSV csvData={sucursales} fileName={'sucursales'} /></> :
         <Link to={'/altaSucursal'}><button disabled>Nuevo</button></Link>
      }</div>
      </span>
      <>
      <TableContainer>
      <div className={styles.tableContainer}>
      <table {...getTableProps()}>

        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                
                <th>
                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                 
                  <span >{column.isSorted? (column.isSortedDesc? column.render("ShortHeader") +' ▼' : column.render("ShortHeader")+ '▲'  ): column.render("Header")}</span>
                
                {/* {column.canFilter? <div>O</div> : null} */}</div>
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
                    <td className={styles.tdSmall} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    
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

export default SucursalesTable