import React, {useState} from "react";
import { useDispatch  } from "react-redux";
import { updateGerentes, deleteGerentes} from '../../reducers/Gerentes/gerentesSlice';
import styles from './Gerentes.module.css'


const Gerentes2Item = ({Codigo, Nombre, Activo}) => {

const [item, setItem] = useState({
    Codigo: Codigo,
    Nombre: Nombre,
    Activo: Activo
})

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
        <td>
            
        <input type="text" className={styles.inputFilter} name="Nombre" value={item.Nombre} onChange={HandleChange} />
            
        </td>


        <td>
            
         <input name="Activo" type="checkbox"value={item.Activo} checked={item.Activo === 1 ? true : false} onChange={handleCheckChange}/> 
            
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