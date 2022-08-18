import React, {useEffect, useMemo, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getGerentes, postGerentes, updateGerentes } from '../../reducers/Gerentes/gerentesSlice'
import TableContainer from './TableContainer'
import { useFilters, useRowSelect } from 'react-table'
import ActiveFilter from './ActiveFilter'
import { useTable } from 'react-table'
import styles from './Gerentes.module.css'
import {FcApproval, FcCancel, FcSurvey, FcDataSheet} from 'react-icons/fc'
import {BiPencil, BiXCircle, BiLogOut } from 'react-icons/bi'
import { Checkbox } from './Checkbox'

/*FUNCION DEL COMPONENTE*/
const GerentesTable = () => {
const [form, setForm] = useState("");
const [nuevo, setNuevo] = useState(false)
const toggleNuevo = () => setNuevo(!nuevo)
const [modificar, setModificar] = useState(false)
const toggleModificar = () => setModificar(!modificar)
const dispatch = useDispatch()
const [lastCode, setLastCode ] = useState({})

/*GET API GERENTES*/
  useEffect(() => {
  dispatch(getGerentes())
  }, [dispatch])

  /*----------------------HANDLE CHANGE DEL FORM------------------------------------ */
  const HandleChange = (event) =>{
  
    const name = event.target.name;
    const value = event.target.value;
    const check = event.target.checked;
    console.log(value, name, check)
    setForm(
      {...form,
      [name]:value,
      'Activo':check,
    } )
    
  }
/*---------------------------------HANDLE SUBMIT FUNCION INSERT---------------------------------*/
const HandleSubmitInsert = (event) =>{
event.preventDefault()
dispatch(postGerentes(form))
}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate = (event) =>{
  event.preventDefault()
  dispatch(updateGerentes())
  }

 const {gerentes} = useSelector(
    (state) => state.gerentes)
/*LAST OBJECT OF THE GERENTES ARRAY  */
    var lastObject =useMemo( () => gerentes[(gerentes.length)-1])
      // setLastCode()    
    console.log(lastObject?.Codigo)
 
  /*GERENTES TABLEDATA*/ 
  const columns = useMemo(
    () => [
      {
        Header: "Código",
        accessor: "Codigo",
        
        Cell: ({ value }) => <strong  >{value}</strong>,
        Filter: ActiveFilter
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
        Cell: ({row}) => <button onClick={toggleModificar} className={styles.buttonRows} disabled={modificar || nuevo} {...row.getToggleRowSelectedProps()} ><BiPencil style={{color:"brown"}}/>Modificar</button>,
      },
      {
        Header: "Eliminar",
        Cell: ({row}) =>  <button className={styles.buttonRows} disabled={modificar || nuevo} {...row.getToggleRowSelectedProps()}><BiXCircle style={{color:"rgb(232, 76, 76)"}}/>Eliminar</button>,
      },
    ],
    []
  );
  const tableInstance = useTable({ columns: columns, data: gerentes }, useFilters, useRowSelect,
    // ----------------------------CHECKBOX ROW SELECT-----------------------------------
    (hooks) => {
      hooks.visibleColumns.push((columns)=> {
        return[
          {
          id:'selection',
          
          Cell:({row}) => <Checkbox {...row.getToggleRowSelectedProps()}/>, 
          },
           ...columns 
        ]
      })
    });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;
  
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
              <tr {...row.getToggleRowSelectedProps()}  {...row.getRowProps()}>
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
       <form style={{display: nuevo ? "block" : "none" }} className={styles.formContainer} onSubmit={HandleSubmitInsert}>
          <label>Nombre</label><input type="text" style={{width:"20rem" }} name="Nombre" onChange={HandleChange} value={form.name} required />
          <input type="checkbox" name="Activo" onChange={HandleChange} value={form.activo} checked={form.activo}  /> <label>Activo</label>
          <button type='submit' ><FcApproval/>Aceptar</button>
          <button type='button' onClick={toggleNuevo}><FcCancel/>Cancelar</button>
        </form>
        <form style={{display: modificar ? "block" : "none" }} className={styles.formContainer}>
          <label>Codigo</label><input type="text" style={{width:"6rem" }} name="codigo" onChange={HandleChange} 
          value={selectedFlatRows.map((row) => row.original.Codigo)} disabled/>
          <label>Nombre</label><input type="text" style={{width:"20rem" }} name="gerente" onChange={HandleChange} 
          value={selectedFlatRows.map((row) => row.original.Nombre)} />
          <input type="checkbox" name="activo" onChange={HandleChange}  checked={selectedFlatRows.map((row) => row.original.Activo) == 0}/> <label>Activo</label>
          <button onClick={HandleSubmitUpdate}><FcApproval/>Aceptar</button>
          <button type='button' onClick={toggleModificar}><FcCancel/>Cancelar</button>
        </form>
       <div className={styles.buttonContainer}>
         <button onClick={toggleNuevo}   className={styles.buttonLeft} disabled={modificar || nuevo}><FcSurvey/>Nuevo</button>
         <button className={styles.buttonRight} disabled={modificar || nuevo}><FcDataSheet/>Excel</button>
         <button className={styles.buttonRight} disabled={modificar || nuevo}><BiLogOut/>Salir</button>
        </div>   
    </div>
  )
}

export default GerentesTable