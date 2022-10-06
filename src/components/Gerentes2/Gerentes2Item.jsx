import React, {useState} from "react";
import { useDispatch, useSelector  } from "react-redux";
import * as AiIcons from 'react-icons/ai'
import { updateGerentes, deleteGerentes, beginUpdate, endUpdate, resetGerenteById} from '../../reducers/Gerentes/gerentesSlice';
import styles from '../../styles/Table.module.css'
import { useEffect } from "react";


const Gerentes2Item = ({Codigo, Nombre, Activo}) => {

const [item, setItem] = useState({
    Codigo: Codigo,
    Nombre: Nombre,
    Activo: Activo
})

const {gerentesById, statusNuevoGerente} = useSelector(state => state.gerentes)

const [edit, setEdit] = useState(false)

const dispatch = useDispatch()

useEffect(() => {
    if(gerentesById?.status === false){
       setEdit(false)
    }
}, [gerentesById])

 useEffect(() => {

    if((gerentesById?.status === true) && (gerentesById?.codigo !== Codigo) && edit){
        setEdit(false)
        dispatch(endUpdate({Codigo: Codigo}))
    }

    return () => {
        if((gerentesById?.status === true) && (gerentesById?.codigo !== Codigo) && edit){
            setEdit(false)
            dispatch(endUpdate({Codigo: Codigo}))
        }
    }

}, [gerentesById])

useEffect(() => {
    
    if(statusNuevoGerente && statusNuevoGerente.length){
        setEdit(false)
        
    } 
    
}, [statusNuevoGerente]) 

const HandleChange =  (e) =>{
  
    
    const {name , value} = e.target
    const newForm = {...item,
      [name]:value,
      }
    
    setItem(newForm)
    
  }

  const handleCheckChange = (e) => {
    const { name} = e.target;
    var value = e.target.checked
    value = e.target.checked? 1 : 0
    const newForm = { ...item, [name]: value };
    setItem(newForm);
};

const HandleSubmitUpdate =async (event) =>{
    event.preventDefault()
    
    Promise.all([dispatch(resetGerenteById()),  dispatch(updateGerentes(item))])
  
   
}

const handleEdit = () => {
    dispatch(beginUpdate({Codigo: Codigo}))
    setEdit(true)
}

    return (
        <tr>
        <td>{Codigo}</td>
        <td style={{ width: '30rem'}}>

             {
                (edit && gerentesById && gerentesById.status === true) ? <span style={{width: '5rem'}}><input type="text" className={styles.inputFilter} name="Nombre" value={item.Nombre} onChange={HandleChange} /></span>  :
                <span style={{width: '5rem'}}>{item.Nombre}</span>
             }
            
        
            
        </td>


        <td>

            {
                (edit && gerentesById && gerentesById.status === true)  ? <input name="Activo" type="checkbox"value={item.Activo} checked={item.Activo === 1 ? true : false} onChange={handleCheckChange}/> : 
                <input name="Activo" type="checkbox" disabled checked={item.Activo === 1 ? true : false} onChange={handleCheckChange}/>
            }
            
          
            
            </td>

            <td>
                {
                    !edit ? <AiIcons.AiFillEdit style={{marginLeft: '0.5rem', cursor: 'pointer'}} onClick={handleEdit}/> : 
                    <AiIcons.AiFillCloseCircle style={{color: 'red', marginLeft: '0.5rem', cursor: 'pointer'}} onClick={() =>{
                        dispatch(endUpdate({Codigo: Codigo}))
                        setEdit(false)}}/>
                }
            
            </td>
        <td>
            {
            item.Activo === Activo && item.Nombre === Nombre ?
    
                
            <button disabled className={`${styles.buttonRows} ${styles.disabled}`}>Modificar</button> 

                                                                                                                        :
            <button className={`${styles.buttonRows} ${styles.modify}`} 
            onClick={(e) => HandleSubmitUpdate(e)}>
                Modificar
            </button> 
            }
            
        
        </td>
        <td>
            <button onClick={() => dispatch(deleteGerentes({Codigo: Codigo}))} className={`${styles.buttonRows} ${styles.delete}`}>
                Eliminar
            </button>
        </td>

    </tr>
    )
}

export default Gerentes2Item