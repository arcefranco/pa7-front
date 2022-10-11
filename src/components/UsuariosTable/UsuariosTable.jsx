import React, {useEffect, useMemo, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { deleteUsuario, getAllUsuarios, reset } from '../../reducers/Usuarios/UsuariosSlice';
import TableContainer from '../GerentesTable/TableContainer';
import { Link, useNavigate } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters} from 'react-table';
import {ActiveFilter, SearchFilter} from '../GerentesTable/ActiveFilter'
import styles from '../../styles/Table.module.css';
import Swal from 'sweetalert2';
import { ExportCSV } from '../../helpers/exportCSV';
import { GlobalFilter } from './GlobalFilter';
import TitlePrimary from '../../styled-components/h/TitlePrimary';
import TitleLogo from '../../styled-components/containers/TitleLogo';
import { ReturnLogo } from '../../helpers/ReturnLogo';

const UsuariosTable = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const {roles, empresaReal} = useSelector((state) => state.login.user)
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
        ShortHeader: 'Código',
        accessor: "ID",
        Cell: ({ value }) => <strong>{value}</strong>,
        Filter: false
        
      },      
      {
        Header: "Usuario",
        accessor: "Usuario",
        ShortHeader: 'Usuario',
        Filter: SearchFilter
      },
      {
        Header: "Nombre",
        accessor: "Nombre",
        ShortHeader: 'Nombre',
        Filter: SearchFilter
      },
      {
        Header: "Vendedor",
        accessor: "Vendedor",
        ShortHeader: 'Vendedor',
        Filter: SearchFilter

      },
      {
        Header: "Team Leader",
        accessor: "Team Leader",
        ShortHeader: 'Team Leader',
        Filter: SearchFilter
      },
      {
        Header: "Supervisor",
        accessor: "Supervisor",
        ShortHeader: 'Supervisor',
        Filter: SearchFilter
      },
      {
        Header: "Email",
        accessor: "email",
        ShortHeader: 'Email',
        Filter: SearchFilter
      },
      {
        Header: "Gerente",
        accessor: "Gerente",
        ShortHeader: 'Gerente',
        Filter: SearchFilter
      },    
      {
        Header: "User Anura",
        accessor: "UsuarioAnura",
        ShortHeader: 'User Anura',
        Filter: false
      },
      {
        Header: "Scoring",
        accessor: "VerSoloScoringAsignado",
        ShortHeader: 'Scoring',
        Cell: ({ value }) => <strong>{value === 0 ? 'No' : 'Si'}</strong>,
        Filter: false
      },
      {
        Header: "Bloqueado",
        accessor: "us_bloqueado",
        ShortHeader: 'Bloqueado',
        Cell: ({ value }) => <strong>{value === 0 ? 'No' : 'Si'}</strong>,
        Filter: false
      },
      

      {
        Header: "Activo",
        accessor: "us_activo",
        ShortHeader: 'Activo',
        Cell: ({ value }) => <strong>{value === 0 ? 'No' : 'Si'}</strong>,
        Filter: false
        
      },
      {
        Header: "",
        accessor: "ID",
        id: 'modify',
        Cell: (value) => ( rolAltayModif ? 
        <button style={{background:'#3dc254bf'}} className={styles.buttonRows} onClick={(()=> navigate(`/modifUsuarios/${value.value}`))}>Modificar</button> :
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
    useTable({ columns: columns, data: usuarios, initialState:{pageSize:15, pageIndex:JSON.parse(localStorage.getItem('pageIndex'))} }, useGlobalFilter, useFilters, 
        useSortBy, usePagination,
        );
        const {pageIndex, pageSize} = state
const {globalFilter} = state

  return (
    

    <div className={styles.container} >
      
{/* <div className={toggle ? styles.tableSmall : styles.tableBig}> */}
      
  <div className={styles.title}>
      <span className={styles.titleContainer}>
      <TitleLogo>
        <div>
          <span>{empresaReal}</span>
          <ReturnLogo empresa={empresaReal}/>
        </div>
        <TitlePrimary>Usuarios</TitlePrimary>
        </TitleLogo>
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
                
                <th >
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