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
getOrigenSuscripcion, reset, 
getPuntosVenta} from '../../../reducers/Operaciones/actualPre/actualPreSlice'



const ActualForm = () => {
    const dispatch = useDispatch()
    const {empresaReal, marca} = useSelector(state => state.login.user)
    const {modelos, datosOp, oficialesMora, oficialesPC, oficialesScoring, origen, puntos} = useSelector(state => state.ActualPre)
    const {codigoVendedor, codigoSucursal, codigoGerente, codigoTeamLeader} = useSelector(state => state.login.user)
    const {codigoMarca, Numero} = useParams()
    const [totalImpAbonado, setTotalImpAbonado] = useState(0)
    const [input, setInput] = useState({
        Solicitud:'',
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

    const handleChange = (e) => {
                
        const {name , value} = e.target
        let valueFormatted;
        if(name === 'Estadoscoring') valueFormatted = parseInt(value)
        else if(name === 'EstadoPrescoring') valueFormatted = parseInt(value)
        else valueFormatted = value
        const newForm = {...input,
            [name]: valueFormatted,
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

    useEffect(() => { //Primero busco los datos de la operacion
        Promise.all([
            dispatch(getDatosPreSol({codigoMarca: codigoMarca, Numero: Numero})), 
            dispatch(getModelos()),
            dispatch(getOficialesMora()),
            dispatch(getOficialesPC()),
            dispatch(getOficialesScoring()),
            dispatch(getOrigenSuscripcion()),
            dispatch(getPuntosVenta())
        ])
        return () => {
            dispatch(reset())
            setInput({
                Numero: '',
                Solicitud:'',
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

        if( datosOp.length && ( (codigoVendedor && codigoVendedor !== datosOp[0]?.Vendedor) || 
        (codigoTeamLeader && codigoTeamLeader !== datosOp[0].CodTL) || (codigoSucursal && codigoSucursal !== datosOp[0].CodSupervisor) )){
            console.log(codigoVendedor, datosOp[0]?.Vendedor)
            alert('No tiene permiso para realizar esta acción')
            
        }else{
            console.log(codigoVendedor, datosOp[0]?.Vendedor)
            setInput({
                Numero: datosOp[0]?.Numero,
                Solicitud: datosOp[0]?.Solicitud,
                FechaAlta: datosOp[0]?.FechaAlta,
                FechaCrucescoring: datosOp[0]?.FechaCrucescoring,
                CodModelo: datosOp[0]?.CodModelo,
                CuotaTerminal: datosOp[0]?.CuotaTerminal,
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
                FechaIngresoTerminal: datosOp[0]?.FechaIngresoTerminal,
                ImporteTotalCuota: datosOp[0]?.ImporteTotalCuota,
                CuotaACobrar: datosOp[0]?.CuotaACobrar,
                ImporteTotalCuota: datosOp[0]?.ImporteTotalCuota,
                FechaEstimCancelacion: datosOp[0]?.FechaEstimCancelacion,
                Estadoscoring: datosOp[0]?.Estadoscoring,
                FechaIngresoExtraNet: datosOp[0]?.FechaIngresoExtraNet,
                DomicilioOcupacion: datosOp[0]?.DomicilioOcupacion,
                EntregaUsadoRetiro: datosOp[0]?.EntregaUsadoRetiro
            })
            setTotalImpAbonado(datosOp.reduce((total, array) => 
            isNaN((parseInt(array.ImpoSenia)) ? 0 : parseInt(array.ImpoSenia) * isNaN(parseInt(array.Interes)) ? 0 : 
            parseInt(array.Interes)/100) + isNaN(parseInt(array.ImpoSenia)) ? 0 : parseInt(array.ImpoSenia)  + total,0))

        }
    }, [datosOp[0]])

  


  return (
    <div>
            <BiggerTitleLogo>
            <div>
              <span>{empresaReal}</span>
              <ReturnLogo empresa={empresaReal}/>
            </div>
            <TitlePrimary style={{textAlign: 'start'}}>Actualizacion de Pre-Solicitudes ({marca})</TitlePrimary>
          </BiggerTitleLogo>

          <div>
            <div className={styles.formSectionContainer}>
                <h4>Datos Generales</h4>
                <div className={styles.formSection4x2}>
                    <div className={styles.section}>
                    <div className={styles.formItem}>
                    <span>Codigo Interno</span>
                    <input type="text" disabled value={input.Numero} />

                    </div>
                    </div>
                    <div className={styles.section} style={{columnGap:'1rem'}}>
                        <div className={styles.formItem}>
                        <span>Solicitud</span>
                        <input type="text" disabled value={input.Solicitud} />
                        </div>
                        <div className={styles.formItem}>
                        <span>Fecha Alta</span>
                        <input type="date" disabled value={input.FechaAlta?.slice(0,10)} />
                        </div>
                        


                    </div>

                    <div className={styles.section} style={{ columnGap:'1rem'}}>
                        <div className={styles.formItemCheck}>
                            <input type="checkbox" size={2} checked={input.FechaIngresoTerminal ? true : false}/>
                            <span>Ingresada en la terminal</span>
                        </div>
                        <div className={styles.formItemCheck}>
                            <input type="checkbox" size={2} checked={input.AnuladaCliente === 1 ? true : false}/>
                            <span>Anulada</span>
                        </div>
                        <div className={styles.formItemCheck}>
                            <input type="checkbox" size={2} checked={input.Crucescoring === 1 ? true : false}/>
                            <span>Cruce Scoring</span>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Fecha</span>
                            <input type="date" disabled value={input.FechaCrucescoring}/>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Modelo</span>
                            <select style={{width: '12rem'}} disabled value={input.CodModelo} name="" id="">
                                <option>---</option>
                                {
                                    modelos && modelos.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
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
                            <input type="text" disabled value={input.CuotaTerminal} />
                        </div>
                    </div>
                    <div className={styles.section}>
                        {
                            input.PasoAOperaciones === 1 ? <h5 style={{color: 'green', alignSelf: 'center'}}>Conformada</h5> : 
                            <h5 style={{color: 'red', alignSelf: 'center'}}>Sin Conformar</h5>
                        }
                    </div>
                </div>
                <h4>Datos del suscriptor</h4>
                <div className={styles.formSection4x4}>
                    <div className={styles.section} style={{columnGap: '0.5rem'}}>
                        <div className={styles.formItem}>
                            <span>Documento</span>
                            <select name="Documento" style={{height: '1.6rem'}} disabled value={input.TipoDocumento} id="">
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
                            <span>Numero</span>
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
                            <input disabled type="text" value={input.ImporteReciboX}/>
                        </div>
                        <div className={styles.formItemCheck}>
                            <input type="checkbox" />
                            <span>No tiene Email</span>
                        </div>

                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Apellido</span>
                            <input disabled value={input.Apellido} type="text" />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Nombre</span>
                            <input value={input.Nombres} disabled type="text" />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Email Particular</span>
                            <input name='EmailParticular' value={input.EmailParticular} onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Email Laboral</span>
                            <input name='EmailLaboral' value={input.EmailLaboral} onChange={handleChange} type="text" />
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
                            <span>Numero</span>
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
                            <span>Cod. Postal</span>
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
                            <button className={styles.submitButton}>Llamar</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                    <div className={styles.formItem}>
                            <span>Telefono Celular</span>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                            <input type="text" value={input.TelefCelular} name="TelefCelular" onChange={handleChange}/>
                            <button className={styles.submitButton}>Llamar</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                    <div className={styles.formItem}>
                            <span>Telefono Laboral</span>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                            <input type="text" value={input.TelefLaboral} name="TelefLaboral" onChange={handleChange}/>
                            <button className={styles.submitButton}>Llamar</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                    <div className={styles.formItem}>
                            <span>Telefono Familiar</span>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                            <input type="text" value={input.TelefFamiliar} name="TelefFamiliar" onChange={handleChange}/>
                            <button className={styles.submitButton}>Llamar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.formSection1x2}>
                <div className={styles.section}>
                    <div className={styles.formItem}>
                            <span>Ocupación</span>
                            <div style={{display: 'flex'}}>

                            <input type="text" style={{width: '100%'}} value={input.Ocupacion} 
                            name="Ocupacion" onChange={handleChange}/>
                            
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.formItem}>
                            <span>Contacto AD</span>
                            <div style={{display: 'flex'}}>

                            <input type="text" style={{width: '100%'}} value={input.DomicilioOcupacion} 
                            name="DomicilioOcupacion" onChange={handleChange}/>
                            
                            </div>
                        </div>
                    </div>
                </div>
                <h4>Datos de la operación</h4>
                <div className={styles.formSection1x1}>
                    <div className={styles.formSection1x2}>
                        <div className={styles.formSection2x10}> 
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Sucursal</span>
                                <div style={{display: 'flex'}}>

                                <input type="text" style={{width: '100%'}} value={input.NombreSucReal} 
                                name="Sucursal" disabled />
                            
                                </div>
                                </div>                               
                            </div>
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Vendedor</span>
                                <div style={{display: 'flex'}}>

                                <input type="text" style={{width: '100%'}} value={input.NomVendedor} 
                                name="Vendedor" disabled/>
                            
                                </div>
                                </div>                               
                            </div>
                            <div className={styles.section}>
                                <div className={styles.formItem}>
                                <span>Oficial Mora</span>
                                <div style={{display: 'flex'}}>
                                {
                                    input.OficialMora ? 
                                    <select style={{width: '100%'}}  name="OficialMora" id="" value={input.OficialMora} disabled>
                                        {
                                            oficialesMora && oficialesMora.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                        }
                                    </select> :                                    
                                    <select style={{width: '100%'}} name="OficialMora" id="" value={input.OficialMora} onChange={handleChange}>
                                        <option value="">---</option>
                                        {
                                            oficialesMora && oficialesMora.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
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

                                <input type="text" style={{width: '100%'}} value={input.NomTL} 
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
                                    <select style={{width: '100%'}} name="OficialScoring" id="" value={input.OficialScoring} disabled>
                                        {
                                            oficialesScoring && oficialesScoring.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                        }
                                    </select> :                                    
                                    <select style={{width: '100%'}} name="OficialScoring" id="" value={input.OficialScoring} onChange={handleChange}>
                                        <option value="">---</option>
                                        {
                                            oficialesScoring && oficialesScoring.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
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

                                <input type="text" style={{width: '100%'}} value={input.NombreSupervisor} 
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
                                    <select style={{width: '100%'}} name="OficialPC" id="" value={input.OficialPC} disabled>
                                        <option>---</option>
                                        {
                                            oficialesPC && oficialesPC.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                        }
                                    </select> :                                    
                                    
                                    <select style={{width: '100%'}} name="OficialPC" id="" value={input.OficialPC} onChange={handleChange}>
                                        <option>---</option>
                                        {
                                            oficialesPC && oficialesPC.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
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
                                    <select style={{width: '100%'}} name="origensuscripcion" id="" value={input.origensuscripcion} disabled>
                                        <option value="">---</option>
                                        {
                                            origen && origen.map(e => <option value={e.Codigo}>{e.Descripcion}</option>)
                                        }
                                    </select> :                                    
                                    
                                    <select style={{width: '100%'}} name="origensuscripcion" id="" value={input.origensuscripcion} onChange={handleChange}>
                                        <option value="">---</option>
                                        {
                                            origen && origen.map(e => <option value={e.Codigo}>{e.Descripcion}</option>)
                                        }
                                    </select> 
                                    
                                }
                            
                                </div>
                                </div>                               
                            </div>
                            
                               <div className={styles.section}>
                                    <div className={styles.formItem}>
                                        <span>Punto de Venta</span>
                                        <select name="CodPuntoVenta" value={input.CodPuntoVenta} id="">
                                            <option value="">---</option>
                                            {
                                                puntos && puntos.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.section}>
                                    <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                    fontSize: '12px', alignItems: 'center'}}>
                                        <input type="checkbox" checked={input.DebitoAutomatico === 1 ? true : false}/>
                                        <span>Déb. Aut.</span>
                                    </div>
                                </div>
                                <div className={styles.section}>
                                    <div className={styles.formSection1x2} style={{columnGap: '5.5rem'}}>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" checked={input.TieneDNI === 1 ? true : false}/>
                                            <span>DNI</span>
                                        </div>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" checked={input.TieneServicio === 1 ? true : false}/>
                                            <span>Mail</span>
                                        </div>
                                    </div>
                                </div> 
                                <div className={styles.section}>
                                    <div className={styles.formSection1x2}>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" checked={input.TieneAnexos === 1 ? true : false}/>
                                            <span>Anexos</span>
                                        </div>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" checked={input.DebitoAutomaticoscoring === 1 ? true : false}/>
                                            <span>Déb. Aut. Scoring</span>
                                        </div>
                                    </div>
                                </div> 
                                <div className={styles.section}>
                                    <div className={styles.formSection1x2}>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" checked={input.PromoEspecial === 1 ? true : false}/>
                                            <span>Promo Especial</span>
                                        </div>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" checked={input.PlanSubite === 1 ? true : false}/>
                                            <span>Plan Subite</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.section}>
                                    <div className={styles.formSection1x2} style={{columnGap: '0rem'}}>
                                        <div className={styles.formItemCheck} style={{flexDirection: 'row', alignSelf: 'center', 
                                        fontSize: '12px', alignItems: 'center'}}>
                                            <input type="checkbox" checked={input.Rec === 1 ? true : false}/>
                                            <span>Rec</span>
                                        </div>
                                        <div className={styles.formItem}>
                                            <span>Transf.</span>
                                            <div style={{display: 'flex'}}>

                                            <input type="text" /* style={{width: '100%'}} */ value={input.NombreSupervisor} 
                                            name="Supervisor" disabled/>
                            
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                <div className={styles.section}>
                                        <div className={styles.formItem}>
                                            <span>Importe Abonado</span>
                                            <div style={{display: 'flex'}}>
                                                {
                                                    input.Numero ?  /* pregunta por si se cargo el input en caso de que no esté autorizado */
                                                    <input type="text" value={datosOp.reduce((total, array) => 
                                                    (parseInt(array.ImpoSenia) * isNaN(parseInt(array.Interes)) ? 0 : parseInt(array.Interes)/100) + parseInt(array.ImpoSenia) + total,0)}  
                                                    style={{width: '100%'}} 
                                                    name="impAbonado" disabled/>
                                                    :
                                                    <input type="text" disabled style={{width: '100%'}}/>
                                                }
                            
                                            </div>
                                        </div>
                                </div>
                                <div className={styles.section}>
                                        <div className={styles.formItem}>
                                            <span>Valor Cuota</span>
                                            <div style={{display: 'flex'}}>

                                            <input type="text" value={input.CuotaACobrar} style={{width: '100%'}} 
                                            name="CuotaACobrar" disabled/>
                            
                                            </div>
                                        </div>
                                </div>
                                <div className={styles.section}>
                                        <div className={styles.formItem}>
                                            <span>Importe Total Cuota</span>
                                            <div style={{display: 'flex'}}>

                                            <input type="text" value={input.ImporteTotalCuota}  style={{width: '100%'}} 
                                            name="ImporteTotalCuota" disabled/>
                            
                                            </div>
                                        </div>
                                </div>
                                <div className={styles.section}>
                                        <div className={styles.formItem}>
                                            <span>Fecha Estimada Canc. Saldo</span>
                                            <div style={{display: 'flex'}}>

                                            <input type="date" value={input.FechaEstimCancelacion?.slice(0,10)} style={{width: '100%'}} 
                                            name="FechaEstimCancelacion" disabled/>
                            
                                            </div>
                                        </div>
                                </div>
                                <div className={styles.section}>
                                        <div className={styles.formItem} style={{alignSelf: 'center'}}>     
                                        <button className={styles.submitButton}>Scoring (PENDIENTE)</button>
                                        </div>
                                </div>
                                <div className={styles.section}>
                                        <div className={styles.formItem}>
                                            <span>Entrega Usado</span>
                                            <div style={{display: 'flex'}}>
                                            <select style={{width: '100%'}} name="EntregaUsadoRetiro" value={input.EntregaUsadoRetiro} 
                                            onChange={handleChange} id="">
                                                <option value={0}>---</option>
                                                <option value={1}>Si</option>
                                                <option value={2}>No</option>
                                                <option value={3}>Llave x Llave</option>
                                            </select>
                            
                                            </div>
                                        </div>
                                </div>          
                            
                        </div>
                      
                        <div className={styles.formSection3x1}>  
                       
                            <div className={styles.sectionScoring} style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    
                            }}> {(totalImpAbonado - input.CuotaACobrar) === 0 ? <h5 style={{color: 'green'}}>Cancelada</h5>  : <h5 style={{color: 'red'}}>Sin Cancelar</h5>}
                                <span className={styles.scoringTitle}>Pre Scoring</span>
                                <div className={styles.formSection1x2}>
                                    <div className={styles.formItem}>
                                    <span>Fecha</span>
                                    <input type="date" value={input.FechaPrescoring} onChange={handleChange}/>
                                    </div>
                                
                                    <div style={{fontSize: '13px'}}>
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
                                    <input type="date" value={input.FechaIngresoExtraNet?.slice(0,10)} onChange={handleChange}/>
                                    </div>
                                
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
                                </div>
                            </div>
                            {
                                input.Numero ?  /* pregunta por si se cargo el input en caso de que no esté autorizado */
                            <TableContainer> 
                            <table>
                            <span><b>Señas y pagos posteriores</b></span>
                                <tr>
                                    <td><b>Fecha</b> </td>
                                    <td><b>Importe</b> </td>
                                    <td><b>Interés</b> </td>
                                    <td><b>Imp. Abonado</b> </td>
                                    <td><b>Forma de Pago</b> </td>
                                    <td><b>Recibo Nº</b> </td>
                                    <td><b>F. Vto.</b> </td>
                                </tr>
                                {
                                    datosOp  && datosOp.map(e => 
                                    <tr>
                                        <td>{e.FechaSenia?.slice(0,10).split('-').reverse().join('/')}</td>
                                        <td>{e.ImpoSenia}</td>
                                        <td>{e.Interes}</td>
                                        <td>{isNaN((parseInt(e.ImpoSenia)) ? 0 : parseInt(e.ImpoSenia) * isNaN(parseInt(e.Interes)) ? 0 : parseInt(e.Interes)/100) + isNaN(parseInt(e.ImpoSenia)) ? 0 : parseInt(e.ImpoSenia)}</td>
                                        <td>{e.NomFormaPago}</td>
                                        <td>{e.NroRecibo}</td>
                                        <td>{e.FechaCheque?.slice(0,10).split('-').reverse().join('/')}</td>
                                    </tr>)
                                }
                                {
                                    <tr style={{
                                        background: '#0000005c',
                                        color: 'white'
                                    }}>
                                        <td>TOTAL</td>
                                        <td>{datosOp.reduce((total, array) => isNaN(parseInt(array.ImpoSenia)) ? 0 :  parseInt(array.ImpoSenia) + total,0)}</td>
                                        <td>{datosOp.reduce((total, array) => isNaN(parseInt(array.Interes)) ? 0 : parseInt(array.Interes) + total,0)}</td>
                                        <td>{datosOp.reduce((total, array) => isNaN((parseInt(array.ImpoSenia)) ? 0 : parseInt(array.ImpoSenia) * isNaN(parseInt(array.Interes)) ? 0 : parseInt(array.Interes)/100) + isNaN(parseInt(array.ImpoSenia)) ? 0 : parseInt(array.ImpoSenia)  + total,0)}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                }

                            </table>
                            <div className={styles.buttonContainer}>
                            <button className={styles.submitButton}>Nuevo</button>
                            <button className={styles.submitButton}>Modificar</button>
                            <button className={styles.submitButton}>Eliminar</button>
                            </div>
                            </TableContainer> : 
                            <span style={{justifySelf: 'center'}}>No disponible</span>
                            }

                        </div>

                    </div>                         
                </div>
                        

                            <div className={styles.buttonContainer2}>
                                <button className={styles.submitButton}>Aceptar</button>
                                <button className={styles.submitButton}>Buscar</button>
                                <button className={styles.submitButton}>Observaciones/Llamadas</button>
                                <button className={styles.submitButton}>Ver Fecha y Usuario de Alta</button>
                                <button className={styles.submitButton}>Conformar Operación</button>
                            </div>
            </div>

          </div>
    </div>
  )
}

export default ActualForm