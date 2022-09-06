import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import { getAllGerentes, getAllSupervisores, getAllTeamLeaders, 
    getAllVendedores, createUsuario, reset, getUsuarioById, updateUsuario} from "../../reducers/Usuarios/UsuariosSlice";
import validateEmail from "../../helpers/validateEmail";
import styles from './AltaUsuarios.module.css'
import './AltaUsuarios.module.css'
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import {FcApproval} from 'react-icons/fc';

const AltaUsuariosForm = () => {
    const {id} = useParams()
const dispatch = useDispatch()
const {vendedores, gerentes, supervisores, teamLeaders, statusNuevoUsuario, usuarioById} = useSelector(
    (state) => state.usuarios)

const navigate = useNavigate()


const validateform = function (form) {
    const errors = {};

    if(!form.Usuario){
        errors.usuario = "Campo requerido"
    }   
    if (form.password !== form.confirmPassword) {
      errors.contrasenaConfirm = "Las contraseñas deben coincidir";
    }
  
    if (!form.email) {
      errors.email = "Campo requerido";
    } else if (!validateEmail(form.email)) {
      errors.email = "Escriba un email válido";
    }

  
    return errors;
  };

useEffect(() => {
    Promise.all([dispatch(getAllVendedores()), dispatch(getAllGerentes()), 
        dispatch(getAllSupervisores()), dispatch(getAllTeamLeaders()), dispatch(reset())])
    if(id) {  
        dispatch(getUsuarioById({id: id}))
        }
  }, [id])

  useEffect(() => {
    setInput({
        ID: id? id : null,
        Nombre: usuarioById[0]?.Nombre,
        Usuario: usuarioById[0]?.Usuario,
        UsuarioAnura: usuarioById[0]?.UsuarioAnura,
        Vendedor: usuarioById[0]?.Vendedor,
        Gerente: usuarioById[0]?.Gerente,
        TeamLeader: usuarioById[0]?.TeamLeader,
        Supervisor: usuarioById[0]?.Supervisor,
        us_activo: usuarioById[0]?.us_activo, 
        us_bloqueado: 0, 
        scoringAsignado: 0, 
        newUserBoolean: usuarioById.length ? 0 : 1, 
        email: usuarioById[0]?.email 
    });
  }, [usuarioById]);

  useEffect(() => {
    if(statusNuevoUsuario.length && statusNuevoUsuario[0]?.status === true){
        Swal.fire({
            icon: 'success',
            title: statusNuevoUsuario[0]?.data,
            showConfirmButton: false,
            timer: 5000,
          })
        navigate('/usuarios')
    }else if(statusNuevoUsuario.length && statusNuevoUsuario[0]?.status === false){
     Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: true,
            
            text: statusNuevoUsuario[0]?.data
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
              
            } 
        })
          
    }


 
  }, [statusNuevoUsuario])


    const [error, setError] = useState({})
    const [input, setInput] = useState({
        ID: id ? id : '',
        Nombre: '',
        Usuario: '',
        password: '',
        confirmPassword: '',
        UsuarioAnura: '',
        Vendedor: '',
        Gerente: '',
        TeamLeader: '',
        Supervisor: '',
        us_activo: 0, 
        us_bloqueado: 0, 
        scoringAsignado: 0, 
        newUserBoolean: 1, 
        email: '' 
        
    })
    
    const userSupervisor = supervisores?.find(e => e.Codigo === usuarioById[0]?.Supervisor)
    const userGerente = gerentes?.find(e => e.Codigo === usuarioById[0]?.Gerente)
    const userTeamLeader = teamLeaders?.find(e => e.Codigo === usuarioById[0]?.TeamLeader)
    const userVendedor = vendedores?.find(e => e.Codigo === usuarioById[0]?.Vendedor)


    const handleChange = (e) => {
        const { name, value } = e.target;

        const newForm = { ...input, [name]: value };
        setInput(newForm);        
        const errors = validateform(newForm);
        setError(errors);
    };

    const handleCheckChange = (e) => {
        const { name} = e.target;
        var value = e.target.checked
        value = e.target.checked? 1 : 0
        const newForm = { ...input, [name]: value };
        setInput(newForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
      dispatch(createUsuario(input))
          
        setInput({
            Nombre: '',
            Usuario: '',
            password: '',
            confirmPassword: '',
            UsuarioAnura: '',
            Vendedor: '',
            Gerente: '',
            TeamLeader: '',
            Supervisor: '',
            us_activo: 0, 
            us_bloqueado: 0, 
            scoringAsignado: 0, 
            newUserBoolean: 1, 
            email: '' 
    
        })
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
      dispatch(updateUsuario(input))
      dispatch(reset())  
            setInput({
            ID: '',
            Nombre: '',
            Usuario: '',
            password: '',
            confirmPassword: '',
            UsuarioAnura: '',
            Vendedor: '',
            Gerente: '',
            TeamLeader: '',
            Supervisor: '',
            us_activo: 0, 
            us_bloqueado: 0, 
            scoringAsignado: 0, 
            newUserBoolean: 1, 
            email: '' 
    
        })

    }

    const floatingLabel = {textAlign:"start", paddingTop:"0.5em", fontSize:"1.3em"}

    return (
        <div className={styles.container}>
            <Form action="" className={styles.form} /* onSubmit={handleSubmit} */>
            <Stack className={styles.titleContainer} direction="horizontal" gap={3}>
                <TitlePrimary>{id?.length ? 'Modificar Usuario' : 'Alta de Usuario'}</TitlePrimary>
                <Link className="ms-auto" style={{marginRight:"1rem", marginTop:"-1rem"}} to={'/usuarios'}><ButtonPrimary  >Volver</ButtonPrimary></Link>
            </Stack>
            

                <div className={styles.containerInputText}>
                    

                <Row className="g-2">
                        
                            <Form.Group as={Col} style={{marginTop:'.5rem', marginBottom: '.2rem'}}>
                            <FloatingLabel
                                controlId="floatingInputGrid"
                                label="Nombre"
                                style={floatingLabel}
                            >
                            <Form.Control type="text" value={input.Nombre} name="Nombre" placeholder="Nombre" onChange={handleChange} required />
                            </FloatingLabel>
                            </Form.Group>
                            
                            <Form.Group as={Col} style={{marginTop:'.5rem', marginBottom: '.2rem'}}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Usuario"
                                style={floatingLabel}
                            > 
                            <Form.Control type="text" name="Usuario" value={input.Usuario} className={error.usuario && styles.inputError} onChange={handleChange} placeholder="Usuario" required/>
                            {error.usuario && <div className={styles.error}>{error.usuario}</div>}
                            </FloatingLabel>
                            </Form.Group>
                            {!id?.length && <Form.Group as={Col} style={{marginTop:'.5rem', marginBottom: '.2rem'}}>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Contraseña"
                                style={floatingLabel}
                                > 
                                <Form.Control type="password" name="password" value={input.password}  onChange={handleChange} placeholder="Contraseña" required/>
                                </FloatingLabel>
                            </Form.Group> }
                        </Row>
                        <pre/>
                        <Row className="g-2">

                            {!id?.length && <Form.Group as={Col} >
                            <FloatingLabel
                                controlId="floatingInputGrid"
                                label="Confirmar Contraseña"
                                style={floatingLabel}
                            > 
                            <Form.Control type="password" name="confirmPassword" value={input.confirmPassword} onChange={handleChange} placeholder="Repetir Contraseña" required/>
                            {!id?.length && error.contrasenaConfirm ? <div className={styles.error}>{error.contrasenaConfirm}</div>: null}
                            </FloatingLabel>
     
                            </Form.Group>} 

                            
                            <Form.Group as={Col} >

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Usuario Anura"
                                style={floatingLabel}
                            > 
                            <Form.Control  type="text" name="UsuarioAnura"  value={input.UsuarioAnura} onChange={handleChange} placeholder="Usuario Anura" />
                            </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                                style={floatingLabel}
                            > 
                            <Form.Control  type="text" name="email" value={input.email}  onChange={handleChange} className={error.email && styles.inputError} placeholder="Email" required/>
                            {error.email && <div className={styles.error}>{error.email}</div>}
                            </FloatingLabel>
                            </Form.Group>
                        </Row>
                    

                    
                </div>
                                                    <hr className={styles.hr}/>
                <div className={styles.inputSelect}>

                <Row className='g-1'>
                        <Col>
                        <InputGroup>
                        <InputGroup.Text id="basic-addon1">Vendedor</InputGroup.Text>
                            <Form.Select size="" name="Vendedor" value={input.Vendedor} onChange={handleChange} id="">
                        {
                                    !id ? <option value="">---</option> 
                                    : userVendedor && Object.keys(userVendedor).length 
                                    ?<option key={userVendedor.Codigo}>{`${userVendedor.Codigo} ${userVendedor.Nombre}`}</option> 
                                    :<option value="">---</option>
                                    }
                                    {vendedores && vendedores.map(e => 
                                            <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>
                                            )}
                            </Form.Select>
                            </InputGroup>
                        </Col>

                        <Col>
                        <InputGroup>
                        <InputGroup.Text id="basic-addon1">Supervisor</InputGroup.Text>
                            <Form.Select size="" name="Supervisor" value={input.Supervisor}  onChange={handleChange} id="">
                                    {!id ? <option value="">---</option> 
                                    :userSupervisor && Object.keys(userSupervisor).length 
                                    ?<option key={userSupervisor.Codigo}>{`${userSupervisor.Codigo} ${userSupervisor.Nombre}`}</option> 
                                    :<option value="">---</option> }        
                                {supervisores && supervisores.map(e => <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
                            </Form.Select>
                            </InputGroup>
                        </Col>


   
                </Row>

                <br/>
                <Row className='g-1' >
                    <Col>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">Team Leader</InputGroup.Text>
                        <Form.Select size="" name="TeamLeader" value={input.TeamLeader}  onChange={handleChange} id="">
                            {   !id ? <option value="">---</option> 
                                :userTeamLeader && Object.keys(userTeamLeader).length 
                                ?<option key={userTeamLeader.Codigo}>{`${userTeamLeader.Codigo} ${userTeamLeader.Nombre}`}</option> 
                                :<option value="">---</option> }
                                {teamLeaders && teamLeaders.map(e => <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
                        </Form.Select>
                        </InputGroup>

                    </Col>    

                    <Col>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">Gerente</InputGroup.Text>
                        <Form.Select size="" name="Gerente" value={input.Gerente}  onChange={handleChange} id="">
                            {   !id ? <option value="">---</option> 
                                :userGerente && Object.keys(userGerente).length 
                                ?<option key={userGerente.Codigo}>{`${userGerente.Codigo} ${userGerente.Nombre}`}</option> 
                                :<option value="">---</option>  }
                                {gerentes && gerentes.map(e => <option key={e.Codigo} value={e.Codigo}>{` ${e.Nombre}`}</option>)}
                        </Form.Select>
                    </InputGroup>
                    </Col>
                    </Row>
       
                    </div>
   
               
                    <div className={styles.inputCheck}>

                        <div style={{marginTop: '.5rem'}}> 
                            <input name="scoringAsignado"  checked={input.scoringAsignado === 1 ? true : false} value={input.scoringAsignado} onChange={handleCheckChange} type="checkbox" />
                            <span>Ver solo scoring asingado </span>
                        </div>


                        <div style={{marginTop: '.5rem'}}>
                            {
                                <input type="checkbox"   name="us_activo" value={input.us_activo} checked={input.us_activo === 1 ? true : false} onChange={handleCheckChange}/>               
                            }
                            <span>Activo </span>

                            
                        </div>
               
                            <div style={{marginTop: '.5rem'}}>
                                <input name="us_bloqueado"  value={input.us_bloqueado} checked={input.us_bloqueado === 1 ? true : false} onChange={handleCheckChange} type="checkbox" />
                                <span>Bloqueado </span>

                       
                        </div>
    
                </div>
                <hr className={styles.hr}/>
                
                {   id?.length? 
                    <ButtonPrimary type="submit" style={{ marginBottom:'.4rem'}}  onClick={(e) => handleUpdate(e)}><FcApproval/>Actualizar</ButtonPrimary> 
                    :(
                        !Object.keys(error).length 
                        ? <ButtonPrimary onClick={handleSubmit}  style={{ marginBottom:'.4rem'}} type="submit" ><FcApproval/>Enviar</ButtonPrimary> 
                        :<ButtonPrimary  style={{ marginBottom:'.4rem'}} disabled><FcApproval/>Enviar</ButtonPrimary>
                    )
                }
            </Form>
    
        </div>
    )
}

export default AltaUsuariosForm