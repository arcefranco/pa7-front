import React, {useEffect, useMemo, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { deleteGerentes, getGerentes, getGerentesById, postGerentes, updateGerentes, } from '../../reducers/Gerentes/gerentesSlice'
import TableContainer from './TableContainer'
import { useFilters, useRowSelect, } from 'react-table'
import ActiveFilter from './ActiveFilter'
import { useTable } from 'react-table'
import styles from './Gerentes.module.css'
import {FcApproval, FcCancel, FcSurvey, FcDataSheet} from 'react-icons/fc'
import {BiPencil, BiXCircle, BiLogOut } from 'react-icons/bi'
import { Checkbox } from './Checkbox'
import {Link, useNavigate} from 'react-router-dom'

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
  /*----------------------HANDLE CHANGE DEL FORM------------------------------------ */
  const HandleChange =  (e) =>{
  
    
    const {name , value} = e.target
    console.log(value, name)
    const newForm = {...input,
      [name]:value,
      }
    
    setInput(newForm )
    
  }
  const handleCheckChange = (e) => {
    const { name} = e.target;
    var value = e.target.checked
    value = e.target.checked? 1 : 0
    const newForm = { ...input, [name]: value };
    setInput(newForm);
};
/*---------------------------------HANDLE SUBMIT FUNCION INSERT---------------------------------*/
const HandleSubmitInsert = async (event) =>{
event.preventDefault()
console.log(input)
dispatch(postGerentes(input))
navigate('/gerentes')
}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate =async (event) =>{
  event.preventDefault()
  console.log(input)
  navigate('/gerentes')
  dispatch(updateGerentes(input))
  setInput({
    Codigo:'',
  Nombre:'',
  Activo: '',
  })
  
  }

 
  /*---------------------------------HANDLE FUNCION DELETE ---------------------------------*/
const HandleDelete = (value) =>{
  //  event.preventDefault()
  // var name = event.target.name
  // var value = event.target.value
  // var json = JSON.stringify(selected)
  console.log(value)

  // dispatch(deleteGerentes(selectedRows))
  // navigate('/gerentes')
  // dispatch(reset())
   }

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
        // Filter: ActiveFilter
      },
      {
        Header: "Nombre",
        accessor: "Nombre",
        Filter: ActiveFilter
      },
      {
        Header: "Activo",
        accessor: "Activo",
        Cell: ({ value }) => <input type="checkbox" className={styles.checkbox} checked={value === 0  
                              ?false
                              :true}/> ,
        Filter: ActiveFilter
      },
      {
        Header: "Modificar",
        accessor: "Codigo" , 
        id:'Modificar',
  //       Cell: (value) => <button onClick={(()=>
  //         {toggleModificar();
  //         dispatch(getGerentesById(value.value));
          
  //         console.log(value.value, dispatch(getGerentesById(value.value)) )}        
  // )} className={styles.buttonRows} disabled={modificar || nuevo} ><BiPencil style={{color:"brown"}}/>Modificar</button>,
  //     },
  Cell: (value) => <button onClick=  {(()=> navigate(`/modificarGerentes/${value.value}`))}
  className={styles.buttonRows} disabled={modificar || nuevo} ><BiPencil style={{color:"brown"}}/>Modificar</button>,
        },
      {
        Header: "Eliminar",
        accessor: "Codigo",
        id:'Eliminar',
        Cell: (value) =>  <button onClick={(()=>{
          
          let respuesta = window.confirm("Desea eliminar el campo?");
          if(respuesta == true){
          dispatch(deleteGerentes({Codigo: value.value}))
          window.location.reload()}
      })} 
        className={styles.buttonRows} disabled={modificar || nuevo} ><BiXCircle style={{color:"rgb(232, 76, 76)"}}/>Eliminar</button>,
        // Filter: ActiveFilter,
      },
      
    ],
    []
  );
  const tableInstance = useTable({ columns: columns, data: gerentes }, useFilters, useRowSelect, 
    // // ----------------------------CHECKBOX ROW SELECT-----------------------------------
    // (hooks) => {
    //   hooks.visibleColumns.push((columns)=> {
    //     return[
    //       {
    //       id:'selection',
          
    //       Cell:({row}) => <Checkbox {...row.getToggleRowSelectedProps()}/>, 
    //       },
    //        ...columns 
    //     ]
    //   })
    // }
    );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;
  
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
      <h1>Gerentes</h1>
     <div>
      {/*POSIBLE UBICACION DE INPUT RADIO FILTER DE TABLA*/}
     </div>
      </div>
      <TableContainer>
        <>
        <div className={styles.scrollbar}>
        <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}
                {/* <i>{column.canFilter ? column.render('Filter') : null}</i> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
        </>
       </TableContainer>
       {/* <pre>
       <code>
            {JSON.stringify(
              {
                selectedFlatRows:selectedFlatRows.map((row) => row.original),
              },
              null,
              2
            )}
          </code>
        </pre>  */}

       <div className={styles.buttonContainer}>
         <button onClick={()=>navigate('/modificarGerentes')}   className={styles.buttonLeft} disabled={modificar || nuevo}><FcSurvey/>Nuevo</button>
         <button className={styles.buttonRight} disabled={modificar || nuevo}><FcDataSheet/>Excel</button>
         <Link to="/" className={styles.buttonRight} disabled={modificar || nuevo}><button><BiLogOut/>Salir</button></Link>
        </div>   
    </div>
  )
}

export default GerentesTable