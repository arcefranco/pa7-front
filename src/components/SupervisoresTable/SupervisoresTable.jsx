import React, {useEffect, useMemo, useState, useRef} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { deleteSupervisores, getSupervisores, getSupervisoresById, postSupervisores, updateSupervisores, reset } from '../../reducers/Supervisores/supervisoresSlice.js'
import TableContainer from '../GerentesTable/TableContainer'
import { useFilters, usePagination,useSortBy, useGlobalFilter} from 'react-table'
import {ActiveFilter, SearchFilter} from '../GerentesTable/ActiveFilter'
import { GlobalFilter } from '../UsuariosTable/GlobalFilter';
import { useTable } from 'react-table'
import styles from '../GerentesTable/Gerentes.module.css'
import TitleLogo from '../../styled-components/containers/TitleLogo.js'
import TitlePrimary from '../../styled-components/h/TitlePrimary.js'
import { ReturnLogo } from '../../helpers/ReturnLogo.jsx'
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
const {roles, empresaReal} = useSelector((state) => state.login.user)
const rolAlta = roles.find(e => e.rl_codigo === '1.7.18.1' || e.rl_codigo === '1')
const rolModificar = roles.find(e => e.rl_codigo === '1.7.18.2'||e.rl_codigo === '1')
const rolEliminar = roles.find(e => e.rl_codigo === '1.7.18.3' || e.rl_codigo === '1')
const [input, setInput] = useState({
  Codigo:'',
  Nombre:'',
  Activo: '',
})

const [pageHistory, setPageHistory] = useState('')

/*GET API SUPERVISORES*/
useEffect(() => {
  
  Promise.all(dispatch(getSupervisores()), dispatch(reset()))
  }, [dispatch])

 const {supervisores, supervisoresById, statusNuevoSupervisor} = useSelector(
    (state) => state.supervisores)
    const {user, } = useSelector(
      (state) => state.login)
    
    /*-------------------------SWAL ALERTS--------------------------*/ 
    useEffect(() => {
      setPageHistory(pageIndex)
      if(statusNuevoSupervisor.length && statusNuevoSupervisor[0]?.status === true){
          Swal.fire({
              icon: 'success',
              title: statusNuevoSupervisor[0]?.data,
              showConfirmButton: false,
              timer: 5000
            })
            navigate('/supervisores')
            dispatch(reset())
            window.location.reload()
      }else if(statusNuevoSupervisor.length && statusNuevoSupervisor[0]?.status === false){
       Swal.fire({
              icon: 'error',
              title: 'Oops...',
              showConfirmButton: true,
              
              text: statusNuevoSupervisor[0]?.data
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload()
                
              } 
          })
            
      }}, [statusNuevoSupervisor])
    
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
        Header: <div >Es Micro</div>,
        ShortHeader: "Es Micro",
        accessor: "EsMiniEmprendedor",
        Cell: ({ value }) => <div style={{ textIndent: "15px"}}><input   type="checkbox" className={styles.checkbox} checked={value === 0  
                              ?false
                              :true}/></div> ,
        Filter: ActiveFilter
      },
      {
        Header: <div >V. Promedio Móvil </div>,
        ShortHeader: "V. Promedio...",
        accessor: "ValorPromedioMovil",
        Cell: ({ value }) => <div style={{  textAlign:"end", marginRight:"3rem"}}>{value}</div>,
        Filter: <div className={styles.filter} style={{border:'none', paddingTop:"1.56em"}} ></div>,
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
        Cell: (value) => (rolModificar ? <button  style={{background:"burlywood"}} onClick={()=>(console.log(pageIndex), navigate(`/modificarSupervisores/${value.value}`))}
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
              dispatch(deleteSupervisores({Codigo: value.value, HechoPor:user.username}))
              
            }
          })
          
      })} 
        className={styles.buttonRows} >  Eliminar</button>
        :<button style={{background:"silver"}} className={styles.buttonRows} disabled>Eliminar</button> ),
      },
      
    ],
    []
  );
  const tableInstance = useTable({ columns: columns, data: supervisores, initialState:{pageSize:15, pageIndex:JSON.parse(localStorage.getItem('pageIndex')) } },    
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
  const handleModify = async () =>{
    window.localStorage.setItem("pageIndex",JSON.stringify(pageIndex))
     
  }
  
/*RENDER PAGINA SUPERVISORES*/
  return (
    <div className={styles.container}>
      <div className={styles.title}>
      <span className={styles.titleContainer}>
      <TitleLogo>
        <div>
          <span>{empresaReal}</span>
          <ReturnLogo empresa={empresaReal}/>
        </div>
        <TitlePrimary>Supervisores</TitlePrimary>
        </TitleLogo>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>

          <div className={styles.buttonContainer}>
          { rolAlta ? 
          <> <button onClick={()=> (window.localStorage.setItem("pageIndex",JSON.stringify(pageHistory)), navigate('/altaSupervisores'))}   className={styles.buttonLeft} >Nuevo</button>
            <ExportCSV csvData={supervisores} fileName={'supervisores'} /></>
            : <><button onClick={()=>navigate('/altaSupervisores')}   className={styles.buttonLeft} disabled>Nuevo</button>
            <button className={styles.buttonRight}  disabled >Excel</button></>
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
          {pageIndex + 1 } de {pageOptions.length}
        </strong>{' '}
        </span>
        <button className={styles.pageButton} onClick={()=> (previousPage(), setPageHistory(prevState=>prevState-1), window.localStorage.setItem("pageIndex",JSON.stringify(pageHistory-1)) ) } disabled={!canPreviousPage} >Anterior</button>
        <button className={styles.pageButton} onClick={()=> (nextPage(), setPageHistory(prevState=>prevState+1), window.localStorage.setItem("pageIndex",JSON.stringify(pageHistory+1))) } disabled={!canNextPage} >Siguiente</button>
      </div>
        </>
       </TableContainer>
       
       </div>
    </div>
  )
}

export default SupervisoresTable