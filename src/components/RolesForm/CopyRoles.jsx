import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { copyRoles, getAllUsuarios, reset } from "../../reducers/Usuarios/UsuariosSlice";

const CopyRoles = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {usuarios, rolStatus, isSuccess} = useSelector(state => state.usuarios)
    useEffect(() => {
        Promise.all([dispatch(getAllUsuarios()), dispatch(reset())])

    }, [])
    useEffect(() => {
        rolStatus.length &&
        Swal.fire({
            icon:'info',
            timer: 15000,
            text: rolStatus
          }).then((result) => {
            if(result.isConfirmed && isSuccess){
               navigate('/roles')
            }
          }) 

    }, [rolStatus])

    const handleUserChange = () => {
        var userFrom = document.getElementById("userFrom").value;
        var userTo =   document.getElementById("userTo").value;
        console.log('userFrom: ', userFrom, 'userTo:',  userTo)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            userFrom: document.getElementById("userFrom").value,
            userTo: document.getElementById("userTo").value
        }

        dispatch(copyRoles(userData))
    }
    return (
        <div>
            <h1>Copiar Roles</h1>
            <form action="">

            <span>Copiar de: </span>
            <select name="" id="userFrom" onChange={handleUserChange}>
                <option value="">---</option>
                {
                    usuarios && usuarios.map(e => 
                        <option key={e.Usuario} value={e.Usuario}>{e.Nombre}</option>
                        )
                }
            </select>
            <span>a: </span>
            <select name="" id="userTo" onChange={handleUserChange}>
                <option value="">---</option>
                {
                    usuarios && usuarios.map(e => 
                        <option key={e.Usuario} value={e.Usuario}>{e.Nombre}</option>
                        )
                }
            </select>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Copiar</button>
            </form>
        </div>
    )
}

export default CopyRoles