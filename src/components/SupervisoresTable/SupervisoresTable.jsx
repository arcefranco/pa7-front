import React, {useEffect, useMemo, useState, useRef} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { deleteSupervisores, getSupervisores, getSupervisoresById, postSupervisores, updateSupervisores, } from '../../reducers/Supervisores/supervisoresSlice.js'
import TableContainer from '../GerentesTable/TableContainer'
import { useFilters, usePagination,useSortBy, useGlobalFilter} from 'react-table'
import {ActiveFilter, SearchFilter} from '../GerentesTable/ActiveFilter'
import { GlobalFilter } from '../UsuariosTable/GlobalFilter';
import { useTable } from 'react-table'
import styles from '../GerentesTable/Gerentes.module.css'
import {FcSurvey, FcDataSheet} from 'react-icons/fc'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
import { ExportCSV } from '../../helpers/exportCSV';


/*FUNCION DEL COMPONENTE*/
const SupervisoresTable = () => {
const [nuevo, setNuevo] = useState(false);
const toggleNuevo = () => setNuevo(!nuevo);
const [modificar, setModificar] = useState(false);
const toggleModificar = () => setModificar(!modificar);
const dispatch = useDispatch();
const [lastCode, setLastCode ] = useState({});
const navigate = useNavigate();
const {roles} = useSelector((state) => state.login.user)
const rolAlta = roles.find(e => e.rl_codigo === '1.7.18.1' || e.rl_codigo === '1')
const rolModificar = roles.find(e => e.rl_codigo === '1.7.18.2'||e.rl_codigo === '1')
const rolEliminar = roles.find(e => e.rl_codigo === '1.7.18.3' || e.rl_codigo === '1')
const [input, setInput] = useState({
  Codigo:'',
  Nombre:'',
  Activo: '',
})


/*GET API SUPERVISORES*/
useEffect(() => {
  
  dispatch(getSupervisores())
  }, [dispatch])

 const {supervisores, supervisoresById} = useSelector(
    (state) => state.supervisores)

    
   
    
// /*LAST OBJECT OF THE SUPERVISORES ARRAY  */
//     var lastObject =useMemo( () => gerentes[(gerentes.length)-1])
//       // setLastCode()    
//     console.log(lastObject?.Codigo)
 
  /*GERENTES TABLEDATA*/ 
  const columns = useMemo(
    () => [
      {
        Header: "Código",
        ShortHeader:"Codigo",
        accessor: "Codigo",
        Cell: ({ value }) => <div style={{ textIndent: "20px" }}><strong  >{value}</strong></div>,
        Filter: ActiveFilter,
        filter: 'equals',
        
      },
      {
        Header: "Nombre",
        ShortHeader:"Nombre",
        accessor: "Nombre",
        Filter: SearchFilter
      },
      {
        Header: "Email",
        ShortHeader:"Email",
        accessor: "Email",
        Filter: SearchFilter
      },
      {
        Header: "Gerente",
        ShortHeader:"Gerente",
        accessor: "Gerente",
        Filter: SearchFilter
      },
      {
        Header: <div style={{marginBottom:"-1.6em"}}>Es Micro<br/>Emprendedor</div>,
        ShortHeader: "Es Micro...",
        accessor: "EsMiniEmprendedor",
        Cell: ({ value }) => <div style={{ textIndent: "15px"}}><input   type="checkbox" className={styles.checkbox} checked={value === 0  
                              ?false
                              :true}/></div> ,
        Filter: ActiveFilter
      },
      {
        Header: <div >Valor Promedio<br/>Movil Micro Emp.</div>,
        ShortHeader: "Valor Promedio...",
        accessor: "ValorPromedioMovil",
        Cell: ({ value }) => <div style={{  textAlign:"end", marginRight:"3rem"}}>{value}</div>,
        Filter: <div className={styles.filter} style={{border:'none'}} ></div>,
      },
      
      {
        Header: "Activo",
        ShortHeader:"Activo",
        accessor: "Activo",
        Cell: ({ value }) => <div style={{ textIndent: "15px" }}><input   type="checkbox" className={styles.checkbox} checked={value === 0  
                              ?false
                              :true}/></div> ,
        Filter: ActiveFilter
      },
      {
        Header: "Zona",
        ShortHeader:"Zona",
        accessor: "Zona",
        Filter: ActiveFilter
      },
      {
        Header: "",
        ShortHeader:"",
        accessor: "Codigo" , 
        id:'Modificar',
        disableSortBy: true,
        Filter: false,
        Cell: (value) => (rolModificar ? <button  style={{background:"burlywood"}} onClick=  {(()=> navigate(`/modificarSupervisores/${value.value}`))}
        className={styles.buttonRows} >Modificar</button>:
        <button style={{background:"silver"}} className={styles.buttonRows} disabled>Modificar</button>),
              },
              
      {
        Header: "",
        ShortHeader:"",
        accessor: "Codigo",
        id:'Eliminar',
        disableSortBy: true,
        Filter: false,
        Cell: (value) => ( rolEliminar ?
            <button   style={{background:"red"}} onClick={(()=>{
          
          Swal.fire({
            icon:'info',
            showConfirmButton: true,
            showCancelButton:true,
            text: 'Esta seguro que desea eliminar?'
          }).then((result) => {
            if(result.isConfirmed){
              dispatch(deleteSupervisores({Codigo: value.value}))
              window.location.reload()
            }
          })
          
      })} 
        className={styles.buttonRows} >  Eliminar</button>
        :<button style={{background:"silver"}} className={styles.buttonRows} disabled>Eliminar</button> ),
      },
      
    ],
    []
  );
  const tableInstance = useTable({ columns: columns, data: supervisores, initialState:{pageSize:15} },    
    useGlobalFilter,useFilters, useSortBy, usePagination
    );


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setGlobalFilter,
    setPageSize,
    state,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;
  const {pageIndex,pageSize} = state
  const {globalFilter} = state

/*RENDER PAGINA SUPERVISORES*/
  return (
    <div className={styles.container}>
      <div className={styles.title}>
      <span className={styles.titleContainer}>
          <h3>Supervisores</h3>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>

          <div className={styles.buttonContainer}>
          { rolAlta ? 
          <> <button onClick={()=>navigate('/altaSupervisores')}   className={styles.buttonLeft} ><FcSurvey/>Nuevo</button>
            <ExportCSV csvData={supervisores} fileName={'supervisores'} /></>
            : <><button onClick={()=>navigate('/altaSupervisores')}   className={styles.buttonLeft} disabled><FcSurvey/>Nuevo</button>
            <button className={styles.buttonRight}  disabled ><FcDataSheet/>Excel</button></>
            } </div> 
      </span>
     <div>
      {/*POSIBLE UBICACION DE INPUT RADIO FILTER DE TABLA*/}
     </div>
      
      <TableContainer>
        <>
        <div className={styles.tableContainer}>
          
        <table {...getTableProps()} >
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
              <tr  {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td  {...cell.getCellProps()} >{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            ); 
          })}
        </tbody>
      </table>
      </div>
      <div className={styles.Pagination}>
        <span className={styles.pageIndex}>Página {' '}
        <strong>
          {pageIndex + 1} de {pageOptions.length}
        </strong>{' '}
        </span>
        <button className={styles.pageButton} onClick={()=> previousPage()} disabled={!canPreviousPage}>Anterior</button>
        <button className={styles.pageButton} onClick={()=> nextPage()} disabled={!canNextPage}>Siguiente</button>
      </div>
        </>
       </TableContainer>
       
       </div>
    </div>
  )
}

export default SupervisoresTable