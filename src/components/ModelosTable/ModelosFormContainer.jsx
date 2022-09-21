import React, {useEffect, useState, useMemo} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import styles from '../UsuariosTable/AltaUsuarios.module.css';
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import validateEmail from "../../helpers/validateEmail";
import {Link, useNavigate} from 'react-router-dom';
import { getModeloById, createModelos, updateModelos, reset, endUpdate, getAllTipoPlan } from '../../reducers/Modelos/modelosSlice';
import Swal from "sweetalert2";
import mStyles from './modelos.module.css'


const ModelosFormContainer = ({cuotas, input, error, HandleSubmitInsert, HandleChange, HandleSubmitUpdate, handleCheckChange}) =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    


  return(<div className={styles.container}>
  {/*--------------------------------------MODELOS FORMS--------------------------------------------------  */}
  <Form action=""  className={styles.form} onSubmit={HandleSubmitInsert}>
 <Stack className={styles.titleContainer} direction="horizontal" gap={3} >
                <TitlePrimary className={styles.title}>{id?.length ? 'Modificar Modelos' : 'Alta de Modelos'}</TitlePrimary>
                <Link to={'/Modelos'} className="ms-auto" style={{marginRight:"1rem", marginTop:"-1rem"}}><ButtonPrimary  className={styles.btn} >Volver</ButtonPrimary></Link>
            </Stack>
            

            <div className={styles.containerInputText}>

            <Row className="g-1">
 {id?.length  &&
 <> <Col>
    <Form.Group  style={{marginTop:'1rem', marginBottom: '.5rem'}}>
    
   <Form.Control size="sm" type="text" style={{width:"6rem"}} name="Codigo" onChange={HandleChange} value={input.Codigo} disabled />
   
   </Form.Group></Col></>}
   <Col >
   <Form.Group style={{marginTop:'1rem', marginBottom: '.5rem'}}>
    <Form.Control size="sm" type="text"  name="Nombre" placeholder="Nombre" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={input?.Nombre} required />
   {error.Nombre && <div className={styles.error}>{error.Nombre}</div>}
   </Form.Group>
   </Col>
   <Col>
   <div className={styles.inputCheck}>
  <span  style={{marginTop: '0rem'}}>Activo</span>
  <div style={{marginTop: '-.5rem'}}>
  
   <input className={styles.inputCheck} type="checkbox" name="Activo" onChange={handleCheckChange} value={input.Activo} checked={input.Activo } />
   
   </div>
   </div>
   </Col>
   <Col>
   <InputGroup style={{marginTop:'1rem', marginBottom: '.5rem'}}>
   <InputGroup.Text className={mStyles.inputGroupText} >Origen</InputGroup.Text>
   <Form.Select size="sm"  name="NacionalImportado" placeholder="CuotaA" onChange={HandleChange} 
   value={input.NacionalImportado} required>
    <option>---</option>
    <option value={1}>Nacional</option>
    <option value={2}>Importado</option>
    </Form.Select>
   </InputGroup>
   </Col>
   </Row>
   
   </div>
   <div className={mStyles.cuotasFormContainer}>
    
 {cuotas?.map(plan=>
   <div className={mStyles.cuotasForm}>
    <div className={mStyles.cuotasFormHeader}>{plan.Descripcion}</div>
   <Row className="g-1">
    <Col>
   <InputGroup>
   <InputGroup.Text className={mStyles.inputGroupText} >Cuota <br/> Terminal</InputGroup.Text>
   <Form.Control size="sm" type='number' name={`CuotaTerminal_${plan.id + 1}`} placeholder="CuotaTerminal" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={cuotas[plan.id][`CuotaTerminal_${plan.id + 1}`]} />
   </InputGroup>
   </Col>
   <Col>
   <InputGroup >
   <InputGroup.Text className={mStyles.inputGroupText} >Cuota A</InputGroup.Text>
   <Form.Control size="sm" type='number' name={`CuotaACobrar_${plan.id + 1}`} placeholder="CuotaA" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={cuotas[plan.id][`CuotaACobrar_${plan.id + 1}`]} />
   </InputGroup>
   </Col>
   <Col>
   <InputGroup>
   <InputGroup.Text className={mStyles.inputGroupText} >Cuota B</InputGroup.Text>
   <Form.Control size="sm" type='number' name={`CuotaACobrarA_${plan.id + 1}`} placeholder="CuotaB" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={cuotas[plan.id][`CuotaACobrarA_${plan.id + 1}`]} />
   </InputGroup>
   </Col>
   </Row>
   <Row className="g-1">
    <Col>
   <InputGroup>
   <InputGroup.Text className={mStyles.inputGroupText} >Cuota 1</InputGroup.Text>
   <Form.Control size="sm" type='number' name={`Cuota1_${plan.id + 1}`} placeholder="Cuota1" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={cuotas[plan.id][`Cuota1_${plan.id + 1}`]} />
   </InputGroup >
   </Col>
   <Col>
   <InputGroup >
   <InputGroup.Text className={mStyles.inputGroupText} >Cuota 2</InputGroup.Text>
   <Form.Control size="sm" type='number' name={`Cuota2_${plan.id + 1}`} placeholder="Cuota2" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={cuotas[plan.id][`Cuota2_${plan.id + 1}`]} />
   </InputGroup>
   </Col>
   </Row>
   </div>
   )} 
     
   </div>
   
  
  <br/>
 
  {/* <hr className={styles.hr}/> */}

   {
                    id?.length? <ButtonPrimary className={styles.btn}   onClick={HandleSubmitUpdate}>Actualizar</ButtonPrimary>
                    : <ButtonPrimary className={styles.btn} type="submit" >Enviar</ButtonPrimary>
                }
                   
 </Form>
                </div>
                )}
                export default ModelosFormContainer