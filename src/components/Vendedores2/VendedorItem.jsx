import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import * as AiIcons from 'react-icons/ai'
import { deleteVendedores, updateVendedores, beginUpdate, endUpdate } from "../../reducers/Vendedores/vendedoresSlice";
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
const {oficialesScoring, teamleader, oficialesMora, vendedoresById} = useSelector(
    (state) => state.vendedores)
    
    const dispatch = useDispatch()

 useEffect(() => {

    if((vendedoresById?.status === true) && (vendedoresById?.codigo !== Codigo) && edit){
            setEdit(false)
            dispatch(endUpdate({Codigo: Codigo}))
    }
    
    return () => {
        if((vendedoresById?.status === true) && (vendedoresById?.codigo !== Codigo) && edit){
            setEdit(false)
            dispatch(endUpdate({Codigo: Codigo}))
        }
    }
    
}, [vendedoresById]) 

useEffect(() => {
    if(vendedoresById?.status === false){
       setEdit(false)
    }
}, [vendedoresById])
    
    const HandleChange =  (e) =>{
        
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
    
    const thisOficialS = oficialesScoring?.find(e => e.Codigo === OficialS)
    const thisTeamLeader = teamleader?.find(e => e.Codigo === TeamLeader)
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
                !edit ? <span>{thisTeamLeader?.Nombre}</span> : 

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
                !edit ? <span>{thisOficialS?.Nombre}</span> : 


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
                !edit ? <span>{thisOficialM?.Nombre}</span> : 
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
            
           {
            !edit ? <input type="date" readOnly={true} className={styles.inputFilter} name="FechaBaja" 
            value={item.FechaBaja?.split('/').reverse().join('-')} /> :

            <input type="date" className={styles.inputFilter} name="FechaBaja" 
            value={item.FechaBaja?.split('/').reverse().join('-')} 
            onChange={HandleChange} />
           } 
                
        </td>
        <td>
            {
                !edit ? <span>{Escala === 1 ? 'Margian' : Escala === 2 ? "Gestión Financiera" : null}</span> : 
                <select name="Escala" onChange={HandleChange} value={item.Escala}>
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
    
                
            <button disabled className={`${styles.buttonRows} ${styles.disabled}`}>Modificar</button> 

                                                                                                                        :
            <button className={`${styles.buttonRows} ${styles.modify}`} 
             onClick={(e) => HandleSubmitUpdate(e)} >
                Modificar
            </button> 
            }
            
        
        </td>

        <td>
            <button onClick={() => dispatch(deleteVendedores({Codigo: Codigo}))} className={`${styles.buttonRows} ${styles.delete}`}>
                Eliminar
            </button>
        </td>

    </tr>
    )
}

export default VendedorItem