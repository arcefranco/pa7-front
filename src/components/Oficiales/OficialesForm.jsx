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
import { getOficialById, updateOficiales, reset, createOficiales } from "../../reducers/Oficiales/OficialesSlice";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import {FcApproval} from 'react-icons/fc';


const OficialesForm = () => {
    const {id, categoria} = useParams()
const dispatch = useDispatch()
const {oficialById, oficialStatus, oficialCategoria} = useSelector(
    (state) => state.oficiales)

const navigate = useNavigate()
const [input, setInput] = useState({
    Nombre: '',
})

useEffect(() => {
    if(id) {  
        dispatch(getOficialById({categoria: categoria, Codigo: id}))
        }
  }, [id])


 useEffect(() => {
    if(oficialStatus && oficialStatus.status === false){
        Swal.fire({
          icon:'error',
          text: oficialStatus.message
        })
      }
      if(oficialStatus && oficialStatus.status === true){
        Swal.fire({
          icon:'success',
          showConfirmButton: true,
          text: oficialStatus.message
        }).then((result) => {
          if(result.isConfirmed){
            dispatch(reset())
            window.location.replace('/oficiales')
          }
        })
    }


 
  }, [oficialStatus]) 


 /*  useEffect(() => {

    if(sucursalById && sucursalById.status === false){
        Swal.fire({
            icon: 'error',
            title: 'Tiempo de espera excedido',
            showConfirmButton: true,
            
            text: sucursalById.message
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(endCommit())
              window.location.replace('/sucursales')
              
            } 
        })
    }

  }, [sucursalById]) */

/* useEffect(() => {
    dispatch(reset())
    return () => {
        if(id){

            dispatch(endCommit())
        }
    }
}, []) */

 useEffect(() => {
    setInput({
        Nombre: oficialById?.Nombre,
    })
}, [oficialById]) 
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newForm = { ...input, [name]: value };
    setInput(newForm);        
};

 const handleUpdate = async (e) => {
    e.preventDefault()
   dispatch(updateOficiales({
    categoria: categoria,
    Nombre: input.Nombre,
    Codigo: id,

   })) 
   setInput({
       Nombre: '',
       
    })



   
    
   
} 
 const handleSubmit = async (e) => {
    e.preventDefault()
  dispatch(createOficiales({
    categoria: oficialCategoria,
    Nombre: input.Nombre
  })) 
      
    setInput({
        Nombre: '',

    })
} 
  const floatingLabel = {textAlign:"start", paddingTop:"0.5em", fontSize:"1.3em"}
  return (
    <div className={styles.container}>
    <Form action="" className={styles.form}>
    <Stack className={styles.titleContainer} direction="horizontal" gap={3}>
        <TitlePrimary>{id?.length ? 'Modificar Oficial' : `Alta Oficiales (${categoria})`}</TitlePrimary>
        <Link className="ms-auto" style={{marginRight:"1rem", marginTop:"-1rem"}} to={'/oficiales'}><ButtonPrimary>Volver</ButtonPrimary></Link>
    </Stack>
    

        <div className={styles.containerInputText}>
            

        <Row className="g-2">
                
                    <Form.Group as={Col} style={{marginTop:'.5rem', marginBottom: '.2rem'}}>
                    <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Nombre"
                        style={floatingLabel}
                    >
                    <Form.Control type="text" value={input.Nombre} name="Nombre" placeholder="Nombre" onChange={handleChange} required />
                    </FloatingLabel>
                    </Form.Group>
                    </Row>
                
                    </div>
                    {   id?.length? 
                    <ButtonPrimary type="submit" style={{ marginBottom:'.4rem'}}   onClick={(e) => handleUpdate(e)}><FcApproval/>Actualizar</ButtonPrimary> 
                    :(
                      
                         <ButtonPrimary  onClick={handleSubmit} style={{ marginBottom:'.4rem'}} type="submit" ><FcApproval/>Enviar</ButtonPrimary> 
                       
                    )
                }
                    </Form>
                    </div>

  )

}

export default OficialesForm