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
import { getTeamLeadersById, postTeamLeaders, updateTeamLeaders, getAllSupervisores, getAllSupervisoresActivos, endCommit,reset } from '../../reducers/TeamLeaders/teamLeadersSlice';
import Swal from "sweetalert2";


const TeamLeadersFormulario = () =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({})

    const {teamLeadersById,  statusNuevoTeamLeader, supervisores, supervisoresActivos} = useSelector(
        (state) => state.teamLeaders)
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
    Promise.all([dispatch(getAllSupervisores()), dispatch(getAllSupervisoresActivos()),dispatch(reset())])
      if(id) {  
        dispatch(getTeamLeadersById(id))
        }
  }, [id])


  useEffect(() => {
    if(statusNuevoTeamLeader.length && statusNuevoTeamLeader[0]?.status === true){
        Swal.fire({
            icon: 'success',
            title: statusNuevoTeamLeader[0]?.data,
            showConfirmButton: false,
            timer: 5000
          })
        navigate('/teamleaders')
        dispatch(reset())
    }else if(statusNuevoTeamLeader.length && statusNuevoTeamLeader[0]?.status === false){
     Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: true,
            
            text: statusNuevoTeamLeader[0]?.data
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(endCommit())
              window.location.reload()
              
            } 
        })
          
    }}, [statusNuevoTeamLeader])

    useEffect(() => {

      if(teamLeadersById && teamLeadersById.status === false){
          Swal.fire({
              icon: 'error',
              title: 'Tiempo de espera excedido',
              showConfirmButton: true,
              
              text: teamLeadersById.message
            }).then((result) => {
              if (result.isConfirmed) {
                  dispatch(endCommit())
                window.location.replace('/teamleaders')
                
              } 
          })
      }
  
    }, [teamLeadersById])

    useEffect(() => {
      dispatch(reset())
      return () => {
          if(id){
  
              dispatch(endCommit())
          }
      }
  }, [])

  const teamLeaderSupervisor = supervisores?.find(e => e.Nombre === teamLeadersById?.Supervisor,);
  const teamLeaderSupervisorActivo = supervisoresActivos?.find(e => e.Nombre === teamLeadersById?.SupervisorActivo,);
  useEffect(() => {
    // console.log(zonas)
    setInput({

      Codigo: id? id : null,
      Nombre: teamLeadersById?.Nombre,
      Activo: teamLeadersById?.Activo,
      Supervisor: teamLeaderSupervisor?.Codigo,
      SupervisorActivo: teamLeaderSupervisorActivo?.Codigo,
      HechoPor: user.username,

    });
  }, [teamLeadersById]);


    const [input, setInput] = useState({
      Codigo: id? id: '',
      Nombre:'',
      Activo: 0,
      Supervisor:'',
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
dispatch(postTeamLeaders(input, user))
setInput({
  Codigo:'',
 Nombre:'',
 Activo: 0,
 Supervisor:'',
})

}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate =async (event) =>{
  event.preventDefault()
  console.log(input)
  
 
  dispatch(updateTeamLeaders(input, user))
  dispatch(reset())
  setInput({
    Codigo:'',
   Nombre:'',
   Supervisor:'',
   Activo: 0,
 
   }
   )

  }

 const floatingLabel = {textAlign:"start", paddingTop:"0.5em", fontSize:"1.3em"}

return(   
    <div className={styles.container}>
  {/*--------------------------------------TEAM LEADER FORMS--------------------------------------------------  */}
  <Form action=""  className={styles.form} onSubmit={HandleSubmitInsert}>
 <Stack className={styles.titleContainer} direction="horizontal" gap={3} >
                <TitlePrimary className={styles.title}>{id?.length ? 'Modificar Team Leader' : 'Alta de Team Leader'}</TitlePrimary>
                <Link to={'/teamleaders'} className="ms-auto" style={{marginRight:"1rem", marginTop:"-1rem"}}><ButtonPrimary  className={styles.btn} >Volver</ButtonPrimary></Link>
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
   
   </div>
   
   <hr className={styles.hr}/>
   <div className={styles.inputSelect} >
   <Row>
   {id?.length? <Col>
   <InputGroup>
   <InputGroup.Text id="basic-addon1">Supervisor</InputGroup.Text>
      <Form.Select size="sm" name="Supervisor" value={input.Supervisor}  onChange={HandleChange} id="" required>
          {   !id ? <option value="">---</option> 
              :teamLeaderSupervisor && Object.keys(teamLeaderSupervisor).length 
              ?<option key={teamLeaderSupervisor.Codigo} value={teamLeaderSupervisor.Codigo}>{`${teamLeaderSupervisor.Nombre}`}</option> 
              :<option value="">---</option>  }
              {supervisores && supervisores.map(e => <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
      </Form.Select>
    </InputGroup>
  </Col>
  :<Col>
   <InputGroup>
   <InputGroup.Text id="basic-addon1">Supervisor</InputGroup.Text>
      <Form.Select size="sm" name="Supervisor" value={input.Supervisor}  onChange={HandleChange} id="" required>
          {   !id ? <option value="">---</option> 
              :teamLeaderSupervisorActivo && Object.keys(teamLeaderSupervisorActivo).length 
              ?<option key={teamLeaderSupervisorActivo.Codigo} value={teamLeaderSupervisorActivo.Codigo}>{`${teamLeaderSupervisorActivo.Nombre}`}</option> 
              :<option value="">---</option>  }
              {supervisoresActivos && supervisoresActivos.map(e => <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
      </Form.Select>
    </InputGroup>
  </Col>}
  
   </Row> 
  </div>
  <br/>
  {/* <hr className={styles.hr}/> */}
  <div className={styles.inputCheck}>
  <div style={{marginTop: '.5rem'}}>
   <input className={styles.inputCheck} type="checkbox" name="Activo" onChange={handleCheckChange} value={input.Activo} checked={input.Activo } />
   <span>Activo</span>
   </div>

   
   </div>
   

   {
                    id?.length? <ButtonPrimary className={styles.btn}   onClick={HandleSubmitUpdate}>Actualizar</ButtonPrimary>
                    : <ButtonPrimary className={styles.btn} type="submit" >Enviar</ButtonPrimary>
                }
                   
 </Form>
                </div>
)
}

export default TeamLeadersFormulario