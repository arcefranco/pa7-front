import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import styles from '../UsuariosTable/AltaUsuarios.module.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import {FcApproval} from 'react-icons/fc'
import Swal from "sweetalert2";
import {Link, useNavigate} from 'react-router-dom';
import { getGerentesById, postGerentes, updateGerentes, endCommit , reset} from '../../reducers/Gerentes/gerentesSlice';
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";


const GerentesFormulario = () =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({})
    const {user, } = useSelector(
      (state) => state.login)
    
    const {gerentesById, statusNuevoGerente} = useSelector(
        (state) => state.gerentes)
        
    useEffect(() => {
      Promise.all([dispatch(reset())]);
    if(id) {  
        dispatch(getGerentesById(id))
        }
  }, [id])
  useEffect(() => {
    if(statusNuevoGerente.length && statusNuevoGerente[0]?.status === true){
        Swal.fire({
            icon: 'success',
            title: statusNuevoGerente[0]?.data,
            showConfirmButton: false,
            timer: 5000
          })
        navigate('/gerentes')
        dispatch(reset())
    }else if(statusNuevoGerente.length && statusNuevoGerente[0]?.status === false){
     Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: true,
            
            text: statusNuevoGerente[0]?.data
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(endCommit())
              window.location.reload()
              
            } 
        })
          
    }}, [statusNuevoGerente])

    useEffect(() => {

      if(gerentesById && gerentesById.status === false){
          Swal.fire({
              icon: 'error',
              title: 'Tiempo de espera excedido',
              showConfirmButton: true,
              
              text: gerentesById.message
            }).then((result) => {
              if (result.isConfirmed) {
                  dispatch(endCommit())
                window.location.replace('/gerentes')
                
              } 
          })
      }
  
    }, [gerentesById])

    useEffect(() => {
      dispatch(reset())
      return () => {
          if(id){
  
              dispatch(endCommit())
          }
      }
  }, [])

  const validateform = function (form) {
    const errors = {};

    if(!form.Nombre){
        errors.Nombre = "Campo requerido"
    }   
    // if (form.password !== form.confirmPassword) {
    //   errors.contrasenaConfirm = "Las contraseñas deben coincidir";
    // }
  
    

  
    return errors;
  };



   
    useEffect(() => {
        setInput({

          Codigo: gerentesById?.Codigo,
          Nombre: gerentesById?.Nombre,
          Activo: gerentesById?.Activo,
          HechoPor: user.username,
        });
      }, [gerentesById]);

      const [input, setInput] = useState({
        Codigo:'',
        Nombre:'',
        Activo: 0,
      })
  


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
dispatch(postGerentes(input, user))
setInput({
  Codigo:'',
Nombre:'',
Activo: 0,
}
)

}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate =async (event) =>{
  event.preventDefault()

  console.log(input)
  dispatch(updateGerentes(input, user))
  dispatch(reset())
  setInput({
    Codigo:'',
  Nombre:'',
  Activo: 0,
  }
  )
  
  }

 const floatingLabel = {textAlign:"start", paddingTop:"0.5em", fontSize:"1.3em"}

return(   
    <div className={styles.container}>
  {/*--------------------------------------GERENTES FORMS--------------------------------------------------  */}
 <Form action=""  className={styles.form} onSubmit={HandleSubmitInsert}>
 <Stack className={styles.titleContainer} direction="horizontal" gap={3}>
                <TitlePrimary className={styles.title}>{id?.length ? 'Modificar Gerente' : 'Alta de Gerente'}</TitlePrimary>
                <Link className="ms-auto" style={{marginRight:"1rem", marginTop:"-1rem"}} to={'/gerentes'}><ButtonPrimary style={{marginRight: '4rem', width:'9rem'}} className={styles.btn} >Volver</ButtonPrimary></Link>
            </Stack >
            <div className={styles.containerInputText}>
            <Row>
 {id?.length  &&
 <>
    <Form.Group as={Col} style={{marginTop:'1rem', marginBottom: '.5rem'}}>
    <FloatingLabel
    controlId="floatingInputGrid"
    label="Codigo"
    style={floatingLabel}
    >
   <Form.Control type="text" style={{width:"6rem"}} name="Codigo" onChange={HandleChange} value={input.Codigo} disabled />
   </FloatingLabel>
   </Form.Group></>}
   <Form.Group as={Col} style={{marginTop:'1rem', marginBottom: '.5rem'}}>
   <FloatingLabel
    controlId="floatingInputGrid"
    label="Nombre"
    style={floatingLabel}
    >
    <Form.Control type="text"  name="Nombre" placeholder="Nombre" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={input.Nombre} required />
   {error.Nombre && <div className={styles.error}>{error.Nombre}</div>}
   </FloatingLabel>
   </Form.Group>
   <Form.Group as={Col} style={{marginTop:'1rem', marginBottom: '.5rem'}}>
   <div className={styles.inputCheck}>
   <div style={{marginTop: '.5rem'}}>
   <span>Activo</span>
   <input type="checkbox" name="Activo" onChange={handleCheckChange} value={input.Activo} checked={input.Activo}/>
   </div>
   </div>
   </Form.Group>
    
   </Row>
   </div>
   {
                    id?.length? <ButtonPrimary className={styles.btn}  onClick={HandleSubmitUpdate}>Actualizar</ButtonPrimary>
                    : <ButtonPrimary className={styles.btn} type="submit" >Enviar</ButtonPrimary>
                }
                   
 </Form>
                </div>
)
}

export default GerentesFormulario