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
import { getSupervisoresById, postSupervisores, updateSupervisores,getAllGerentes,getAllGerentesActivos,getAllZonas, reset } from '../../reducers/Supervisores/supervisoresSlice';
import Swal from "sweetalert2";


const SupervisoresFormulario = () =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({})

    const {supervisoresById, gerentes, gerentesActivos, zonas, statusNuevoSupervisor} = useSelector(
        (state) => state.supervisores)
        const {user, } = useSelector(
          (state) => state.login)
        
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
    Promise.all([dispatch(getAllGerentes()), dispatch(getAllGerentesActivos()),dispatch(getAllZonas()),dispatch(reset())])
      if(id) {  
        dispatch(getSupervisoresById(id))
        }
  }, [id])


  useEffect(() => {
    if(statusNuevoSupervisor.length && statusNuevoSupervisor[0]?.status === true){
        Swal.fire({
            icon: 'success',
            title: statusNuevoSupervisor[0]?.data,
            showConfirmButton: false,
            timer: 5000
          })
        navigate('/supervisores')
        dispatch(reset())
    }else if(statusNuevoSupervisor.length && statusNuevoSupervisor[0]?.status === false){
     Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: true,
            
            text: statusNuevoSupervisor[0]?.data
          }).then((result) => {
            if (result.isConfirmed) {
              
              window.location.reload()
              
            } 
        })
          
    }}, [statusNuevoSupervisor])

    useEffect(() => {

      if(supervisoresById && supervisoresById.status === false){
          Swal.fire({
              icon: 'error',
              title: 'Tiempo de espera excedido',
              showConfirmButton: true,
              
              text: supervisoresById.message
            }).then((result) => {
              if (result.isConfirmed) {
                  
                window.location.replace('/supervisores')
                
              } 
          })
      }
  
    }, [supervisoresById])

    useEffect(() => {
      dispatch(reset())

      
  }, [])

  const supervisorGerente = gerentes?.find(e => e.Nombre === supervisoresById?.Gerente,);
  const supervisorGerenteActivo = gerentesActivos?.find(e => e.Nombre === supervisoresById?.GerenteActivo,);
  const supervisorZona = zonas?.find(e =>  e.Nombre === supervisoresById?.Zona )
  useEffect(() => {
    console.log(zonas)
    setInput({

      Codigo: id? id : null,
      Nombre: supervisoresById?.Nombre,
      Activo: supervisoresById?.Activo,
      Email: supervisoresById?.Email,
      Gerente: supervisorGerente?.Codigo,
      GerenteActivo: supervisorGerenteActivo?.Codigo,
      EsMiniEmprendedor: supervisoresById?.EsMiniEmprendedor,
      ValorPromedioMovil: supervisoresById?.ValorPromedioMovil,
      Zona: supervisorZona?.codigo,
      HechoPor: user.username,

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

console.log(input)
dispatch(postSupervisores(input, user))
setInput({
  Codigo:'',
 Nombre:'',
 Gerente:'',
 Activo: 0,
 Email:'',
 ValorPromedioMovil:'',
 EsMiniEmprendedor:'',
 Zona:'',})

}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate =async (event) =>{
  event.preventDefault()
  console.log(input)
  
 
  dispatch(updateSupervisores(input, user))
  dispatch(reset())
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

  }

 const floatingLabel = {textAlign:"start", paddingTop:"0.5em", fontSize:"1.3em"}

return(   
    <div className={styles.container}>
  {/*--------------------------------------SUPERVISORES FORMS--------------------------------------------------  */}
  <Form action=""  className={styles.form} onSubmit={HandleSubmitInsert}>
 <Stack className={styles.titleContainer} direction="horizontal" gap={3} >
                <TitlePrimary className={styles.title}>{id?.length ? 'Modificar Supervisores' : 'Alta de Supervisores'}</TitlePrimary>
                 <Link to={'/supervisores'} className="ms-auto" style={{marginRight:"1rem", marginTop:"-1rem"}}> 
                  <ButtonPrimary  className={styles.btn} >Volver</ButtonPrimary>
                   </Link> 
            </Stack>
            

            <div className={styles.containerInputText}>

            <Row className="g-1">
 {id?.length  &&
 <><Form.Group as={Col} style={{marginTop:'1rem', marginBottom: '.5rem'}}>
    <FloatingLabel
    controlId="floatingInputGrid"
    label="Código"
    style={floatingLabel}
    >
   <Form.Control size="sm" type="text" style={{width:"6rem"}} name="Codigo" onChange={HandleChange} value={input.Codigo} disabled />
   </FloatingLabel>
   </Form.Group></>}
   
   <Form.Group as={Col} style={{marginTop:'1rem', marginBottom: '.5rem'}}>
   <FloatingLabel
    controlId="floatingInputGrid"
    label="Nombre"
    style={floatingLabel}
    >
    <Form.Control size="sm" type="text"  name="Nombre" placeholder="Nombre" className={error.Nombre && styles.inputError} onChange={HandleChange} 
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
    style={floatingLabel}
    >
   <Form.Control size="sm" type="email" placeholder="Email"  className={error.email && styles.inputError} name="Email" onChange={HandleChange} 
   value={input.Email} required />
   {error.email && <div className={styles.error}>{error.email}</div>}
   </FloatingLabel>
   </Form.Group>
   <Form.Group as={Col} style={{marginTop:'1rem', marginBottom: '.5rem'}}>
   <FloatingLabel
    controlId="floatingInputGrid"
    label="Valor Promedio Móvil"
    style={floatingLabel}
    >
   <Form.Control size="sm" type="number" placeholder="Valor Promedio Móvil" name="ValorPromedioMovil" onChange={HandleChange} 
   value={input.ValorPromedioMovil} />
   </FloatingLabel>
   </Form.Group>
   </Row>
   </div>
   
   <hr className={styles.hr}/>
   <div className={styles.inputSelect} >
   <Row>
   {id?.length ? <Col>
   <InputGroup><InputGroup.Text id="basic-addon1">Gerente</InputGroup.Text>
      <Form.Select size="sm" name="Gerente" value={input.Gerente}  onChange={HandleChange} id="" >
          {   !id ? <option value="">---</option> 
              :supervisorGerente && Object.keys(supervisorGerente).length 
              ?<option key={supervisorGerente.Codigo} value={supervisorGerente.Codigo}>{`${supervisorGerente.Nombre}`}</option> 
              :<option value="">---</option>  }
              {gerentes && gerentes.map(e => <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
      </Form.Select>
    </InputGroup>
  </Col>
  
  :<Col>
   <InputGroup>
    <InputGroup.Text id="basic-addon1">Gerente</InputGroup.Text>
      <Form.Select size="sm" name="Gerente" value={input.Gerente}  onChange={HandleChange} id="" >
          {   !id ? <option value="">---</option> 
              :supervisorGerenteActivo && Object.keys(supervisorGerenteActivo).length 
              ?<option key={supervisorGerenteActivo.Codigo} value={supervisorGerenteActivo.Codigo}>{`${supervisorGerente.Nombre}`}</option> 
              :<option value="">---</option>  }
              {gerentesActivos && gerentesActivos.map(e => <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
      </Form.Select>
    </InputGroup>
  </Col>}
  <Col>
  <InputGroup>
   <InputGroup.Text id="basic-addon1">Zona</InputGroup.Text>  
        <Form.Select size="sm" name="Zona" value={input.Zona}  onChange={HandleChange} id="" >
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
  <div className={styles.inputCheck}>
  <span style={{marginTop: '.6rem'}}>Activo</span>
  <div style={{marginTop: '0rem'}}>
  
   <input className={styles.inputCheck} type="checkbox" name="Activo" onChange={handleCheckChange} value={input.Activo} checked={input.Activo } />
   
   </div>

   <span style={{marginTop: '.6rem'}}>Es Micro Emprendedor</span>
   <div style={{marginTop: '0rem'}}>
   <input className={styles.inputCheck} type="checkbox" name="EsMiniEmprendedor" onChange={handleCheckChange} value={input.EsMiniEmprendedor} checked={input.EsMiniEmprendedor } />  
   
   </div>
   </div>
  <hr className={styles.hr}/>
   

   {
                    id?.length? <ButtonPrimary className={styles.btn}   onClick={HandleSubmitUpdate}>Actualizar</ButtonPrimary>
                    : <ButtonPrimary className={styles.btn} type="submit" >Enviar</ButtonPrimary>
                }
                   
 </Form>
                </div>
)
}

export default SupervisoresFormulario