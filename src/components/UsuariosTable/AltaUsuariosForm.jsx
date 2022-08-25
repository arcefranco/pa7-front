import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { getAllGerentes, getAllSupervisores, getAllTeamLeaders, 
    getAllVendedores, createUsuario, reset, getUsuarioById, updateUsuario} from "../../reducers/Usuarios/UsuariosSlice";
import validateEmail from "../../helpers/validateEmail";
import styles from './AltaUsuarios.module.css'
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
            timer: 5000
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

      

    return (
        <div className={styles.container}>

            <form action="" className={styles.form}>
            <div className={styles.titleContainer}>
                <h3 className={styles.title}>{id?.length ? 'Modificar Usuario' : 'Alta de Usuario'}</h3>
                <Link to={'/usuarios'}><button style={{marginRight: '4rem', width:'9rem'}} className={styles.btn} >Volver a Usuarios</button></Link>
            </div>

                <div className={styles.containerInputText}>
                    

                        <div className={styles.col1}>
                            <span>Nombre: </span> 
                            <input type="text" name="Nombre" value={input.Nombre} onChange={handleChange} placeholder="Nombre" />
                            
                            <span>Nombre de usuario: </span> 
                            <input type="text" name="Usuario" value={input.Usuario} className={error.usuario && styles.inputError} onChange={handleChange} placeholder="Usuario"/>
                            {error.usuario && <div className={styles.error}>{error.usuario}</div>}
                            
                            {!id?.length && <div>
                                <span>Contraseña: </span>
                                <input type="text" name="password" value={input.password}  onChange={handleChange} placeholder="Contraseña"/>
                            </div> }
                              

                            
                        </div>
                        <div className={styles.col2}>
                            
                            {!id?.length && <div>
                            <span>Confirmar contraseña: </span>
                            <input type="text" name="confirmPassword" value={input.confirmPassword} onChange={handleChange} placeholder="Repetir Contraseña"/>
                                 
                            </div>} 
                            {!id?.length && error.contrasenaConfirm ? <div className={styles.error}>{error.contrasenaConfirm}</div>: null}
                            <span>Usuario anura: </span>
                            <input type="text" name="UsuarioAnura"  value={input.UsuarioAnura} onChange={handleChange} placeholder="Usuario Anura"/>
                            
                            <span>Email: </span>
                            <input type="text" name="email" value={input.email}  onChange={handleChange} className={error.email && styles.inputError} placeholder="Email"/>
                            {error.email && <div className={styles.error}>{error.email}</div>}
                        </div>
                    

                    
                </div>
                                                    <hr className={styles.hr}/>
                <div className={styles.inputSelect}>

                <div className={styles.col1}>
                        <div>
                            <span>Vendedor: </span> <br />
                            <select name="Vendedor" value={input.Vendedor} onChange={handleChange} id="">
                        {
                                    !id ? <option value="">---</option> 
                                    : userVendedor && Object.keys(userVendedor).length 
                                    ?<option key={userVendedor.Codigo}>{`${userVendedor.Codigo} ${userVendedor.Nombre}`}</option> 
                                    :<option value="">---</option>
                                    }
                                    {vendedores && vendedores.map(e => 
                                            <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>
                                            )}
                            </select>
                        </div>

                        <div>
                            <span>Supervisor: </span> <br />
                            <select name="Supervisor" value={input.Supervisor}  onChange={handleChange} id="">
                                    {!id ? <option value="">---</option> 
                                    :userSupervisor && Object.keys(userSupervisor).length 
                                    ?<option key={userSupervisor.Codigo}>{`${userSupervisor.Codigo} ${userSupervisor.Nombre}`}</option> 
                                    :<option value="">---</option> }        
                                {supervisores && supervisores.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                            </select>
                    
    
                        </div>

                        <div className={styles.inputCheck}>
                            <div>
                                <span>Bloqueado </span>
                                <input name="us_bloqueado" value={input.us_bloqueado} checked={input.us_bloqueado === 1 ? true : false} onChange={handleCheckChange} type="checkbox" />
                            </div>
                        </div>
   
                </div>


                <div className={styles.col2}>
                    <div>
                        <span>Team Leader: </span> <br />
                        <select name="TeamLeader" value={input.TeamLeader}  onChange={handleChange} id="">
                            {   !id ? <option value="">---</option> 
                                :userTeamLeader && Object.keys(userTeamLeader).length 
                                ?<option key={userTeamLeader.Codigo}>{`${userTeamLeader.Codigo} ${userTeamLeader.Nombre}`}</option> 
                                :<option value="">---</option> }
                                {teamLeaders && teamLeaders.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                                </select>
                    </div>    

                    <div>
                        <span>Gerente: </span> <br />
                        <select name="Gerente" value={input.Gerente}  onChange={handleChange} id="">
                            {   !id ? <option value="">---</option> 
                                :userGerente && Object.keys(userGerente).length 
                                ?<option key={userGerente.Codigo}>{`${userGerente.Codigo} ${userGerente.Nombre}`}</option> 
                                :<option value="">---</option>  }
                                {gerentes && gerentes.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                        </select>
                    </div>

                    <div className={styles.inputCheck}>

                        <div style={{width: '15rem'}}> 
                            <span>Ver solo scoring asingado </span>
                            <input name="scoringAsignado" checked={input.scoringAsignado === 1 ? true : false} value={input.scoringAsignado} onChange={handleCheckChange} type="checkbox" />
                        </div>


                        <div>
                            <span>Activo </span>
                            {
                            <input type="checkbox"  name="us_activo" value={input.us_activo} checked={input.us_activo === 1 ? true : false} onChange={handleCheckChange}/>               
                            }

                        </div>
                    </div>
    
                </div>
   
                </div>
 
                
                {   id?.length? 
                    <button type="submit" className={styles.btn} onClick={(e) => handleUpdate(e)}><FcApproval/>Actualizar</button> 
                    :(
                        !Object.keys(error).length 
                        ? <button className={styles.btn} style={{alignSelf: 'center'}} type="submit" onClick={(e) => handleSubmit(e)}><FcApproval/>Enviar</button> 
                        :<button className={styles.btn}  style={{alignSelf: 'center'}} disabled><FcApproval/>Enviar</button>
                    )
                }
            </form>
    
        </div>
    )
}

export default AltaUsuariosForm