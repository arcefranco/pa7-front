import React, {useEffect, useMemo} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { deleteUsuario, getAllUsuarios } from '../../reducers/Usuarios/UsuariosSlice'
import TableContainer from '../GerentesTable/TableContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'


const UsuariosTable = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

  useEffect(() => {

  dispatch(getAllUsuarios())
    
    
  }, [])

  


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
        Cell: (value) => <button onClick={(()=> navigate(`/modifUsuarios/${value.value}`))}>Modificar</button>,
      },
      {
        Header: "Eliminar",
        accessor: "ID",
        id: 'delete',
        Cell: (value) => <button onClick={(()=> dispatch(deleteUsuario({id: value.value})))}>Eliminar</button>,
      },
    ],
    []
  );
  const tableInstance = useTable({columns: columns, data: usuarios });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;
  



  return (


    <div style={{alignItems: 'center'}}>
        <Link to={'/altaUsuarios'}><button>Alta usuarios</button></Link>
      <h1>Usuarios</h1>
      <TableContainer>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}
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
       </TableContainer>    
    </div> 
       
   

        
    

  )
}

export default UsuariosTable