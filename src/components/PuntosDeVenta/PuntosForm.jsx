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
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updatePuntoDeVenta, createPuntoDeVenta, endUpdate, reset } from "../../reducers/PuntosDeVenta/puntosSlice";
import TitleLogo from "../../styled-components/containers/TitleLogo";
import { ReturnLogo } from "../../helpers/ReturnLogo";


const PuntosForm = () => {
    const {id} = useParams()
const dispatch = useDispatch()
const {puntoById, puntoStatus} = useSelector(
    (state) => state.puntosDeVenta)
const {empresaReal} = useSelector((state) => state.login.user)
const navigate = useNavigate()
const [input, setInput] = useState({
    Nombre: ''
})




 useEffect(() => {
    if(puntoStatus && puntoStatus.status === true){
        Swal.fire({
            icon: 'success',
            title: puntoStatus.data,
            showConfirmButton: false,
            timer: 5000,
          })
        navigate('/puntosDeVenta')
    }else if(puntoStatus && puntoStatus.status === false ){
     Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: true,
            
            text: puntoStatus.data
          }).then((result) => {
            if (result.isConfirmed) {
                
              window.location.reload()
              
            } 
        })
          
    }


 
  }, [puntoStatus]) 


   useEffect(() => {

    if(puntoById && puntoById.status === false){
        Swal.fire({
            icon: 'error',
            title: puntoById.message,
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
                
              window.location.replace('/puntosDeVenta')
              
            } 
        })
    }

  }, [puntoById]) 

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
        Nombre: puntoById[0]?.Nombre,
    })
}, [puntoById]) 

/*  useEffect(() => {
    if(id) {  
        dispatch(getPuntoById({Codigo: id}))
        }
  }, [id]) */
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newForm = { ...input, [name]: value };
    setInput(newForm);        
};

const handleUpdate = async (e) => {
    e.preventDefault()
   dispatch(updatePuntoDeVenta({
    Nombre: input.Nombre,
    Codigo: id
   }))  
   setInput({
       Nombre: '',
       
    })
     dispatch(reset())   

}
const handleSubmit = async (e) => {
    e.preventDefault()
   dispatch(createPuntoDeVenta(input))  
      
    setInput({
        Nombre: '',


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
        <TitlePrimary>{id?.length ? 'Modificar Punto de Venta' : 'Alta de Punto de Venta'}</TitlePrimary>
        <Link to={'/puntosDeVenta'}><ButtonPrimary>Volver</ButtonPrimary></Link>
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

                    </div>
                    {   id?.length? 
                    <ButtonPrimary type="submit" style={{ marginBottom:'.4rem'}}  onClick={(e) => handleUpdate(e)}>Actualizar</ButtonPrimary> 
                    :(
                      
                         <ButtonPrimary onClick={handleSubmit}  style={{ marginBottom:'.4rem', marginTop:'.4rem'}} type="submit" >Enviar</ButtonPrimary> 
                       
                    )
                }
                    </Form>
                    </div>

  )

}

export default PuntosForm