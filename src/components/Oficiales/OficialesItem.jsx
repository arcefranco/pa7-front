import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOficialCategoria } from "../../reducers/Oficiales/OficialesSlice";
const OficialesItem = ({title, color}) => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div style={{backgroundColor: color, 
        padding:'2rem', 
        border: 'none', 
        margin: '1rem',
        cursor: 'pointer',
        borderRadius: '4px'
        
        }} onClick={() =>{ 
            navigate(`/oficiales/${title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)
            dispatch(getOficialCategoria(title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
            
            }}>

            <h3>{title}</h3>
        </div>
    )
}


export default OficialesItem