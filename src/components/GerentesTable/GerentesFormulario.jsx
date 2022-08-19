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
    const [nuevo, setNuevo] = useState(false);
    const toggleNuevo = () => setNuevo(!nuevo);
    const [modificar, setModificar] = useState(false);
    const toggleModificar = () => setModificar(!modificar);
    const dispatch = useDispatch();
    const [lastCode, setLastCode ] = useState({});
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
        //   newGerenteBoolean: gerentesById.length ? 0 : 1, 
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

 
   



return(   
    <div className={styles.container}>
  {/*--------------------------------------GERENTES FORMS--------------------------------------------------  */}
 <form action=""  className={styles.formContainer}>
 
 <label>Codigo</label><input type="text" style={{width:"6rem" }} name="Codigo" onChange={HandleChange} value={input.Codigo} disabled />
 
   <label>Nombre</label><input type="text" style={{width:"20rem" }} name="Nombre" onChange={HandleChange} 
   value={input.Nombre} />
   <input type="checkbox" name="Activo" onChange={handleCheckChange} value={input.Activo} checked={input.Activo}/> <label>Activo</label>
   
   
 </form>
                {
                    id?.length? <button type="submit" onClick={HandleSubmitUpdate}><FcApproval/>Actualizar</button>
                    : <button type="submit" onClick={HandleSubmitInsert}><FcApproval/>Enviar</button>
                }
                <Link to="/gerentes"><button type='button' onClick={toggleModificar}><FcCancel/>Cancelar</button></Link>
 </div>
)
}

export default GerentesFormulario