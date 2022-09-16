import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import styles from '../UsuariosTable/AltaUsuarios.module.css'
import { getSucursalById, reset, updateSucursal, createSucursal } from "../../reducers/Sucursales/SucursalesSlice";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import {FcApproval} from 'react-icons/fc';


const AltaSucursalesForm = () => {
    const {id} = useParams()
const dispatch = useDispatch()
const {sucursalById, sucursalStatus} = useSelector(
    (state) => state.sucursales)

const navigate = useNavigate()
const [input, setInput] = useState({
    Nombre: '',
    UsuarioAltaRegistro: ''
})
useEffect(() => {
    if(sucursalStatus && sucursalStatus.status === true){
        Swal.fire({
            icon: 'success',
            title: sucursalStatus.data,
            showConfirmButton: false,
            timer: 5000,
          })
        navigate('/sucursales')
    }else if(sucursalStatus && sucursalStatus.status === false ){
     Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: true,
            
            text: sucursalStatus.data
          }).then((result) => {
            if (result.isConfirmed) {
                
              window.location.reload()
              
            } 
        })
          
    }


 
  }, [sucursalStatus])


  useEffect(() => {

    if(sucursalById && sucursalById.status === false){
        Swal.fire({
            icon: 'error',
            title: 'Tiempo de espera excedido',
            showConfirmButton: true,
            
            text: sucursalById.message
          }).then((result) => {
            if (result.isConfirmed) {
                
              window.location.replace('/sucursales')
              
            } 
        })
    }

  }, [sucursalById])

useEffect(() => {
    dispatch(reset())

}, [])

useEffect(() => {
    setInput({
        Nombre: sucursalById[0]?.Nombre,
    })
}, [sucursalById[0]])

useEffect(() => {
    if(id) {  
        dispatch(getSucursalById({id: id}))
        }
  }, [id])
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newForm = { ...input, [name]: value };
    setInput(newForm);        
};

const handleUpdate = async (e) => {
    e.preventDefault()
   dispatch(updateSucursal({
    Nombre: input.Nombre,
    Codigo: sucursalById[0].Codigo
   })) 
   setInput({
       Nombre: '',
       UsuarioAltaRegistro: ''
       
    })
    dispatch(reset())  

}
const handleSubmit = async (e) => {
    e.preventDefault()
  dispatch(createSucursal(input)) 
      
    setInput({
        Nombre: '',
        UsuarioAltaRegistro: ''

    })
}
  const floatingLabel = {textAlign:"start", paddingTop:"0.5em", fontSize:"1.3em"}
  return (
    <div className={styles.container}>
    <Form action="" className={styles.form}>
    <Stack className={styles.titleContainer} direction="horizontal" gap={3}>
        <TitlePrimary>{id?.length ? 'Modificar Sucursal' : 'Alta de Sucursal'}</TitlePrimary>
        <Link className="ms-auto" style={{marginRight:"1rem", marginTop:"-1rem"}} to={'/sucursales'}><ButtonPrimary>Volver</ButtonPrimary></Link>
    </Stack>
    

        <div className={styles.containerInputText}>
            

        <Row className="g-2">
                
                    <Form.Group as={Col} style={{marginTop:'.5rem', marginBottom: '.2rem'}}>
                    <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Nombre"
                        style={floatingLabel}
                    >
                    <Form.Control size="sm" type="text" value={input.Nombre} name="Nombre" placeholder="Nombre" onChange={handleChange} required />
                    </FloatingLabel>
                    </Form.Group>
                    </Row>

                    {
                        !id &&
                <Row className="g-2">
                <Form.Group as={Col} style={{marginTop:'.5rem', marginBottom: '.2rem'}}>
                <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Usuario Alta Registro"
                    style={floatingLabel}
                >
                <Form.Control size="sm" type="text" value={input.UsuarioAltaRegistro} name="UsuarioAltaRegistro" placeholder="Usuario Alta Registro" onChange={handleChange} required />
                </FloatingLabel>
                </Form.Group>
                </Row> 
 
                    }
                
                    </div>
                    {   id?.length? 
                    <ButtonPrimary type="submit" style={{ marginBottom:'.4rem'}}  onClick={(e) => handleUpdate(e)}><FcApproval/>Actualizar</ButtonPrimary> 
                    :(
                      
                         <ButtonPrimary onClick={handleSubmit}  style={{ marginBottom:'.4rem'}} type="submit" ><FcApproval/>Enviar</ButtonPrimary> 
                       
                    )
                }
                    </Form>
                    </div>

  )

}

export default AltaSucursalesForm