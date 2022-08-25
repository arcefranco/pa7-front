import React, {useEffect, useMemo} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { deleteUsuario, getAllUsuarios, reset } from '../../reducers/Usuarios/UsuariosSlice';
import TableContainer from '../GerentesTable/TableContainer';
import { Link, useNavigate } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import { useTable, useSortBy, usePagination, useGlobalFilter} from 'react-table';
import styles from './UsuariosTable.module.css';
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
const { toggle } = useSelector(
  (state) => state.login)
  useEffect(() => {

  dispatch(getAllUsuarios())
  dispatch(reset())  
    
  }, [dispatch])

  useEffect(() => {
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
        Header: "Usuario bloqueado",
        accessor: "us_bloqueado",
        Cell: ({ value }) => <strong>{value === 0 ? 'No' : 'Si'}</strong>,
        Filter: false
      },
      

      {
        Header: "Usuario activo",
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
    state,
    setGlobalFilter,
    prepareRow,
  } =
    useTable({ columns: columns, data: usuarios }, useGlobalFilter, 
        useSortBy, usePagination,
        );
        const {pageIndex} = state
const {globalFilter} = state

  return (
    

    <div className={styles.container} >
      
{/* <div className={toggle ? styles.tableSmall : styles.tableBig}> */}
      
  <div className={styles.title}>
      <span style={{display:"flex"}}><h3>Usuarios</h3>
      <div className={styles.buttonContainer}>
      {rolAltayModif ?
       <><Link to={'/altaUsuarios'}><button><FcSurvey/>Alta Usuarios</button></Link>
        <ExportCSV csvData={usuarios} fileName={'usuarios'} /></> :
         <Link to={'/altaUsuarios'}><button disabled><FcSurvey/>Alta Usuarios</button></Link>
      }</div>
      </span>
      <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <TableContainer>
      <div className={styles.scrollbar}>
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
      <div>
        <span className={styles.pageIndex}>Página {' '}
        <strong>
          {pageIndex + 1} de {pageOptions.length}
        </strong>{' '}
        </span>
        <button className={styles.pageButton} onClick={()=> previousPage()} disabled={!canPreviousPage}>Anterior</button>
        <button className={styles.pageButton} onClick={()=> nextPage()} disabled={!canNextPage}>Siguiente</button>
      </div>
      </div>
       </TableContainer>
       </>
       </div>    
    </div> 
       
   

        
    

  )
}

export default UsuariosTable