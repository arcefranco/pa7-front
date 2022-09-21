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



const ModelosFormulario = () =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({})
    const [input, setInput] = useState({})
    const [cuotas, setCuotas] = useState([])

    const {modeloById, tipoPlan,  modeloStatus} = useSelector(
        (state) => state.modelos)
        const {user} = useSelector(
          (state) => state.login)
          
        const validateform = function (form) {
          const errors = {};
      
          if(!form.Nombre){
              errors.Nombre = "Campo requerido"
          }   
          // if (form.password !== form.confirmPassword) {
          //   errors.contrasenaConfirm = "Las contraseñas deben coincidir";
          // }
        
          if (!form.Email) {
            errors.email = "Campo requerido";
          } else if (!validateEmail(form.Email)) {
            errors.email = "Escriba un email válido";
          }
      
        
          return errors;
        };

        useEffect(() => {
          dispatch(reset())
          return () => {
              if(id){
      
                  dispatch(endUpdate())
              }
          }
      }, [])
      

    useEffect(() => {
    Promise.all([dispatch(getAllTipoPlan()),dispatch(reset())])
      if(id) {  
        dispatch(getModeloById(id))
        }
  }, [id])


  useEffect(() => {
    
    if(modeloStatus.length && modeloStatus[0]?.status === true){
        Swal.fire({
            icon: 'success',
            title: modeloStatus[0]?.data,
            showConfirmButton: false,
            timer: 5000
          })
        navigate('/modelos')
        
        dispatch(reset())
    }else if(modeloStatus.length && modeloStatus[0]?.status === false){
     Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: true,
            
            text: modeloStatus[0]?.data
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(endUpdate())
              window.location.reload()
              
            } 
        })
          
    }}, [modeloStatus])

    useEffect(() => {

      if(modeloById && modeloById.status === false){
          Swal.fire({
              icon: 'error',
              title: 'Tiempo de espera excedido',
              showConfirmButton: true,
              
              text: modeloById.message
            }).then((result) => {
              if (result.isConfirmed) {
                  dispatch(endUpdate())
                window.location.replace('/Modelos')
                
              } 
          })
      }
  
    }, [modeloById])

    
  
    const inputArray =  [{ Codigo: id? id : null,
      Nombre: modeloById[0]?.Nombre, 
      Activo: modeloById[0]?.Activo,
      NacionalImportado: modeloById[0]?.NacionalImportado,
      HechoPor: user.username
    }]

    
      
/*      tipoPlan?.map(plan=>{
        inputArray.push({
            ["CuotaTerminal_" + plan.ID]: parseInt(modeloById[0]?.["CuotaTerminal_" + plan.ID]).toFixed(2),
            ["CuotaACobrar_" + plan.ID]: parseInt(modeloById[0]?.["CuotaACobrar_" + plan.ID]).toFixed(2),
            ["CuotaACobrarA_" + plan.ID]: parseInt(modeloById[0]?.["CuotaACobrarA_" + plan.ID]).toFixed(2),
            ["Cuota1_" + plan.ID]: parseInt(modeloById[0]?.["Cuota1_" + plan.ID]).toFixed(2),
            ["Cuota2_" + plan.ID]: parseInt(modeloById[0]?.["Cuota2_" + plan.ID]).toFixed(2),
            })
        })
        console.log(inputArray)

        const inputFinal = useMemo(()=>inputArray) */
        
      
    useEffect(() => {
    setInput(...inputArray)
    setCuotas(...cuotas,
      tipoPlan.map(plan => {
        return {
          ["CuotaTerminal_" + plan.ID]: parseInt(modeloById[0]?.["CuotaTerminal_" + plan.ID]).toFixed(2),
          ["CuotaACobrar_" + plan.ID]: parseInt(modeloById[0]?.["CuotaACobrar_" + plan.ID]).toFixed(2),
          ["CuotaACobrarA_" + plan.ID]: parseInt(modeloById[0]?.["CuotaACobrarA_" + plan.ID]).toFixed(2),
          ["Cuota1_" + plan.ID]: parseInt(modeloById[0]?.["Cuota1_" + plan.ID]).toFixed(2),
          ["Cuota2_" + plan.ID]: parseInt(modeloById[0]?.["Cuota2_" + plan.ID]).toFixed(2),
          id: plan.ID - 1
          }
      }))
   
  }, [modeloById, tipoPlan]);



  //   inputFinal.push([{
  //     Codigo: id? id: '',
  //   Nombre:'',
  //   Activo: 0,
  //   NacionalImportado:""
  //   }])
       
  //   tipoPlan?.map(plan=>{
  //     inputFinal.push({
  //   ["CuotaTerminal_" + plan.ID]:0,
  //   ["CuotaACobrar_" + plan.ID]:0,
  //   ["CuotaACobrarA_" + plan.ID]:0,
  //   ["Cuota1_" + plan.ID]:0,
  //   ["Cuota2_" + plan.ID]:0,
    
  // })})
  // // setInput(inputFinal)
    
  

 

/*----------------------HANDLE CHANGE DEL FORM------------------------------------ */
const HandleChange =  (e) =>{
  
    
    const {name , value} = e.target
    console.log(value, name)
    const newForm = {...input,
      [name]:value,
      }
    
    setInput(newForm )
    console.log(newForm)
    const errors = validateform(newForm);
    setError(errors);
  }
  const handleCheckChange = (e) => {
    const { name} = e.target;
    var value = e.target.checked
    value = e.target.checked? 1 : 0
    const newForm = { ...input, [name]: value };
    setInput(newForm);
    
};
/*---------------------------------HANDLE SUBMIT FUNCION INSERT---------------------------------*/
const HandleSubmitInsert = async (event) =>{
event.preventDefault()

console.log(input)
dispatch(createModelos(input, user))
setInput(
  tipoPlan?.map(plan=>{
    return{
  Codigo: id? id: '',
  Nombre:'',
  ["CuotaTerminal_" + plan.ID]:0.00,
  ["CuotaACobrar_" + plan.ID]:0.00,
  ["CuotaACobrarA_" + plan.ID]:0.00,
  ["Cuota1_" + plan.ID]:0.00,
  ["Cuota2_" + plan.ID]:0.00,
  Activo: 0,
}}))    

}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate =async (event) =>{
  event.preventDefault()
  console.log(input)
  
 
  dispatch(updateModelos(input, user))
  dispatch(reset())
  setInput(
    {Codigo: id? id: '',
    Nombre:'',
    Activo: 0,},
    tipoPlan?.map(plan=>{
      input.push({
    
    ["CuotaTerminal_" + plan.ID]:0.00,
    ["CuotaACobrar_" + plan.ID]:0.00,
    ["CuotaACobrarA_" + plan.ID]:0.00,
    ["Cuota1_" + plan.ID]:0.00,
    ["Cuota2_" + plan.ID]:0.00,
    
  })}))    

  }

 const floatingLabel = {textAlign:"start", paddingTop:"0.5em", fontSize:"1.3em"}

return(   
    <div className={styles.container}>
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
   <Form.Control size="sm" type='text' name={"CuotaTerminal_"+plan.ID} placeholder="CuotaTerminal" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={cuotas[plan.id][`CuotaTerminal_${plan.id + 1}`]} />
   </InputGroup>
   </Col>
   <Col>
   <InputGroup >
   <InputGroup.Text className={mStyles.inputGroupText} >Cuota A</InputGroup.Text>
   <Form.Control size="sm" type='number' name={"CuotaACobrar_"+plan.ID} placeholder="CuotaA" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={cuotas[plan.id]?.["CuotaACobrar_" + plan.id]} />
   </InputGroup>
   </Col>
   <Col>
   <InputGroup>
   <InputGroup.Text className={mStyles.inputGroupText} >Cuota B</InputGroup.Text>
   <Form.Control size="sm" type='number' name={"CuotaACobrarA_"+plan.id} placeholder="CuotaB" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={cuotas[plan.id]?.["CuotaACobrarA_" + plan.id]} />
   </InputGroup>
   </Col>
   </Row>
   <Row className="g-1">
    <Col>
   <InputGroup>
   <InputGroup.Text className={mStyles.inputGroupText} >Cuota 1</InputGroup.Text>
   <Form.Control size="sm" type='number' name={"Cuota1_"+plan.id} placeholder="Cuota1" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={cuotas[plan.id]?.["Cuota1_" + plan.id]} />
   </InputGroup >
   </Col>
   <Col>
   <InputGroup >
   <InputGroup.Text className={mStyles.inputGroupText} >Cuota 2</InputGroup.Text>
   <Form.Control size="sm" type='number' name={"Cuota2_"+plan.id} placeholder="Cuota2" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={cuotas[plan.id]?.["Cuota2_" + plan.id]} />
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
)
}

export default ModelosFormulario