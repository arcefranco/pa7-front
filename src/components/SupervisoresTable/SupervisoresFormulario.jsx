import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import styles from '../UsuariosTable/AltaUsuarios.module.css';
import validateEmail from "../../helpers/validateEmail";
import {FcApproval} from 'react-icons/fc'
import {Link, useNavigate} from 'react-router-dom';
import { getSupervisoresById, postSupervisores, updateSupervisores,getAllGerentes,getAllZonas, reset } from '../../reducers/Supervisores/supervisoresSlice';


const SupervisoresFormulario = () =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({})

    const {supervisoresById, gerentes, zonas, statusNuevoSupervisor} = useSelector(
        (state) => state.supervisores)
        
        const validateform = function (form) {
          const errors = {};
      
          if(!form.Nombre){
              errors.Nombre = "Campo requerido"
          }   
          // if (form.password !== form.confirmPassword) {
          //   errors.contrasenaConfirm = "Las contraseñas deben coincidir";
          // }
        
          if (!form.Email) {
            errors.email = "Campo requerido";
          } else if (!validateEmail(form.Email)) {
            errors.email = "Escriba un email válido";
          }
      
        
          return errors;
        };


    useEffect(() => {
    Promise.all([dispatch(getAllGerentes()),dispatch(getAllZonas()),dispatch(reset())])
      if(id) {  
        dispatch(getSupervisoresById(id))
        }
  }, [id])
  const supervisorGerente = gerentes?.find(e => e.Nombre === supervisoresById?.Gerente,);
  const supervisorZona = zonas?.find(e =>  e.Nombre === supervisoresById?.Zona )
  useEffect(() => {
    console.log(zonas)
    setInput({

      Codigo: id? id : null,
      Nombre: supervisoresById?.Nombre,
      Activo: supervisoresById?.Activo,
      Email: supervisoresById?.Email,
      Gerente: supervisorGerente?.Codigo,
      EsMiniEmprendedor: supervisoresById?.EsMiniEmprendedor,
      ValorPromedioMovil: supervisoresById?.ValorPromedioMovil,
      Zona: supervisorZona?.codigo,

    });
  }, [supervisoresById]);


    const [input, setInput] = useState({
      Codigo: id? id: '',
      Nombre:'',
      Email:'',
      Gerente:'',
      Activo: 0,
      ValorPromedioMovil:'',
      EsMiniEmprendedor:0,
      Zona:'',
    })






/*----------------------HANDLE CHANGE DEL FORM------------------------------------ */
const HandleChange =  (e) =>{
  
    
    const {name , value} = e.target
    console.log(value, name)
    const newForm = {...input,
      [name]:value,
      }
    
    setInput(newForm )
    console.log(newForm)
    const errors = validateform(newForm);
    setError(errors);
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
setInput({
   Codigo:'',
  Nombre:'',
  Gerente:'',
  Activo: '',
  ValorPromedioMovil:'',
  EsMiniEmprendedor:'',
  Zona:'',})
console.log(input)
dispatch(postSupervisores(input))
navigate('/supervisores')
window.location.reload()
}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate =async (event) =>{
  event.preventDefault()
  console.log(input)
  setInput({
    Codigo:'',
   Nombre:'',
   Gerente:'',
   Activo: 0,
   ValorPromedioMovil:'',
   EsMiniEmprendedor:0,
   Zona:'',
 
   }
   )
 
  dispatch(updateSupervisores(input))
  navigate('/supervisores')

  window.location.reload()
  }

 

return(   
    <div className={styles.container}>
  {/*--------------------------------------SUPERVISORES FORMS--------------------------------------------------  */}
 <form action=""  className={styles.form} onSubmit={HandleSubmitInsert}>
  <div style={{alignItems:'center', marginLeft:"40px" }}>
 <div className={styles.titleContainer}  >
                <h3 className={styles.title}>{id?.length ? 'Modificar Supervisores' : 'Alta de Supervisores'}</h3>
                <Link to={'/supervisores'}><button style={{marginRight: '4rem', width:'9rem'}} className={styles.btn} >Volver</button></Link>
            </div>
            <div className={styles.containerInputText}>

            <div className={styles.col1}>
 {id?.length  &&
 <><span>Codigo</span>
   <input type="text" style={{width:"6rem", textAlign:"center" }} name="Codigo" onChange={HandleChange} value={input.Codigo} disabled /></>}
    <span>Nombre</span>
    <input type="text" style={{width:"15rem", textAlign:"center" }} name="Nombre" placeholder="Nombre" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={input.Nombre} required />
   {error.Nombre && <div className={styles.error}>{error.Nombre}</div>}
   <span>Email</span>
   <input type="email" style={{width:"15rem", textAlign:"center" }}  className={error.email && styles.inputError} name="Email" onChange={HandleChange} 
   value={input.Email} required />
   {error.email && <div className={styles.error}>{error.email}</div>}
   <span>Valor Promedio Movil Micro Emp.</span>
   <input type="number" style={{width:"15rem", textAlign:"center" }} name="ValorPromedioMovil" onChange={HandleChange} 
   value={input.ValorPromedioMovil} />
   </div>
   
   <div className={styles.inputSelect} >

   <div className={styles.col2}>
   <div>
      <span>Gerente: </span> <br />
      <select name="Gerente" value={input.Gerente}  onChange={HandleChange} id="" required>
          {   !id ? <option value="">---</option> 
              :supervisorGerente && Object.keys(supervisorGerente).length 
              ?<option key={supervisorGerente.Codigo} value={supervisorGerente.Codigo}>{`${supervisorGerente.Nombre}`}</option> 
              :<option value="">---</option>  }
              {gerentes && gerentes.map(e => <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
      </select>
  </div>
  <div>
        <span>Zona: </span> <br />  
        <select name="Zona" value={input.Zona}  onChange={HandleChange} id="" required>
            {   !id ? <option value="">---</option> 
                :supervisorZona && Object.keys(supervisorZona).length 
                ?<option key={supervisorZona.codigo} value={supervisorZona.codigo}>{`${supervisorZona.Nombre}`}</option> 
                :<option value="">---</option>  }
                {zonas && zonas.map(e => <option  key={e.codigo} value={e.codigo}>{`${e.Nombre}`}</option>)}
        </select>
    </div>
    
   <span>Activo</span>
   <input className={styles.inputCheck} type="checkbox" name="Activo" onChange={handleCheckChange} value={input.Activo} checked={input.Activo } />
   
   <span>Es Micro Emprendedor</span>
   <input className={styles.inputCheck} type="checkbox" name="EsMiniEmprendedor" onChange={handleCheckChange} value={input.EsMiniEmprendedor} checked={input.EsMiniEmprendedor } />  
   </div>
 
   </div>
  </div>

   {
                    id?.length? <button className={styles.btn}   onClick={HandleSubmitUpdate}><FcApproval/>Actualizar</button>
                    : <button className={styles.btn} type="submit" ><FcApproval/>Enviar</button>
                }
   </div>                
 </form>
                </div>
)
}

export default SupervisoresFormulario