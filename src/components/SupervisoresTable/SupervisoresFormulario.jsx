import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import styles from '../UsuariosTable/AltaUsuarios.module.css';
import {FcApproval} from 'react-icons/fc'
import {Link, useNavigate} from 'react-router-dom';
import { getSupervisoresById, postSupervisores, updateSupervisores } from '../../reducers/Supervisores/supervisoresSlice';


const GerentesFormulario = () =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {supervisoresById} = useSelector(
        (state) => state.supervisores)
        
    useEffect(() => {
    if(id) {  
        dispatch(getSupervisoresById(id))
        }
  }, [id])
    
    const [input, setInput] = useState({
      Codigo:'',
      Nombre:'',
      Activo: '',
    })

    useEffect(() => {
        setInput({

          Codigo: supervisoresById?.Codigo,
          Nombre: supervisoresById?.Nombre,
          Activo: supervisoresById?.Inactivo,
          Email: supervisoresById?.Email,
          Gerente: supervisoresById?.Gerente,
          EsMiniEmprendedor: supervisoresById?.EsMiniEmprendedor,
          ValorPromedioMovil: supervisoresById?.ValorPromedioMovil,
          Zona: supervisoresById?.Zona,

        });
      }, [supervisoresById]);


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
dispatch(postSupervisores(input))
navigate('/supervisores')
window.location.reload()
}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate =async (event) =>{
  event.preventDefault()
  console.log(input)
  dispatch(updateSupervisores(input))
  navigate('/supervisores')
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
  {/*--------------------------------------SUPERVISORES FORMS--------------------------------------------------  */}
 <form action=""  className={styles.form}>
 <div className={styles.titleContainer}>
                <h3 className={styles.title}>{id?.length ? 'Modificar Supervisores' : 'Alta de Supervisores'}</h3>
                <Link to={'/supervisores'}><button style={{marginRight: '4rem', width:'9rem'}} className={styles.btn} >Volver</button></Link>
            </div>
            <div className={styles.col1}>
 {id?.length  &&
 <>
    <label>Codigo</label><input type="text" style={{width:"6rem", textAlign:"center" }} name="Codigo" onChange={HandleChange} value={input.Codigo} disabled /></>}
    <label>Nombre</label><input type="text" style={{width:"15rem", textAlign:"center" }} name="Nombre" onChange={HandleChange} 
   value={input.Nombre} />
   <label>Email</label><input type="text" style={{width:"15rem", textAlign:"center" }} name="Nombre" onChange={HandleChange} 
   value={input.Email} />
   <label>Gerente</label><input type="text" style={{width:"15rem", textAlign:"center" }} name="Nombre" onChange={HandleChange} 
   value={input.Gerente} />
   <label>Activo</label><input type="checkbox" name="Activo" onChange={handleCheckChange} value={input.Activo} checked={input.Activo == 0}/>
   <label>Valor Promedio Movil Micro Emp.</label><input type="text" style={{width:"15rem", textAlign:"center" }} name="Nombre" onChange={HandleChange} 
   value={input.ValorPromedioMovil} />
   <label>Es Micro Emprendedor</label><input type="checkbox" name="EsMiniEmprendedor" onChange={handleCheckChange} value={input.EsMiniEmprendedor} checked={input.EsMiniEmprendedor}/>  
   <label>Zona</label><input type="text" style={{width:"15rem", textAlign:"center" }} name="Nombre" onChange={HandleChange} 
   value={input.Zona} />
   </div>
   {
                    id?.length? <button className={styles.btn} type="submit"  onClick={HandleSubmitUpdate}><FcApproval/>Actualizar</button>
                    : <button className={styles.btn} type="submit" onClick={HandleSubmitInsert}><FcApproval/>Enviar</button>
                }
                   
 </form>
                </div>
)
}

export default GerentesFormulario