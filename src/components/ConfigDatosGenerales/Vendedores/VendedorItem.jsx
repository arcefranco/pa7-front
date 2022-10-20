import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import * as AiIcons from 'react-icons/ai'
import { deleteVendedores, updateVendedores, beginUpdate, endUpdate } from "../../../reducers/Vendedores/vendedoresSlice";
import styles from '../../../styles/Table.module.css'
import Swal from "sweetalert2";

const VendedorItem = ({Codigo, Nombre, TeamLeader, Categoria, OficialS, OficialM, FechaBaja, Escala, Activo}) => {



const [item, setItem] = useState({
    Codigo: Codigo,
    Nombre: Nombre,
    TeamLeader: TeamLeader,
    Categoria: Categoria,
    OficialS: OficialS,
    OficialM: OficialM,
    FechaBaja: FechaBaja,
    Escala: Escala,
    Activo: Activo
})
const [edit, setEdit] = useState(false)
const {oficialesScoring, teamleader, oficialesMora, statusNuevoVendedor} = useSelector(
    (state) => state.vendedores)
    
    const dispatch = useDispatch()

useEffect(() => {
    if(Object.keys(statusNuevoVendedor)?.includes('status') ) { //esta mirando el estado de statusNuevoVendedor (inUpdate) para inhabilitar la edicion mientras este en false
        setEdit(false)
    }
}, [statusNuevoVendedor])
    
    const handleChange =  (e) =>{
        
        const {name , value} = e.target
        let parseValue = value
        if(name === "OficialS" || name === "OficialM" || name === "TeamLeader" || name === "Escala") {
            parseValue = parseInt(value)
        }
        const newForm = {...item,
            [name]:parseValue,
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
    
     const HandleSubmitUpdate =async (event) =>{
        event.preventDefault()
        
        
          dispatch(updateVendedores(item))
    }
    
    
    const handleEdit = () => {
        dispatch(beginUpdate({Codigo: Codigo})) 
        setEdit(true)
    }
    const handleDelete = () => {
        Swal.fire({
            icon: 'info',
            title: `Seguro que desea eliminar el vendedor ${Nombre}?`,
            showConfirmButton: true,
            showCancelButton: true
            
          }).then((result) => {
            if (result.isConfirmed) {

                dispatch(deleteVendedores({Codigo: Codigo}))
              
            } 
        })
        
    }
    
    const thisOficialS = oficialesScoring?.find(e => e.Codigo === OficialS)
    const thisTeamLeader = teamleader?.find(e => e.Codigo === TeamLeader)
    const thisOficialM = oficialesMora?.find(e => e.Codigo === OficialM)

return (
    <tr>
        <td>{Codigo}</td>
        <td>

            {
                !edit ? <span>{Nombre}</span> :
                <input type="text" className={styles.inputFilter} name="Nombre" value={item.Nombre} onChange={handleChange} />
            }
            
        
            
        </td>

        <td>
            
            {
                !edit ? <span>{thisTeamLeader?.Nombre}</span> : 

                <select style={{
                    border: 'none',
                    background: 'none'
            }} name="TeamLeader" value={item.TeamLeader} onChange={handleChange} id="">
                {
                    thisTeamLeader && <option value={thisTeamLeader.Codigo}>{thisTeamLeader.Nombre}</option> 
                }
                <option value="*">---</option>
                {
                    teamleader && teamleader.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                }
                </select>

            }
                
        </td>
        
        <td>

            {
                !edit ? <span>{thisOficialS?.Nombre}</span> : 


                    <select style={{
                            border: 'none',
                            background: 'none'
                    }} name="OficialS" value={item.OficialS} onChange={handleChange} id="">
                        {
                            thisOficialS && <option value={thisOficialS.Codigo}>{thisOficialS.Nombre}</option> 
                        }
                        <option value="*">---</option>
                        {
                            oficialesScoring && oficialesScoring.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                        }
                    </select>
            }
            
            
                
        </td>
        <td>

            {
                !edit ? <span>{thisOficialM?.Nombre}</span> : 
                <select style={{
                    border: 'none',
                    background: 'none'
            }} name="OficialM" value={item.OficialM} onChange={handleChange} id="">
                {
                    thisOficialM && <option value={thisOficialM.Codigo}>{thisOficialM.Nombre}</option> 
                }
                <option value="*">---</option>
                {
                    oficialesMora && oficialesMora.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                }
            </select>
            }
            
                
        </td>
        <td>
            
           {
            !edit && FechaBaja && FechaBaja !== '00/00/0000' ? 
            <input type="date" readOnly={true} className={styles.inputDate} name="FechaBaja" 
            value={item.FechaBaja?.split('/').reverse().join('-')} /> :
            !edit && (FechaBaja === '00/00/0000' || !FechaBaja) ? <span></span> : 
            <input type="date" className={styles.inputDate} name="FechaBaja" 
            value={item.FechaBaja?.split('/').reverse().join('-')} 
            onChange={handleChange} />
           } 
                
        </td>
        <td>
            {
                !edit ? <span>{Escala === 1 ? 'Margian' : Escala === 2 ? "Gestión Financiera" : null}</span> : 
                <select name="Escala" onChange={handleChange} value={item.Escala}>
                    <option value={null}>---</option>
                    <option value={1}>Margian</option>
                    <option value={2}>Gestion Financera</option>
                </select>
            }
            
        </td>


        <td style={{textAlign: 'center'}}>
            {
                !edit ? 
                <input name="Activo" 
                disabled 
                type="checkbox"value={item.Activo} 
                checked={item.Activo === 1 ? true : false}/> :

                <input name="Activo"  
                type="checkbox"value={item.Activo} 
                checked={item.Activo === 1 ? true : false} 
                onChange={handleCheckChange}/> 
            }
            
            </td>
            <td>
            {
                    !edit ? <AiIcons.AiFillEdit style={{marginLeft: '0.5rem', cursor: 'pointer'}}  onClick={handleEdit}/> : 
                    <AiIcons.AiFillCloseCircle style={{color: 'red', marginLeft: '0.5rem', cursor: 'pointer'}}  onClick={() =>{
                        dispatch(endUpdate({Codigo: Codigo})) 
                        setEdit(false)
                        setItem({
                            Codigo: Codigo,
                            Nombre: Nombre,
                            TeamLeader: TeamLeader,
                            Categoria: Categoria,
                            OficialS: OficialS,
                            OficialM: OficialM,
                            FechaBaja: FechaBaja,
                            Escala: Escala,
                            Activo: Activo
                        })
                    }} />
            }
            </td>
        <td>
            {
            item.Activo === Activo && item.Nombre === Nombre && item.OficialS === OficialS && item.OficialM === OficialM 
            && item.Escala === Escala  && item.TeamLeader === TeamLeader && item.FechaBaja === FechaBaja?
    
                
            <button disabled className={`${styles.buttonRows} ${styles.disabled}`}>Guardar datos</button> 

                                                                                                                        :
            <button className={`${styles.buttonRows} ${styles.modify}`} 
             onClick={(e) => HandleSubmitUpdate(e)} >
                Guardar datos
            </button> 
            }
            
        
        </td>

        <td>
            <button onClick={handleDelete} className={`${styles.buttonRows} ${styles.delete}`}>
                Eliminar
            </button>
        </td>

    </tr>
    )
}

export default VendedorItem