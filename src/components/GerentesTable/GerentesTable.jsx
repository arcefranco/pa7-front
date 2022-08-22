import React, {useEffect, useMemo, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { deleteGerentes, getGerentes, getGerentesById, postGerentes, updateGerentes, } from '../../reducers/Gerentes/gerentesSlice'
import TableContainer from './TableContainer'
import { useFilters, usePagination,useSortBy} from 'react-table'
import ActiveFilter from './ActiveFilter'
import { useTable } from 'react-table'
import styles from './Gerentes.module.css'
import {FcApproval, FcCancel, FcSurvey, FcDataSheet} from 'react-icons/fc'
import {BiPencil, BiTrash, BiLogOut } from 'react-icons/bi'
import { Checkbox } from './Checkbox'
import {Link, useNavigate} from 'react-router-dom'
import ReactTooltip from 'react-tooltip';

/*FUNCION DEL COMPONENTE*/
const GerentesTable = () => {
const [nuevo, setNuevo] = useState(false);
const toggleNuevo = () => setNuevo(!nuevo);
const [modificar, setModificar] = useState(false);
const toggleModificar = () => setModificar(!modificar);
const dispatch = useDispatch();
const [lastCode, setLastCode ] = useState({});
const navigate = useNavigate();
const [form, setForm] = useState({
  Codigo:'',
  Nombre:'',
  Activo: '',
});
const [input, setInput] = useState({
  Codigo:'',
  Nombre:'',
  Activo: '',
})


/*GET API GERENTES*/
useEffect(() => {
  dispatch(getGerentes())
  }, [dispatch])

 const {gerentes, gerentesById} = useSelector(
    (state) => state.gerentes)
    
   
    
// /*LAST OBJECT OF THE GERENTES ARRAY  */
//     var lastObject =useMemo( () => gerentes[(gerentes.length)-1])
//       // setLastCode()    
//     console.log(lastObject?.Codigo)
 
  /*GERENTES TABLEDATA*/ 
  const columns = useMemo(
    () => [
      {
        Header: "Código",
        accessor: "Codigo",
        Cell: ({ value }) => <strong  >{value}</strong>,
        Filter: ActiveFilter,
        
      },
      {
        Header: "Nombre",
        accessor: "Nombre",
        Filter: ActiveFilter
      },
      {
        Header: "Activo",
        accessor: "Activo",
        Cell: ({ value }) => <input  type="checkbox" className={styles.checkbox} checked={value === 0  
                              ?false
                              :true}/> ,
        Filter: ActiveFilter
      },
      {
        Header: "",
        accessor: "Codigo" , 
        id:'Modificar',
        disableSortBy: true,
        Filter: false,
        Cell: (value) => <button data-tip="Modificar" data-effect="solid" data-place="right"  style={{background:"burlywood"}} onClick=  {(()=> navigate(`/modificarGerentes/${value.value}`))}
        className={styles.buttonRows} disabled={modificar || nuevo} ><ReactTooltip /><BiPencil style={{color:"white"}}/></button>,
              },
      {
        Header: "",
        accessor: "Codigo",
        id:'Eliminar',
        disableSortBy: true,
        Filter: false,
        Cell: (value) =>  <button data-tip="Eliminar" data-effect="solid" data-place="right"   style={{background:"red"}} onClick={(()=>{
          
          let respuesta = window.confirm("Desea eliminar el campo?");
          if(respuesta == true){
          dispatch(deleteGerentes({Codigo: value.value}))
          window.location.reload()}
      })} 
        className={styles.buttonRows} disabled={modificar || nuevo} ><ReactTooltip /><BiTrash style={{color:"white"}}/></button>,
      },
      
    ],
    []
  );
  const tableInstance = useTable({ columns: columns, data: gerentes },    useFilters, useSortBy, usePagination
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
    state,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;
  const {pageIndex} = state


  useEffect(() => {
    setInput({
      Codigo: gerentesById?.Codigo,
      Nombre: gerentesById?.Nombre,
      Activo: gerentesById?.Activo,
    });
  }, [gerentesById]);
  
  
/*RENDER PAGINA GERENTES*/
  return (
    <div className={styles.container}>
      <div className={styles.gerentesTitle}>
      <h3>Gerentes</h3>
     <div>
      {/*POSIBLE UBICACION DE INPUT RADIO FILTER DE TABLA*/}
     </div>
      </div>
      <div className={styles.buttonContainer}>
         <button onClick={()=>navigate('/modificarGerentes')}   className={styles.buttonLeft} disabled={modificar || nuevo}><FcSurvey/>Nuevo</button>
         <button className={styles.buttonRight} disabled={modificar || nuevo}><FcDataSheet/>Excel</button>
         <Link to="/" className={styles.buttonRight} disabled={modificar || nuevo}><button><BiLogOut/>Salir</button></Link>
        </div> 
      <TableContainer>
        <>
        <div className={styles.scrollbar}>
        <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th >
                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>{column.isSorted? (column.isSortedDesc? ' ▼' : '▲'  ): ''}</span>
                </div>
                {/* {column.canFilter? <div>O</div> : null} */}
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
      <div>
        <span>Página {' '}
        <strong>
          {pageIndex + 1} de {pageOptions.length}
        </strong>{' '}
        </span>
        <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Anterior</button>
        <button onClick={()=> nextPage()} disabled={!canNextPage}>Siguiente</button>
      </div>
        </div>
        </>
       </TableContainer>
    </div>
  )
}

export default GerentesTable