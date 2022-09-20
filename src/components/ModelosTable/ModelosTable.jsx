import React, {useEffect, useMemo, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllModelos, reset, deleteModelos, getAllTipoPlan  } from '../../reducers/Modelos/modelosSlice';
import TableContainer from '../GerentesTable/TableContainer';
import { Link, useNavigate } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import { useTable, useSortBy, usePagination, useGlobalFilter} from 'react-table';
import styles from '../GerentesTable/Gerentes.module.css';
import Swal from 'sweetalert2';
import { ExportCSV } from '../../helpers/exportCSV';
import { GlobalFilter } from '../UsuariosTable/GlobalFilter';
import './modelos.module.css';
import ModelosContainer from './ModelosContainer';

const ModelosTable = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const {roles} = useSelector((state) => state.login.user)
const rolAltayModif = roles.find(e => e.rl_codigo === '1.2.2' || e.rl_codigo === '1')




  const {modelos, tipoPlan ,modeloStatus} = useSelector(
    (state) => state.modelos)
  
    

    
    // const saveState = () => {
    //   const { tipoPlan } = useSelector(
    //     (state) => state.modelos)
      
    //   let TipoPlan = tipoPlan
    //   try {
    //     const serializedState = JSON.stringify(TipoPlan);
    //     localStorage.setItem('state', serializedState);
    //   } catch (e) {
    //     // Ignore write errors;
    //   }
    // };
    // const loadState = () => {
    //   try {
    //     const serializedState = localStorage.getItem('state');
    //     if(serializedState === null) {
    //       return undefined;
    //     }
    //     return JSON.parse(serializedState);
    //   } catch (e) {
    //     return undefined;
    //   }
    // };
    
    // const persistedState = loadState();
    
    // store.subscribe(() => {
    //   saveState(store.getState());
    // });
    
    // const store = createStore(
    //   persistedState,
    //   // Others reducers...
    // );
    useEffect(() => {

      Promise.all([
        dispatch(reset()),dispatch(getAllModelos()), dispatch(getAllTipoPlan()),   
      ])  
      
    }, [dispatch])
  


    useEffect(() => {
      // setPageHistory(pageIndex)
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

 



      const columns =  /*useMemo( ()=> */[
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
        Header: "Origen",
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
    ]
    // ,[]
  // )
  ;
   tipoPlan?.map((key) =>{
    columns.push({
      Header: key.Descripcion,
      accessor: key.Descripcion,
      Filter: false,
      columns:[
      {Header:"Cuota Terminal",
      accessor:"CuotaTerminal_" + key.ID,
      Filter: false,
      Cell:({value})=><div className={"Plan_" + key.ID} style={{textAlign:"right"}}>{value}</div>
      },
      {Header:"Cuota A",
      accessor:"CuotaACobrar_" + key.ID,
      Filter: false,
      Cell:({value})=><div className={"Plan_" + key.ID} style={{textAlign:"right"}}>{value}</div>
      },
      {Header:"Cuota B",
      accessor:"CuotaACobrarA_" + key.ID,
      Filter: false,
      Cell:({value})=><div className={"Plan_" + key.ID} style={{textAlign:"right"}}>{value}</div>
      },
      {Header:"Cuota 1",
      accessor:"Cuota1_" + key.ID,
      Filter: false,
      Cell:({value})=><div className={"Plan_" + key.ID} style={{textAlign:"right"}}>{value}</div>
      },
      {Header:"Cuota 2",
      accessor:"Cuota2_" + key.ID,
      Filter: false,
      Cell:({value})=><div className={"Plan_" + key.ID} style={{textAlign:"right"}}>{value}</div>
      },
    ],
    })
    
    }
    ) 
  
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
      })
      

      const columns2 = useMemo(()=>columns)

 

  return (
   <ModelosContainer columns={columns2}  modelos={modelos}/>

  )
}

export default ModelosTable