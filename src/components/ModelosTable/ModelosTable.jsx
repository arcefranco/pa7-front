import React, {useEffect, useMemo, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllModelos, getModeloById , reset, deleteModelos, getAllTipoPlan } from '../../reducers/Modelos/modelosSlice';
import TableContainer from '../GerentesTable/TableContainer';
import { Link, useNavigate } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import { useTable, useSortBy, usePagination, useGlobalFilter} from 'react-table';
import styles from '../GerentesTable/Gerentes.module.css';
import Swal from 'sweetalert2';
import { ExportCSV } from '../../helpers/exportCSV';
import { GlobalFilter } from '../UsuariosTable/GlobalFilter';
import './modelos.module.css';


const ModelosTable = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const {roles} = useSelector((state) => state.login.user)
const rolAltayModif = roles.find(e => e.rl_codigo === '1.2.2' || e.rl_codigo === '1')
const [pageHistory, setPageHistory] = useState('')

  useEffect(() => {

    Promise.all([
  dispatch(getAllModelos()),
  dispatch(getAllTipoPlan()),
  dispatch(reset())  
    ])  
  }, [dispatch])






 const {modelos, tipoPlan, modeloStatus} = useSelector(
    (state) => state.modelos)



    useEffect(() => {
      setPageHistory(pageIndex)
        if(modeloStatus && modeloStatus.status === false){
          Swal.fire({
            icon:'error',
            text: modeloStatus.data
          })
        }
        if(modeloStatus && modeloStatus.status === true){
          Swal.fire({
            icon:'success',
            showConfirmButton: true,
            text: modeloStatus.data
          }).then((result) => {
            if(result.isConfirmed){
              window.location.reload()
            }
          })
        }
      }, [modeloStatus])


  const columns = useMemo(
    () => [
      {
        Header: "Código",
        accessor: "Codigo",
        
        Cell: ({ value }) => <strong>{value}</strong>,
        Filter: false
        
      },      
      {
        Header: "Nombre",
        accessor: "Nombre",
        Filter: false
      },
      {
        Header: "Nacional / Importado",
        accessor: "NacionalImportado",
        Cell: ({ value }) => <strong>{value === 2 ? 'Importado' : (value === 1 ? 'Nacional' : '')}</strong>,
        Filter: false
      },
      {
        Header: "Activo",
        accessor: "Activo",
        Cell: ({ value }) => <div style={{ textIndent: "15px" }}><input   type="checkbox" className={styles.checkbox} checked={value === 0  
            ?false
            :true}/></div> ,
        Filter: false
      },
    ],
    []
  );
    tipoPlan.map(plan =>{
    columns.push({
      Header: plan.Descripcion,
      accessor: plan.Descripcion,
      columns:[
      {Header:"Cuota Terminal",
      accessor:"CuotaTerminal_" + plan.ID,
      Cell:({value})=><div className={"Plan_" + plan.ID} style={{textAlign:"right"}}>{value}</div>
      },
      {Header:"Cuota A",
      accessor:"CuotaACobrar_" + plan.ID,
      Cell:({value})=><div className={"Plan_" + plan.ID} style={{textAlign:"right"}}>{value}</div>
      },
      {Header:"Cuota B",
      accessor:"CuotaACobrarA_" + plan.ID,
      Cell:({value})=><div className={"Plan_" + plan.ID} style={{textAlign:"right"}}>{value}</div>
      },
      {Header:"Cuota 1",
      accessor:"Cuota1_" + plan.ID,
      Cell:({value})=><div className={"Plan_" + plan.ID} style={{textAlign:"right"}}>{value}</div>
      },
      {Header:"Cuota 2",
      accessor:"Cuota2_" + plan.ID,
      Cell:({value})=><div className={"Plan_" + plan.ID} style={{textAlign:"right"}}>{value}</div>
      },
    ],
    })
    }) 

    columns.push(
      {
        Header: "",
        accessor: "Codigo",
        id: 'modify',
        Cell: (value) => ( rolAltayModif ? 
        <button style={{background:"burlywood"}} className={styles.buttonRows} onClick={(()=> navigate(`/modifModelos/${value.value}`))}>Modificar</button> :
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
                dispatch(deleteModelos({id: value.value}))
              }
            })

        })} className={styles.buttonRows} >Eliminar</button> : <button style={{background:"silver"}} className={styles.buttonRows} disabled>Eliminar</button> ),
        Filter: false
      },
    )

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
    useTable({ columns: columns, data: modelos , initialState:{pageSize:15, pageIndex:JSON.parse(localStorage.getItem('pageIndex'))} }, useGlobalFilter, 
        useSortBy, usePagination,
        );
        const {pageIndex, pageSize} = state
const {globalFilter} = state

  return (
    

    <div className={styles.container} >
      

      
  <div className={styles.title}>
      <span className={styles.titleContainer}>
        <h3>Modelos</h3>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <div className={styles.buttonContainer}>
      {rolAltayModif ?
       <><Link to={'/altaModelos'}><button>Nuevo</button></Link>
        <ExportCSV csvData={modelos} fileName={'Modelos'} /></> :
         <Link to={'/altaModelos'}><button disabled>Nuevo</button></Link>
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
                
                <th {...column.getHeaderProps()}>{column.render("Header")}
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

export default ModelosTable