import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from 'react-icons/ai'
import {endUpdate, deleteOficiales, updateOficiales, beginUpdate } from "../../reducers/Oficiales/OficialesSlice";
import styles from '../../styles/Table.module.css'
import Swal from "sweetalert2";
import { useEffect } from "react";
const OficialItem = ({Categoria, Codigo, Nombre, Activo, Inactivo, IdUsLogin}) => {


    const [item, setItem] = useState({
        categoria: Categoria,
        Codigo: Codigo,
        Nombre: Nombre,
        Activo: Activo,
        Inactivo: Inactivo,
        Usuario: IdUsLogin
    })
    const [edit, setEdit] = useState(false)
    const { sucursalStatus } = useSelector(state => state.sucursales)
    const dispatch = useDispatch()

    const handleChange = (e) => {
                
        const {name , value} = e.target
        const newForm = {...item,
            [name]: value,
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
                <td>{
                 typeof Activo === 'number' ? 
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
                    item.Nombre !== Nombre  || item.Activo !== Activo || item.Inactivo !== Inactivo? 
                    
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