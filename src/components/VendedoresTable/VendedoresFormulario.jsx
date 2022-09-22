import React, {useEffect, useState} from "react";
import { useDispatch,  useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import styles from '../UsuariosTable/AltaUsuarios.module.css';
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";
import InputText from "../../styled-components/inputs/InputText";
import Select from "../../styled-components/inputs/Select";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import validateEmail from "../../helpers/validateEmail";
import {FcApproval} from 'react-icons/fc'
import {Link, useNavigate} from 'react-router-dom';
import { getVendedoresById, postVendedores, updateVendedores,getAllEscalas,getAllOficialesScoring, getAllOficialesMora, reset, getAllTeamLeaders, getAllTeamLeadersActivos, getAllOficialesMoraActivos, getAllOficialesScoringActivos, endUpdate } from '../../reducers/Vendedores/vendedoresSlice';
import Swal from "sweetalert2";
import TitleLogo from "../../styled-components/containers/TitleLogo";
import { ReturnLogo } from "../../helpers/ReturnLogo";

const VendedoresFormulario = () =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({})

const {vendedoresById, teamleader, teamleaderActivo, escalas, oficialesScoring, oficialesMora, oficialesScoringActivos, oficialesMoraActivos, statusNuevoVendedor} = useSelector(
        (state) => state.vendedores)
        const {user } = useSelector(
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
  dispatch(reset())
  return () => {
    if(id) {
      dispatch(endUpdate({Codigo: id}))
    }
  }}, [])
      

    useEffect(() => {
    Promise.all([dispatch(getAllTeamLeadersActivos()),dispatch(getAllTeamLeaders()),dispatch(getAllOficialesMora()),dispatch(getAllOficialesScoring()), dispatch(getAllOficialesMoraActivos()),dispatch(getAllOficialesScoringActivos()),dispatch(getAllEscalas()),dispatch(reset())])
      if(id) {  
        dispatch(getVendedoresById(id))
        }
  }, [id])


  useEffect(() => {
    if(statusNuevoVendedor.length && statusNuevoVendedor[0]?.status === true){
        Swal.fire({
            icon: 'success',
            title: statusNuevoVendedor[0]?.data,
            showConfirmButton: false,
            timer: 5000
          })
        navigate('/vendedores')
        
        dispatch(reset())
    }else if(statusNuevoVendedor.length && statusNuevoVendedor[0]?.status === false){
     Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: true,
            
            text: statusNuevoVendedor[0]?.data
          }).then((result) => {
            if (result.isConfirmed) {
              
              window.location.reload()
              
            } 
        })
          
    }}, [statusNuevoVendedor])

    useEffect(() => {

      if(vendedoresById && vendedoresById.status === false){
          Swal.fire({
              icon: 'error',
              title: vendedoresById.message,
              showConfirmButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                  
                window.location.replace('/vendedores')
                
              } 
          })
      }
  
    }, [vendedoresById])


  const vendedorTeamLeader = teamleader?.find(e => e.Nombre === vendedoresById?.TeamLeader,);
  const vendedorTeamLeaderActivo = teamleaderActivo?.find(e => e.Nombre === vendedoresById?.teamleaderActivo,);
  const vendedorOficialScoring = oficialesScoring?.find(e =>  e.Nombre === vendedoresById?.OficialScoring );
  const vendedorOficialMora = oficialesMora?.find(e =>  e.Nombre === vendedoresById?.OficialMora );
  const vendedorOficialScoringActivo = oficialesScoringActivos?.find(e =>  e.Nombre === vendedoresById?.OficialScoringActivo );
  const vendedorOficialMoraActivo = oficialesMoraActivos?.find(e =>  e.Nombre === vendedoresById?.OficialMoraActivo );
  const vendedorEscala = escalas?.find(e =>  e.Nombre === vendedoresById?.Escala );

    let fecha = vendedoresById?.FechaBaja
    let FechaBaja = fecha
  useEffect(() => {
    console.log(escalas)
    setInput({

      Codigo: id? id : null,
      Nombre: vendedoresById?.Nombre,
      TeamLeader: vendedorTeamLeader?.Codigo,
      TeamLeaderActivo: vendedorTeamLeaderActivo?.Codigo,
      Categoria: vendedoresById?.Categoria,
      OficialScoring: vendedorOficialScoring?.Codigo,
      OficialMora: vendedorOficialMora?.Codigo,
      OficialScoringActivo: vendedorOficialScoringActivo?.Codigo,
      OficialMoraActivo: vendedorOficialMoraActivo?.Codigo,
      FechaBaja: FechaBaja,
      Escala: vendedorEscala?.Codigo,
      Activo: vendedoresById?.Activo,
      HechoPor: user.username,

    });
  }, [vendedoresById]);


    const [input, setInput] = useState({
      Codigo: id? id: '',
      Nombre:'',
      TeamLeader:'',
      Categoria:'',
      OficialScoring:'',
      OficialMora:'',
      FechaBaja:'',
      Escala:'',
      Activo: 0,
    })






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
dispatch(postVendedores(input, user))
setInput({
  Codigo:'',
  Nombre:'',
  TeamLeader:'',
  Categoria:'',
  OficialScoring:'',
  OficialMora:'',
  FechaBaja:'',
  Escala:'',
  Activo: 0,
 })

}

/*---------------------------------HANDLE SUBMIT FUNCION UPDATE---------------------------------*/
const HandleSubmitUpdate =async (event) =>{
  event.preventDefault()
  console.log(input)
  
 
  dispatch(updateVendedores(input, user))
  dispatch(reset())
  setInput({
    Codigo:'',
    Nombre:'',
    TeamLeader:'',
    Categoria:'',
    OficialScoring:'',
    OficialMora:'',
    FechaBaja:'',
    Escala:'',
    Activo: 0,
 
   }
   )

  }

 const floatingLabel = {textAlign:"start", paddingTop:"0.5em", fontSize:"1.3em"}

return(   
    <div className={styles.container}>
      <TitleLogo style={{marginTop: '1.1rem', alignSelf: 'flex-start'}}>
            <div>
              <span>{user.empresaReal}</span>
              <ReturnLogo empresa={user.empresaReal}/>
            </div>
 </TitleLogo>
  {/*--------------------------------------SUPERVISORES FORMS--------------------------------------------------  */}
  <Form action=""  className={styles.form} onSubmit={HandleSubmitInsert}>
 <Stack className={styles.titleContainer} direction="horizontal" gap={3} >
                <TitlePrimary className={styles.title}>{id?.length ? 'Modificar Vendedores' : 'Alta de Vendedores'}</TitlePrimary>
                <Link to={'/vendedores'} className="ms-auto" style={{marginRight:"1rem", marginTop:"-1rem"}}><ButtonPrimary  className={styles.btn} >Volver</ButtonPrimary></Link>
            </Stack>
            

            <div className={styles.containerInputText}>

            <Row className="g-1">
 {id?.length  &&
 <> <Col>
    <Form.Group  style={{marginTop:'1rem', marginBottom: '.5rem'}}>
    <FloatingLabel
    controlId="floatingInputGrid"
    label="Código"
    style={floatingLabel}
    >
   <Form.Control size="sm" type="text" style={{width:"6rem"}} name="Codigo" onChange={HandleChange} value={input.Codigo} disabled />
   </FloatingLabel>
   </Form.Group></Col></>}
   <Col >
   <Form.Group style={{marginTop:'1rem', marginBottom: '.5rem'}}>
   <FloatingLabel
    controlId="floatingInputGrid"
    label="Nombre"
    style={floatingLabel}
    >
    <Form.Control size="sm" type="text"  name="Nombre" placeholder="Nombre" className={error.Nombre && styles.inputError} onChange={HandleChange} 
   value={input.Nombre} required />
   {error.Nombre && <div className={styles.error}>{error.Nombre}</div>}
   </FloatingLabel>
   </Form.Group>
   </Col>
   </Row>
   
   </div>
   
   <hr className={styles.hr}/>
   <div className={styles.inputSelect} >
   <Row className="g-1">
   {id?.length? 
    <Col>
   <InputGroup>
   <InputGroup.Text id="basic-addon1">Team Leader</InputGroup.Text>
      <Form.Select size="sm" name="TeamLeader" value={input.TeamLeader}  onChange={HandleChange} id="" >
          {   !id ? <option value="">---</option> 
              :vendedorTeamLeader && Object.keys(vendedorTeamLeader).length 
              ?<option key={vendedorTeamLeader.Codigo} value={vendedorTeamLeader.Codigo}>{`${vendedorTeamLeader.Nombre}`}</option> 
              :<option value="">---</option>  }
              {teamleader && teamleader.map(e => <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
      </Form.Select>
    </InputGroup>
  </Col>
  :<Col>
  <InputGroup>
  <InputGroup.Text id="basic-addon1">Team Leader</InputGroup.Text>
     <Form.Select size="sm" name="TeamLeader" value={input.TeamLeader}  onChange={HandleChange} id="" >
         {   !id ? <option value="">---</option> 
             :vendedorTeamLeaderActivo && Object.keys(vendedorTeamLeaderActivo).length 
             ?<option key={vendedorTeamLeaderActivo.Codigo} value={vendedorTeamLeaderActivo.Codigo}>{`${vendedorTeamLeaderActivo.Nombre}`}</option> 
             :<option value="">---</option>  }
             {teamleaderActivo && teamleaderActivo.map(e => <option key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
     </Form.Select>
   </InputGroup>
 </Col>}
  <Col>
  <InputGroup>
   <InputGroup.Text id="basic-addon1">Categoria</InputGroup.Text>  
        <Form.Select size="sm" name="Categoria" value={input.Categoria}  onChange={HandleChange} id="" >
            <option value="">---</option>
            <option value="N">N</option>
            <option value="I">I</option>
            <option value="C">C</option>
            <option value="B">B</option>
            <option value="A">A</option>        
        </Form.Select>
      </InputGroup>
    </Col>
    <Col>
    <InputGroup>
    <InputGroup.Text id="basic-addon1">Fecha Baja</InputGroup.Text>  
      <Form.Control size="sm" type="date" name='FechaBaja'  value={input.FechaBaja}  onChange={HandleChange} />
    </InputGroup>
    </Col>
    </Row>
    <br/>
    <Row className="g-1">
    {id?.length?<>
    <Col>
  <InputGroup>
   <InputGroup.Text id="basic-addon1">Oficial Scoring</InputGroup.Text>  
        <Form.Select size="sm" name="OficialScoring" value={input.OficialScoring}  onChange={HandleChange} id="" >
            {   !id ? <option value="">---</option> 
                :vendedorOficialScoring && Object.keys(vendedorOficialScoring).length 
                ?<option key={vendedorOficialScoring.Codigo} value={vendedorOficialScoring.Codigo}>{`${vendedorOficialScoring.Nombre}`}</option> 
                :<option value="">---</option>  }
                {oficialesScoring && oficialesScoring.map(e => <option  key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
        </Form.Select>
      </InputGroup>
    </Col>
    <Col>
  <InputGroup>
   <InputGroup.Text id="basic-addon1">Oficial Mora</InputGroup.Text>  
        <Form.Select size="sm" name="OficialMora" value={input.OficialMora}  onChange={HandleChange} id="" >
            {   !id ? <option value="">---</option> 
                :vendedorOficialMora && Object.keys(vendedorOficialMora).length 
                ?<option key={vendedorOficialMora.Codigo} value={vendedorOficialMora.Codigo}>{`${vendedorOficialMora.Nombre}`}</option> 
                :<option value="">---</option>  }
                {oficialesMora && oficialesMora.map(e => <option  key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
        </Form.Select>
      </InputGroup>
    </Col></>
    
    :<><Col>
  <InputGroup>
   <InputGroup.Text id="basic-addon1">Oficial Scoring</InputGroup.Text>  
        <Form.Select size="sm" name="OficialScoring" value={input.OficialScoring}  onChange={HandleChange} id="" >
            {   !id ? <option value="">---</option> 
                :vendedorOficialScoringActivo && Object.keys(vendedorOficialScoringActivo).length 
                ?<option key={vendedorOficialScoringActivo.Codigo} value={vendedorOficialScoringActivo.Codigo}>{`${vendedorOficialScoringActivo.Nombre}`}</option> 
                :<option value="">---</option>  }
                {oficialesScoringActivos && oficialesScoringActivos.map(e => <option  key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
        </Form.Select>
      </InputGroup>
    </Col>
    <Col>
  <InputGroup>
   <InputGroup.Text id="basic-addon1">Oficial Mora</InputGroup.Text>  
        <Form.Select size="sm" name="OficialMora" value={input.OficialMora}  onChange={HandleChange} id="" >
            {   !id ? <option value="">---</option> 
                :vendedorOficialMoraActivo && Object.keys(vendedorOficialMoraActivo).length 
                ?<option key={vendedorOficialMoraActivo.Codigo} value={vendedorOficialMoraActivo.Codigo}>{`${vendedorOficialMoraActivo.Nombre}`}</option> 
                :<option value="">---</option>  }
                {oficialesMoraActivos && oficialesMoraActivos.map(e => <option  key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
        </Form.Select>
      </InputGroup>
    </Col></>}
    <Col>
  <InputGroup>
   <InputGroup.Text id="basic-addon1">Escala Comisión</InputGroup.Text>  
        <Form.Select size="sm" name="Escala" value={input.Escala}  onChange={HandleChange} id="" >
            {   !id ? <option value="">---</option> 
                :vendedorEscala && Object.keys(vendedorEscala).length 
                ?<option key={vendedorEscala.Codigo} value={vendedorEscala.Codigo}>{`${vendedorEscala.Nombre}`}</option> 
                :<option value="">---</option>  }
                {escalas && escalas.map(e => <option  key={e.Codigo} value={e.Codigo}>{`${e.Nombre}`}</option>)}
        </Form.Select>
      </InputGroup>
    </Col>
  </Row>
  </div>
  <br/>
  
  <div className={styles.inputCheck}>
  <span  style={{marginTop: '-1.2rem'}}>Activo</span>
  <div style={{marginTop: '-2rem'}}>
  
   <input className={styles.inputCheck} type="checkbox" name="Activo" onChange={handleCheckChange} value={input.Activo} checked={input.Activo } />
   
   </div>
   </div>
  <hr className={styles.hr}/>

   {
                    id?.length? <ButtonPrimary className={styles.btn}   onClick={HandleSubmitUpdate}>Actualizar</ButtonPrimary>
                    : <ButtonPrimary className={styles.btn} type="submit" >Enviar</ButtonPrimary>
                }
                   
 </Form>
                </div>
)
}

export default VendedoresFormulario