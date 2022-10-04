import React, {useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import * as AiIcons from 'react-icons/ai'
import { updateVendedores } from "../../reducers/Vendedores/vendedoresSlice";
import styles from '../Gerentes2/Gerentes.module.css'


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
const {oficialesScoring, teamleader, oficialesMora} = useSelector(
    (state) => state.vendedores)
    
    const dispatch = useDispatch()
    
    const HandleChange =  (e) =>{
        
        const {name , value} = e.target
        let parseValue = value
        if(name === "OficialS" || name === "OficialM" || name === "TeamLeader") {
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
/*         dispatch(beginUpdate({Codigo: Codigo})) */
        setEdit(true)
    }
    
    const thisOficialS = oficialesScoring?.find(e => e.Codigo === OficialS)
    const thisTeamLeader = teamleader?.find(e => e.Nombre === TeamLeader)
    const thisOficialM = oficialesMora?.find(e => e.Codigo === OficialM)

return (
    <tr>
        <td>{Codigo}</td>
        <td>

            {
                !edit ? <span>{Nombre}</span> :
                <input type="text" className={styles.inputFilter} name="Nombre" value={item.Nombre} onChange={HandleChange} />
            }
            
        
            
        </td>

        <td>
            
            {
                !edit ? <span>{TeamLeader}</span> : 

                <select style={{
                    border: 'none',
                    background: 'none'
            }} name="TeamLeader" value={item.TeamLeader} onChange={HandleChange} id="">
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
                !edit ? <span>{OficialS}</span> : 


                    <select style={{
                            border: 'none',
                            background: 'none'
                    }} name="OficialS" value={item.OficialS} onChange={HandleChange} id="">
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
                !edit ? <span>{OficialM}</span> : 
                <select style={{
                    border: 'none',
                    background: 'none'
            }} name="OficialM" value={item.OficialM} onChange={HandleChange} id="">
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
            
            <input type="date" className={styles.inputFilter} name="FechaBaja" 
            value={item.FechaBaja?.split('/').reverse().join('-')} 
            onChange={HandleChange} />
                
        </td>
        <td>
            {
                !edit ? <span>{Escala}</span> : 
                <select name="Escala" onChange={HandleChange} value={item.Escala}>
                    <option value={1}>Margian</option>
                    <option value={2}>Gestion Financera</option>
                </select>
            }
            
        </td>


        <td>
            
         <input name="Activo" type="checkbox"value={item.Activo} checked={item.Activo === 1 ? true : false} onChange={handleCheckChange}/> 
            
            </td>
            <td>
            {
                    !edit ? <AiIcons.AiFillEdit style={{marginLeft: '0.5rem', cursor: 'pointer'}}  onClick={handleEdit}/> : 
                    <AiIcons.AiFillCloseCircle style={{color: 'red', marginLeft: '0.5rem', cursor: 'pointer'}}  onClick={() =>{
/*                         dispatch(endUpdate({Codigo: Codigo})) */
                        setEdit(false)}} />
            }
            </td>
        <td>
            {
            item.Activo === Activo && item.Nombre === Nombre && item.OficialS === OficialS ?
    
                
            <button disabled className={`${styles.buttonRows} ${styles.disabled}`}>Modificar</button> 

                                                                                                                        :
            <button className={`${styles.buttonRows} ${styles.modify}`} 
             onClick={(e) => HandleSubmitUpdate(e)} >
                Modificar
            </button> 
            }
            
        
        </td>

        <td>
            <button /* onClick={() => dispatch(deleteGerentes({Codigo: Codigo}))} */ className={`${styles.buttonRows} ${styles.delete}`}>
                Eliminar
            </button>
        </td>

    </tr>
    )
}

export default VendedorItem