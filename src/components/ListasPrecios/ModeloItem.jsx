import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usuarioStyles from '../UsuariosTable/UsuariosTable.module.css'
import { deleteModeloFromLista, updatePrecioModelo } from "../../reducers/ListasPrecios/ListaSlice";


const ModeloItem = ({Codigo, Lista, Nombre, Precio}) => {

const [modelo, setModelo] = useState({
    Codigo: Codigo,
    Nombre: Nombre,
    Precio: Precio
})

const {updatedModelo} = useSelector((state) => state.listasprecios)

const dispatch = useDispatch()

const HandleChange =  (e) =>{
  
    
    const {name , value} = e.target
    const newForm = {...modelo,
      [name]:value,
      }
    
    setModelo(newForm)
    
  }



  const onSubmit = (codigoModelo) => {
    dispatch(updatePrecioModelo({
        precio: modelo.Precio, 
        lista: Lista, 
        codigoModelo: codigoModelo
    }))
  }

  const onDelete = (codigoModelo) => {
    dispatch(deleteModeloFromLista({
        lista: Lista, 
        codigoModelo: codigoModelo
    }))
  }
    return (
        <tr>
        <td>{Codigo}</td>
{/*  <td onClick={() => setEditable(true)} contentEditable={true}> {editable ? <input type="text" value={editable ? modelo.Nombre : Nombre} /> : Nombre}  </td> */}
        <td>{Nombre}</td>
        <td><input type="text" style={{textAlignLast: 'right'}}  onChange={HandleChange} name="Precio" value={modelo.Precio} /></td>
        <td>
            {
                modelo.Nombre !== Nombre && !updatedModelo || modelo.Precio !== Precio  && !updatedModelo  ? 
                <button style={{background:'#3dc254bf', cursor: 'pointer', width: '117px'}} className={usuarioStyles.buttonRows} onClick={() => onSubmit(Codigo)}>Guardar Modificación</button> :
                <button style={{background:'gray', width: '117px'}} className={usuarioStyles.buttonRows} disabled>Guardar Modificación</button>
            }
            
        
        </td>
        <td><button style={{background:"red", cursor: 'pointer', width: '53px'}} className={usuarioStyles.buttonRows} onClick={() => onDelete(Codigo)}>Eliminar</button></td>
        {
            updatedModelo && updatedModelo.codigo === Codigo && <span style={{fontSize: '12px'}}>{updatedModelo.message}</span>
        }
    </tr>
    )
}

export default ModeloItem