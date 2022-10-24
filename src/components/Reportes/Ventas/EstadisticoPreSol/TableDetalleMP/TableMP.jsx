import React from "react";
import { useSelector } from "react-redux";
import TableContainer from "../../../../../styled-components/tables/TableContainer2";
import styles from '../PreSol.module.css';


const TableMP = ({title, array}) => {

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
                        <th>Vendedor Vinculado</th>
                        <th>Supervisor Vinculado</th>
                        <th>Valor del Vehiculo</th>
                        <th>Modelo</th>
                        <th>Tipo Plan</th>
                        <th>Deb. Aut.</th>
                        <th>Fecha Ing. Term.</th>
                        <th>Supervisor</th>
                        <th>MiniEmprend.</th>
                    </tr>
                    {
                        array.length && array.map(e => 
                            
                    <tr key={e.Solicitud}>
                        <td>{e.FechaVenta?.slice(0,10).split('-').reverse().join('/')}</td>
                        <td>{e.Solicitud}</td>
                        <td>{e.Cliente}</td>
                        <td>{e.NomVendedor}</td>
                        <td>{e.VendedorVinculado}</td>
                        <td>{e.SupervisorVinculado}</td>
                        <td>{typeof e.Precio === "string" ? e.Precio?.slice(0, e.Precio.length-3) : e.Precio}</td>
                        <td>{e.NomModelo}</td>
                        <td></td>
                        <td>{
                        e.DebitoAutomaticoScoring === 1 ? <input type="checkbox" readOnly={true} checked /> : <input type="checkbox" disabled readOnly />
                        }</td>
                        <td>{e.FechaIngresoTerminal?.slice(0,10).split('-').reverse().join('/')}</td>
                        <td>{e.NomSup}</td>
                        <td>{
                        e.EsMicro === 1 ? <input type="checkbox" readOnly={true} checked /> : <input type="checkbox" disabled readOnly />
                        }</td>


                    </tr>
                            )

                    }
                </table>

            </TableContainer>
        
        </div>
    )
}

export default TableMP