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
    getAllVendedores, createUsuario, reset, updateUsuario, endUpdate} from "../../reducers/Usuarios/UsuariosSlice";
import validateEmail from "../../helpers/validateEmail";
import styles from './AltaUsuarios.module.css'
import './AltaUsuarios.module.css'
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import TitleLogo from "../../styled-components/containers/TitleLogo";
import { ReturnLogo } from "../../helpers/ReturnLogo";

const AltaUsuariosForm = () => {
    const {id} = useParams()
const dispatch = useDispatch()
const {vendedores, gerentes, supervisores, teamLeaders, statusNuevoUsuario, usuarioById} = useSelector(
    (state) => state.usuarios)
const {empresaReal} = useSelector((state) => state.login.user)
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
    dispatch(reset())
    return () => {
        if(id){

            dispatch(endUpdate({Codigo: id}))
        }
    }

  }, [])

useEffect(() => {
    Promise.all([dispatch(getAllVendedores()), dispatch(getAllGerentes()), 
        dispatch(getAllSupervisores()), dispatch(getAllTeamLeaders()), dispatch(reset())])

  }, [id])



  useEffect(() => {
    if(Object.keys(statusNuevoUsuario).length && statusNuevoUsuario?.status === true){
        navigate('/usuarios')
        
    }else if(Object.keys(statusNuevoUsuario).length && statusNuevoUsuario?.status === false){

        window.location.reload()
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

    const floatingLabel = {textAlign:"start", paddingTop: '0.5rem'}

    return (
        <div className={styles.container}>
            <TitleLogo style={{marginTop: '0rem', top:"1em", left:"6em", position: "absolute"}}>
            <div>
              <span>{empresaReal}</span>
              <ReturnLogo empresa={empresaReal}/>
            </div>
            </TitleLogo>
            <Form action="" className={styles.form}  style={{marginTop:'2rem'}} /* onSubmit={handleSubmit} */>
            <Stack className={styles.titleContainer} direction="horizontal" gap={3}>
                <TitlePrimary>{id?.length ? 'Modificar Usuario' : 'Alta de Usuario'}</TitlePrimary>
                <Link className="ms-auto" style={{marginLeft: '1rem'}} to={'/usuarios'}><ButtonPrimary  >Volver</ButtonPrimary></Link>
            </Stack>
            

                <div className={styles.containerInputText}>
                    

                <Row className="g-2">
                        
                            <Form.Group as={Col} style={{marginTop:'.5rem', marginBottom: '.2rem'}}>
                            <FloatingLabel
                                controlId="floatingInputGrid"
                                label="Nombre"
                                style={floatingLabel}
                            >
                            <Form.Control size="sm" type="text" value={input.Nombre} name="Nombre" placeholder="Nombre" onChange={handleChange} required />
                            </FloatingLabel>
                            </Form.Group>
                            
                            <Form.Group as={Col} style={{marginTop:'.5rem', marginBottom: '.2rem'}}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Usuario"
                                style={floatingLabel}
                            > 
                            <Form.Control size="sm" type="text" name="Usuario" value={input.Usuario} className={error.usuario && styles.inputError} onChange={handleChange} placeholder="Usuario" required/>
                            {error.usuario && <div className={styles.error}>{error.usuario}</div>}
                            </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <pre/>
                        <Row className="g-2">
                            <Form.Group as={Col} >

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Usuario Anura"
                                style={floatingLabel}
                            > 
                            <Form.Control  size="sm" type="text" name="UsuarioAnura"  value={input.UsuarioAnura} onChange={handleChange} placeholder="Usuario Anura" />
                            </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                                style={floatingLabel}
                            > 
                            <Form.Control size="sm" type="text" name="email" value={input.email}  onChange={handleChange} className={error.email && styles.inputError} placeholder="Email" required/>
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
                            <Form.Select size="sm" name="Vendedor" value={input.Vendedor} onChange={handleChange} id="">
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
                            <Form.Select size="sm" name="Supervisor" value={input.Supervisor}  onChange={handleChange} id="">
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
                        <Form.Select size="sm"  name="TeamLeader" value={input.TeamLeader}  onChange={handleChange} id="">
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
                        <Form.Select size="sm" name="Gerente" value={input.Gerente}  onChange={handleChange} id="">
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

                        
                    <span >Ver sólo <br/> scoring asingado </span>
                        <div style={{alignSelf: 'center'}}> 
                            <input name="scoringAsignado"  checked={input.scoringAsignado === 1 ? true : false} value={input.scoringAsignado} onChange={handleCheckChange} type="checkbox" />
                            
                        </div>

                        <span style={{alignSelf: 'center'}}>Activo </span>
                        <div style={{alignSelf: 'center'}}>
                            {
                                <input type="checkbox"   name="us_activo" value={input.us_activo} checked={input.us_activo === 1 ? true : false} onChange={handleCheckChange}/>               
                            }
                            

                            
                        </div>
                            <span style={{alignSelf: 'center'}}>Bloqueado </span>
                            <div style={{alignSelf: 'center'}}>
                                <input name="us_bloqueado"  value={input.us_bloqueado} checked={input.us_bloqueado === 1 ? true : false} onChange={handleCheckChange} type="checkbox" />
                                

                       
                        </div>
    
                </div>
                <hr className={styles.hr}/>
                
                {   id?.length? 
                    <ButtonPrimary type="submit" style={{ marginBottom:'.4rem'}}  onClick={(e) => handleUpdate(e)}>Actualizar</ButtonPrimary> 
                    :(
                        !Object.keys(error).length 
                        ? <ButtonPrimary onClick={handleSubmit}  style={{ marginBottom:'.4rem'}} type="submit" >Enviar</ButtonPrimary> 
                        :<ButtonPrimary  style={{ marginBottom:'.4rem'}} disabled>Enviar</ButtonPrimary>
                    )
                }
            </Form>
    
        </div>
    )
}

export default AltaUsuariosForm