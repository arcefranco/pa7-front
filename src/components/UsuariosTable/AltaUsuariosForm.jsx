import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { getAllGerentes, getAllSupervisores, getAllTeamLeaders, 
    getAllVendedores, createUsuario, reset, getUsuarioById, updateUsuario} from "../../reducers/Usuarios/UsuariosSlice";
import validateEmail from "../../helpers/validateEmail";
import styles from './AltaUsuarios.module.css'
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";

const AltaUsuariosForm = () => {
const dispatch = useDispatch()
const {id} = useParams()
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
            timer: 1500
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
        <div>

            <h1>{usuarioById.length ? 'Modificacion usuario' : 'Alta usuario'}</h1>
            <Link to={'/usuarios'}><button>Volver a tabla Usuarios</button></Link>
            <form action="" className={styles.form}>
                <div>
                    

                        <div className={styles.inputText}>
                            <input type="text" name="Nombre" value={input.Nombre} onChange={handleChange} placeholder="Nombre" />
                            <input type="text" name="Usuario" value={input.Usuario} className={error.usuario && styles.inputError} onChange={handleChange} placeholder="Usuario"/>
                            {error.usuario && <div className={styles.error}>{error.usuario}</div>}
                              
                            
                            {!usuarioById.length && <input type="text" name="password" value={input.password}  onChange={handleChange} placeholder="Contraseña"/>}
                            {!usuarioById.length && <input type="text" name="confirmPassword" value={input.confirmPassword} onChange={handleChange} placeholder="Repetir Contraseña"/>}
                            {!usuarioById.length && error.contrasenaConfirm ? <div className={styles.error}>{error.contrasenaConfirm}</div>: null}
                            <input type="text" name="UsuarioAnura"  value={input.UsuarioAnura} onChange={handleChange} placeholder="Usuario Anura"/>
                            <input type="text" name="email" value={input.email}  onChange={handleChange} className={error.email && styles.inputError} placeholder="Email"/>
                            {error.email && <div className={styles.error}>{error.email}</div>}
                        </div>
                        
                    

                    
                </div>
                <div className={styles.inputSelect}>
                                 <div>
                    <span>Vendedor: </span>
                <select name="Vendedor" value={input.Vendedor} onChange={handleChange} id="">
                {
                    !id ? <option value="">---</option> : 
                       userVendedor && Object.keys(userVendedor).length ?
                        <option key={userVendedor.Codigo}>{`${userVendedor.Codigo} ${userVendedor.Nombre}`}</option> : <option value="">---</option>
                    }
                    {vendedores && vendedores.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>
                <div>
                    <span>Gerente: </span>
                <select name="Gerente" value={input.Gerente}  onChange={handleChange} id="">
                {
                    !id ? <option value="">---</option> : 
                       userGerente && Object.keys(userGerente).length ? 
                       <option key={userGerente.Codigo}>{`${userGerente.Codigo} ${userGerente.Nombre}`}</option> : <option value="">---</option>
                    }
                    {gerentes && gerentes.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>
                <div>
                    <span>Supervisor: </span>
                    
                <select name="Supervisor" value={input.Supervisor}  onChange={handleChange} id="">
                    {
                    !id ? <option value="">---</option> : 
                       userSupervisor && Object.keys(userSupervisor).length ? 
                       <option key={userSupervisor.Codigo}>{`${userSupervisor.Codigo} ${userSupervisor.Nombre}`}</option> : <option value="">---</option> 
                    }        
                  
                  {supervisores && supervisores.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
              </select>
                    
    
                </div>
                <div>
                    <span>Team Leader: </span>
                <select name="TeamLeader" value={input.TeamLeader}  onChange={handleChange} id="">
                {
                    !id ? <option value="">---</option> : 
                       userTeamLeader && Object.keys(userTeamLeader).length ?  
                       <option key={userTeamLeader.Codigo}>{`${userTeamLeader.Codigo} ${userTeamLeader.Nombre}`}</option> : <option value="">---</option> 
                    }
                    {teamLeaders && teamLeaders.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>   
                </div>

                <div> <span>Ver solo scoring asingado </span><input name="scoringAsignado" checked={input.scoringAsignado === 1 ? true : false} value={input.scoringAsignado} onChange={handleCheckChange} type="checkbox" /></div>
                <div><span>Bloqueado </span><input name="us_bloqueado" value={input.us_bloqueado} checked={input.us_bloqueado === 1 ? true : false} onChange={handleCheckChange} type="checkbox" /></div>
                
                <div><span>Activo </span>
                {
                 <input type="checkbox" name="us_activo" value={input.us_activo} checked={input.us_activo === 1 ? true : false} onChange={handleCheckChange}/> 
                    
                }
                
                </div>
                
                {
                    usuarioById.length? 
                    <button type="submit" onClick={(e) => handleUpdate(e)}>Actualizar</button> : 
                    (
                        !Object.keys(error).length ? <button type="submit" onClick={(e) => handleSubmit(e)}>Enviar</button> :
                        <button disabled>Enviar</button>
                    )
                    
                }
            </form>
    
        </div>
    )
}

export default AltaUsuariosForm