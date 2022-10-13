import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from 'react-icons/ai'
import { beginUpdate, updateUsuario, endUpdate, deleteUsuario } from "../../reducers/Usuarios/UsuariosSlice";
import styles from '../../styles/Table.module.css'
import Swal from "sweetalert2";
import { useEffect } from "react";


const UsuariosItem = ({Codigo, Nombre, Usuario, Vendedor, TeamLeader, Supervisor, Email, Gerente, Anura, Scoring, Bloqueado, Activo}) => {


    const [item, setItem] = useState({
        ID: Codigo,
        Nombre: Nombre,
        Usuario: Usuario,
        Vendedor: Vendedor,
        TeamLeader: TeamLeader,
        Supervisor: Supervisor,
        Gerente: Gerente,
        email: Email,
        UsuarioAnura: Anura,
        scoringAsignado: Scoring,
        us_bloqueado: Bloqueado,
        us_activo: Activo
    })
    const [edit, setEdit] = useState(false)
    const { statusNuevoUsuario, vendedores, teamLeaders, supervisores, gerentes} = useSelector(state => state.usuarios)
    const dispatch = useDispatch()

    const handleChange = (e) => {
                
        const {name , value} = e.target
        let parseValue = value
        if(name === "Vendedor" || name === "TeamLeader" || name === "Supervisor" || name === "Gerente" || name === "scoringAsginado") {
            parseValue = !isNaN(value) ? parseInt(value) : value
        }
        const newForm = {...item,
            [name]: parseValue === "*" ? null : parseValue,
        }
        
        setItem(newForm)
    }

    const handleCheckChange = (e) => {
        const { name} = e.target;
        var value = e.target.checked
        value = e.target.checked? 1 : 0
        const newForm = { ...item, [name]: value };
        setItem(newForm);
    };

    const handleEdit = () => {
        dispatch(beginUpdate({Codigo: Codigo})) 
        setEdit(true)
    }
 
    const handleStopEdit = () => {
        dispatch(endUpdate({Codigo: Codigo}))
        setEdit(false)
    }

    const handleDelete = () => {
        Swal.fire({
            icon: 'info',
            title: `Seguro que desea eliminar el usuario ${Nombre}?`,
            showConfirmButton: true,
            showCancelButton: true
            
          }).then((result) => {
            if (result.isConfirmed) {

                dispatch(deleteUsuario({id: Codigo}))
              
            } 
        })
        
    }

    const handleSubmitUpdate = () => {
        dispatch(updateUsuario(item))
        setEdit(false)
    }

    useEffect(() => {
        if(statusNuevoUsuario?.status === false) { //esta mirando el estado de statusNuevoUsuario (inUpdate) para inhabilitar la edicion mientras este en false
            setEdit(false)
        }
    }, [statusNuevoUsuario])

    const thisVendedor = vendedores.find(e => e.Codigo === Vendedor)
    const thisTeamLeader = teamLeaders.find(e => e.Codigo === TeamLeader)
    const thisSupervisor = supervisores.find(e => e.Codigo === Supervisor)
    const thisGerente = gerentes.find(e => e.Codigo === Gerente)
    return (
        <tr>
            <td><span>{Codigo}</span></td>
            <td>{
                edit ? 
                
                <input type="text" className={styles.inputText} name="Usuario" value={item.Usuario}  onChange={handleChange}/> 
                : 
                <span>{Usuario}</span>

                }
                </td>
            <td>{
                edit ? 
                
                <input type="text" className={styles.inputText} name="Nombre" value={item.Nombre}  onChange={handleChange}/> 
                : 
                <span>{Nombre}</span>

                }
            </td>

            <td>
                {
                !edit ? <span>{thisVendedor?.Nombre}</span> : 

                <select className={styles.select}  name="Vendedor" value={item.Vendedor} onChange={handleChange} id="">
                {
                    thisVendedor && <option value={thisVendedor.Codigo}>{thisVendedor.Nombre}</option> 
                }
                <option value="*">---</option>
                {
                    vendedores && vendedores.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                }
                </select>

            }
            </td>
            <td>
                {
                !edit ? <span>{thisTeamLeader?.Nombre}</span> : 

                <select className={styles.select}  name="TeamLeader" value={item.TeamLeader} onChange={handleChange} id="">
                {
                    thisTeamLeader && <option value={thisTeamLeader.Codigo}>{thisTeamLeader.Nombre}</option> 
                }
                <option value="*">---</option>
                {
                    teamLeaders && teamLeaders.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                }
                </select>

            }
            </td>
            <td>
                {
                !edit ? <span>{thisSupervisor?.Nombre}</span> : 

                <select className={styles.select}  name="Supervisor" value={item.Supervisor} onChange={handleChange} id="">
                {
                    thisSupervisor && <option value={thisSupervisor.Codigo}>{thisSupervisor.Nombre}</option> 
                }
                <option value="*">---</option>
                {
                    supervisores && supervisores.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                }
                </select>

            }
            </td>
            <td>
                {
                !edit ? <span>{thisGerente?.Nombre}</span> : 

                <select className={styles.select}  name="Gerente" value={item.Gerente} onChange={handleChange} id="">
                {
                    thisGerente && <option value={thisGerente.Codigo}>{thisGerente.Nombre}</option> 
                }
                <option value="*">---</option>
                {
                    gerentes && gerentes.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                }
                </select>

            }
            </td>
                <td>{
                edit ? 
                
                <input type="text" className={styles.inputText} name="email" value={item.email}  onChange={handleChange}/> 
                : 
                <span>{Email}</span>

                }
            </td>

            <td>{
                edit ? 
                
                <input type="text" className={styles.inputText} name="UsuarioAnura" value={item.UsuarioAnura}  onChange={handleChange}/> 
                : 
                <span>{Anura}</span>

                }
            </td>
            <td>{
                edit ? 
                
                <input type="checkbox" name="scoringAsignado" value={item.Scoring}  onChange={handleCheckChange}/> 
                : 
                item.scoringAsignado === 1 ? <input type="checkbox" checked /> : <input type="checkbox" />

                }
            </td>
            <td>{
                edit ? 
                
                <input type="checkbox" name="us_bloqueado" value={item.Bloqueado}  onChange={handleCheckChange}/> 
                : 
                item.us_bloqueado === 1 ? <input type="checkbox" checked /> : <input type="checkbox" />

                }
            </td>
            <td>{
                edit ? 
                
                <input type="checkbox" name="us_activo" value={item.Activo}  onChange={handleCheckChange}/> 
                : 
                item.us_activo === 1 ? <input type="checkbox" checked /> : <input type="checkbox" />

                }
            </td>


            <td>
                {
                    edit ? 

                    <AiIcons.AiFillCloseCircle style={{color: 'red', marginLeft: '0.5rem', cursor: 'pointer'}}
                    onClick={handleStopEdit} /> 
                     
                    : 

                    <AiIcons.AiFillEdit style={{marginLeft: '0.5rem', cursor: 'pointer'}}  onClick={handleEdit}/>
                }
                
            
            
            </td> 
            <td>
                {
                    item.Nombre !== Nombre || item.Usuario !== Usuario || item.Vendedor !== Vendedor || item.TeamLeader !== TeamLeader 
                    || item.Supervisor !== Supervisor || item.Gerente !== Gerente || item.email !== Email || item.UsuarioAnura !== Anura
                    || item.us_bloqueado !== Bloqueado || item.scoringAsignado !== Scoring || item.us_activo !== Activo
                    ? 
                    
                    <button className={`${styles.buttonRows} ${styles.modify}`} onClick={handleSubmitUpdate}>Guardar datos</button> 
                    
                    :

                    <button className={`${styles.buttonRows} ${styles.disabled}`}>Guardar datos</button>

                }
                
                
            </td>
            <td><button className={`${styles.buttonRows} ${styles.delete}`} onClick={handleDelete}>Eliminar</button></td>
        </tr>
    )
}


export default UsuariosItem