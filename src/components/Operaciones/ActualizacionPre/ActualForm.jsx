import React, {useEffect} from 'react'
import styles from './ActualPre.module.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import BiggerTitleLogo from '../../../styled-components/containers/BiggerTitleLogo'
import { ReturnLogo } from '../../../helpers/ReturnLogo'
import { useSelector } from 'react-redux'
import TitlePrimary from '../../../styled-components/h/TitlePrimary'
import { useParams } from 'react-router-dom'
import TableContainer from '../../../styled-components/tables/TableContainer'
import { getDatosPreSol, getModelos, getOficialesMora, getOficialesScoring, getOficialesPC,
getOrigenSuscripcion, reset, getParametros, getFormasPago, getTarjetas, getIntereses,
getPuntosVenta, getSenias, pagoSenia} from '../../../reducers/Operaciones/actualPre/actualPreSlice'
import * as BsIcons from 'react-icons/bs'
import FormaPagoItem from './FormaPagoItem'
import Swal from 'sweetalert2';



const ActualForm = () => {
    const dispatch = useDispatch()
    const {empresaReal, marca} = useSelector(state => state.login.user)
    const {modelos, datosOp, oficialesMora, oficialesPC, oficialesScoring, origen, 
        puntos, parametros, formasPago, tarjetas, intereses, seniaStatus, senias} = useSelector(state => state.ActualPre)
    const {codigoVendedor, codigoSucursal, codigoGerente, codigoTeamLeader, roles, 
        PAwebHookAnura, usaWebHookAnura,  codigoEmpresa} = useSelector(state => state.login.user)
    const {codigoMarca, Numero} = useParams()
    const [perfil, setPerfil] = useState('')
    const [valorCuotaEnabled, setValorCuotaEnabled] = useState(false)
    const [totalImpAbonado, setTotalImpAbonado] = useState(0)
    const [isDisabled, setIsDisabled] = useState(false)
    const [verificaNroSol, setVerificaNroSol] = useState(false)
    const [poseeAnura, setPoseeAnura] = useState(false)
    const [tipoDoc, setTipoDoc] = useState(false)
    const [btnConformar, setBtnConformar] = useState(false)
    const [debAutScoring, setDebAutoScoring] = useState(true)
    const [puedeModificarScoring, setPuedeModificarScoring] = useState(false)
    const [esTarjeta, setEsTarjeta]  = useState(false)
    const [interesesFiltered, setInteresesFiltered] = useState([])
    const [isReadOnly, setIsReadOnly] = useState(false)
    const [input, setInput] = useState({
        Solicitud:'',
        Bonificacion: '',
        FechaAlta:'',
        FechaCrucescoring:'',
        CodModelo:'',
        CuotaTerminal:'',
        PasoAOperaciones:'',
        TipoDocumento:'',
        NroDocumento:'',
        ImporteReciboX:'',
        Apellido:'',
        Nombres:'',
        NombreSupervisor:'',
        NomTL:'',
        NomVendedor:'',
        NombreSucReal:'',
        tipoplan: '',
        FechaNac: '',
        nroRecibo1: '',
        nroRecibo2: '',
        EmailParticular: '',
        EmailLaboral: '',
        Domicilio: '',
        NumeroCalle: '',
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
        ContactoAD: '',
        OficialMora: '',
        OficialPC: '',
        OficialScoring: '',
        origensuscripcion: '',
        FechaPrescoring: '',
        EstadoPrescoring: '',
        CodPuntoVenta: '',
        Crucescoring: 0,
        DebitoAutomatico: 0,
        TieneDNI: 0,
        TieneAnexos: 0,
        DebitoAutomaticoscoring: 0,
        PromoEspecial: 0,
        PlanSubite: 0,
        Rec: 0,
        TieneServicio: 0,
        AnuladaCliente: 0,
        FechaIngresoTerminal: '',
        CuotaACobrar: '',
        ImporteTotalCuota: '',
        FechaEstimCancelacion: '',
        Estadoscoring: '',
        FechaIngresoExtraNet: '',
        DomicilioOcupacion: '',
        EntregaUsadoRetiro: ''
    })
    const [nuevoPago, setNuevoPago] = useState(false) 
    const [inputNuevoPago, setInputNuevoPago] = useState({
        accion: 'A',
        codEmpresa: codigoEmpresa,
        codigoMarca: parseFloat(codigoMarca),
        ValorCuota: '',
        impTotalAbonado: '',
        Numero: '',
        Solicitud: '',
        Fecha: '',
        Importe: '',
        Interes: '',
        ImpAbonado: '',
        FormaDePago: '',
        NroRecibo: '',
        FechaVto: '',
        Tarjeta: '',
        NroTarjeta: '',
        NroCupon: '',
        FechaCupon: '',
        Lote: '',
        CantPagos: '',
        cuentaContable: ''
    })


    const handleChange = (e) => {
                
        const {name , value} = e.target
        let valueFormatted;
        if(name === 'Estadoscoring') valueFormatted = parseFloat(value)
        else if(name === 'EstadoPrescoring') valueFormatted = parseFloat(value)
        else valueFormatted = value
        const newForm = {...input,
            [name]: valueFormatted,
          }
          
          setInput(newForm)
      }

    const handleNuevoPago = (e) => {
                
        const {name , value} = e.target

        const newForm = {...inputNuevoPago,
            [name]: value,
          }
          
          setInputNuevoPago(newForm)
      }

      const handleSubmitNuevoPago = () => {
        if(esTarjeta){
            if(!inputNuevoPago.Tarjeta || !inputNuevoPago.NroTarjeta || 
                !inputNuevoPago.NroCupon || !inputNuevoPago.FechaCupon ||
                !inputNuevoPago.Lote || !inputNuevoPago.CantPagos){
                    alert('Completar campos correspondientes a la tarjeta')
                    return
                }
        }
        if(!inputNuevoPago.Fecha || !inputNuevoPago.Importe || !inputNuevoPago.ImpAbonado 
        || !inputNuevoPago.FormaDePago || !inputNuevoPago.NroRecibo){
            alert('Faltan completar campos')
            return
        }else{
            dispatch(pagoSenia(inputNuevoPago))
        }
      }

      const onBlurCantPagos = () => {
        if(inputNuevoPago.Importe.length && interesesFiltered.length){
            if(parseFloat(inputNuevoPago.CantPagos) !== 1){
              const interesSelected = parseFloat(interesesFiltered.find(e => e.Cantidad === parseFloat(inputNuevoPago.CantPagos))?.Interes)
              setInputNuevoPago({...inputNuevoPago, "Interes": (parseFloat(inputNuevoPago.Importe) * parseFloat(interesSelected))/100, "ImpAbonado": parseFloat(inputNuevoPago.Importe) + (inputNuevoPago.Importe * parseFloat(interesSelected))/100})
            }else{
              setInputNuevoPago({...inputNuevoPago, "Interes": 0, "ImpAbonado": inputNuevoPago.Importe})
            }
        }
        else if(inputNuevoPago.Importe.length && !interesesFiltered.length){
          setInputNuevoPago({...inputNuevoPago, "ImpAbonado": parseFloat(inputNuevoPago.Importe)})
        }
      
      }

      
      const onBlurFormaDePago = (e) => {


        setInputNuevoPago({...inputNuevoPago, 
            "cuentaContable": formasPago.status && formasPago.data?.find(e => e.Codigo === parseFloat(inputNuevoPago.FormaDePago)).CuentaContable, 
            "Interes": formasPago.status && formasPago.data?.find(e => e.Codigo === parseFloat(inputNuevoPago.FormaDePago)).EsTarjeta === 1 ? "" : 0, 
            "ImpAbonado": formasPago.status && formasPago.data?.find(e => e.Codigo === parseFloat(inputNuevoPago.FormaDePago)).EsTarjeta === 1 ? "" : inputNuevoPago.Importe})

        
      }



    useEffect(() => { //Primero busco los datos de la operacion
        Promise.all([
            dispatch(getDatosPreSol({codigoMarca: codigoMarca, Numero: Numero})),
            dispatch(getSenias({codigoMarca: codigoMarca, Numero: Numero})), 
            dispatch(getModelos()),
            dispatch(getOficialesMora()),
            dispatch(getOficialesPC()),
            dispatch(getOficialesScoring()),
            dispatch(getOrigenSuscripcion()),
            dispatch(getPuntosVenta()),
            dispatch(getFormasPago()),
            dispatch(getParametros()),
            dispatch(getTarjetas()),
            dispatch(getIntereses())
        ])
        return () => {
            dispatch(reset())
            setInput({
                Numero: '',
                Solicitud:'',
                Bonificacion: '',
                FechaAlta:'',
                FechaCrucescoring:'',
                CodModelo:'',
                CuotaTerminal:'',
                PasoAOperaciones:'',
                TipoDocumento:'',
                NroDocumento:'',
                ImporteReciboX:'',
                Apellido:'',
                Nombres:'',
                NombreSupervisor:'',
                NomTL:'',
                NomVendedor:'',
                NombreSucReal:'',
                tipoplan: '',
                FechaNac: '',
                nroRecibo1: '',
                nroRecibo2: '',
                EmailParticular: '',
                EmailLaboral: '',
                Domicilio: '',
                NumeroCalle: '',
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
                ContactoAD: '',
                OficialMora: '',
                OficialPC: '',
                OficialScoring: '',
                origensuscripcion: '',
                FechaPrescoring: '',
                EstadoPrescoring: '',
                CodPuntoVenta: '',
                Crucescoring: 0,
                DebitoAutomatico: 0,
                TieneDNI: 0,
                TieneAnexos: 0,
                DebitoAutomaticoscoring: 0,
                PromoEspecial: 0,
                PlanSubite: 0,
                Rec: 0,
                TieneServicio: 0,
                AnuladaCliente: 0,
                FechaIngresoTerminal: '',
                CuotaACobrar: '',
                ImporteTotalCuota: '',
                FechaEstimCancelacion: '',
                Estadoscoring: '',
                FechaIngresoExtraNet: '',
                DomicilioOcupacion: '',
                EntregaUsadoRetiro: ''
            })
        }
    }, [])

    useEffect(() => {
        if(parametros.status){
            if(parametros.data.soli === 1){
                setVerificaNroSol(true)
            }

            if(parametros.data.sanu === 1){
                setPoseeAnura(true)
                if(PAwebHookAnura === 1 && !usaWebHookAnura){
                    alert("No está activado el evento para grabar llamadas para su usuario")
                }
            }
        
        }

    }, [parametros])

    useEffect(() => {

        if( datosOp.length && ( (codigoVendedor && codigoVendedor !== datosOp[0]?.Vendedor) || 
        (codigoTeamLeader && codigoTeamLeader !== datosOp[0].CodTL) || (codigoSucursal && codigoSucursal !== datosOp[0].CodSupervisor) )){
            alert('No tiene permiso para realizar esta acción')
            
        }else{
            if(roles.find(e => e.rl_codigo === '1.2.2.0')) setIsDisabled(true) //ROL SOLO LECTURA
            if(roles.find(e => e.rl_codigo === '1.2.2.8')) setPerfil('Op_Scoring')
            if(roles.find(e => e.rl_codigo === '1.2.2.9')) setPerfil('Sup_Comercial')
            if(roles.find(e => e.rl_codigo === '1.2.2.10')) setPerfil('Sup_Scoring')
            if(datosOp[0]?.PasoAoperaciones === 1){
                setIsReadOnly(true)
                setTipoDoc(true)
                setBtnConformar(true)
            }
            if(datosOp[0]?.EstadoPrescoring === 0){
                setPuedeModificarScoring(true)
            }

            setInput({
                Numero: datosOp[0]?.Numero,
                Solicitud: datosOp[0]?.Solicitud,
                FechaAlta: datosOp[0]?.FechaAlta,
                FechaCrucescoring: datosOp[0]?.FechaCrucescoring,
                CodModelo: datosOp[0]?.CodModelo,
                CuotaTerminal: datosOp[0]?.ValorCuotaTerminalPRE,
                PasoAOperaciones: datosOp[0]?.PasoAoperaciones,
                TipoDocumento: datosOp[0]?.TipoDocumento,
                NroDocumento: datosOp[0]?.NroDocumento,
                ImporteReciboX: datosOp[0]?.ImporteReciboX,
                Apellido: datosOp[0]?.Apellido,
                Nombres: datosOp[0]?.Nombres,
                NombreSupervisor: datosOp[0]?.NombreSupervisor,
                NomTL: datosOp[0]?.NomTL,
                NomVendedor: datosOp[0]?.NomVendedor,
                NombreSucReal: datosOp[0]?.NombreSucReal,
                tipoplan: datosOp[0]?.tipoplan,
                FechaNac: datosOp[0]?.FechaNac?.slice(0,10),
                nroRecibo1: datosOp[0]?.NroReciboX?.slice(0,4),
                nroRecibo2: datosOp[0]?.NroReciboX?.slice(4,12),
                EmailParticular: datosOp[0]?.EmailParticular,
                EmailLaboral: datosOp[0]?.EmailLaboral,
                Domicilio: datosOp[0]?.Domicilio,
                NumeroCalle: datosOp[0]?.NumeroCalle,
                Piso: datosOp[0]?.Piso,
                Dto: datosOp[0]?.Dto,
                CodPostal: datosOp[0]?.CodPostal,
                Localidad: datosOp[0]?.Localidad,
                Provincia: datosOp[0]?.Provincia,
                TelefParticular: datosOp[0]?.Telefonos,
                TelefCelular: datosOp[0]?.Telefonos2,
                TelefLaboral: datosOp[0]?.Telefonos3,
                TelefFamiliar: datosOp[0]?.Telefonos4,
                Ocupacion: datosOp[0]?.Ocupacion,
                OficialMora: datosOp[0]?.OficialMora,
                OficialPC: datosOp[0]?.OficialPC,
                OficialScoring: datosOp[0]?.Oficialscoring,
                origensuscripcion: datosOp[0]?.origensuscripcion,
                FechaPrescoring: datosOp[0]?.FechaPrescoring?.slice(0,10),
                EstadoPrescoring: datosOp[0]?.EstadoPrescoring,
                CodPuntoVenta: datosOp[0]?.CodPuntoVenta,
                Crucescoring: datosOp[0]?.Crucescoring,
                DebitoAutomatico: datosOp[0]?.DebitoAutomatico,
                TieneDNI: datosOp[0]?.TieneDNI,
                TieneAnexos: datosOp[0]?.TieneAnexos,
                DebitoAutomaticoscoring: datosOp[0]?.DebitoAutomaticoscoring,
                PromoEspecial: datosOp[0]?.PromoEspecial,
                PlanSubite: datosOp[0]?.PlanSubite,
                Rec: datosOp[0]?.Rec,
                TieneServicio: datosOp[0]?.TieneServicio,
                AnuladaCliente: datosOp[0]?.AnuladaCliente,
                FechaIngresoTerminal: datosOp[0]?.FechaIngresoTerminal?.slice(0,10),
                ImporteTotalCuota: datosOp[0]?.ImporteTotalCuota,
                CuotaACobrar: datosOp[0]?.CuotaACobrar,
                ImporteTotalCuota: datosOp[0]?.ImporteTotalCuota,
                FechaEstimCancelacion: datosOp[0]?.FechaEstimCancelacion,
                Estadoscoring: datosOp[0]?.Estadoscoring,
                FechaIngresoExtraNet: datosOp[0]?.FechaIngresoExtraNet,
                DomicilioOcupacion: datosOp[0]?.DomicilioOcupacion,
                EntregaUsadoRetiro: datosOp[0]?.EntregaUsadoRetiro
            })


            setInputNuevoPago({
                ...inputNuevoPago,
                Numero: datosOp[0]?.Numero,
                Solicitud: datosOp[0]?.Solicitud,
                ValorCuota: parseFloat(datosOp[0]?.ImporteTotalCuota),
                impTotalAbonado: totalImpAbonado
            })

        }
    }, [datosOp[0]])

    useEffect(() => {
        setTotalImpAbonado(senias.reduce((total, array) => 
        isNaN((parseFloat(array.ImpoSenia)) ? 0 : parseFloat(array.ImpoSenia) * isNaN(parseFloat(array.Interes)) ? 0 : 
        parseFloat(array.Interes)/100) + isNaN(parseFloat(array.ImpoSenia)) ? 0 : parseFloat(array.ImpoSenia)  + total,0))
    }, [senias])

    useEffect(() => {
        if(perfil === 'Sup_Scoring'){
            setDebAutoScoring(false)
        }
    }, [perfil])

    useEffect(() => {
        if(formasPago.data?.find(e => e.Codigo === parseFloat(inputNuevoPago.FormaDePago))?.EsTarjeta === 1 ){
            
            setEsTarjeta(true) 
        }else{

            setEsTarjeta(false)

        }

        
      if(inputNuevoPago.FormaDePago  && intereses.status) {

        setInteresesFiltered(intereses.data.filter(e => e.MedioCobro === parseFloat(inputNuevoPago.FormaDePago)))
        
    }

    setInputNuevoPago({
        ...inputNuevoPago,
        Interes: '',
        ImpAbonado: ''
    })


    }, [inputNuevoPago.FormaDePago])

    useEffect(() => {
        if(!esTarjeta){
            setInputNuevoPago({
                ...inputNuevoPago,
                Tarjeta: '',
                NroTarjeta: '',
                NroCupon: '',
                FechaCupon: '',
                Lote: '',
                CantPagos: ''
            })
        }



    }, [esTarjeta])

    useEffect(() => {
        setNuevoPago(false)
        if(typeof seniaStatus === 'object' && Object.keys(seniaStatus).includes('status')){
          if(seniaStatus.status){
            Swal.fire({
              icon: 'success',
              title: seniaStatus.data,
            }).then(() => {
                dispatch(getSenias({codigoMarca: codigoMarca, Numero: Numero}))
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: seniaStatus.data,
            })
          }
        }

      }, [seniaStatus])

  


  return (
    <div>
            <BiggerTitleLogo>
            <div>
              <span>{empresaReal}</span>
              <ReturnLogo empresa={empresaReal}/>
            </div>
            <TitlePrimary style={{textAlign: 'start'}}>Actualización de Pre-Solicitudes ({marca})</TitlePrimary>
          </BiggerTitleLogo>

          <div>
          <fieldset disabled={isDisabled}>

            <div className={styles.formSectionContainer}>
                <h4>Datos Generales</h4>
                <div className={styles.formSection4x3}>
                    <div className={styles.section}>
                    <div className={styles.formItem}>
                    <span>Código Interno</span>
                   
                        <input type="text" disabled value={input.Numero} />
                    

                    </div>
                    </div>
                    <div className={styles.section} style={{columnGap:'1rem'}}>
                        <div className={styles.formItem}>
                        <span>Solicitud</span>
                        <input type="text" disabled={isReadOnly} value={input.Solicitud} />
                        </div>
                        <div className={styles.formItem}>
                        <span>Fecha Alta</span>
                        <input type="date" disabled={isReadOnly} value={input.FechaAlta?.slice(0,10)} />
                        </div>
                        


                    </div>

                    <div className={styles.section} style={{ columnGap:'1rem'}}>
    
                        <div className={styles.formItemCheck}>
                            <input type="checkbox" disabled={input.FechaIngresoTerminal ? false : true} size={2} 
                            checked={input.FechaIngresoTerminal ? true : false}/>
                            <span>Ingresada en la terminal</span>
                        </div>


                        <div className={styles.formItemCheck}>
                            <input type="checkbox" className={styles.checkboxAnulada} style={{color: 'red'}} size={2} disabled={isReadOnly} 
                            checked={input.AnuladaCliente === 1 ? true : false}/>
                            <span style={{color: input.AnuladaCliente === 1 && 'red'}}>Anulada</span>
                        </div>
                        <div className={styles.formItemCheck}>
                            <input type="checkbox" disabled={input.AnuladaCliente === 1 ? false : isReadOnly} size={2} checked={input.Crucescoring === 1 ? true : false}/>
                            <span>Cruce Scoring</span>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Fecha</span>
                            <input type="date" disabled={isReadOnly} value={input.FechaCrucescoring}/>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Modelo</span>
                            <select style={{width: '12rem'}} disabled={isReadOnly} value={input.CodModelo} name="" id="">
                                <option>---</option>
                                {
                                    modelos.length && modelos.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Tipo Plan</span>
                            <select value={input.tipoplan} onChange={handleChange}  name="tipoplan" id="">
                                <option value="">---</option>
                                <option value={1}>100%</option>
                                <option value={2}>70/30</option>
                                <option value={3}>60/40</option>
                                <option value={4}>75/25</option>
                                <option value={5}>80/20</option>
                                <option value={6}>90/10</option>
                            </select>     
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Cuota Terminal</span>
                            <input type="text" style={{textAlignLast: 'right'}} disabled={isReadOnly} value={input.CuotaTerminal} />
                        </div>
                    </div>
                    <div className={styles.section}>
                        {
                            input.PasoAOperaciones === 1 ? <h5 style={{color: 'green', alignSelf: 'center'}}>Conformada</h5> : 
                            <h5 style={{color: 'red', alignSelf: 'center'}}>Sin Conformar</h5>
                        }
                    </div>
                    <div className={styles.formItem}>
                        <span>Fecha Ingresada Terminal</span>
                        <input type="date" value={input.FechaIngresoTerminal}/>
                    </div>
                </div>
                <h4>Datos del suscriptor</h4>
                <div className={styles.formSection4x4}>
                    <div className={styles.section} style={{columnGap: '0.5rem'}}>
                        <div className={styles.formItem}>
                            <span>Documento</span>
                            <select name="Documento" style={{height: '1.6rem'}} disabled={btnConformar} 
                            value={input.TipoDocumento} id="">
                                <option value="">---</option>
                                <option value={1}>DNI</option>
                                <option value={2}>LE</option>
                                <option value={3}>LC</option>
                                <option value={4}>CI</option>
                                <option value={5}>PAS</option>
                                <option value={6}>CUIT</option>
                            </select>
                        </div>
                        <div className={styles.formItem}>
                            <span>Número</span>
                            <input value={input.NroDocumento} disabled type="text" />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Fecha Nacimiento</span>
                            <input type="date" value={input.FechaNac} name="FechaNac" onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem} >
                            <span>Recibo X</span>
                            <div style={{display: 'flex', columnGap: '.5rem'}} >
                            <input size={4} type="text" value={input.nroRecibo1} name="nroRecibo1" onChange={handleChange}/>
                            <input size={8} type="text" value={input.nroRecibo2} name="nroRecibo2" onChange={handleChange}/>

                            </div>
                        </div>

                    </div>
                    <div className={styles.section} style={{columnGap: '.5rem'}}>
                        <div className={styles.formItem}>
                            <span>Importe</span>
                            <input disabled type="text" style={{textAlignLast: 'right'}} value={input.ImporteReciboX}/>
                        </div>
                        <div className={styles.formItemCheck}>
                            <input type="checkbox" checked={(!datosOp[0]?.EmailLaboral && !datosOp[0]?.EmailParticular) ? true : false }/>
                            <span>No tiene Email</span>
                        </div>

                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Apellido</span>
                            <input disabled={isReadOnly} value={input.Apellido} type="text" />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Nombre</span>
                            <input value={input.Nombres} name="Nombres" onChange={handleChange} disabled={isReadOnly} type="text" />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Email Particular</span>
                            <input name='EmailParticular' disabled={(!datosOp[0]?.EmailLaboral && !datosOp[0]?.EmailParticular) ? true : false} value={input.EmailParticular} onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Email Laboral</span>
                            
                                <input name='EmailLaboral' disabled={(!datosOp[0]?.EmailLaboral && !datosOp[0]?.EmailParticular) ? true : false} value={input.EmailLaboral} onChange={handleChange} type="text" />
                            
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Calle</span>
                            <input type="text" value={input.Domicilio} name="Domicilio" onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.section} style={{columnGap: '.5rem'}}>
                        <div className={styles.formItem}>
                            <span>Número</span>
                            <input size={8} type="text" value={input.NumeroCalle} name="NumeroCalle" onChange={handleChange}/>
                        </div>
                        <div className={styles.formItem}>
                            <span>Piso</span>
                            <input size={2} type="text" value={input.Piso} name="Piso" onChange={handleChange}/>
                        </div>
                        <div className={styles.formItem}>
                            <span>Dto.</span>
                            <input size={2} type="text" value={input.Dto} name="Dto" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={styles.section} style={{columnGap: '.5rem'}}>
                        <div className={styles.formItem}>
                            <span>Cód. Postal</span>
                            <input size={5} type="text" value={input.CodPostal} name="CodPostal" onChange={handleChange}/>
                        </div>
                        <div className={styles.formItem}>
                            <span>Localidad</span>
                            <input type="text" value={input.Localidad} name="Localidad" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={styles.section}>
                    <div className={styles.formItem}>
                            <span>Provincia</span>
                            <input type="text" value={input.Provincia} name="Provincia" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className={styles.section}>
                    <div className={styles.formItem}>
                            <span>Telefono Particular</span>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                            <input type="text" value={input.TelefParticular} name="TelefParticular" onChange={handleChange}/>
                            <button className={styles.submitButton} style={{marginLeft:'1rem'}}>Llamar</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                    <div className={styles.formItem}>
                            <span>Telefono Celular</span>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                            <input type="text" value={input.TelefCelular} name="TelefCelular" onChange={handleChange}/>
                            <button className={styles.submitButton} style={{marginLeft:'1rem'}}>Llamar</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                    <div className={styles.formItem}>
                            <span>Telefono Laboral</span>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                            <input type="text" value={input.TelefLaboral} name="TelefLaboral" onChange={handleChange}/>
                            <button className={styles.submitButton} style={{marginLeft:'1rem'}}>Llamar</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                    <div className={styles.formItem}>
                            <span>Telefono Familiar</span>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                            <input type="text" value={input.TelefFamiliar} name="TelefFamiliar" onChange={handleChange}/>
                            <button className={styles.submitButton} style={{marginLeft:'1rem'}}>Llamar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.formSection1x2}>
                <div className={styles.section}>
                    <div className={styles.formItem}>
                            <span>Ocupación</span>
                            <div style={{display: 'flex'}}>

                            <input type="text"  value={input.Ocupacion} 
                            name="Ocupacion" onChange={handleChange}/>
                            
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Contacto AD</span>
                            <div style={{display: 'flex'}}>

                            <input type="text"  value={input.DomicilioOcupacion} 
                            name="DomicilioOcupacion" onChange={handleChange}/>
                            
                            </div>
                        </div>
                    </div>
                </div>
                <h4>Datos de la operación</h4>
                <div className={styles.formSection1x1}>
                    <div className={styles.formSection1x2}>
                        <div className={styles.formSection2x8}> 
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Sucursal</span>
                                <div style={{display: 'flex'}}>

                                <input type="text"  value={input.NombreSucReal} 
                                name="Sucursal" disabled={isReadOnly} />
                            
                                </div>
                                </div>                               
                            </div>
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Vendedor</span>
                                <div style={{display: 'flex'}}>

                                <input type="text"  value={input.NomVendedor} 
                                name="Vendedor" disabled={isReadOnly}/>
                            
                                </div>
                                </div>                               
                            </div>
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Oficial Mora</span>
                                <div style={{display: 'flex'}}>
                                {
                                    input.OficialMora ? 
                                    <select   name="OficialMora" id="" value={input.OficialMora} disabled>
                                        {
                                            oficialesMora.length && oficialesMora.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                        }
                                    </select> :                                    
                                    <select  name="OficialMora" id="" value={input.OficialMora} onChange={handleChange}>
                                        <option value="">---</option>
                                        {
                                            oficialesMora.length && oficialesMora.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                        }
                                    </select>  
                                    
                                }
                            
                                </div>
                                </div>                               
                            </div>
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Team Leader</span>
                                <div style={{display: 'flex'}}>

                                <input type="text"  value={input.NomTL} 
                                name="TeamLeader" disabled/>
                            
                                </div>
                                </div>                               
                            </div>
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Oficial Scoring</span>
                                <div style={{display: 'flex'}}>

                                {
                                    input.OficialScoring ? 
                                    <select  name="OficialScoring" id="" value={input.OficialScoring} disabled>
                                        {
                                            oficialesScoring.length && oficialesScoring.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                        }
                                    </select> :                                    
                                    <select  name="OficialScoring" id="" value={input.OficialScoring} onChange={handleChange}>
                                        <option value="">---</option>
                                        {
                                            oficialesScoring.length && oficialesScoring.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                        }
                                    </select>  
                                    
                                }
                            
                                </div>
                                </div>                               
                            </div>
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Supervisor</span>
                                <div style={{display: 'flex'}}>

                                <input type="text"  value={input.NombreSupervisor} 
                                name="Supervisor" disabled/>
                            
                                </div>
                                </div>                               
                            </div>
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Oficial Plan Canje</span>
                                <div style={{display: 'flex'}}>

                                {
                                    input.OficialPC ? 
                                    <select  name="OficialPC" id="" value={input.OficialPC} disabled={isReadOnly}>
                                        <option>---</option>
                                        {
                                            oficialesPC.length && oficialesPC.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                        }
                                    </select> :                                    
                                    
                                    <select  name="OficialPC" id="" value={input.OficialPC} onChange={handleChange}>
                                        <option>---</option>
                                        {
                                            oficialesPC.length && oficialesPC.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                        }
                                    </select> 
                                    
                                }
                            
                                </div>
                                </div>                               
                            </div>
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Origen Suscripción</span>
                                <div style={{display: 'flex'}}>

                                {
                                   input.origensuscripcion ? 
                                    <select  name="origensuscripcion" id="" disabled={isReadOnly} 
                                    value={input.origensuscripcion}>
                                        <option value="">---</option>
                                        {
                                            origen.length && origen.map(e => <option value={e.Codigo}>{e.Descripcion}</option>)
                                        }
                                    </select> :                                    
                                    
                                    <select  name="origensuscripcion" id="" value={input.origensuscripcion} onChange={handleChange}>
                                        <option value="">---</option>
                                        {
                                            origen.length && origen.map(e => <option value={e.Codigo}>{e.Descripcion}</option>)
                                        }
                                    </select> 
                                    
                                }
                            
                                </div>
                                </div>                               
                            </div>
                            
                               <div className={styles.section}>
                                    <div className={styles.formItem}>
                                        <span>Punto de Venta</span>
                                        <select name="CodPuntoVenta" disabled={isReadOnly} value={input.CodPuntoVenta} id="">
                                            <option value="">---</option>
                                            {
                                                puntos.length && puntos.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.formItem}>
                                            <span>Transf.</span>
                                            <div style={{display: 'flex'}}>

                                            <input type="text" disabled={isReadOnly} value={input.NombreSupervisor} 
                                            name="Supervisor"/>
                            
                                            </div>
                                </div> 
                                 

                                <div className={styles.section}>
                                    <div className={styles.formSection1x2} style={{columnGap: '5.5rem'}}>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" disabled={isReadOnly} 
                                            style={{accentColor: input.TieneDNI === 1 && 'green'}}
                                            checked={input.TieneDNI === 1 ? true : false}/>
                                            <span style={{color: input.TieneDNI === 1 && 'green'}}>DNI</span>
                                        </div>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" disabled={isReadOnly} 
                                            style={{accentColor: input.TieneServicio === 1 && 'green'}}
                                            checked={input.TieneServicio === 1 ? true : false}/>
                                            <span style={{color: input.TieneServicio === 1 && 'green'}}>Mail</span>
                                        </div>
                                    </div>
                                </div> 
                                <div className={styles.section}>
                                    <div className={styles.formSection1x2}>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" disabled={isReadOnly}
                                            style={{accentColor: input.TieneAnexos === 1 && 'green'}} 
                                            checked={input.TieneAnexos === 1 ? true : false}/>
                                            <span style={{color: input.TieneAnexos=== 1 && 'green'}}>Anexos</span>
                                        </div>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" disabled={perfil === 'Sup_Scoring' ? debAutScoring : isReadOnly} checked={input.DebitoAutomaticoscoring === 1 ? true : false}/>
                                            <span>Déb. Aut. Scoring</span>
                                        </div>
                                    </div>
                                </div> 
                                <div className={styles.section}>
                                    <div className={styles.formSection1x2} style={{columnGap: '3rem'}}>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" disabled={isReadOnly} checked={input.PlanSubite === 1 ? true : false}/>
                                            <span>Plan Subite</span>
                                        </div>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" disabled={isReadOnly} checked={input.Rec === 1 ? true : false}/>
                                            <span>Rec</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.section}>
                                    <div className={styles.formSection1x2} style={{columnGap: '0rem'}}>

                                 <div className={styles.section}>
                                    <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                    fontSize: '12px', alignItems: 'center'}}>
                                        <input type="checkbox" checked={input.DebitoAutomatico === 1 ? true : false}/>
                                        <span>Déb. Aut.</span>
                                    </div>
                                </div> 

                                    </div>
                                </div>
                            
                                <div className={styles.section}>
                                        <div className={styles.formItem} style={{alignSelf: 'center'}}>     
                                        <button className={styles.submitButton}>Scoring {datosOp[0]?.Completoscoring === 1 ? '(COMPLETO)' : '(PENDIENTE)'}</button>
                                        </div>
                                </div>

                                <div className={styles.section}>
                                        <div className={styles.formItem}>
                                            <span>Entrega Usado</span>
                                            <div style={{display: 'flex'}}>
                                            <select  name="EntregaUsadoRetiro" value={input.EntregaUsadoRetiro} 
                                            onChange={handleChange} id="">
                                                <option value={0}>---</option>
                                                <option value={1}>Si</option>
                                                <option value={2}>No</option>
                                                <option value={3}>Llave x Llave</option>
                                            </select>
                            
                                            </div>
                                        </div>
                                </div>
                                <div className={styles.section}>
                                    <div className={styles.formSection1x2} style={{margin: 0}}>
                                        <div className={styles.formItem}>
                                            <span>Valor Cuota</span>
                                            <div style={{display: 'flex'}}>

                                                
                                                <input type="text" style={{textAlignLast: 'right'}} value={input.CuotaACobrar}  
                                                name="CuotaACobrar" disabled={valorCuotaEnabled}/>  
                                                

                                            {
                                                roles && roles.find(e => e.rl_codigo === "1.2.2.12") ? 
                                            <button className={styles.submitButton} 
                                            onClick={() => setValorCuotaEnabled(!valorCuotaEnabled)}
                                            style={{width:'2rem'}}>
                                                <BsIcons.BsPencilFill/>
                                            </button> :                                            
                                            <button className={styles.submitButton} disabled={isReadOnly}
                                            onClick={() => setValorCuotaEnabled(!valorCuotaEnabled)}
                                            style={{width:'2rem'}}>
                                                <BsIcons.BsPencilFill/>
                                            </button> 
                                            
                                            }
                            
                                            </div>
                                        </div>
                                        {
                                            roles && roles.find(e => e.rl_codigo === "1.2.2.13") ? 
                                            <div className={styles.formItem}>
                                                <span>Bonificación</span>
                                                <div style={{display: 'flex'}}>

                                                <input type="text" value={input.Bonificacion} disabled={isReadOnly} 
                                                 
                                                name="Bonificacion"/>
                                
                                                </div>
                                            </div>
                                            : 
                                            null
                                        }


                                    </div>
                                </div>
                                <div className={styles.section}>
                                        <div className={styles.formItem}>
                                            <span>Fecha Estimada Canc. Saldo</span>
                                            <div style={{display: 'flex'}}>

                                            <input type="date" value={input.FechaEstimCancelacion?.slice(0,10)}  
                                            name="FechaEstimCancelacion" disabled={isReadOnly}/>
                            
                                            </div>
                                        </div>
                                </div>

                                <div className={styles.section}>
                                        <div className={styles.formItem}>
                                            <span>Importe Abonado</span>
                                            <div style={{display: 'flex'}}>
                                                {
                                                    input.Numero ?  /* pregunta por si se cargo el input en caso de que no esté autorizado */
                                                    <input type="text" style={{textAlignLast: 'right'}} value={senias.reduce((total, array) => 
                                                    (parseFloat(array.ImpoSenia) * isNaN(parseFloat(array.Interes)) ? 0 : parseFloat(array.Interes)/100) + parseFloat(array.ImpoSenia) + total,0)}  
                                                     
                                                    name="impAbonado" disabled={isReadOnly}/>
                                                    :
                                                    <input type="text" disabled />
                                                }
                            
                                            </div>
                                        </div>
                                </div>
                                <div className={styles.section}>
                                        <div className={styles.formItem}>
                                            <span>Importe Total Cuota</span>
                                            <div style={{display: 'flex'}}>

                                            <input type="text" style={{textAlignLast: 'right'}} value={input.ImporteTotalCuota}   
                                            name="ImporteTotalCuota" disabled/>
                            
                                            </div>
                                        </div>
                                </div>
                        </div>
                      
                        <div className={styles.formSection2x1}>  
                       
                            <div className={styles.sectionScoring} style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    
                            }}> {(totalImpAbonado - input.CuotaACobrar) === 0 ? <h5 style={{color: 'green'}}>Cancelada</h5>  : <h5 style={{color: 'red'}}>Sin Cancelar</h5>}
                                <span className={styles.scoringTitle}>Pre Scoring</span>
                                <div className={styles.formSection1x2}>
                                    <div className={styles.formItem}>
                                    <span>Fecha</span>
                                    <input type="date" value={input.FechaPrescoring} disabled={isReadOnly} onChange={handleChange}/>
                                    </div>
                                
                                    <div style={{fontSize: '13px'}}>
                                        <fieldset disabled={isReadOnly}>
                                        <div>
                                        <div style={{display: 'flex'}}>
                                            <input type="radio" name='EstadoPrescoring' value={0} 
                                            checked={input.EstadoPrescoring === 0 && true} onChange={handleChange} />
                                            <span>Pendiente</span>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                            <input type="radio" name='EstadoPrescoring' value={1} 
                                            checked={input.EstadoPrescoring === 1 && true} onChange={handleChange} />
                                            <span>Rechazado Leve</span>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                            <input type="radio" name='EstadoPrescoring' value={3} 
                                            checked={input.EstadoPrescoring === 3 && true} onChange={handleChange} />
                                            <span>Rechazado Grave</span>
                                        </div>

                                        </div>

                                        </fieldset>

                                        <fieldset disabled={isReadOnly}>

                                        <div>
                                        <div style={{display: 'flex'}}>
                                            <input type="radio" name='EstadoPrescoring' value={4} 
                                            checked={input.EstadoPrescoring === 4 && true} onChange={handleChange} />
                                            <span>Rechazo Definitivo</span>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                            <input type="radio" name='EstadoPrescoring' value={5} 
                                            checked={input.EstadoPrescoring === 5 && true} onChange={handleChange} />
                                            <span>Inubicable</span>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                            <input type="radio" name='EstadoPrescoring' value={2} 
                                            checked={input.EstadoPrescoring === 2 && true} onChange={handleChange} />
                                            <span>Ok</span>
                                        </div>

                                        </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.sectionScoring} style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                   
                            }}>
                                <span className={styles.scoringTitle}>Scoring Terminal</span>
                                <div className={styles.formSection1x2}>
                                    <div className={styles.formItem}>
                                    <span>Fecha</span>
                                    <input type="date" disabled={isReadOnly} 
                                    value={input.FechaIngresoExtraNet?.slice(0,10)} onChange={handleChange}/>
                                    </div>
                                    <fieldset disabled={isReadOnly}>
                                    <div style={{fontSize: '13px'}}>
                                        <div>
                                        <div style={{display: 'flex'}}>
                                            <input type="radio" name='Estadoscoring' value={0} 
                                            checked={input.Estadoscoring === 0 && true} onChange={handleChange}/>
                                            <span>Pendiente</span>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                            <input type="radio" name='Estadoscoring' value={1} 
                                            checked={input.Estadoscoring === 1 && true} onChange={handleChange}/>
                                            <span>Rechazado</span>
                                        </div>


                                        </div>
                                        <div>

                                        <div style={{display: 'flex'}}>
                                            <input type="radio" name='Estadoscoring' value={2} 
                                            checked={input.Estadoscoring === 2 && true} onChange={handleChange}/>
                                            <span>Ok</span>
                                        </div>

                                        </div>
                                    </div>

                                    </fieldset>
                                </div>
                            </div>


                        </div>

                    </div>                         
                </div>
                            {
                                input.Numero ?  /* pregunta por si se cargo el input en caso de que no esté autorizado */
                            <TableContainer style={{display:'block', overflow: 'auto'}}> 
                            <table style={{display: 'block', overflowX: 'auto',overflowY: 'auto', fontSize: '15px', marginTop: '2rem'}}>
                            <span><b>Señas y pagos posteriores</b></span>
                                <tr>
                                    <td></td>
                                    <td><b>Fecha</b> </td>
                                    <td><b>Importe</b> </td>
                                    <td><b>Forma de Pago</b> </td>
                                    <td><b>Interés</b> </td>
                                    <td><b>Imp. Abonado</b> </td>
                                    <td><b>Recibo Nº</b> </td>
                                    <td><b>F. Vto.</b> </td>
                                    <td><b>Tarjeta</b> </td>
                                    <td><b>Nro Tarjeta</b> </td>
                                    <td><b>Cupon</b> </td>
                                    <td><b>Fecha Cupon</b> </td>
                                    <td><b>Lote</b> </td>
                                    <td><b>Cant Pagos</b> </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                {
                                    senias && senias.map(e => 
                                        <FormaPagoItem 
                                        ID={e.ID}
                                        CuotaACobrar={e.CuotaACobrar}
                                        Tarjeta={e.CodTarjeta}
                                        NroTarjeta={e.NroTarjeta}
                                        Cupon={e.NroCupon}
                                        FechaCupon={e.FechaCupon}
                                        Lote={e.Lote}
                                        CantPagos={e.Cantpagos}
                                        FechaSenia={e.FechaSenia} 
                                        ImpoSenia={e.ImpoSenia}
                                        Interes={e.Interes}
                                        NomFormaPago={e.NomFormaPago}
                                        NroRecibo={e.NroRecibo}
                                        CodFormaDePago={e.CodFormaPago}
                                        FechaCheque={e.FechaCheque}
                                        isReadOnly={isReadOnly}
                                        />)
                                }
                                {
                                    nuevoPago &&
                                    <tr>
                                    <td></td>
                                    <td><input type="date" value={inputNuevoPago.Fecha} onChange={handleNuevoPago} name="Fecha"/></td>
                                    <td><input type="text" value={inputNuevoPago.Importe} size={5} onChange={handleNuevoPago} name="Importe"/></td>
                                    <td>
                                        <select name="FormaDePago" 
                                        style={{width: '7rem'}}
                                        onBlur={onBlurFormaDePago}
                                         value={inputNuevoPago.FormaDePago} onChange={handleNuevoPago} id="">
                                            <option value="">---</option>
                                            {
                                                formasPago.status && formasPago.data.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                            }
                                        </select>
                                    </td>
                                    <td><input type="text" value={inputNuevoPago.Interes} disabled 
                                    size={5} onChange={handleNuevoPago} name="Interes"/></td>
                                    <td><input type="text" value={inputNuevoPago.ImpAbonado} disabled size={5} onChange={handleNuevoPago} name="ImpAbonado"/></td>
                                    <td><input type="text" value={inputNuevoPago.NroRecibo} size={12} name="NroRecibo" onChange={handleNuevoPago}/></td>
                                    <td><input type="date" value={inputNuevoPago.FechaVto} name="FechaVto" onChange={handleNuevoPago} /></td>
                                    <td>{esTarjeta && <select name="Tarjeta" onChange={handleNuevoPago} value={inputNuevoPago.Tarjeta} id="">
                                    <option value="">---</option>
                                    {
                                        tarjetas.data.length && tarjetas.data.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                    } </select>}</td>
                                    <td>{esTarjeta && <input type="text" name='NroTarjeta' onChange={handleNuevoPago} value={inputNuevoPago.NroTarjeta} size={12} /> }</td>
                                    <td>{esTarjeta && <input type="text" name='NroCupon' onChange={handleNuevoPago} value={inputNuevoPago.NroCupon} size={5} /> }</td>
                                    <td>{esTarjeta && <input type="date" name='FechaCupon' onChange={handleNuevoPago} value={inputNuevoPago.FechaCupon} /> }</td>
                                    <td>{esTarjeta && <input type="text" size={5} name='Lote' onChange={handleNuevoPago} value={inputNuevoPago.Lote} /> }</td>
                                    <td>{esTarjeta && <select name="CantPagos" onChange={handleNuevoPago} onBlur={onBlurCantPagos} value={inputNuevoPago.CantPagos} id="">
                                        <option value="">---</option>
                                        <option value={1}>1 pago sin interés</option>
                                    {
                                        interesesFiltered.length && interesesFiltered.map(e => 
                                            <option value={e.Cantidad}>{`${e.Cantidad} pagos - ${e.Interes}% interés`}</option>)
                                        }   </select>}</td>
                                    <td><button className={styles.submitButton} onClick={handleSubmitNuevoPago}>Guardar</button></td>
                                    </tr>
                                }

                                {
                                    <tr style={{
                                        background: '#0000005c',
                                        color: 'white'
                                    }}>
                                        <td>TOTAL</td>
                                        <td></td>
                                        <td>{senias.reduce((total, array) => isNaN(parseFloat(array.ImpoSenia)) ? 0 :  parseFloat(array.ImpoSenia) + total,0)}</td>
                                        <td></td>
                                        <td>{senias.reduce((total, array) => isNaN(parseFloat(array.Interes)) ? 0 : parseFloat(array.Interes) + total,0)}</td>
                                        <td>{senias.reduce((total, array) => isNaN((parseFloat(array.ImpoSenia)) ? 0 : parseFloat(array.ImpoSenia) * isNaN(parseFloat(array.Interes)) ? 0 : parseFloat(array.Interes)/100) + isNaN(parseFloat(array.ImpoSenia)) ? 0 : parseFloat(array.ImpoSenia)  + total,0)}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        
                                    </tr>
                                }


                            </table>
                            <div className={styles.buttonContainer}>
                            <button className={styles.submitButton} onClick={() => setNuevoPago(!nuevoPago)} 
                            disabled={(totalImpAbonado - input.CuotaACobrar) === 0 ? true : isReadOnly}>Nuevo</button>
                            </div>
                            </TableContainer> : 
                            <span style={{justifySelf: 'center'}}>No disponible</span>
                            }
                        

                            <div className={styles.buttonContainer2}>
                                <button className={styles.submitButton}>Aceptar</button>
                                <button className={styles.submitButton}>Buscar</button>
                                <button className={styles.submitButton}>Observaciones/Llamadas</button>
                                <button className={styles.submitButton}>Ver Fecha y Usuario de Alta</button>
                                <button className={styles.submitButton} disabled={
                                    input.AnuladaCliente === 1 ||
                                    input.TieneDNI === 0 ||
                                    input.TieneAnexos === 0 ||
                                    input.EstadoPrescoring !== 2 ||
                                    !input.FechaPrescoring ||
                                    input.Estadoscoring !== 2 ||
                                    parseFloat(input.ImporteTotalCuota) !== totalImpAbonado 
                                    
                                    ? true : btnConformar
                                    
                                    }>
                                    Conformar Operación</button>
                            </div>
            </div>
            </fieldset>
          </div>
    </div>
  )
}

export default ActualForm