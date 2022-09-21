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
import ModelosFormContainer from "./ModelosFormContainer";



const ModelosFormulario = () =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({})
    const [input, setInput] = useState({})
    const [cuotas, setCuotas] = useState([])
    const [updateArray, setUpdateArray] = useState([])

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
        dispatch(reset())
      },[])
      useEffect(() => {
        dispatch(getAllTipoPlan())
      },[])

    useEffect(() => {
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
        
      
    useEffect(() => {
    setInput(...inputArray)
    setCuotas(
      tipoPlan.map(plan => {
        return {
          ["CuotaTerminal_" + plan.ID]: typeof modeloById[0]?.["CuotaTerminal_" + plan.ID] === 'string' ? parseInt(modeloById[0]?.["CuotaTerminal_" + plan.ID]).toFixed(2) : parseFloat(0.00).toFixed(2),
          ["CuotaACobrar_" + plan.ID]: typeof modeloById[0]?.["CuotaACobrar_" + plan.ID] === 'string' ? parseInt(modeloById[0]?.["CuotaACobrar_" + plan.ID]).toFixed(2) : parseFloat(0.00).toFixed(2),
          ["CuotaACobrarA_" + plan.ID]: typeof modeloById[0]?.["CuotaACobrarA_" + plan.ID] === 'string' ? parseInt(modeloById[0]?.["CuotaACobrarA_" + plan.ID]).toFixed(2) : parseFloat(0.00).toFixed(2),
          ["Cuota1_" + plan.ID]: typeof modeloById[0]?.["Cuota1_" + plan.ID] === 'string' ? parseInt(modeloById[0]?.["Cuota1_" + plan.ID]).toFixed(2) : parseFloat(0.00).toFixed(2),
          ["Cuota2_" + plan.ID]: typeof modeloById[0]?.["Cuota2_" + plan.ID] === 'string' ? parseInt(modeloById[0]?.["Cuota2_" + plan.ID]).toFixed(2) : parseFloat(0.00).toFixed(2),
          TipoPlan: plan.ID - 1,
          Descripcion: plan.Descripcion
          }
      }))
   
  }, [modeloById, tipoPlan]);


 

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
  const HandleCuotasChange =  (e) =>{

    const {name , value} = e.target
    let nuevasCuotas = [...cuotas]
    let changedCuota = nuevasCuotas[parseInt(e.target.name.slice(-1)) - 1]
    changedCuota = {...changedCuota, [name]: value}
    // console.log(changedCuota)
    nuevasCuotas[parseInt(e.target.name.slice(-1)) - 1] = changedCuota
    setCuotas(nuevasCuotas)
    // console.log(name, value)
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
const formInput = [input, ...cuotas] 
const inputNombre = input[0]
setUpdateArray(
  
tipoPlan.map(plan=>{
  return {
    CuotaTerminal: typeof formInput[plan.ID ]?.["CuotaTerminal_" + plan.ID] === 'string' ? parseInt(formInput[plan.ID ]?.["CuotaTerminal_" + plan.ID]).toFixed(2) : parseFloat(0.00).toFixed(2),
    CuotaACobrar: typeof formInput[plan.ID ]?.["CuotaACobrar_" + plan.ID] === 'string' ? parseInt(formInput[plan.ID ]?.["CuotaACobrar_" + plan.ID]).toFixed(2) : parseFloat(0.00).toFixed(2),
    CuotaACobrarA: typeof formInput[plan.ID ]?.["CuotaACobrarA_" + plan.ID] === 'string' ? parseInt(formInput[plan.ID ]?.["CuotaACobrarA_" + plan.ID]).toFixed(2) : parseFloat(0.00).toFixed(2),
    Cuota1: typeof formInput[plan.ID ]?.["Cuota1_" + plan.ID] === 'string' ? parseInt(formInput[plan.ID ]?.["Cuota1_" + plan.ID]).toFixed(2) : parseFloat(0.00).toFixed(2),
    Cuota2: typeof formInput[plan.ID ]?.["Cuota2_" + plan.ID] === 'string' ? parseInt(formInput[plan.ID ]?.["Cuota2_" + plan.ID]).toFixed(2) : parseFloat(0.00).toFixed(2),
    TipoPlan: plan.ID - 1,
    Descripcion: plan.Descripcion
    }
}
))
const dataInput = [input, ...updateArray]

console.log(dataInput)
dispatch(createModelos(dataInput, user))
// setInput(
//   tipoPlan?.map(plan=>{
//     return{
//   Codigo: id? id: '',
//   Nombre:'',
//   ["CuotaTerminal_" + plan.ID]:0.00,
//   ["CuotaACobrar_" + plan.ID]:0.00,
//   ["CuotaACobrarA_" + plan.ID]:0.00,
//   ["Cuota1_" + plan.ID]:0.00,
//   ["Cuota2_" + plan.ID]:0.00,
//   Activo: 0,
// }}))    

}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate =async (event) =>{
  event.preventDefault()
 
  // setInput(cuotas)
  const updateInput = [...input, ...cuotas] 
  console.log(updateInput)
  
 
  dispatch(updateModelos(updateInput, user))
  dispatch(reset())
  // setInput(
  //   {Codigo: id? id: '',
  //   Nombre:'',
  //   Activo: 0,},
  //   tipoPlan?.map(plan=>{
  //     input.push({
    
  //   ["CuotaTerminal_" + plan.ID]:0.00,
  //   ["CuotaACobrar_" + plan.ID]:0.00,
  //   ["CuotaACobrarA_" + plan.ID]:0.00,
  //   ["Cuota1_" + plan.ID]:0.00,
  //   ["Cuota2_" + plan.ID]:0.00,
    
  // })}))    

  }

return(   
  <ModelosFormContainer 
  input={input}
  error={error}
  cuotas={cuotas}
  HandleChange={HandleChange}
  HandleCheckChange={handleCheckChange}
  HandleSubmitInsert={HandleSubmitInsert}
  HandleSubmitUpdate={HandleSubmitUpdate}
  HandleCuotasChange={HandleCuotasChange}/>
)
}

export default ModelosFormulario