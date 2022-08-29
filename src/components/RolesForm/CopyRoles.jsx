import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import styles from './Roles.module.css'
import { copyRoles, getAllUsuarios, reset, replaceRoles } from "../../reducers/Usuarios/UsuariosSlice";


const CopyRoles = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {usuarios, rolStatus, isSuccess} = useSelector(state => state.usuarios)
    useEffect(() => {
        Promise.all([dispatch(getAllUsuarios()), dispatch(reset())])

    }, [])
    useEffect(() => {
        if(rolStatus.length && !rolStatus.status){
            Swal.fire({
                icon:'info',
                timer: 15000,
                text: rolStatus
              }).then((result) => {
                if(result.isConfirmed && isSuccess){
                   navigate('/roles')
                }
              }) 

        }else if(rolStatus.status){

            Swal.fire({
              icon:'info',
              showConfirmButton: true,
              showCancelButton:true,
              timer: 5000,
              text: rolStatus.message
          }).then((result) => {
              if(result.isConfirmed){
                const userData = {
                    userFrom: document.getElementById("userFrom").value,
                    userTo: document.getElementById("userTo").value
                }
                dispatch(replaceRoles(userData))
                
              }
          })
        }

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
        !rolStatus.status ?
        Swal.fire({
            icon:'info',
            showConfirmButton: true,
            showCancelButton:true,
            timer: 5000,
            text: `Esta seguro que desea copiar los roles de ${userData.userFrom} a ${userData.userTo}?`
          }).then((result) => {
            if(result.isConfirmed){
             dispatch(copyRoles(userData))
              
            }
        }) : 
        Swal.fire({
            icon:'info',
            showConfirmButton: true,
            showCancelButton:true,
            timer: 5000,
            text: rolStatus.message
        }).then((result) => {
            if(result.isConfirmed){
             dispatch(copyRoles(userData))
              
            }
        })

        
    }
    return (
        <div>
            <h1 style={{textAlign:'start'}}>Copiar Roles</h1>
            <div className={styles.container}>

            <form action="">
            <div className={styles.selects}>

            <div className={styles.select}>

            <span>Copiar de: </span>
            <select name="" id="userFrom" onChange={handleUserChange}>
                <option value="">---</option>
                {
                    usuarios && usuarios.map(e => 
                        <option key={e.Usuario} value={e.Usuario}>{e.Nombre}</option>
                        )
                }
            </select>
            </div>
            <div className={styles.select}>

            <span>a: </span>
            <select name="" id="userTo" onChange={handleUserChange}>
                <option value="">---</option>
                {
                    usuarios && usuarios.map(e => 
                        <option key={e.Usuario} value={e.Usuario}>{e.Nombre}</option>
                        )
                }
            </select>
            </div>
                </div>
                <hr />
                <button className={styles.btn} type="submit" onClick={(e) => handleSubmit(e)}>Copiar</button>
            </form>
            </div>
        </div>
    )
}

export default CopyRoles