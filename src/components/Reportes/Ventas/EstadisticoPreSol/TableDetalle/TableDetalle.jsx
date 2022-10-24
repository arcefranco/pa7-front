import React from "react";
import { useSelector } from "react-redux";
import TableContainer from "../../../../../styled-components/tables/TableContainer2";
import styles from '../PreSol.module.css'

const TableDetalle = ({title, array}) => {

    
    const {empresaReal, codigoMarca} = useSelector(state => state.login.user)
    return (
        <div style={{marginTop: '4rem'}} className={styles.item}>
            <span>{title}</span>


            <TableContainer>
                <table className={styles.tableDetalle}>
                    <tr className={styles.headerFixed}>
                        <th>Fecha Alta</th>
                        <th>Solicitud</th>
                        <th>Cliente</th>
                        <th>Vendedor</th>
                        <th>Modelo</th>
                        <th>Tipo Plan</th>
                        <th>Importe Total Cuota</th>
                        <th>Saldo</th>
                        <th>Fecha Estim. Cancelación</th>
                        <th>Tiene DNI</th>
                        <th>Tiene Servicio</th>
                        <th>Tiene Anexos</th>
                        <th>Estado Pre Scoring</th>
                        <th>Estado Scoring</th>
                        <th></th>
                        <th>Clasificación</th>
                        <th>Tipo Precio</th>
                        <th>Valor del Vehículo</th>
                        <th>Deb. Aut.</th>
                        <th>Deb. A. Sc.</th>
                        <th>Fecha Ing. Term.</th>
                        <th>Fecha Cruce Scoring</th>
                        <th>Supervisor</th>
                        <th>MiniEmprend.</th>
                        <th>Oficial Plan Canje</th>
                        <th></th>
                        
                    </tr>

                    {
                        array.length && array.map(e => 
                            <tr>
                                <td>{e.Fecha?.slice(0,10).split('-').reverse().join('/')}</td>
                                <td>{e.Solicitud}</td>
                                <td>{e.Cliente}</td>
                                <td>{e.NomVendedor}</td>
                                <td>{e.Vehiculo}</td>
                                
                                   <td>
                                    {
                                        empresaReal === 'Alizze S.A.' && e.codigotipoplan === 1 ? 'PLAN 84' : 
                                        empresaReal === 'Alizze S.A.' && e.codigotipoplan === 2 ? 'PLAN 120' : 
                                        e.codigotipoplan === 1 ? '100 %' :
                                        e.codigotipoplan === 2 ? '70/30' :
                                        e.codigotipoplan === 3 ? '60/40' :
                                        e.codigotipoplan === 4 ? '75/25' :
                                        e.codigotipoplan === 5 ? '80/20' : 
                                        e.codigotipoplan === 6 ? '90/10' : null
                                    }
                                   </td> 
                                <td style={{textAlignLast: 'end'}}>{e.ImporteCuota?.slice(0, e.ImporteCuota.length-3)}</td>
                                <td style={{textAlignLast: 'end'}}>{e.Saldo?.slice(0, e.Saldo.length-3)}</td>
                                <td>{e.FechaCancelacion?.slice(0,10).split('-').reverse().join('/')}</td>
                                <td style={{textAlignLast: 'center'}}>{
                                    e.Dni === 1 ? <input type="checkbox" readOnly={true} checked /> : <input type="checkbox" disabled readOnly />
                                    }
                                </td>
                                <td style={{textAlignLast: 'center'}}>{
                                    e.Servicio === 1 ? <input type="checkbox" readOnly={true} checked /> : <input type="checkbox" disabled readOnly />
                                    }
                                </td>
                                <td style={{textAlignLast: 'center'}}>{
                                    e.Anexos === 1 ? <input type="checkbox" readOnly={true} checked /> : <input type="checkbox" disabled readOnly />
                                    }
                                </td>
                                <td>
                                    {
                                        e.EstadoPrescoring === 2 ? 'Ok' : e.EstadoPrescoring === 0 ? 'Pendiente' : null
                                    }
                                </td>
                                <td>
                                    {
                                        e.Estadoscoring === 2 ? 'Ok' : e.Estadoscoring === 0 ? 'Pendiente' : null
                                    }
                                </td>
                                <td>{e.Clasificacion}</td>
                                <td>
                                    {
                                        e.Clasificacion === 1 ? 'Producción' :
                                        e.Clasificacion === 2 ? 'Lista para enviar a terminal' :
                                        e.Clasificacion === 3 ? 'Seña' :
                                        e.Clasificacion === 4 ? 'Pendiente scoring terminal' : 
                                        e.Clasificacion === 5 ? 'Pendiente scoring terminal con faltante documentación' :
                                        e.Clasificacion === 6 ? 'Aprobadas scoring terminal con faltante documentación' : 
                                        e.Clasificacion === 7 ? 'Pendiente de Pre Scoring' :
                                        e.Clasificacion === 8 ? 'Pre Scoring rechazado' : 
                                        e.Clasificacion === 9 ? 'Scoring terminal rechazado' : 
                                        e.Clasificacion === 10 ? 'Seña + Pend. Pre Scoring' : 
                                        e.Clasificacion === 11 ? 'Rechazadas' :
                                        null
                                    }
                                </td>
                                <td>{e.TipoPrecio}</td>
                                <td style={{textAlignLast: 'end'}}>{typeof e.Precio === "string" ? e.Precio?.slice(0, e.Precio.length-3) : e.Precio}</td>
                                <td style={{textAlignLast: 'center'}}>{
                                    e.DebitoAutomatico && e.DebitoAutomatico === 1 ? <input type="checkbox" readOnly={true} checked /> : <input type="checkbox" disabled readOnly />
                                    }
                                </td>
                                <td style={{textAlignLast: 'center'}}>{
                                    e.DebitoAutomaticoScoring && e.DebitoAutomaticoScoring === 1 ? <input type="checkbox" readOnly={true} checked /> : <input type="checkbox" disabled readOnly />
                                    }
                                </td>
                                <td>{e.FechaIngresoTerminal?.slice(0,10).split('-').reverse().join('/')}</td>
                                <td>{e.fechaCruceScoring?.slice(0,10).split('-').reverse().join('/')}</td>
                                <td>{e.NomSupervisor}</td>
                                <td style={{textAlignLast: 'center'}}>
                                    {
                                    e.EsMicro === 1 ? <input type="checkbox" readOnly={true} checked /> : <input type="checkbox" disabled readOnly />
                                    }
                                </td>
                                <td>{e.NombreOficialPC}</td>
                                 <td><button className={styles.buttonOperacion}>Ver operacion</button></td> 
                            </tr>
                            )
                    }
                </table>
            </TableContainer>


        </div>
    )
}


export default TableDetalle