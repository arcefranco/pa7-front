import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { getAllGerentes, getAllSupervisores, getAllTeamLeaders, getAllVendedores } from "../../reducers/Usuarios/UsuariosSlice";


const AltaUsuariosForm = () => {
const dispatch = useDispatch()

useEffect(() => {
    Promise.all([dispatch(getAllVendedores()), dispatch(getAllGerentes()), dispatch(getAllSupervisores()), dispatch(getAllTeamLeaders())])

}, [])

const {vendedores, gerentes, supervisores, teamLeaders} = useSelector(
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
        us_activo: '', 
        us_bloqueado: '', 
        scoringAsignado: '', 
        newUserBoolean: '', 
        email: '' 

    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = { ...input, [name]: value };
        setInput(newForm);
    };
    return (
        <div>
            <h1>Alta usuarios</h1>
            <form action="">
                <input type="text" name="Nombre" value={input.Nombre} onChange={handleChange} placeholder="Nombre" />
                <input type="text" name="login" value={input.login} onChange={handleChange} placeholder="Usuario"/>
                <input type="text" name="password" value={input.password}  onChange={handleChange} placeholder="Contraseña"/>
                <input type="text" name="confirmPassword" value={input.confirmPassword} onChange={handleChange} placeholder="Repetir Contraseña"/>
                <input type="text" name="UsuarioAnura"  value={input.UsuarioAnura} onChange={handleChange} placeholder="Usuario Anura"/>
                <input type="text" name="email" value={input.email}  onChange={handleChange} placeholder="Email"/>
                <div>
                    <span>Vendedores: </span>
                <select name="Vendedor" value={input.Vendedor} onChange={handleChange} id="">
                    <option value="">---</option>
                    {vendedores && vendedores.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>
                <div>
                    <span>Gerentes: </span>
                <select name="Gerente" value={input.Gerente}  onChange={handleChange} id="">
                    <option value="">---</option>
                    {gerentes && gerentes.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>
                <div>
                    <span>Supervisores: </span>
                <select name="Supervisor" value={input.Supervisor}  onChange={handleChange} id="">
                    <option value="">---</option>
                    {supervisores && supervisores.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>
                <div>
                    <span>Team Leaders: </span>
                <select name="TeamLeader" value={input.TeamLeader}  onChange={handleChange} id="">
                    <option value="">---</option>
                    {teamLeaders && teamLeaders.map(e => <option key={e.Codigo}>{`${e.Codigo} ${e.Nombre}`}</option>)}
                </select>
                </div>
                
            </form>
        </div>
    )
}

export default AltaUsuariosForm