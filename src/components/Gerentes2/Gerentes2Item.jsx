import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGerentesById, postGerentes, updateGerentes, reset, endUpdate, deleteGerentes} from '../../reducers/Gerentes/gerentesSlice';
import styles from '../GerentesTable/Gerentes.module.css'


const Gerentes2Item = ({Codigo, Nombre, Activo}) => {

const [item, setItem] = useState({
    Codigo: Codigo,
    Nombre: Nombre,
    Activo: Activo
})
const {user} = useSelector(
    (state) => state.login)
const {gerentes, gerentesById,statusNuevoGerente} = useSelector(
        (state) => state.gerentes)

const dispatch = useDispatch()

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
  
  
    dispatch(updateGerentes(item))
}


    return (
        <tr>
        <td>{Codigo}</td>
        <td><input type="text" style={{background: 'none',
            border: 'none'}}  name="Nombre" value={item.Nombre} onChange={HandleChange} /></td>


        <td>
            
         <input name="Activo" type="checkbox"value={item.Activo} checked={item.Activo === 1 ? true : false} onChange={handleCheckChange}/> 
            
            </td>
        <td style={{width: '21rem'}}>
            {
            item.Activo === Activo && item.Nombre === Nombre ?
    
                
            <button style={{background:'gray', width: '117px'}} disabled className={styles.buttonRows}>Modificar</button> 

                                                                                                                        :
            <button style={{background:'#3dc254bf', cursor: 'pointer', width: '117px'}} className={styles.buttonRows} 
            onClick={(e) => HandleSubmitUpdate(e)}
            >Modificar</button> 
            }
        
        {
                    statusNuevoGerente[0]?.status === true && statusNuevoGerente[0]?.codigo === Codigo ? <span>{statusNuevoGerente[0].data}</span> :
                    null
                }
            
        
        </td>
        <td style={{width: '5rem'}}>
            <button style={{background:"red", cursor: 'pointer', width: '48px'}} onClick={() => dispatch(deleteGerentes({Codigo: Codigo}))} className={styles.buttonRows}>Eliminar</button>
        </td>

    </tr>
    )
}

export default Gerentes2Item