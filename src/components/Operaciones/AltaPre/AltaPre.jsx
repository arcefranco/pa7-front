import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import BiggerTitleLogo from '../../../styled-components/containers/BiggerTitleLogo';
import TitlePrimary from '../../../styled-components/h/TitlePrimary';
import { ReturnLogo } from '../../../helpers/ReturnLogo';
import { getFormasPago, getIntereses, getModeloPrecio, getModelos, getModeloValorCuota, getOficialCanje, getOrigenSuscripcion, 
  getPuntosVenta, getSucursales, getSupervisores, getTarjetas, getTeamLeaders, getVendedores, getFechaMinimaCont,
  reset, verifyDoc, verifySolicitud, verifySolicitudStatus, altaPre, resetStatus } from '../../../reducers/Operaciones/altaPre/altaPreSlice';
import styles from './AltaPre.module.css';
import isAfterToday from '../../../helpers/isAfterToday';
import ModalStatus from '../../ModalStatus';
import Swal from 'sweetalert2';

const AltaPre = () => {
    const dispatch = useDispatch()
    const { empresaReal, marca, codigoMarca, codigoEmpresa } = useSelector(state => state.login.user)
    const { modelos, sucursales, formasPago, vendedores, 
      puntosventa, oficialesCanje, supervisores, teamleaders, intereses, tarjetas, origen, fechaMinimaCont, verifyResult, verifyStatus, 
      modeloValorCuota, modeloPrecios, solicitudesDoc, altaPreStatus } = useSelector(state => state.AltaPre)
    const [modelosFiltered, setModelosFiltered] = useState([])
    const [vendedorSelected, setVendedorSelected] = useState([])
    const [teamLeaderSelected, setTeamLeaderSelected] = useState('')
    const [supervisorSelected, setSupervisorSelected] = useState('')
    const [interesesFiltered, setInteresesFiltered] = useState([])
    const [isTarjeta, setIsTarjeta] = useState(false)
    const [error, setError] = useState({})
    const [date, setDate] = useState(new Date())
    const [modal, setModal] = useState(true)

    const [input, setInput] = useState({
      codigoMarca: codigoMarca,
      codEmpresa: codigoEmpresa,
      empresaNombre: empresaReal,
      Solicitud: '',
      FechaAlta: '',
      TipoPlan: '',
      Modelo: '',
      ValorCuotaTerm: '',
      Documento: '',
      DocumentoNro: '',
      CUIL: '',
      Nacimiento: '',
      tieneEmail: 0,
      Apellido: '',
      Nombre: '',
      EmailParticular: '',
      EmailLaboral: '',
      Calle: '',
      Numero: '',
      Piso: '',
      Dto: '',
      CodPostal: '',
      Localidad: '',
      Provincia: '',
      TelefParticular: '',
      TelefCelular: '',
      TelefLaboral: '',
      TelefFamiliar: '',
      Ocupacion: '',
      CondIva: '',
      ContactoAD: '',
      Precio: 'A',
      TotalCuota: '',
      nroRecibo: '',
      nroRecibo2: '',
      Sucursal: '',
      FormaDePago: '',
      cuentaContable: '',
      CantPagos: '',
      Vendedor: '',
      FechaCheque: '',
      FechaCancelacionSaldo: '',
      TeamLeader: '',
      Supervisor: '',
      Importe: '',
      puntoVenta: '',
      importeAbonado: '',
      Interes: '',
      OficialCanje: '',
      Tarjeta: '',
      nroTarjeta: '',
      origenSuscripcion: '',
      fechaCupon: '',
      nroCupon: '',
      debAutom: 0,
      DNI: 0,
      Mail: 0,
      Anexos: 0,
      promoEspecial: 0,
      planSubite: 0,
      lote: '',
      observaciones: ''
    })

  const handleChange = (e) => {
                
    const {name , value} = e.target
    const newForm = {...input,
        [name]: value,
      }
      
      setInput(newForm)
  }
  const handleCheckChange = (e) => {
    const { name} = e.target;
    var value = e.target.checked
    value = e.target.checked? 1 : 0
    const newForm = { ...input, [name]: value };
    setInput(newForm);
};

const handleCheckPrecio = (e) => {
  if(e.target.value === '1'){
    setInput({
      ...input,
      "Precio": 'B'
    })
  }else{
    setInput({
      ...input,
      "Precio": 'A'
    })
  }

}

const onBlurRequired = (e) => {
  let nameTarget = e.target.name
  if(!e.target.value){
  setError({...error, [nameTarget]: "Campo Requerido"})
}else{
  setError({...error, [nameTarget]: ""})
}
}


const onBlurSolicitud = () => {
  if(!input.Solicitud) { 
    setError({...error, "Solicitud": "Debe completar el numero de solicitud"}) 
  }
  else{
    dispatch(verifySolicitud({solicitud: input.Solicitud}))
    dispatch(verifySolicitudStatus({solicitud: input.Solicitud, codMarca: codigoMarca}))
    setError({...error, "Solicitud": ""}) 

  }
  
}

const onBlurNacimiento = () => {
    if(input.Nacimiento > `${date.getUTCFullYear()-18}-${date.getUTCMonth()+1}-${date.getUTCDate()}` || !input.Nacimiento) {
      setInput({...input, "Nacimiento":""})
      setError({...error, "Nacimiento": 'El Cliente debe ser mayor de 18 años'})
    }else{
      setError({})
    }

}

const onBlurFecha = () => {

  if(isAfterToday(input.FechaAlta)){
    setError({...error, "FechaAlta": "Está ingresando una fecha posterior a la actual"})
 
    setInput({...input, "FechaAlta": ""})
  }else if(input.FechaAlta < `${fechaMinimaCont.slice(0,4)}-${fechaMinimaCont.slice(4,6)}-${fechaMinimaCont.slice(6,fechaMinimaCont.length)}`){
    setError({...error, "FechaAlta": "Esta ingresando una fecha anterior a la fecha minima de contabilización"})

    setInput({...input, "FechaAlta": ""})
  }
  
  else{
    setError({...error, "FechaAlta": ""})
  }
}

const onBlurDoc = () => {
if(!input.Documento.length || !input.DocumentoNro.length) {
  setError({...error, "Documento": "Debe completar los datos del documento"})
  setInput({...input, "DocumentoNro": ""})
}else{
  setError({})
  dispatch(verifyDoc({documento: input.Documento, documentoNro: input.DocumentoNro}))


}
}

const onBlurEmail = () => {
  if(input.EmailLaboral.length){
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.EmailLaboral)){
      setError({...error, "EmailLaboral": 'Email invalido'})
      setInput({...input, "EmailLaboral": ""})
    }else{
      setError({...error, "EmailLaboral": ""})
    }
    }
    else if(input.EmailParticular.length){
      if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.EmailParticular)){
        
        setInput({...input, "EmailParticular": ""})
      }else{
        setError({...error, "EmailParticular": ""})
      }
      
    }

}

const onBlurTelef = (e) => {
  let nameTarget = e.target.name
  if(e.target.value && e.target.value.length < 8){
  setError({...error, [nameTarget]: "Debe tener al menos 8 digitos"})
  }else{
    setError({...error, [nameTarget]: ""})
  }
}

const onBlurTelefUltimo = (e) => {
  let nameTarget = e.target.name
  const telefCargados = []
  if(input.TelefParticular) telefCargados.push(input.TelefParticular)
  if(input.TelefCelular) telefCargados.push(input.TelefCelular)
  if(input.TelefFamiliar) telefCargados.push(input.TelefFamiliar)
  if(input.TelefLaboral) telefCargados.push(input.TelefLaboral)
  console.log(telefCargados)
  if(e.target.value && e.target.value.length < 8){
  setError({...error, [nameTarget]: "Debe tener al menos 8 digitos"})
  }
  
  else{
    setError({...error, [nameTarget]: ""})
  }
}

const onBlurRecibo1 = () => {
  if(input.nroRecibo.length){
    if(input.nroRecibo.length < 4){
      let difference = 4 - input.nroRecibo.length
      let zeros = "0".repeat(difference)
      setInput({...input, "nroRecibo": zeros + input.nroRecibo})
      setError({...error, "nroRecibo": ""})
    }
  }else{
    setError({...error, "nroRecibo": "Campo Requerido"})
  }
}

const onBlurRecibo2 = () => {
  if(input.nroRecibo2.length){
    if(input.nroRecibo2.length < 8){
      let difference = 8 - input.nroRecibo2.length 
      let zeros = "0".repeat(difference)  
      setInput({...input, "nroRecibo2": zeros + input.nroRecibo2})
      setError({...error, "nroRecibo2": ""})
    }
  }

  else{
    setError({...error, "nroRecibo2": "Campo Requerido"})
  }
}

const onBlurCantPagos = () => {
  if(input.Importe.length && interesesFiltered.length){
      if(parseFloat(input.CantPagos) !== 1){
        const interesSelected = interesesFiltered.find(e => e.Cantidad === parseFloat(input.CantPagos))?.Interes
        setInput({...input, "Interes": (input.Importe * parseFloat(interesSelected))/100, "importeAbonado": parseFloat(input.Importe) + (input.Importe * parseFloat(interesSelected))/100})
        setError({...error, "Importe": ""})
      }else{
        setInput({...input, "Interes": 0, "importeAbonado": input.Importe})
      }
  }
  else if(input.Importe.length && !interesesFiltered.length){
    setInput({...input, "importeAbonado": parseFloat(input.Importe)})
  }

}

const onBlurFormaDePago = (e) => {
setInput({...input, "Importe": 0, "CantPagos": 0, "importeAbonado": 0})

if(!e.target.value) setError({...error, "FormaDePago": "Campo requerido"})
else{
  setInput({...input, "cuentaContable": formasPago.status && formasPago.data.find(e => e.Codigo === parseFloat(input.FormaDePago)).CuentaContable})
   setError({...error, "FormaDePago": ""})
  }
}


const onBlurTarjeta = (e) => {
  if(isTarjeta){
    let nameTarget = e.target.name
    if(!e.target.value){
    setError({...error, [nameTarget]: "Campo Requerido"})
  }else{
    setError({...error, [nameTarget]: ""})
  }
  }
}

const onClick = () => {
  const telefCargados = []
  const emailsCargados = []
  if(input.TelefParticular) telefCargados.push(input.TelefParticular)
  if(input.TelefCelular) telefCargados.push(input.TelefCelular)
  if(input.TelefFamiliar) telefCargados.push(input.TelefFamiliar)
  if(input.TelefLaboral) telefCargados.push(input.TelefLaboral)
  if(input.EmailLaboral) emailsCargados.push(input.EmailLaboral)
  if(input.EmailParticular) emailsCargados.push(input.EmailParticular)
  const duplicates = telefCargados.filter((item, index) => telefCargados.indexOf(item) !== index)
  if(!input.Solicitud){
    setError({...error, "Solicitud": "Debe ingresar numero de solicitud"})
    return
  }
  if(!input.FechaAlta){
    setError({...error, "FechaAlta": "Debe ingresar una fecha"})
    return
  }
  if(!input.TipoPlan){
    setError({...error, "TipoPlan": "Debe ingresar un tipo de plan"})
    return
  }
  if(!input.Modelo){
    setError({...error, "Modelo": "Debe elegir un modelo"})
    return
  }
  if(!input.Documento.length || !input.DocumentoNro.length) {
    setError({...error, "Documento": "Debe completar los datos del documento"})
    return
  }
  if(input.Nacimiento > `${date.getUTCFullYear()-18}-${date.getUTCMonth()+1}-${date.getUTCDate()}` || !input.Nacimiento){
    setError({...error, "Nacimiento": 'El Cliente debe ser mayor de 18 años'})
    return
  }
  if(!input.Apellido){
    setError({...error, "Apellido": 'Campo Requerido'})
    return
  }
  if(!input.Nombre){
    setError({...error, "Nombre": 'Campo Requerido'})
    return
  }
  if(!emailsCargados.length && input.tieneEmail === 0){
    alert('Debe haber al menos 1 email')
    return
  }
  if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.EmailParticular) && input.EmailParticular){
    setError({...error, "EmailParticular": 'Email invalido'})
    return
  }
  if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.EmailLaboral) && input.EmailLaboral){
    setError({...error, "EmailLaboral": 'Email invalido'})
    return
  }
  if(!input.Calle.length){
    setError({...error, "Calle": 'Campo Requerido'})
    return
  }
  if(!input.Numero){
    setError({...error, "Numero": 'Campo Requerido'})
    return
  }
  if(!input.CodPostal){
    setError({...error, "CodPostal": 'Campo Requerido'})
    return
  }
  if(!input.Localidad.length){
    setError({...error, "Localidad": 'Campo Requerido'})
    return
  }
  if(!input.Provincia){
    setError({...error, "Provincia": 'Campo Requerido'})
    return
  }
  if(telefCargados.length < 2) {
    alert('Debe haber al menos 2(dos) teléfonos')
    return
  }
  if(duplicates.length){
    alert('No puede haber dos teléfonos iguales')
    return
  }
  if(!input.CondIva.length){
    setError({...error, "CondIva": 'Campo Requerido'})
    return
  }
  if(!input.nroRecibo2.length){
    setError({...error, "nroRecibo2": "Campo Requerido"})
    return
  }
  if(!input.nroRecibo.length){
    setError({...error, "nroRecibo": "Campo Requerido"})
    return
  }
  if(!input.Sucursal.length){
    setError({...error, "Sucursal": "Campo Requerido"})
    return
  }
  if(!input.FormaDePago.length){
    setError({...error, "FormaDePago": "Campo Requerido"})
    return
  }
  if(!input.Vendedor){
    setError({...error, "Vendedor": 'Campo Requerido'})
    return
  }
  if(!input.Importe.length){
    setError({...error, "Importe": "Falta importe"})
    return
  }


  if(isTarjeta && !input.Tarjeta){
    setError({...error, "Tarjeta": 'Campo Requerido'})
    return
  }
  if(isTarjeta && !input.nroCupon){
    setError({...error, "nroCupon": 'Campo Requerido'})
    return
  }
  if(isTarjeta && !input.nroTarjeta){
    setError({...error, "nroTarjeta": 'Campo Requerido'})
    return
  }
  if(isTarjeta && !input.fechaCupon){
    setError({...error, "fechaCupon": 'Campo Requerido'})
    return
  }
  if(isTarjeta && !input.lote){
    setError({...error, "lote": 'Campo Requerido'})
    return
  }

  if(!input.puntoVenta){
    setError({...error, "puntoVenta": 'Campo Requerido'})
    return
  }
  if(!input.origenSuscripcion){
    setError({...error, "origenSuscripcion": 'Campo Requerido'})
    return
  }
  else{
  const sumErrors = Object.values(error).reduce(
    (accumulator, currentValue) => accumulator + currentValue.length,
    0
  );
  if(sumErrors === 0) {
    dispatch(altaPre(input)) 
  }
    
  } 
}

useEffect(() => { //Manejar actualizaciones de vendedores (ABM) y su inUpdate
  setModal(true)

  function resetModal () {
      dispatch(resetStatus())
      setModal(false)
  }
 

   if(altaPreStatus && Object.keys(altaPreStatus).length){ 
      setTimeout(resetModal, 5000)
      
  } 


}, [altaPreStatus]) 


    useEffect(() => {

      Promise.all([
        dispatch(getModelos()), 
        dispatch(getSucursales()), 
        dispatch(getFormasPago()), 
        dispatch(getVendedores()),
        dispatch(getPuntosVenta()),
        dispatch(getOficialCanje()),
        dispatch(getTeamLeaders()),
        dispatch(getSupervisores()),
        dispatch(getIntereses()),
        dispatch(getTarjetas()),
        dispatch(getOrigenSuscripcion()),
        dispatch(getFechaMinimaCont({marca: codigoMarca}))
      
      ])
      
      return () => {
        dispatch(reset())
      }
    }, [])

    useEffect(() => {

      if(verifyResult.length && input.Solicitud.length){
        alert('El numero de solicitud ingresado ya se encuentra en Operaciones ingresadas')
        setInput({...input, "Solicitud": ""})
      }else if(Object.keys(verifyStatus).length){
        if(verifyStatus.CodSupervisor){
           alert('La solicitud ingresada ya se encuentra asignada')
           setInput({...input, "Solicitud": ""})
          }
        if(verifyStatus.Anulada){
           alert('La solicitud ingresada se encuentra anulada')
           setInput({...input, "Solicitud": ""})
        }
      }

    }, [verifyResult, verifyStatus])

    //OPTIONS MODELOS

    useEffect(() => {

      if(input.TipoPlan !== '*' && modelos.status === true){
        setInput({...input, "TotalCuota": "", "ValorCuotaTerm": ""})
        setModelosFiltered(modelos.data.filter(e => e.TipoPlan === parseFloat(input.TipoPlan) && e.Marca === codigoMarca && e.Activo === 1 && e.CuotaTerminal !== null))
      }else{
        setInput({...input, "TotalCuota": "", "ValorCuotaTerm": ""})
        setModelosFiltered([])
      }
      
    }, [input.TipoPlan])

    //VALOR CUOTA TERMINAL
 
    useEffect(() => {
      if(modelos.status === true && input.Modelo !== '*'){

        dispatch(getModeloValorCuota({codMarca: codigoMarca, modelo: input.Modelo, tipoPlan: input.TipoPlan}))
        dispatch(getModeloPrecio({codMarca: codigoMarca, modelo: input.Modelo, tipoPlan: input.TipoPlan}))
      }
    }, [input.Modelo])

    useEffect(() => {
      setInput({...input, "ValorCuotaTerm": modeloValorCuota.CuotaTerminal})
    }, [modeloValorCuota])

    useEffect(() => {
      if(input.Precio === 'B' && Object.keys(modeloPrecios).length){
        setInput({...input, "TotalCuota": modeloPrecios.PrecioB.CuotaACobrar})
      }else{ 
        if(Object.keys(modeloPrecios).length){

          setInput({...input, "TotalCuota": modeloPrecios.PrecioA.CuotaACobrar})
        }
      }

    }, [modeloPrecios, input.Precio])

    useEffect(() => {
      if(parseFloat(input.importeAbonado) > parseFloat(input.TotalCuota)){
        alert('El valor abonado no puede ser superior al importe total de la cuota')
        setInput({...input, "Importe": 0, "CantPagos": "", "importeAbonado": 0})
      }else if(parseFloat(input.importeAbonado) < parseFloat(input.TotalCuota)){
        setError({...error, "FechaCancelacionSaldo": 'Campo Requerido'})
      }
      else if(parseFloat(input.importeAbonado) === parseFloat(input.TotalCuota)){
        setError({...error, "FechaCancelacionSaldo": ""})
      }

    }, [input.importeAbonado])

    useEffect(() => {
      if(vendedores.status && input.Vendedor){
        setVendedorSelected(vendedores.data.find(e => e.Codigo === parseFloat(input.Vendedor)))
      }
    }, [input.Vendedor])

    useEffect(() => {
      setTeamLeaderSelected(teamleaders.data?.find(e => e.Codigo === vendedorSelected?.TeamLeader))
    }, [vendedorSelected])

    useEffect(() => {
      setSupervisorSelected(supervisores.data?.find(e => e.Codigo === teamLeaderSelected?.Sucursal))

    }, [teamLeaderSelected])
    
    useEffect(() => {
      
      setInput({...input, "TeamLeader": teamLeaderSelected?.Codigo, "Supervisor": supervisorSelected?.Codigo,
      "Vendedor": parseFloat(input.Vendedor)})

    }, [supervisorSelected])
 
 

    useEffect(() => {

      if(solicitudesDoc.docStatus?.length){

        let suscriptor = solicitudesDoc.suscriptor[0]
        Swal.fire({
          icon: 'success',
          title: 'El cliente posee la(s) siguiente(s) operacion(es) ' + `${solicitudesDoc.docStatus.map(e => {return `Solicitud: ${e.Solicitud} Empresa: ${e.Empresa}`})}`,
          showConfirmButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            setInput({...input, "Nacimiento": suscriptor.FechaNac.slice(0,10), "Nombre": suscriptor.Nombres, "Apellido": suscriptor.Apellido, "EmailLaboral": suscriptor.EmailLaboral, 
            "EmailParticular": suscriptor.EmailLaboral, "Calle": suscriptor.Domicilio, "Numero": suscriptor.NumeroCalle, "Piso": suscriptor.Piso,
            "Dto": suscriptor.Dto, "CodPostal": suscriptor.CodPostal, "Localidad": suscriptor.Localidad, "Provincia": suscriptor.Provincia,
            "TelefParticular": suscriptor.Telefonos, "TelefCelular": suscriptor.Telefonos2, "TelefLaboral": suscriptor.Telefonos3, 
            "TelefFamiliar": suscriptor.Telefonos4, "Ocupacion": suscriptor.Ocupacion
            })

          }
        })

      }

  
      

    }, [solicitudesDoc])
    
    useEffect(() => {

      setInput({...input, "Importe": 0, "CantPagos": 0, "importeAbonado": 0})

      if(input.FormaDePago  && intereses.status) {

          setInteresesFiltered(intereses.data.filter(e => e.MedioCobro === parseFloat(input.FormaDePago)))
          
      }
    }, [input.FormaDePago])



    useEffect(() => {
      if(formasPago.data?.find(e => e.Codigo === parseFloat(input.FormaDePago))?.EsTarjeta === 1) setIsTarjeta(true)
      else {
      setIsTarjeta(false) 
      setError({...error, "Tarjeta":"", "fechaCupon": "", "nroCupon": "", "lote": "", "nroTarjeta": ""})
      setInput({...input, "Tarjeta":"", "fechaCupon": "", "nroCupon": "", "lote": "", "nroTarjeta": ""})
      }
    }, [input.FormaDePago])

    useEffect(() => {
      if(Object.keys(altaPreStatus).includes('status')){
        if(altaPreStatus.status){
          Swal.fire({
            icon: 'success',
            title: altaPreStatus.message,
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: altaPreStatus.message,
          })
        }
      }
    }, [altaPreStatus])

    

  return (
    <div style={{ textAlign: '-webkit-center'}}>

        <BiggerTitleLogo>
            <div>
              <span>{empresaReal}</span>
              <ReturnLogo empresa={empresaReal}/>
            </div>
            <TitlePrimary style={{textAlign: 'start'}}>Alta de Pre-Solicitudes({marca})</TitlePrimary>
          </BiggerTitleLogo>

          <div className={styles.wholeForm}>
            <div className={styles.section}>
              <div className={styles.formTitleContainer}>
                  <h5 style={{margin: '0'}}>Datos Generales</h5>
              </div>
              <div className={styles.inputSection3}> 
                  <div className={styles.input}>
                  <span>Nro Solicitud </span>
                  <div className={styles.containerError}>
                  <input name='Solicitud' onBlur={onBlurSolicitud} onChange={handleChange} value={input.Solicitud} type="text" />
                  {error.Solicitud && <div className={styles.error}>{error.Solicitud}</div>}
                  </div>
                  </div>

                  <div className={styles.input}>
                  <span>Fecha Alta </span>
                  <div className={styles.containerError}>
                  <input name='FechaAlta' onBlur={onBlurFecha} onChange={handleChange} value={input.FechaAlta} type="date" />
                  {error.FechaAlta && <div className={styles.error}>{error.FechaAlta}</div>}
                  </div>
                  </div>

                  <div className={styles.input}>
                  <span>Tipo Plan </span>
                  <div className={styles.containerError}>

                  <select onBlur={onBlurRequired}  onChange={handleChange} value={input.TipoPlan} name="TipoPlan" id="">
                    <option value="">---</option>
                    <option value={1}>100%</option>
                    <option value={2}>70/30</option>
                    <option value={3}>60/40</option>
                    <option value={4}>75/25</option>
                    <option value={5}>80/20</option>
                    <option value={6}>90/10</option>
                  </select>
                  {error.TipoPlan && <div className={styles.error}>{error.TipoPlan}</div>}
                  </div>
                  </div>

              </div>
              <div className={styles.inputSection2}>
              <div className={styles.input}>
                  <span>Modelo </span>
                  <div className={styles.containerError}>
                  <select onChange={handleChange} onBlur={onBlurRequired} value={input.Modelo} name="Modelo" id="">
                    <option value="">---</option>
                    {
                      modelosFiltered.length && modelosFiltered.map(e => 
                        <option value={e.Codigo}>{e.Nombre}</option>)
                    }
                  </select>
                  {error.Modelo && <div className={styles.error}>{error.Modelo}</div>}

                  </div>
                  </div>
                  <div className={styles.input}>
                  <span>Valor Cuota Term. </span>
                    <input name='ValorCuotaTerm' disabled onChange={handleChange} 
                    value={input.ValorCuotaTerm} 
                    type="text" style={{ width: '-webkit-fill-available'}}
                    />
                  </div>
              </div>
              
            </div>   
            <div className={styles.section}>
              <div className={styles.formTitleContainer}>
                  <h5 style={{margin: '0'}}>Datos del Suscriptor</h5>
              </div>
              <div className={styles.inputSection2}>
                <div className={styles.col1} style={{display: 'grid', gridTemplateColumns:'1fr 1fr'}}>
                  <div className={styles.input}>
                  <span>Documento</span>
                  <div className={styles.containerError}>
                    <select name="Documento" onChange={handleChange} value={input.Documento} id="">
                      <option value="">---</option>
                      <option value={1}>DNI</option>
                      <option value={2}>LE</option>
                      <option value={3}>LC</option>
                      <option value={4}>CI</option>
                      <option value={5}>PAS</option>
                      <option value={6}>CUIT</option>
                    </select>
                </div>
              </div>              
              <div className={styles.input}>
                    <span>Número</span>
                    <div className={styles.containerError}>
                    <input type="text" onBlur={onBlurDoc} name='DocumentoNro' id='DocumentoNro'  value={input.DocumentoNro} onChange={handleChange} />
                    {error.Documento && <div className={styles.error}>{error.Documento}</div>}
                    </div>
              </div>
              {
                codigoEmpresa === 14 ? 
              <div className={styles.input}>
                    <span>CUIL</span>
                    <div className={styles.containerError}>
                    <input type="text"  name='CUIL'  value={input.CUIL} onChange={handleChange} />
                    </div>
              </div>      : null            
              }
                  </div>
                    <div className={styles.col2} style={{display: 'grid', gridTemplateColumns:'1fr 1fr'}}>
              <div className={styles.input}>
                  <span>Fecha de Nacimiento </span>
                  <div className={styles.containerError}>
                  {
                    input.Documento !== '6' ?
                  <input name='Nacimiento' onBlur={onBlurNacimiento} onChange={handleChange} value={input.Nacimiento} type="date" max={`${date.getUTCFullYear()-18}-${date.getUTCMonth()+1}-${date.getUTCDate()}`} /> :
                  <input name='Nacimiento' disabled type="date" /> 
                  }
                  {error.Nacimiento && <div className={styles.error}>{error.Nacimiento}</div>}
                  </div>
              </div>
              <div className={styles.input}>
                    <span>No tiene Email</span>
                    <input type="checkbox" style={{height: '12px', width: '12px'}} value={input.tieneEmail} name="tieneEmail" onChange={handleCheckChange} />
              </div>
                    </div>
              </div>

              <div className={styles.inputSection2}>
                <div className={styles.col1}>
                    <div className={styles.input}>
                        <span>Apellido</span>
                        <div className={styles.containerError}>
                        <input type="text" name='Apellido' onBlur={onBlurRequired} value={input.Apellido} onChange={handleChange}/>
                        {error.Apellido && <div className={styles.error}>{error.Apellido}</div>}
                        </div>
                    </div>
                    <div className={styles.input}>
                        <span>Nombre</span>
                        <div className={styles.containerError}>

                        <input type="text" name='Nombre' onBlur={onBlurRequired}  value={input.Nombre} onChange={handleChange}/>
                        {error.Nombre && <div className={styles.error}>{error.Nombre}</div>}
                        </div>
                    </div>

                </div>
                <div className={styles.col2}>
                    <div className={styles.input}>
                        <span>Email Particular</span>
                        <div className={styles.containerError}>
                        {
                          input.tieneEmail === 0 ? 
                          <input name="EmailParticular" onBlur={onBlurEmail} value={input.EmailParticular} onChange={handleChange}/> :
                          <input type="text" disabled/>
                        }
                        {error.EmailLaboral && <div className={styles.error}>{error.EmailLaboral}</div>}
                        </div>
                    </div>
                    <div className={styles.input}>
                        <span>Email Laboral</span>
                        <div className={styles.containerError}>
                        {
                           input.tieneEmail === 0 ? 
                           <input name="EmailLaboral"  onBlur={onBlurEmail} value={input.EmailLaboral} onChange={handleChange}/> : 
                           <input type="text" disabled/>
                        }
                        {error.EmailLaboral && <div className={styles.error}>{error.EmailLaboral}</div>}  
                        </div>
                    </div>

                </div>
              </div>
              <div className={styles.inputSection2} >
                <div className={styles.col1} style={{ display: 'grid', gridTemplateColumns: '.5fr .5fr'}}>
                    <div className={styles.input}>
                        <span>Calle</span>
                        <div className={styles.containerError}>
                        <input name="Calle" onBlur={onBlurRequired}  value={input.Calle} onChange={handleChange}/>
                        {error.Calle && <div className={styles.error}>{error.Calle}</div>}  
                        </div>
                    </div>
                    <div className={styles.input}>
                        <span>Número</span>
                        <div className={styles.containerError}>
                        <input type="number" name="Numero" onBlur={onBlurRequired}  value={input.Numero} onChange={handleChange}/>
                        {error.Numero && <div className={styles.error}>{error.Numero}</div>} 
                        </div>
                    </div>

                    <div className={styles.input}>
                        <span>Piso</span>
                        <input type="number" name="Piso"   value={input.Piso} onChange={handleChange}/>
                    </div>
                    <div className={styles.input}>
                        <span>Dto.</span>
                        <input name="Dto"   value={input.Dto} onChange={handleChange}/>
                    </div>

                </div>
                <div className={styles.col2} style={{ display: 'grid', gridTemplateColumns: '.5fr .5fr'}}>

                    <div className={styles.input}>
                        <span>Cód. Postal</span>
                        <div className={styles.containerError}>
                        <input type="number" name="CodPostal"  onBlur={onBlurRequired} value={input.CodPostal} onChange={handleChange}/>
                        {error.CodPostal && <div className={styles.error}>{error.CodPostal}</div>}  
                        </div>
                    </div>
                    <div className={styles.input}>
                        <span>Localidad</span>
                        <div className={styles.containerError}>
                        <input name="Localidad" onBlur={onBlurRequired} value={input.Localidad} onChange={handleChange}/>
                        {error.Localidad && <div className={styles.error}>{error.Localidad}</div>}  
                        </div>
                    </div>
                    <div className={styles.input}>
                        <span>Provincia</span>
                        <div className={styles.containerError}>
                        <input name="Provincia"   value={input.Provincia} onBlur={onBlurRequired} onChange={handleChange}/>
                        {error.Provincia && <div className={styles.error}>{error.Provincia}</div>}  
                        </div>
                    </div>

                </div>
              </div>
              <div className={styles.inputSection2}> 
              <div className={styles.input}>
                <span>Teléf. Particular</span>
                <div className={styles.containerError}>
                <input type="number" name='TelefParticular' onBlur={onBlurTelef} value={input.TelefParticular} onChange={handleChange}/>
                {error.TelefParticular && <div className={styles.error}>{error.TelefParticular}</div>} 
                </div>
              </div>
              <div className={styles.input}>
                <span>Teléf. Celular</span>
                <div className={styles.containerError}>
                <input type="number" name='TelefCelular' onBlur={onBlurTelef} value={input.TelefCelular} onChange={handleChange}/>
                {error.TelefCelular && <div className={styles.error}>{error.TelefCelular}</div>} 
                </div>
              </div>
              </div>
              
              <div className={styles.inputSection2}> 
              <div className={styles.input}>
                <span>Teléf. Laboral</span>
                <div className={styles.containerError}>
                <input type="number" name='TelefLaboral' onBlur={onBlurTelef} value={input.TelefLaboral} onChange={handleChange}/>
                {error.TelefLaboral && <div className={styles.error}>{error.TelefLaboral}</div>} 
                </div>
              </div>
              <div className={styles.input}>
                <span>Teléf. Familiar</span>
                <div className={styles.containerError}>
                <input type="number" name='TelefFamiliar' onBlur={onBlurTelefUltimo} value={input.TelefFamiliar} onChange={handleChange}/>
                {error.TelefFamiliar && <div className={styles.error}>{error.TelefFamiliar}</div>}
                </div>
              </div>
             </div>  
             {error.Telef && <div className={styles.error}>{error.Telef}</div>}      
              <div className={styles.inputSection2}>
                <div className={styles.col1}>

                  <div className={styles.input}>
                    <span>Ocupación</span>
                    <input type="text" name='Ocupacion' value={input.Ocupacion} onChange={handleChange}/>
                  </div>
                  <div className={styles.input}>
                    <span>Cond. Iva</span>
                    <div className={styles.containerError}>
                    <select name="CondIva" id="" value={input.CondIva} onBlur={onBlurRequired} onChange={handleChange}>
                      <option value="">---</option>
                      <option value={1}>RESPONSABLE INSCRIPTO</option>
                      <option value={2}>RESPONSABLE NO INSCRIPTO</option>
                      <option value={3}>EXENTO</option>
                      <option value={4}>RESPONSABLE MONOTRIBUTO</option>
                      <option value={5}>CONSUMIDOR FINAL</option>
                    </select>
                    {error.CondIva && <div className={styles.error}>{error.CondIva}</div>}
                    </div>
                  </div>
                </div>
                <div className={styles.col2}>

                  <div className={styles.input}>
                      <span>Contacto AD</span>
                      <input type="text" name="ContactoAD" value={input.ContactoAD}  onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.section}>

              <div className={styles.formTitleContainer}>
                    <h5 style={{margin: '0'}}>Datos de la operación</h5>
              </div>
              <div className={styles.inputSection2} style={{marginTop: '2rem'}}>
                    <div className={styles.inputSection2} style={{alignContent: 'center'}}>
                        <div><input type="radio" value={0} defaultChecked onChange={handleCheckPrecio} name="Precio" /> Precio A</div>
                        <div><input type="radio" value={1} onChange={handleCheckPrecio}  name="Precio" /> Precio B</div>
                    </div>
                    <div style={{columnGap: '0'}}>
                      <div className={styles.input}>
                        <span>Importe Total Cuota</span> <input type="text" value={input.TotalCuota} name="TotalCuota" onChange={handleChange} />
                      </div>
                   
                    

                  
                     </div>
              </div>
              <div className={styles.inputSection2}>
              <div className={styles.input}> 
                            <span>Nro Recibo</span> 
                            <div className={styles.containerError}>
                            <input type="text" onBlur={onBlurRecibo1} minLength={4}  maxLength={4} value={input.nroRecibo} 
                            name="nroRecibo" onChange={handleChange}  style={{marginRight: '1rem'}}/>                        
                           {error.nroRecibo && <div className={styles.error}>{error.nroRecibo}</div>}
                            </div>
                          <div>
                            <div className={styles.containerError}>
                            <input type="text" onBlur={onBlurRecibo2}  value={input.nroRecibo2} name="nroRecibo2" onChange={handleChange}/>
                            {error.nroRecibo2 && <div className={styles.error}>{error.nroRecibo2}</div>}
                          
                            </div>
                          </div>
                          </div>
                    <div className={styles.input}>
                        <span>Forma Pago</span>
                        <div className={styles.containerError}>
                        <select name="FormaDePago" value={input.FormaDePago} onBlur={onBlurFormaDePago} onChange={handleChange} id="">
                          <option value="">---</option>
                          {
                            formasPago.status && formasPago.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Nombre}</option>)
                          }
                        </select>
                        {error.FormaDePago && <div className={styles.error}>{error.FormaDePago}</div>}
                        </div>
                    </div>
              </div>

              <div className={styles.inputSection2}>
                    <div className={styles.input}>
                          <span>Vendedor</span>
                          <div className={styles.containerError}>
                          <select name="Vendedor" value={input.Vendedor} onBlur={onBlurRequired} onChange={handleChange} id="">
                            <option value="">---</option>
                            {
                            vendedores.status && vendedores.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Nombre}</option>)
                            }
                          </select>
                          {error.Vendedor && <div className={styles.error}>{error.Vendedor}</div>}  
                          </div>
                    </div>
                    <div>
                      <div className={styles.inputSection2} style={{columnGap: '3rem'}}>
                            <div className={styles.input}>
                              <span>Fecha Cheque</span>
                              <input type="date" name="FechaCheque" value={input.FechaCheque} onChange={handleChange}/>
                            </div>
                            <div className={styles.input}>
                              <span>Fecha Estim. Canc. Saldo</span>
                              <div className={styles.containerError}>
                              <input type="date" name="FechaCancelacionSaldo" onBlur={onBlurRequired} value={input.FechaCancelacionSaldo} onChange={handleChange}/>
                              {error.FechaCancelacionSaldo && <div className={styles.error}>{error.FechaCancelacionSaldo}</div>}  
                              </div>
                            </div>
                      </div>

                    </div>
              </div>
              <div className={styles.inputSection2}>
              <div className={styles.input}>
                      <span>Sucursal</span>
                      <div className={styles.containerError}>
                      <select name="Sucursal" value={input.Sucursal} onBlur={onBlurRequired} onChange={handleChange} id="">
                        <option value="*">---</option>
                        {
                          sucursales.status && sucursales.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Nombre}</option>)
                        }
                      </select>
                      {error.Sucursal && <div className={styles.error}>{error.Sucursal}</div>}
                      </div>
                    </div>

                  <div className={styles.inputSection2} style={{columnGap: '0rem'}}>

                    <div className={styles.input}>
                          <span>Importe</span>
                          <div className={styles.containerError}>
                          <input type="number" name='Importe' onBlur={onBlurCantPagos} value={input.Importe} onChange={handleChange} />
                          {error.Importe && <div className={styles.error}>{error.Importe}</div>} 
                          </div>
                    </div>
                   <div className={styles.input}>
                              <span>Imp Abonado</span>
                              <input type="number" name="importeAbonado" disabled value={input.importeAbonado} onChange={handleChange}  />
                            </div> 
    

                  </div>

              </div>

              <div className={styles.inputSection2} style={{marginTop:'2rem'}}>
                      <fieldset style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '2rem'
                            
                      }}>
                      <div className={styles.inputSection2} style={{columnGap: '0'}}>
                      <div className={styles.input}>
                            <span>Team Leader</span>
                            <b><span>{teamLeaderSelected?.Nombre}</span></b>
                      </div>
                      <div className={styles.input}>
                            <span>Supervisor</span>
                            <b><span>{supervisorSelected?.Nombre}</span></b> 
                      </div>     
                  </div>
                      <div className={styles.input}>
                            <span>Puntos de Venta</span>
                            <div className={styles.containerError}>
                            <select name="puntoVenta" value={input.puntoVenta} onBlur={onBlurRequired} onChange={handleChange} id="">
                            <option value="*">---</option>
                            {
                            puntosventa.status && puntosventa.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Nombre}</option>)
                            }
                          </select>
                          {error.puntoVenta && <div className={styles.error}>{error.puntoVenta}</div>}
                          </div>

                      </div>
                      <div className={styles.input}>
                            <span>Origen Suscripción</span>
                            <div className={styles.containerError}>
                            <select name="origenSuscripcion" value={input.origenSuscripcion} onBlur={onBlurRequired} onChange={handleChange} id="">
                            <option value="">---</option>
                            {
                            origen.status && origen.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Descripcion}</option>)
                            }
                          </select>
                          {error.origenSuscripcion && <div className={styles.error}>{error.origenSuscripcion}</div>} 
                            </div>

                      </div>

                      <div className={styles.input}>
                            <span>Oficial Plan Canje</span>
                            <select name="OficialCanje" value={input.OficialCanje} onChange={handleChange} id="">
                            <option value="">---</option>
                            {
                            oficialesCanje.status && oficialesCanje.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Nombre}</option>)
                            }
                          </select>

                      </div> 

                      </fieldset>

                      <fieldset className={styles.fieldSet} disabled={ formasPago.status && formasPago.data.find(e => e.Codigo === parseFloat(input.FormaDePago))?.EsTarjeta === 1 ? false : true}>
                    <div className={styles.divTarjetas} style={{columnGap: '0'}}>
                        <div className={styles.inputSection2} style={{columnGap: '0'}}>
                            <div className={styles.input}>
                              <span>Tarjeta</span>
                              <div className={styles.containerError}>

                              <select name="Tarjeta" value={input.Tarjeta} onBlur={onBlurTarjeta} onChange={handleChange} id="">
                                <option value="*">---</option>
                                {
                                  tarjetas?.data?.length && tarjetas.data.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                } 
                              </select> 
                              
                              {error.Tarjeta && <div className={styles.error}>{error.Tarjeta}</div>}
                              </div>
                            </div>
                            <div className={styles.input}>
                              <span>Nro Tarjeta</span>
                              <div className={styles.containerError}>
                             
                                <input type="text" name='nroTarjeta' value={input.nroTarjeta} onBlur={onBlurTarjeta} onChange={handleChange} /> 

                              
                              {error.nroTarjeta && <div className={styles.error}>{error.nroTarjeta}</div>}
                              </div>
                            </div>
                      </div>
                      <div className={styles.input}>
                            <span>Cant. Pagos</span>
                            <select style={{
                                  maxWidth: '118px'
                            }} name="CantPagos" onBlur={onBlurCantPagos} value={input.CantPagos} onChange={handleChange} id="">
                              <option value="*">---</option>
                              {
                                formasPago.status && formasPago.data.find(e => e.Codigo === parseFloat(input.FormaDePago))?.EsTarjeta === 1 ? 
                                <option value={1}>1 pago sin interés</option> : null
                              } 
                              {
                                interesesFiltered.length && interesesFiltered.map(e => <option value={e.Cantidad}>{`${e.Cantidad} pagos - ${e.Interes}% interés`}</option>)
                              }
                            </select>
                        <div className={styles.input}>
                              <span>Interés</span>
                              <input disabled type="number" name="Interes" value={input.Interes} onChange={handleChange} />
                        </div>
                        </div>   

                      <div className={styles.inputSection2} style={{columnGap: '0'}}>
                            <div className={styles.input}>
                              <span>Fecha Cupón</span>
                              <div className={styles.containerError}>
                              <input type="date" name="fechaCupon" value={input.fechaCupon} onBlur={onBlurTarjeta} onChange={handleChange} />
                              {error.fechaCupon && <div className={styles.error}>{error.fechaCupon}</div>} 
                              </div>
                            </div>
                            <div className={styles.input}>
                              <span>Nro Cupón</span>
                              <div className={styles.containerError}>
                              <input type="text" name="nroCupon" value={input.nroCupon} onBlur={onBlurTarjeta} onChange={handleChange}/>
                              {error.nroCupon && <div className={styles.error}>{error.nroCupon}</div>} 
                              </div>
                            </div>
                      </div>

                      <div className={styles.input}>
                      <span>Lote</span>
                      <div className={styles.containerError}>
                      <input type="number" name='lote' value={input.lote} onBlur={onBlurTarjeta} onChange={handleChange} />
                      {error.lote && <div className={styles.error}>{error.lote}</div>}
                      </div>
                    </div> 

                      </div>
                      </fieldset>

              </div>





            <div className={styles.inputSection2} style={{marginTop:'4rem', marginBottom:'1rem'}}>


              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
                   <div className={styles.inputCheck}>
                      <span>Anexos</span>
                      <input type="checkbox" name='Anexos' onChange={handleCheckChange} />
                    </div>
                    <div className={styles.inputCheck}>
                      <span>Promo Especial</span>
                      <input type="checkbox" name='promoEspecial' onChange={handleCheckChange} />
                    </div>
                    <div className={styles.inputCheck}>
                      <span>Plan Subite Pide Auto</span>
                      <input type="checkbox" name='planSubite' onChange={handleCheckChange} />
                    </div>
             

                    <div className={styles.inputCheck}>
                      <span>Déb. Autom.</span>
                      <input type="checkbox" name='debAutom' onChange={handleCheckChange} />
                    </div>
                    <div className={styles.inputCheck}>
                      <span>DNI</span>
                      <input type="checkbox" name='DNI' onChange={handleCheckChange} />
                    </div>
                    <div className={styles.inputCheck}>
                      <span>Mail</span>
                      <input type="checkbox" name='Mail' onChange={handleCheckChange}/>
                    </div>
              
                   

      
         
                    
                </div>   
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}>
                <span>Observaciones: </span>
                <textarea name="observaciones" value={input.observaciones} onChange={handleChange} id="" cols="45" rows="4"></textarea>
              </div>

            </div>

            </div>
              <button className={styles.submitButton} onClick={onClick}>Aceptar</button> 

          </div>
        
    </div>
  )
}

export default AltaPre
