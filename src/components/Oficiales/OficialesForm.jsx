import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from '../UsuariosTable/AltaUsuarios.module.css'
import { getOficialById, updateOficiales, reset, createOficiales, endUpdate} from "../../reducers/Oficiales/OficialesSlice";
import { getAllUsuarios } from "../../reducers/Usuarios/UsuariosSlice";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import TitleLogo from "../../styled-components/containers/TitleLogo";
import { ReturnLogo } from "../../helpers/ReturnLogo";


const OficialesForm = () => {
    const {id, categoria} = useParams()
const dispatch = useDispatch()
const {oficialById, oficialStatus, oficialCategoria} = useSelector(
    (state) => state.oficiales)
const {empresaReal} = useSelector((state) => state.login.user)
const {usuarios, supervisores} = useSelector((state) => state.usuarios)

const navigate = useNavigate()
const [input, setInput] = useState({
    Nombre: '',
    Activo: 0,
    HN: 0
})

useEffect(() => {
    if(id) {  
        dispatch(getOficialById({categoria: oficialCategoria, Codigo: id}))
       
        }
  }, [id])


 useEffect(() => {
    if(oficialStatus && oficialStatus.status === false){
        Swal.fire({
          icon:'error',
          text: oficialStatus.message,
          showConfirmButton: true,
        }).then((result) => {
          if(result.isConfirmed){
            window.location.replace('/oficiales')
          }
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


   useEffect(() => {

    if(oficialById && oficialById.status === false){
        Swal.fire({
            icon: 'error',
            title: oficialById.message,
            showConfirmButton: true
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.replace('/oficiales')
              
            } 
        })
    }


  }, [oficialById]) 

  useEffect(() => {
    dispatch(reset())
    dispatch(getAllUsuarios())
    return () => {
      if(id){
        dispatch(endUpdate({
          categoria: oficialCategoria,
          Codigo: id
        }))
      }
    }
    
  }, []) 
  const oficialUsuario = usuarios?.find(e => e.Usuario === oficialById[0]?.IdUsuarioLogin) || usuarios?.find(e => e.Usuario === oficialById[0]?.login)
  const oficialSupervisor = supervisores?.find(e => e.Codigo === oficialById[0]?.Supervisor) 
 useEffect(() => {
    setInput({
        Nombre: oficialById[0]?.Nombre,
        Usuario: oficialUsuario ? oficialUsuario.Usuario : oficialById[0]?.IdUsuarioLogin,
        Activo: oficialById[0]?.Activo  || oficialById[0]?.Inactivo === null || oficialById[0]?.Inactivo === 0 ? 1 : 0,
        Objetivo: oficialById[0]?.Objetivo === null ? 0 : oficialById[0]?.Objetivo,
        TipoOficialMora: oficialById[0]?.TipoOficialMora ? oficialById[0]?.TipoOficialMora : 0,
        HN: oficialById[0]?.HNMayor40 ? oficialById[0]?.HNMayor40 : 0,
        Supervisor: oficialById[0]?.Supervisor
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
    Codigo: id,
    Nombre: input.Nombre,
    Usuario: input.Usuario,
    Activo: input.Activo,
    TipoOficialMora: input.TipoOficialMora,
    HN: input.HN,
    Supervisor: input.Supervisor,
    Objetivo: input.Objetivo

   })) 
   setInput({
       Nombre: '',
       
    })   
}



const handleCheck = (e) => {
if(e.target.checked){
  setInput({
    ...input, 
    Activo: 1
  })
}else if (!e.target.checked){
  setInput({
    ...input, 
    Activo: 0
  })
}
}




 const handleSubmit = async (e) => {
    e.preventDefault()
  dispatch(createOficiales({
    categoria: oficialCategoria,
    Nombre: input.Nombre,
    Usuario: input.Usuario,
    Activo: input.Activo,
    TipoOficialMora: input.TipoOficialMora,
    HN: input.HN,
    Supervisor: input.Supervisor,
    Objetivo: input.Objetivo
  })) 
      
    setInput({
        Nombre: '',

    })
} 




  const floatingLabel = {textAlign:"start", padding:"0.5em", fontSize:"1.3em", width: '17rem', marginTop: '1rem' }
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

        { categoria === 'Subite' || categoria === 'Compra' ?
        <div className={styles.inputSelect}>
        
                  <Row className="g-2"  style={{margin: '.7rem'}}>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">HN</InputGroup.Text>
                        <Form.Select size="sm" name="HN" value={input.HN} onChange={handleChange} id="">
                          <option value={0}>Menor a 50.000</option>
                          <option value={1}>Mayor a 50.000</option>
                        </Form.Select>
                    </InputGroup>
 
      </Row> </div>: null
        }

        { categoria === 'Subite' || categoria === 'Compra' || categoria === 'Mora' || categoria === 'Scoring' || categoria === 'Licitaciones' ?
                  <div className={styles.inputSelect}>
                  <Row className="g-2"  style={{margin: '.7rem'}}>
                 
                        <InputGroup>
                        <InputGroup.Text id="basic-addon1">Usuario</InputGroup.Text>
                        <Form.Select size="sm" name="Usuario" value={input.Usuario} onChange={handleChange} id="">
                          {
                            oficialUsuario ? <option value={oficialUsuario.Usuario}>{oficialUsuario.Usuario}</option> : <option value={oficialById[0]?.IdUsuarioLogin}>{oficialById[0]?.IdUsuarioLogin}</option>
                          }
                          {
                            usuarios && usuarios.map(e => (
                              <option value={e.Usuario}>{e.Usuario}</option>
                            ))
                          }
                        </Form.Select>
                    </InputGroup>
                    
      </Row> </div> : null
        }

        {  categoria === 'Scoring' ?
                  <Row className="g-2">
                
                  <Form.Group as={Col} style={{marginTop:'.5rem', marginBottom: '.2rem'}}>
                  <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Objetivo"
                      style={floatingLabel}
                  >
                  <Form.Control type="text"  value={input.Objetivo} name="Objetivo" placeholder="Objetivo" onChange={handleChange} required />
                  </FloatingLabel>
                  </Form.Group> 
      </Row> : null
        }
                {  categoria === 'Mora' ?
                <div className={styles.inputSelect}>
                
                  <Row className="g-2"  style={{margin: '.7rem'}}>
                    
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">Tipo Oficial Mora</InputGroup.Text>
                        <Form.Select size="sm" name="TipoOficialMora" value={input.TipoOficialMora} onChange={handleChange} id="">
                                                   
                           
                          <option>none</option>
                          <option value={1}>Temprana</option> 
                          <option value={2}>Especializada</option>
                          <option value={3}>Encuadre</option>
                          
                          
                        
                        </Form.Select>
                    </InputGroup>

      </Row> </div>: null
        }
          {  categoria === 'Subite' ?
          <div className={styles.inputSelect}>
                  <Row className="g-2" style={{margin: '.7rem'}}>

                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">Supervisor</InputGroup.Text>
                        <Form.Select size="sm" name="Supervisor" value={input.Supervisor} onChange={handleChange} id="">
                        {
                            oficialSupervisor ? <option value={oficialSupervisor.Nombre}>{oficialSupervisor.Nombre}</option> : <option value={oficialById[0]?.Supervisor}>{oficialById[0]?.Supervisor}</option>
                          }
                          {
                            supervisores && supervisores.map(e => (
                              <option value={e.Codigo}>{e.Nombre}</option>
                            ))
                          }
                        </Form.Select>
                    </InputGroup>
                

      </Row> </div>: null
        }
                <Row className="g-2">
                
                <Form.Group as={Col} style={{placeContent: 'center', marginBottom: '.7rem', alignItems: 'center'}}> 
                {
                    input.Activo === 1 ? <input onChange={(e) => handleCheck(e)} type="checkbox" checked /> : <input onChange={(e) => handleCheck(e)} type="checkbox" />
                  }
                  <span>Activo</span>
                  
                </Form.Group>
    </Row>
                
                    </div>
                    {   id?.length? 
                    <ButtonPrimary type="submit" style={{ marginBottom:'.4rem'}}   onClick={(e) => handleUpdate(e)}>Actualizar</ButtonPrimary> 
                    :(
                      
                         <ButtonPrimary  onClick={handleSubmit} style={{ marginBottom:'.4rem'}} type="submit" >Enviar</ButtonPrimary> 
                       
                    )
                }
                    </Form>
                    </div>

  )

}

export default OficialesForm