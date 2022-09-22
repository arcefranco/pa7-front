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
import { getSucursalById, reset, updateSucursal, createSucursal, endUpdate } from "../../reducers/Sucursales/SucursalesSlice";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import {FcApproval} from 'react-icons/fc';
import TitleLogo from "../../styled-components/containers/TitleLogo";
import { ReturnLogo } from "../../helpers/ReturnLogo";


const AltaSucursalesForm = () => {
    const {id} = useParams()
const dispatch = useDispatch()
const {sucursalById, sucursalStatus} = useSelector(
    (state) => state.sucursales)
const {empresaReal} = useSelector((state) => state.login.user)
const navigate = useNavigate()
const [input, setInput] = useState({
    Nombre: '',
    UsuarioAltaRegistro: ''
})

useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
      e.preventDefault();
      dispatch(endUpdate({
        Codigo: id
      }))
  };


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
            title: sucursalById.message,
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
                
              window.location.replace('/sucursales')
              
            } 
        })
    }

  }, [sucursalById])

useEffect(() => {
    dispatch(reset())
    return () => {
        if(id) {
            dispatch(endUpdate({
                Codigo: id
            }))
        }
    }
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
  const floatingLabel = {textAlign:"start"}
  return (
    <div className={styles.container}>
            <TitleLogo style={{marginTop: '1.1rem', alignSelf: 'flex-start'}}>
            <div>
              <span>{empresaReal}</span>
              <ReturnLogo empresa={empresaReal}/>
            </div>
            </TitleLogo>
    <Form action="" className={styles.form}>
    <Stack className={styles.titleContainer} direction="horizontal" gap={3}>
        <TitlePrimary>{id?.length ? 'Modificar Sucursal' : 'Alta de Sucursal'}</TitlePrimary>
        <Link to={'/sucursales'}><ButtonPrimary>Volver</ButtonPrimary></Link>
    </Stack>
    

        <div style={{display: 'grid',
    gridTemplateColumns: '1fr 1fr', columnGap: '1rem', height: '5rem', alignItems: 'center'}}>
            

        <Row className="g-2">
                
                    <Form.Group as={Col} style={{ marginBottom: '.2rem'}}>
                    <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Nombre"
                        style={floatingLabel}
                    >
                    <Form.Control style={{ height: '2.7rem'}} size="sm" type="text" value={input.Nombre} name="Nombre" placeholder="Nombre" onChange={handleChange} required />
                    </FloatingLabel>
                    </Form.Group>
                    </Row>

                    {
                        !id &&
                <Row className="g-2">
                <Form.Group as={Col} style={{ marginBottom: '.2rem'}}>
                <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Usuario Alta Registro"
                    style={floatingLabel}
                >
                <Form.Control size="sm" style={{ height: '2.7rem'}} type="text" value={input.UsuarioAltaRegistro} name="UsuarioAltaRegistro" placeholder="Usuario Alta Registro" onChange={handleChange} required />
                </FloatingLabel>
                </Form.Group>
                </Row> 
 
                    }
                
                    </div>
                    {   id?.length? 
                    <ButtonPrimary type="submit" style={{ marginBottom:'.4rem'}}  onClick={(e) => handleUpdate(e)}><FcApproval/>Actualizar</ButtonPrimary> 
                    :(
                      
                         <ButtonPrimary onClick={handleSubmit}  style={{ marginBottom:'.4rem', marginTop:'.4rem'}} type="submit" >Enviar</ButtonPrimary> 
                       
                    )
                }
                    </Form>
                    </div>

  )

}

export default AltaSucursalesForm