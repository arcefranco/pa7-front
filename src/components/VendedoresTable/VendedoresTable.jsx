import React, {useEffect, useMemo, useState, useRef} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { deleteVendedores, getVendedores, reset } from '../../reducers/Vendedores/vendedoresSlice.js'
import TableContainer from '../GerentesTable/TableContainer'
import { useFilters, usePagination,useSortBy, useGlobalFilter} from 'react-table'
import {ActiveFilter, SearchFilter} from '../GerentesTable/ActiveFilter'
import { useTable } from 'react-table'
import styles from '../../styles/Table.module.css'
import { useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
import { ExportCSV } from '../../helpers/exportCSV';
import TitleLogo from '../../styled-components/containers/TitleLogo.js'
import TitlePrimary from '../../styled-components/h/TitlePrimary.js'
import { ReturnLogo } from '../../helpers/ReturnLogo.jsx'
/*FUNCION DEL COMPONENTE*/
const VendedoresTable = () => {
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
  
  Promise.all(dispatch(getVendedores()), dispatch(reset()))
  }, [dispatch])

 const {vendedores, vendedoresById, statusNuevoVendedor} = useSelector(
    (state) => state.vendedores)
    const {user, } = useSelector(
      (state) => state.login)
    
    /*-------------------------SWAL ALERTS--------------------------*/ 
    useEffect(() => {
      setPageHistory(pageIndex)
      if(statusNuevoVendedor.length && statusNuevoVendedor[0]?.status === true){
          Swal.fire({
              icon: 'success',
              title: statusNuevoVendedor[0]?.data,
              showConfirmButton: false,
              timer: 5000
            })
            navigate('/vendedores')
            dispatch(reset())
            window.location.reload()
      }else if(statusNuevoVendedor.length && statusNuevoVendedor[0]?.status === false){
       Swal.fire({
              icon: 'error',
              title: 'Oops...',
              showConfirmButton: true,
              
              text: statusNuevoVendedor[0]?.data
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload()
                
              } 
          })
            
      }}, [statusNuevoVendedor])
    
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
        Header: "Team Leader",
        ShortHeader:"Team Leader",
        accessor: "TeamLeader",
        Filter: SearchFilter
      },
      {
        Header: "Oficial Scoring",
        ShortHeader:"Oficial Scoring",
        accessor: "OficialScoring",
        Filter: SearchFilter
      },
      {
        Header: "Oficial Mora",
        ShortHeader:"Oficial Mora",
        accessor: "OficialMora",
        Filter: SearchFilter
      },
      {
        Header: "Categoria",
        ShortHeader:"Categoria",
        accessor: "Categoria",
        Filter: ActiveFilter
      },
      {
        Header: "Fecha Baja",
        ShortHeader:"Fecha Baja",
        accessor: "FechaBaja",
        Filter: ActiveFilter
      },
      {
        Header: "Escala",
        ShortHeader:"Escala",
        accessor: "Escala",
        Filter: ActiveFilter
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
        Header: "",
        ShortHeader:"",
        accessor: "Codigo" , 
        id:'Modificar',
        disableSortBy: true,
        Filter: false,
        Cell: (value) => (rolModificar ? <button  style={{background:'#3dc254bf'}} onClick=  {(()=> navigate(`/modificarVendedores/${value.value}`))}
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
              dispatch(deleteVendedores({Codigo: value.value, HechoPor:user.username}))
              
            }
          })
          
      })} 
        className={styles.buttonRows} >  Eliminar</button>
        :<button style={{background:"silver"}} className={styles.buttonRows} disabled>Eliminar</button> ),
      },
      
    ],
    []
  );
  const tableInstance = useTable({ columns: columns, data: vendedores, initialState:{pageSize:15, pageIndex:JSON.parse(localStorage.getItem('pageIndex'))} },    
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
      <TitleLogo>
        <div>
        <span>{empresaReal}</span>
        <ReturnLogo empresa={empresaReal}/>
        </div>
        <TitlePrimary>Vendedores</TitlePrimary>
        </TitleLogo>

          <div className={styles.buttonContainer}>
          { rolAlta ? 
          <> <button onClick={()=>navigate('/altaVendedores')}   className={styles.buttonLeft} >Nuevo</button>
            <ExportCSV csvData={vendedores} fileName={'vendedores'} /></>
            : <><button onClick={()=>navigate('/altaVendedores')}   className={styles.buttonLeft} disabled>Nuevo</button>
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
          {pageIndex + 1} de {pageOptions.length}
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

export default VendedoresTable