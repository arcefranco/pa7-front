import React, {useEffect, useMemo} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { deleteUsuario, getAllUsuarios } from '../../reducers/Usuarios/UsuariosSlice'
import TableContainer from '../GerentesTable/TableContainer'
import { Link, useNavigate } from 'react-router-dom'

import * as BiIcons from 'react-icons/bi';
import { useTable, useSortBy} from 'react-table'
import styles from './UsuariosTable.module.css'


const UsuariosTable = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const {roles} = useSelector((state) => state.login.user)
const rolAltayModif = roles.find(e => e.rl_codigo === '1.2.2')
const { toggle } = useSelector(
  (state) => state.login)
  useEffect(() => {

  dispatch(getAllUsuarios())
    
    
  }, [dispatch])




 const {usuarios} = useSelector(
    (state) => state.usuarios)

  const columns = useMemo(
    () => [
      {
        Header: "Código",
        accessor: "ID",
        Cell: ({ value }) => <strong>{value}</strong>,
        
      },      
      {
        Header: "Usuario",
        accessor: "Usuario",
       
      },
      {
        Header: "Nombre",
        accessor: "Nombre",
        
      },
      {
        Header: "Vendedor",
        accessor: "Vendedor",
        
      },
      {
        Header: "Team Leader",
        accessor: "Team Leader",
        
      },
      {
        Header: "Supervisor",
        accessor: "Supervisor",
        
      },
      {
        Header: "Gerente",
        accessor: "Gerente",
        
      },
      {
        Header: "Usuario Anura",
        accessor: "UsuarioAnura",
        
      },
      {
        Header: "Scoring Asignado",
        accessor: "VerSoloScoringAsignado",
        Cell: ({ value }) => <strong>{value === 0 ? 'No' : 'Si'}</strong>,
        
      },
      {
        Header: "Usuario bloqueado",
        accessor: "us_bloqueado",
        Cell: ({ value }) => <strong>{value === 0 ? 'No' : 'Si'}</strong>,
      },
      

      {
        Header: "Usuario activo",
        accessor: "us_activo",
        Cell: ({ value }) => <strong>{value === 0 ? 'No' : 'Si'}</strong>,
        
      },
      {
        Header: "Modificar",
        accessor: "ID",
        id: 'modify',
        Cell: (value) => ( rolAltayModif ? 
        <button onClick={(()=> navigate(`/modifUsuarios/${value.value}`))}>Modificar</button> :
        <button disabled>Modificar</button>
          
        ),

      },
      {
        Header: "Eliminar",
        accessor: "ID",
        id: 'delete',
        Cell: (value) => (
          rolAltayModif ? 
          <button onClick={(()=> {
         let result = window.confirm('Esta seguro que desea eliminar?')
         if(result === true) {
            dispatch(deleteUsuario({id: value.value})) 
         }
           
        
        })}>Eliminar</button> : <button disabled>Eliminar</button> )
      },

         
    ],
    []
  );

  const { getTableProps, getTableBodyProps, 
    headerGroups, rows, 
    prepareRow,
  } =
    useTable({ columns: columns, data: usuarios },  
        useSortBy, 
        );


  return (
    

    <div className={toggle ? styles.tableSmall : styles.tableBig}>

      {
        rolAltayModif ? <Link to={'/altaUsuarios'}><button>Alta usuarios</button></Link> :
         <Link to={'/altaUsuarios'}><button disabled>Alta usuarios</button></Link>
      }

      <h1>Usuarios</h1>

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
          {rows.map((row) => {
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
       </TableContainer>    
    </div> 
       
   

        
    

  )
}

export default UsuariosTable