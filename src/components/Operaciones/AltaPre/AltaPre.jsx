import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import BiggerTitleLogo from '../../../styled-components/containers/BiggerTitleLogo';
import TitlePrimary from '../../../styled-components/h/TitlePrimary';
import { ReturnLogo } from '../../../helpers/ReturnLogo';
import ButtonPrimary from "../../../styled-components/buttons/ButtonPrimary";
import { getFromasPago, getIntereses, getModeloPrecio, getModelos, getModeloValorCuota, getOficialCanje, getOrigenSuscripcion, 
  getPuntosVenta, getSucursales, getSupervisores, getTarjetas, getTeamLeaders, getVendedores, 
  reset, verifyDoc, verifySolicitud, verifySolicitudStatus } from '../../../reducers/Operaciones/altaPre/altaPreSlice';
import styles from './AltaPre.module.css';
import isAfterToday from '../../../helpers/isAfterToday';

const AltaPre = () => {
    const dispatch = useDispatch()
    const { empresaReal, marca, codigoMarca, codigoEmpresa } = useSelector(state => state.login.user)
    const { modelos, sucursales, formasPago, vendedores, 
      puntosventa, oficialesCanje, supervisores, teamleaders, intereses, tarjetas, origen, verifyResult, verifyStatus, 
      modeloValorCuota, modeloPrecios, solicitudesDoc } = useSelector(state => state.AltaPre)
    const [modelosFiltered, setModelosFiltered] = useState([])
    const [interesesFiltered, setInteresesFiltered] = useState([])
    const [tarjetasFiltered, setTarjetasFiltered] = useState([])
    const [error, setError] = useState({})
    const [date, setDate] = useState(new Date())

    const [input, setInput] = useState({
      Solicitud: '',
      FechaAlta: '',
      TipoPlan: '',
      Modelo: '',
      ValorCuotaTerm: '',
      Documento: '',
      DocumentoNro: '',
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
      Precio: 0,
      TotalCuota: '',
      nroRecibo: '',
      nroRecibo2: '',
      Sucursal: '',
      FormaDePago: '',
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
/*       const errors = validateForm(newForm);
      setError(errors); */
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
      "Precio": 1
    })
  }else{
    setInput({
      ...input,
      "Precio": 0
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
    alert('Está ingresando una fecha posterior a la actual. Corrijalo si se trata de un error.')
  }
}

const onBlurDoc = () => {
if(!input.Documento.length || !input.DocumentoNro.length) {
  /* alert('Falta Tipo Documento') */
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
        setError({...error, "EmailParticular": 'Email invalido'})
        setInput({...input, "EmailParticular": ""})
      }else{
        setError({...error, "EmailLaboral": ""})
      }
      
    }
    else if(!input.EmailLaboral && !input.EmailParticular){
      setError({...error, "EmailLaboral": 'Debe ingresar al menos un email'})
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
  if(!input.Importe.length){
    alert('Falta importe')
    setInput({...input, "CantPagos": ""})
  }else{
    setInput({...input, "Interes": (input.Importe * input.CantPagos)/100, "importeAbonado": parseInt(input.Importe) + (input.Importe * input.CantPagos)/100})
  }

}

    useEffect(() => {

      Promise.all([
        dispatch(getModelos()), 
        dispatch(getSucursales()), 
        dispatch(getFromasPago()), 
        dispatch(getVendedores()),
        dispatch(getPuntosVenta()),
        dispatch(getOficialCanje()),
        dispatch(getTeamLeaders()),
        dispatch(getSupervisores()),
        dispatch(getIntereses()),
        dispatch(getTarjetas()),
        dispatch(getOrigenSuscripcion())
      
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
        setModelosFiltered(modelos.data.filter(e => e.TipoPlan === parseInt(input.TipoPlan) && e.Marca === codigoMarca && e.Activo === 1 && e.CuotaTerminal !== null))
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
      if(input.Precio === 0 && Object.keys(modeloPrecios).length){
        setInput({...input, "TotalCuota": modeloPrecios.PrecioA.CuotaACobrar})
      }
      if(input.Precio === 1 && Object.keys(modeloPrecios).length){
        setInput({...input, "TotalCuota": modeloPrecios.PrecioB.CuotaACobrar})
      }

    }, [modeloPrecios, input.Precio])

    useEffect(() => {
      if(parseInt(input.importeAbonado) > parseInt(input.TotalCuota)){
        alert('El valor abonado no puede ser superior al importe total de la cuota')
      }

    }, [input.importeAbonado])
 
    useEffect(() => {
      if(input.Vendedor !== '*'){

        const vendedorSelected = vendedores.status && vendedores.data.find(e => e.Codigo === parseInt(input.Vendedor))
        const supervisoresSelected = input.Vendedor && supervisores?.data.find(e => e.Codigo === vendedorSelected.Sucursal) 
        const teamLeaderSelected = input.Vendedor && teamleaders?.data.find(e => e.Codigo === vendedorSelected.TeamLeader) 
        if(input.Vendedor.length){
  
          setInput({...input, "TeamLeader": `${teamLeaderSelected.Codigo} - ${teamLeaderSelected.Nombre}`, "Supervisor": `${supervisoresSelected.Codigo} - ${supervisoresSelected.Nombre}`})
        }
      }else{
        setInput({...input, "TeamLeader": "", "Supervisor": ""})
      }

    }, [input.Vendedor])

    useEffect(() => {

      if(solicitudesDoc.docStatus?.length){
        alert('El cliente posee la siguiente(s) operacion(es) ' + `${solicitudesDoc.docStatus.map(e => {return `Solicitud: ${e.Solicitud} Empresa: ${e.Empresa}`})}`)
      }

      if(solicitudesDoc.suscriptor?.length){
          let suscriptor = solicitudesDoc.suscriptor[0]
        setInput({...input, "Nombre": suscriptor.Nombres, "Apellido": suscriptor.Apellido, "EmailLaboral": suscriptor.EmailLaboral, 
      "EmailParticular": suscriptor.EmailLaboral, "Calle": suscriptor.Domicilio, "Numero": suscriptor.NumeroCalle, "Piso": suscriptor.Piso,
      "Dto": suscriptor.Dto, "CodPostal": suscriptor.CodPostal, "Localidad": suscriptor.Localidad, "Provincia": suscriptor.Provincia,
      "TelefParticular": suscriptor.Telefonos, "TelefCelular": suscriptor.Telefonos2, "TelefLaboral": suscriptor.Telefonos3, 
      "TelefFamiliar": suscriptor.Telefonos4, "Ocupacion": suscriptor.Ocupacion
      })
      }

    }, [solicitudesDoc])
    
    useEffect(() => {

      if(input.FormaDePago !== '*' && intereses.status) {

          setInteresesFiltered(intereses.data.filter(e => e.MedioCobro === parseInt(input.FormaDePago)))
      }
    }, [input.FormaDePago])


    useEffect(() => {

      if(tarjetas.status){
        setTarjetasFiltered(tarjetas.data.filter(e => e.CodEmpresa === codigoEmpresa && e.EsTarjeta === 1))
      }

    }, [tarjetas])


  return (
    <div style={{ textAlign: '-webkit-center'}}>
        <BiggerTitleLogo>
            <div>
              <span>{empresaReal}</span>
              <ReturnLogo empresa={empresaReal}/>
            </div>
            <TitlePrimary style={{textAlign: 'start'}}>Alta de Pre-Solicitudes ({marca})</TitlePrimary>
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
                  <input name='FechaAlta' onBlur={onBlurFecha} onChange={handleChange} value={input.FechaAlta} type="date" />
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
                    {error.Documento && <div className={styles.error}>{error.Documento}</div>}
                </div>
              </div>              
              <div className={styles.input}>
                    <span>Numero</span>
                    <div className={styles.containerError}>
                    <input type="text" onBlur={onBlurDoc} name='DocumentoNro'  value={input.DocumentoNro} onChange={handleChange} />
                    {error.Documento && <div className={styles.error}>{error.Documento}</div>}
                    </div>
              </div>              
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
                        <span>Numero</span>
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
                        <span>Cod. Postal</span>
                        <div className={styles.containerError}>
                        <input type="number" name="CodPostal"  onBlur={onBlurRequired} value={input.CodPostal} onChange={handleChange}/>
                        {error.CodPostal && <div className={styles.error}>{error.CodPostal}</div>}  
                        </div>
                    </div>
                    <div className={styles.input}>
                        <span>Localidad</span>
                        <input name="Localidad" value={input.Localidad} onChange={handleChange}/>
                    </div>
                    <div className={styles.input}>
                        <span>Provincia</span>
                        <input name="Provincia"   value={input.Provincia} onChange={handleChange}/>
                    </div>

                </div>
              </div>
              <div className={styles.inputSection2}> 
              <div className={styles.input}>
                <span>Telef. Particular</span>
                <div className={styles.containerError}>
                <input type="number" name='TelefParticular' onBlur={onBlurTelef} value={input.TelefParticular} onChange={handleChange}/>
                {error.TelefParticular && <div className={styles.error}>{error.TelefParticular}</div>} 
                </div>
              </div>
              <div className={styles.input}>
                <span>Telef. Celular</span>
                <div className={styles.containerError}>
                <input type="number" name='TelefCelular' onBlur={onBlurTelef} value={input.TelefCelular} onChange={handleChange}/>
                {error.TelefCelular && <div className={styles.error}>{error.TelefCelular}</div>} 
                </div>
              </div>
              </div>
              
              <div className={styles.inputSection2}> 
              <div className={styles.input}>
                <span>Telef. Laboral</span>
                <div className={styles.containerError}>
                <input type="number" name='TelefLaboral' onBlur={onBlurTelef} value={input.TelefLaboral} onChange={handleChange}/>
                {error.TelefLaboral && <div className={styles.error}>{error.TelefLaboral}</div>} 
                </div>
              </div>
              <div className={styles.input}>
                <span>Telef. Familiar</span>
                <div className={styles.containerError}>
                <input type="number" name='TelefFamiliar' onBlur={onBlurTelef} value={input.TelefFamiliar} onChange={handleChange}/>
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
              <div className={styles.inputSection2}>
                    <div className={styles.inputSection2} style={{alignContent: 'center'}}>
                        <div><input type="radio" value={0} defaultChecked onChange={handleCheckPrecio} name="Precio" /> Precio A</div>
                        <div><input type="radio" value={1} onChange={handleCheckPrecio}  name="Precio" /> Precio B</div>
                    </div>
                    <div className={styles.inputSection2} style={{columnGap: '0'}}>
                      <div className={styles.input}>
                        <span>Importe Total Cuota</span> <input type="text" value={input.TotalCuota} name="TotalCuota" onChange={handleChange} />
                      </div>
                   
                      <div className={styles.inputSection2} style={{columnGap: '5px'}}>
                          <div className={styles.input}> 
                            <span>Nro Recibo</span> 
                            <div className={styles.containerError}>
                            <input type="text" onBlur={onBlurRecibo1} minLength={4}  maxLength={4} value={input.nroRecibo} name="nroRecibo" onChange={handleChange} />                        
                           {error.nroRecibo && <div className={styles.error}>{error.nroRecibo}</div>}
                            </div>
                          </div>
                          <div className={styles.input}>
                            <div className={styles.containerError}>
                            <input type="text" onBlur={onBlurRecibo2}  value={input.nroRecibo2} name="nroRecibo2" onChange={handleChange}/>
                            {error.nroRecibo2 && <div className={styles.error}>{error.nroRecibo2}</div>}
                          
                            </div>
                          </div>
                      </div>  
                     </div>
              </div>
              <div className={styles.inputSection2}>
                    <div className={styles.input}>
                      <span>Sucursal</span>
                      <select name="Sucursal" value={input.Sucursal} onChange={handleChange} id="">
                        <option value="*">---</option>
                        {
                          sucursales.status && sucursales.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Nombre}</option>)
                        }
                      </select>
                    </div>
                    <div className={styles.input}>
                        <span>Forma Pago</span>
                        <div className={styles.containerError}>
                        <select name="FormaDePago" value={input.FormaDePago} onBlur={onBlurRequired} onChange={handleChange} id="">
                          <option value="">---</option>
                          {
                            formasPago.status && formasPago.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Nombre}</option>)
                          }
                        </select>
                        {error.FormaPago && <div className={styles.error}>{error.FormaPago}</div>}
                        </div>
                    </div>
              </div>

              <div className={styles.inputSection2}>
                    <div className={styles.input}>
                          <span>Vendedor</span>
                          <div className={styles.containerError}>
                          <select name="Vendedor" value={input.Vendedor} onChange={handleChange} id="">
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
                              <input type="date" name="FechaCancelacionSaldo" value={input.FechaCancelacionSaldo} onChange={handleChange}/>
                            </div>
                      </div>

                    </div>
              </div>
              <div className={styles.inputSection2}>
                  <div className={styles.inputSection2} style={{columnGap: '0'}}>
                      <div className={styles.input}>
                            <span>Team Leader</span>
                            <input type="text" name='TeamLeader' value={input.TeamLeader}/>
                      </div>
                      <div className={styles.input}>
                            <span>Supervisor</span>
                            <input type="text" value={input.Supervisor}/>
                      </div>     
                  </div>
                  <div className={styles.inputSection2} style={{columnGap: '0rem'}}>

                    <div className={styles.input}>
                          <span>Importe</span>
                          <input type="number" name='Importe' value={input.Importe} onChange={handleChange} />
                    </div>
                    <div className={styles.input}>
                            <span>Cant. Pagos</span>
                            <select name="CantPagos" onBlur={onBlurCantPagos} value={input.CantPagos} onChange={handleChange} id="">
                              <option value="*">---</option>
                              {
                                formasPago.status && formasPago.data.find(e => e.Codigo === parseInt(input.FormaDePago))?.EsTarjeta === 1 ? 
                                <option value={0}>1 pago sin interés</option> : null
                              }
                              {
                                interesesFiltered.length && interesesFiltered.map(e => <option value={e.Interes}>{`${e.Cantidad} pagos - ${e.Interes}% interés`}</option>)
                              }
                            </select>
                    </div>      

                  </div>

              </div>

              <div className={styles.inputSection2}>
                      
                      <div className={styles.input}>
                            <span>Puntos de Venta</span>
                            <select name="puntoVenta" value={input.puntoVenta} onChange={handleChange} id="">
                            <option value="*">---</option>
                            {
                            puntosventa.status && puntosventa.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Nombre}</option>)
                            }
                          </select>

                      </div>
                      <div className={styles.inputSection2} style={{columnGap: '0'}}>
                            <div className={styles.input}>
                              <span>Importe Abonado</span>
                              <input type="text" name="importeAbonado" value={input.importeAbonado} onChange={handleChange}  />
                            </div>
                            <div className={styles.input}>
                              <span>Interés</span>
                              <input type="text" name="Interes" value={input.Interes} onChange={handleChange} />
                            </div>

                      </div>

              </div>
            <div className={styles.inputSection2}>
                      <div className={styles.input}>
                            <span>Oficial Plan Canje</span>
                            <select name="OficialCanje" value={input.OficialCanje} onChange={handleChange} id="">
                            <option value="*">---</option>
                            {
                            oficialesCanje.status && oficialesCanje.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Nombre}</option>)
                            }
                          </select>

                      </div> 

                          <div className={styles.inputSection2} style={{columnGap: '0'}}>
                            <div className={styles.input}>
                              <span>Tarjeta</span>
                              {
                                formasPago.status && formasPago.data.find(e => e.Codigo === parseInt(input.FormaDePago))?.EsTarjeta === 1 ? 
                              <select name="Tarjeta" value={input.Tarjeta} onChange={handleChange} id="" style={{width: '9rem'}}>
                                <option value="*">---</option>
                                {
                                  tarjetasFiltered.length && tarjetasFiltered.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                } 
                              </select> : <select disabled></select>
                              }
                            </div>
                            <div className={styles.input}>
                              <span>Nro Tarjeta</span>
                              {
                                formasPago.status && formasPago.data.find(e => e.Codigo === parseInt(input.FormaDePago))?.EsTarjeta === 1 ? 
                                <input type="text" name='nroTarjeta' value={input.nroTarjeta} onChange={handleChange} /> : 
                                <input type="text" disabled />
                              }
                            </div>
                      </div>
              </div>
              <div className={styles.inputSection2}>
                      <div className={styles.input}>
                            <span>Origen Suscripción</span>
                            <div className={styles.containerError}>
                            <select name="origenSuscripcion" value={input.origenSuscripcion} onChange={handleChange} id="">
                            <option value="">---</option>
                            {
                            origen.status && origen.data.map(e => <option key={e.Codigo} value={e.Codigo}>{e.Codigo}-{e.Descripcion}</option>)
                            }
                          </select>
                          {error.origenSuscripcion && <div className={styles.error}>{error.origenSuscripcion}</div>} 
                            </div>

                      </div>
                      <div className={styles.inputSection2} style={{columnGap: '0'}}>
                            <div className={styles.input}>
                              <span>Fecha Cupón</span>
                              <input type="date" name="fechaCupon" value={input.FechaCupon} onChange={handleChange} />
                            </div>
                            <div className={styles.input}>
                              <span>Nro Cupón</span>
                              <input type="text" name="nroCupon" value={input.nroCupon} onChange={handleChange}/>
                            </div>
                      </div>
            </div>

            <div className={styles.inputSection2}>
                   <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
                    <div className={styles.inputCheck}>
                      <span>Deb. Autom.</span>
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
                    
                    </div>         
            </div>

            <div className={styles.inputSection2} style={{marginTop:'2rem', marginBottom:'1rem'}}>

              <div className={styles.input}>
                <span>Lote</span>
                <input type="text" name='lote' value={input.lote} onChange={handleChange} />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}>
                <span>Observaciones: </span>
                <textarea name="observaciones" value={input.observaciones} onChange={handleChange} id="" cols="30" rows="2"></textarea>
              </div>

            </div>

            </div>
            {
              Object.keys(error).length ? 
              <button disabled>Aceptar</button> :
              <button>Aceptar</button> 
            }
          </div>
        
    </div>
  )
}

export default AltaPre
