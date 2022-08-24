import React, {useEffect, useMemo, useState, useRef} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { deleteSupervisores, getSupervisores, getSupervisoresById, postSupervisores, updateSupervisores, } from '../../reducers/Supervisores/supervisoresSlice.js'
import TableContainer from '../GerentesTable/TableContainer'
import { useFilters, usePagination,useSortBy} from 'react-table'
import {ActiveFilter, SearchFilter} from '../GerentesTable/ActiveFilter'
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
        accessor: "Codigo",
        Cell: ({ value }) => <div style={{ textIndent: "40px" }}><strong  >{value}</strong></div>,
        Filter: ActiveFilter,
        
      },
      {
        Header: "Nombre",
        accessor: "Nombre",
        Filter: SearchFilter
      },
      {
        Header: "Email",
        accessor: "Email",
        Filter: ActiveFilter
      },
      {
        Header: "Gerente",
        accessor: "Gerente",
        Filter: ActiveFilter
      },
      {
        Header: "Es Micro Emprendedor",
        accessor: "EsMiniEmprendedor",
        Cell: ({ value }) => <div style={{ textIndent: "15px" }}><input   type="checkbox" className={styles.checkbox} checked={value === 0  
                              ?false
                              :true}/></div> ,
        Filter: ActiveFilter
      },
      {
        Header: "Valor Promedio Movil Micro Emp.",
        accessor: "ValorPromedioMovil",
        Filter: ActiveFilter
      },
      {
        Header: "Activo",
        accessor: "Inactivo",
        Cell: ({ value }) => <div style={{ textIndent: "15px" }}><input   type="checkbox" className={styles.checkbox} checked={value === 1  
                              ?false
                              :true}/></div> ,
        Filter: ActiveFilter
      },
      {
        Header: "Zona",
        accessor: "Zona",
        Filter: ActiveFilter
      },
      {
        Header: "",
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
  const tableInstance = useTable({ columns: columns, data: supervisores },    
    useFilters, useSortBy, usePagination
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
    console.log(supervisores)
    setInput({
      Codigo: supervisoresById?.Codigo,
      Nombre: supervisoresById?.Nombre,
      Activo: supervisoresById?.Activo,
    });
  }, [supervisoresById]);

  
/*RENDER PAGINA SUPERVISORES*/
  return (
    <div className={styles.container}>
      <div className={styles.title}>
      <span style={{display:"flex"}}>
      <h3>Supervisores</h3>
      <div className={styles.buttonContainer}>
      { rolAlta ? 
       <> <button onClick={()=>navigate('/altaSupervisores')}   className={styles.buttonLeft} ><FcSurvey/>Nuevo</button>
         <ExportCSV csvData={supervisores} fileName={'supervisores'} /></>
        : <><button onClick={()=>navigate('/altaSupervisores')}   className={styles.buttonLeft} disabled><FcSurvey/>Alta Supervisores</button>
        <button className={styles.buttonRight}  disabled ><FcDataSheet/>Exportar Excel</button></>
         } </div> 
      </span>
     <div>
      {/*POSIBLE UBICACION DE INPUT RADIO FILTER DE TABLA*/}
     </div>
      
      
      <TableContainer>
        <>
        <div className={styles.scrollbar}>
        <table {...getTableProps()} >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th >
                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                 
                  <span > {column.render("Header")}{column.isSorted? (column.isSortedDesc? ' ▼' : '▲'  ): ''}</span>
                
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
        </>
       </TableContainer>
       </div>
    </div>
  )
}

export default SupervisoresTable