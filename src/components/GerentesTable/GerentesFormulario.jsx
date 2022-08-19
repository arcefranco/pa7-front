import React, {useEffect, useReducer, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import styles from './Gerentes.module.css';
import {FcApproval, FcCancel, FcSurvey, FcDataSheet} from 'react-icons/fc'
import {BiPencil, BiXCircle, BiLogOut } from 'react-icons/bi'  
import {Link, useNavigate} from 'react-router-dom';
import { deleteGerentes, getGerentes, getGerentesById, postGerentes, updateGerentes, reset,} from '../../reducers/Gerentes/gerentesSlice';


const GerentesFormulario = () =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {gerentesById} = useSelector(
        (state) => state.gerentes)
        
    useEffect(() => {
    if(id) {  
        dispatch(getGerentesById(id))
        }
  }, [id])
    
    const [input, setInput] = useState({
      Codigo:'',
      Nombre:'',
      Activo: '',
    })

    useEffect(() => {
        setInput({

          Codigo: gerentesById?.Codigo,
          Nombre: gerentesById?.Nombre,
          Activo: gerentesById?.Activo,
        });
      }, [gerentesById]);


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
window.location.reload()
}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate =async (event) =>{
  event.preventDefault()
  console.log(input)
  dispatch(updateGerentes(input))
  navigate('/gerentes')
  setInput({
    Codigo:'',
  Nombre:'',
  Activo: '',
  }
  )
  window.location.reload()
  
  }

 

return(   
    <div className={styles.container}>
  {/*--------------------------------------GERENTES FORMS--------------------------------------------------  */}
 <form action=""  className={styles.formContainer}>
 
 {id?.length  &&
 <>
    <label>Codigo</label><input type="text" style={{width:"6rem", textAlign:"center" }} name="Codigo" onChange={HandleChange} value={input.Codigo} disabled /></>}
 
   <label>Nombre</label><input type="text" style={{width:"15rem", textAlign:"center" }} name="Nombre" onChange={HandleChange} 
   value={input.Nombre} />
   <label>Activo</label><input type="checkbox" name="Activo" onChange={handleCheckChange} value={input.Activo} checked={input.Activo}/> 
   {
                    id?.length? <button type="submit"  onClick={HandleSubmitUpdate}><FcApproval/>Actualizar</button>
                    : <button type="submit" onClick={HandleSubmitInsert}><FcApproval/>Enviar</button>
                }
                <button type='button' onClick={()=>{
                    navigate('/gerentes')
                    window.location.reload()}}><FcCancel/>Cancelar</button>

   
 </form>
                </div>
)
}

export default GerentesFormulario