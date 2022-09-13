import React, {useEffect, useMemo, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { deleteUsuario, getAllUsuarios, reset } from '../../reducers/Usuarios/UsuariosSlice';
import TableContainer from '../GerentesTable/TableContainer';
import { Link, useNavigate } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';

import { useTable, useSortBy, usePagination, useGlobalFilter} from 'react-table';
import styles from '../GerentesTable/Gerentes.module.css';

import Swal from 'sweetalert2';
import {FcApproval, FcCancel, FcSurvey, FcDataSheet} from 'react-icons/fc'
import { ExportCSV } from '../../helpers/exportCSV';
import { GlobalFilter } from './GlobalFilter';


const UsuariosTable = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const {roles} = useSelector((state) => state.login.user)
const {statusNuevoUsuario} = useSelector((state) => state.usuarios)
const rolAltayModif = roles.find(e => e.rl_codigo === '1.2.2' || e.rl_codigo === '1')
const [pageHistory, setPageHistory] = useState('')


const { toggle } = useSelector(
  (state) => state.login)
  useEffect(() => {

  dispatch(getAllUsuarios())
  dispatch(reset())  
    
  }, [dispatch])

  useEffect(() => {
    setPageHistory(pageIndex)
    if(statusNuevoUsuario[0] && statusNuevoUsuario[0].status === false){
      Swal.fire({
        icon:'error',
        text: statusNuevoUsuario[0].data
      })
    }
    if(statusNuevoUsuario[0] && statusNuevoUsuario[0].status === true){
      Swal.fire({
        icon:'success',
        showConfirmButton: true,
        text: statusNuevoUsuario[0].data
      }).then((result) => {
        if(result.isConfirmed){
          window.location.reload()
        }
      })
    }
  }, [statusNuevoUsuario])


 const {usuarios} = useSelector(
    (state) => state.usuarios)

  const columns = useMemo(
    () => [
      {
        Header: "Código",
        accessor: "ID",
        Cell: ({ value }) => <strong>{value}</strong>,
        Filter: false
        
      },      
      {
        Header: "Usuario",
        accessor: "Usuario",
        Filter: false
      },
      {
        Header: "Nombre",
        accessor: "Nombre",
        Filter: false
      },
      {
        Header: "Vendedor",
        accessor: "Vendedor",
        Filter: false
      },
      {
        Header: "Team Leader",
        accessor: "Team Leader",
        Filter: false
      },
      {
        Header: "Supervisor",
        accessor: "Supervisor",
        Filter: false
      },
      {
        Header: "Email",
        accessor: "email",
        Filter: false
      },
      {
        Header: "Gerente",
        accessor: "Gerente",
        Filter: false
      },
      {
        Header: "Usuario Anura",
        accessor: "UsuarioAnura",
        Filter: false
      },
      {
        Header: "Scoring Asignado",
        accessor: "VerSoloScoringAsignado",
        Cell: ({ value }) => <strong>{value === 0 ? 'No' : 'Si'}</strong>,
        Filter: false
      },
      {
        Header: "Bloqueado",
        accessor: "us_bloqueado",
        Cell: ({ value }) => <strong>{value === 0 ? 'No' : 'Si'}</strong>,
        Filter: false
      },
      

      {
        Header: "Activo",
        accessor: "us_activo",
        Cell: ({ value }) => <strong>{value === 0 ? 'No' : 'Si'}</strong>,
        Filter: false
        
      },
      {
        Header: "",
        accessor: "ID",
        id: 'modify',
        Cell: (value) => ( rolAltayModif ? 
        <button style={{background:"burlywood"}} className={styles.buttonRows} onClick={(()=> navigate(`/modifUsuarios/${value.value}`))}>Modificar</button> :
        <button style={{background:"silver"}} className={styles.buttonRows} disabled>Modificar</button>
        ),
        Filter: false
      },
      {
        Header: "",
        accessor: "ID",
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
                dispatch(deleteUsuario({id: value.value}))
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
    useTable({ columns: columns, data: usuarios, initialState:{pageSize:15, pageIndex:JSON.parse(localStorage.getItem('pageIndex'))} }, useGlobalFilter, 
        useSortBy, usePagination,
        );
        const {pageIndex, pageSize} = state
const {globalFilter} = state

  return (
    

    <div className={styles.container} >
      
{/* <div className={toggle ? styles.tableSmall : styles.tableBig}> */}
      
  <div className={styles.title}>
      <span className={styles.titleContainer}>
        <h3>Usuarios</h3>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <div className={styles.buttonContainer}>
      {rolAltayModif ?
       <><Link to={'/altaUsuarios'}><button>Nuevo</button></Link>
        <ExportCSV csvData={usuarios} fileName={'usuarios'} /></> :
         <Link to={'/altaUsuarios'}><button disabled>Nuevo</button></Link>
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
                
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? <BiIcons.BiDownArrow/> : <BiIcons.BiUpArrow/>) : ''}
                </span>
                <div>{column.canFilter ? column.render('Filter') : null}</div>
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

export default UsuariosTable