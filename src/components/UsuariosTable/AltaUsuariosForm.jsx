import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { getAllGerentes, getAllSupervisores, getAllTeamLeaders, getAllVendedores, createUsuario, reset, getUsuarioById} from "../../reducers/Usuarios/UsuariosSlice";
import styles from './AltaUsuarios.module.css'
import { useParams } from "react-router-dom";

const AltaUsuariosForm = () => {
const dispatch = useDispatch()

useEffect(() => {
    Promise.all([dispatch(getAllVendedores()), dispatch(getAllGerentes()), dispatch(getAllSupervisores()), dispatch(getAllTeamLeaders()), dispatch(reset())])

}, [])
const {id} = useParams()

const {vendedores, gerentes, supervisores, teamLeaders, statusNuevoUsuario, usuarioById} = useSelector(
    (state) => state.usuarios)

  const [input, setInput] = useState({
        Nombre: '',
        login: '',
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
    useEffect(() => {
        dispatch(getUsuarioById({id: id}))
        

    }, [dispatch]) 

 
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = { ...input, [name]: value };
        setInput(newForm);
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
            login: '',
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
            <h1>Alta usuarios</h1>
            <form action="" className={styles.form}>
                <div className={styles.inputText}>

                    <input type="text" name="Nombre" value={input.Nombre} onChange={handleChange} placeholder="Nombre" />
                    <input type="text" name="login" value={input.login} onChange={handleChange} placeholder="Usuario"/>
                    <input type="text" name="password" value={input.password}  onChange={handleChange} placeholder="Contraseña"/>
                    <input type="text" name="confirmPassword" value={input.confirmPassword} onChange={handleChange} placeholder="Repetir Contraseña"/>
                    <input type="text" name="UsuarioAnura"  value={input.UsuarioAnura} onChange={handleChange} placeholder="Usuario Anura"/>
                    <input type="text" name="email" value={input.email}  onChange={handleChange} placeholder="Email"/>
                </div>
                <div className={styles.inputSelect}>
                                 <div>
                    <span>Vendedor: </span>
                <select name="Vendedor" value={input.Vendedor} onChange={handleChange} id="">
                    <option value="">---</option>
                    {vendedores && vendedores.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>
                <div>
                    <span>Gerente: </span>
                <select name="Gerente" value={input.Gerente}  onChange={handleChange} id="">
                    <option value="">---</option>
                    {gerentes && gerentes.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>
                <div>
                    <span>Supervisor: </span>
                <select name="Supervisor" value={input.Supervisor}  onChange={handleChange} id="">
                    <option value="">---</option>
                    {supervisores && supervisores.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>
                <div>
                    <span>Team Leader: </span>
                <select name="TeamLeader" value={input.TeamLeader}  onChange={handleChange} id="">
                    <option value="">---</option>
                    {teamLeaders && teamLeaders.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>   
                </div>

                <div> <span>Ver solo scoring asingado </span><input name="scoringAsignado" value={input.scoringAsignado} onChange={handleCheckChange} type="checkbox" /></div>
                <div><span>Bloqueado </span><input name="us_bloqueado" value={input.us_bloqueado} onChange={handleCheckChange} type="checkbox" /></div>
                <div><span>Activo </span><input type="checkbox" name="us_activo" value={input.us_activo} onChange={handleCheckChange}/></div>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Enviar</button>
                {statusNuevoUsuario.length? <p>{statusNuevoUsuario[0].data}</p> : null} {/* Probar con poner el swal en useEffect */}
            </form>
    
        </div>
    )
}

export default AltaUsuariosForm