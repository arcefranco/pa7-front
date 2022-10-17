import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from 'react-icons/ai'
import {endUpdate, deleteOficiales, updateOficiales, beginUpdate } from "../../reducers/Oficiales/OficialesSlice";
import styles from '../../styles/Table.module.css'
import Swal from "sweetalert2";
import { useEffect } from "react";
const OficialItem = ({Categoria, Codigo, Nombre, Activo, Inactivo, IdUsLogin, Objetivo, TipoOficialMora, login, HNMayor40, Supervisor}) => {


    const [item, setItem] = useState({
        categoria: Categoria,
        Codigo: Codigo,
        Nombre: Nombre,
        Activo: Activo,
        Inactivo: Inactivo,
        Usuario: IdUsLogin,
        Objetivo: Objetivo,
        TipoOficialMora: TipoOficialMora,
        login: login,
        HNMayor40: HNMayor40,
        Supervisor: Supervisor
    })
    const [edit, setEdit] = useState(false)
    const { sucursalStatus } = useSelector(state => state.sucursales)
    const { usuarios, supervisores } = useSelector(state => state.usuarios)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const {name , value} = e.target
        let parseValue = value
        if(name === "Objetivo" || name === 'TipoOficialMora' || name === 'HNMayor40' || name === 'Supervisor') {
            parseValue = !isNaN(value) ? parseInt(value) : value
        }
        const newForm = {...item,
            [name]: parseValue === "*" ? null : parseValue,
        }       
        
        setItem(newForm)
    }

     const handleEdit = () => {
        dispatch(beginUpdate({Codigo: Codigo, categoria: Categoria})) 
        setEdit(true)
    } 

    const handleStopEdit = () => {
        dispatch(endUpdate({Codigo: Codigo, categoria: Categoria}))
        setEdit(false)
    }

    const handleDelete = () => {
        Swal.fire({
            icon: 'info',
            title: `Seguro que desea eliminar el oficial ${Nombre}?`,
            showConfirmButton: true,
            showCancelButton: true
            
          }).then((result) => {
            if (result.isConfirmed) {

                dispatch(deleteOficiales({Codigo: Codigo, oficialName: Categoria}))
              
            } 
        })
        
    }

    const handleSubmitUpdate = () => {
        dispatch(updateOficiales(item))
        setEdit(false)
    }
    const handleCheckChange = (e) => {
        const { name} = e.target;
        var value = e.target.checked
        value = e.target.checked? 1 : 0
        const newForm = { ...item, [name]: value };
        setItem(newForm);
    };
    const handleCheckInactivoChange = (e) => {
        const { name} = e.target;
        var value = e.target.checked
        value = e.target.checked? 0 : 1
        const newForm = { ...item, [name]: value };
        setItem(newForm);
    };

    useEffect(() => {
        if(sucursalStatus?.status === false) { //esta mirando el estado de sucursalStatus (inUpdate) para inhabilitar la edicion mientras este en false
            setEdit(false)
        }
    }, [sucursalStatus])

    const thisUsuario = usuarios.find(e => e.Usuario === IdUsLogin)
    const thisLogin = usuarios.find(e => e.Usuario === login)
    const thisSupervisor = supervisores.find(e => e.Codigo === Supervisor)
    return (
        <tr>
            <td><span>{Codigo}</span></td>

            <td>{
                edit ? 
                
                <input type="text" name="Nombre" value={item.Nombre}  onChange={handleChange}/> 
                : 
                <span>{Nombre}</span>

                }
                </td>
                {
                Categoria === 'Scoring' || Categoria === 'Mora' && 
                <td>
                    {
                        edit ? 
                        <select value={item.Usuario} name="Usuario" onChange={handleChange}>
                            {
                            thisUsuario && <option value={thisUsuario.Usuario}>{thisUsuario.Usuario}</option>
                            }
                            {
                                usuarios && usuarios.map( e => <option value={e.Usuario}>{e.Usuario}</option>)
                            }
                        </select> :
                    <span>{IdUsLogin}</span>
                    }
                </td>
                }
                {
                Categoria === 'Subite' || Categoria === 'Compra' && 
                <td>
                    {
                        edit ? 
                        <select value={item.login} name="login" onChange={handleChange}>
                            {
                            thisLogin && <option value={thisLogin.Usuario}>{thisLogin.Usuario}</option>
                            }
                            {
                                usuarios && usuarios.map( e => <option value={e.Usuario}>{e.Usuario}</option>)
                            }
                        </select> :
                    <span>{login}</span>
                    }
                </td>
                }
                {
                Categoria === 'Subite' || Categoria === 'Compra' && 
                <td>
                    {
                        edit ? 
                        <select value={item.HNMayor40} name="HNMayor40" onChange={handleChange}>
                            <option value="*">---</option>
                            <option value={0}>Menor a 50.000</option>
                            <option value={1}>Mayor a 50.000</option>
                        </select> :
                    <span>
                        {
                        
                        HNMayor40 === 0 ? 'Menor a 50.000' : HNMayor40 === 1 ? 'Mayor a 50.000' : null
                        
                        }
                    </span>
                    }
                </td>
                }
                {
                Categoria === 'Subite' && 
                <td>
                    {
                        edit ? 
                        <select value={item.Supervisor} name="Supervisor" onChange={handleChange}>
                            {
                            thisSupervisor && <option value={thisSupervisor.Codigo}>{thisSupervisor.Nombre}</option>
                            }
                            {
                                supervisores && supervisores.map( e => <option value={e.Codigo}>{e.Nombre}</option>)
                            }
                        </select> :
                    <span>
                        {thisSupervisor.Nombre}
                    </span>
                    }
                </td>
                }
                {
                Categoria === 'Mora' && 
                <td>
                    {
                        edit ? 
                        <select value={item.TipoOficialMora} name="TipoOficialMora" onChange={handleChange}>
                            <option value={1}>Temprana</option>
                            <option value={2}>Especializada</option>
                            <option value={3}>Encuadre</option>
                        </select> :
                    <span>
                        {
                            TipoOficialMora === 1 ? 'Temprana' : TipoOficialMora === 2 ? 'Especializada' : TipoOficialMora === 3 ? 'Encuadre' : 
                            null
                        }
                    </span>
                    }
                </td>
                }
                <td>{
                 typeof Activo === 'number' ? //Pregunta si existe la propiedad, no si es un numero
                 (

                edit ?
                
                        <input type="checkbox" name="Activo" value={item.Activo}  onChange={handleCheckChange}/> 
                    : 
                        item.Activo === 1 ? <input type="checkbox" checked readOnly={true} /> : <input type="checkbox" disabled readOnly/>
                ) 
                
                :

                (
                edit ?
                        <input type="checkbox" name="Inactivo" value={item.Inactivo}  onChange={handleCheckInactivoChange}/> 
                    : 
                        item.Inactivo === 0 ? <input type="checkbox" checked readOnly={true} /> : <input type="checkbox" disabled readOnly/>
                )
                }
            </td>
            {
                Categoria === 'Scoring' && 
                <td>
                    {
                        edit ? <input type="text" name="Objetivo" value={item.Objetivo} onChange={handleChange}/> : 
                        <span>{Objetivo}</span>
                    }
                </td>
                }
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
                    item.Nombre !== Nombre  || item.Activo !== Activo || item.Inactivo !== Inactivo || item.Objetivo !== Objetivo 
                    || item.Usuario !== IdUsLogin || item.TipoOficialMora !== TipoOficialMora || item.HNMayor40 !== HNMayor40
                    || item.Supervisor !== Supervisor || item.login !== login
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


export default OficialItem