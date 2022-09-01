import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import styles from '../UsuariosTable/AltaUsuarios.module.css';
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";
import InputText from "../../styled-components/inputs/InputText";
import Select from "../../styled-components/inputs/Select";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
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
  Email:'',
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
   Email:'',
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
  <Form action=""  className={styles.form} onSubmit={HandleSubmitInsert}>
 <Stack className={styles.titleContainer} direction="horizontal" gap={3} >
                <TitlePrimary className={styles.title}>{id?.length ? 'Modificar Supervisores' : 'Alta de Supervisores'}</TitlePrimary>
                <Link to={'/supervisores'} className="ms-auto" style={{marginRight:"1rem", marginTop:"-1rem"}}><ButtonPrimary  className={styles.btn} >Volver</ButtonPrimary></Link>
            </Stack>
            

            <div className={styles.containerInputText}>

            <Row className="g-1">
 {id?.length  &&
 <><Form.Group as={Col} style={{marginTop:'1rem', marginBottom: '.5rem'}}>
    <FloatingLabel
    controlId="floatingInputGrid"
    label="Codigo"
    style={{textAlign:"start", paddingTop:"0.2em", fontSize:"1.5em"}}
    >
   <Form.Control type="text" style={{width:"6rem"}} name="Codigo" onChange={HandleChange} value={input.Codigo} disabled />
   </FloatingLabel>
   </Form.Group></>}
   
   <Form.Group as={Col} style={{marginTop:'1rem', marginBottom: '.5rem'}}>
   <FloatingLabel
    controlId="floatingInputGrid"
    label="Nombre"
    style={{textAlign:"start", paddingTop:"0.2em", fontSize:"1.5em"}}
    >
    <Form.Control type="text"  name="Nombre" placeholder="Nombre" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={input.Nombre} required />
   {error.Nombre && <div className={styles.error}>{error.Nombre}</div>}
   </FloatingLabel>
   </Form.Group>
   </Row>
   <Row className='g-2'>
   <Form.Group as={Col} style={{marginTop:'1rem', marginBottom: '.5rem'}}>
   <FloatingLabel
    controlId="floatingInputGrid"
    label="Email"
    style={{textAlign:"start", paddingTop:"0.2em", fontSize:"1.5em"}}
    >
   <Form.Control type="email" placeholder="Email"  className={error.email && styles.inputError} name="Email" onChange={HandleChange} 
   value={input.Email} required />
   {error.email && <div className={styles.error}>{error.email}</div>}
   </FloatingLabel>
   </Form.Group>
   <Form.Group as={Col} style={{marginTop:'1rem', marginBottom: '.5rem'}}>
   <FloatingLabel
    controlId="floatingInputGrid"
    label="Valor Promedio Movil"
    style={{textAlign:"start", paddingTop:"0.2em", fontSize:"1.5em"}}
    >
   <Form.Control type="number" placeholder="Valor Promedio Movil" name="ValorPromedioMovil" onChange={HandleChange} 
   value={input.ValorPromedioMovil} />
   </FloatingLabel>
   </Form.Group>
   </Row>
   </div>
   
   <hr className={styles.hr}/>
   <div className={styles.inputSelect} >
   <Row>
   <Col>
   <InputGroup>
   <InputGroup.Text id="basic-addon1">Gerente</InputGroup.Text>
      <Form.Select size="lg" name="Gerente" value={input.Gerente}  onChange={HandleChange} id="" required>
          {   !id ? <option value="">---</option> 
              :supervisorGerente && Object.keys(supervisorGerente).length 
              ?<option key={supervisorGerente.Codigo} value={supervisorGerente.Codigo}>{`${supervisorGerente.Nombre}`}</option> 
              :<option value="">---</option>  }
              {gerentes && gerentes.map(e => <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
      </Form.Select>
    </InputGroup>
  </Col>
  <Col>
  <InputGroup>
   <InputGroup.Text id="basic-addon1">Zona</InputGroup.Text>  
        <Form.Select size="lg" name="Zona" value={input.Zona}  onChange={HandleChange} id="" required>
            {   !id ? <option value="">---</option> 
                :supervisorZona && Object.keys(supervisorZona).length 
                ?<option key={supervisorZona.codigo} value={supervisorZona.codigo}>{`${supervisorZona.Nombre}`}</option> 
                :<option value="">---</option>  }
                {zonas && zonas.map(e => <option  key={e.codigo} value={e.codigo}>{`${e.Nombre}`}</option>)}
        </Form.Select>
      </InputGroup>
    </Col>
  </Row>
  </div>
  <br/>
  {/* <hr className={styles.hr}/> */}
  <div className={styles.inputCheck}>
  <div style={{marginTop: '.5rem'}}>
   <input className={styles.inputCheck} type="checkbox" name="Activo" onChange={handleCheckChange} value={input.Activo} checked={input.Activo } />
   <span>Activo</span>
   </div>

   <div style={{marginTop: '.5rem'}}>
   <input className={styles.inputCheck} type="checkbox" name="EsMiniEmprendedor" onChange={handleCheckChange} value={input.EsMiniEmprendedor} checked={input.EsMiniEmprendedor } />  
   <span>Es Micro Emprendedor</span>
   </div>
   </div>
   

   {
                    id?.length? <ButtonPrimary className={styles.btn}   onClick={HandleSubmitUpdate}><FcApproval/>Actualizar</ButtonPrimary>
                    : <ButtonPrimary className={styles.btn} type="submit" ><FcApproval/>Enviar</ButtonPrimary>
                }
                   
 </Form>
                </div>
)
}

export default SupervisoresFormulario