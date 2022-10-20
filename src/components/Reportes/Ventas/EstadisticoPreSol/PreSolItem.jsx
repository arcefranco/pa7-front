import React from "react";
import TableContainer from "../../../../styled-components/tables/TableContainer2";
import styles from './PreSol.module.css'
import * as MdIcons from 'react-icons/md';
import { useState } from "react";

const PreSolItem = ({title, array}) => {

    const [activo, setActivo] = useState(true)
    
    return ( 
        <div className={styles.item}>
        <span>{title}</span>
        {
        !activo ? <MdIcons.MdOutlineKeyboardArrowDown className={styles.arrow} onClick={() => setActivo(true)}  /> 
        : <MdIcons.MdOutlineKeyboardArrowUp className={styles.arrowDown} onClick={() => setActivo(false)} /> 
        }
        
        {
            array && activo &&
        <TableContainer>
            <table>
                <tr style={{backgroundColor: '#6c757d8c'}}>
                    <th style={{minWidth: '3rem', maxWidth: '3rem'}} colspan="8"></th>
                    <th style={{minWidth: '4rem', maxWidth: '4rem', textAlignLast: 'center'}} colspan="12">Clasificaciones de pendientes</th>
                    <th style={{minWidth: '1rem', maxWidth: '1rem', textAlignLast: 'center'}} colspan="4">Mesas Anteriores</th>
                    <th></th>
                    
                </tr>
                <tr className={styles.noHeader}>
                    <th style={{width: '7rem' , maxWidth: '7rem', minWidth: '7rem'}}>Vendedor</th>
                    <th style={{width: '4rem', maxWidth: '4rem', minWidth: '4rem'}}>Fecha Alta</th>
                    <th style={{width: '5rem' , maxWidth: '5rem', minWidth: '5rem'}}>Fecha Baja</th>
                    <th>Ing</th>
                    <th style={{fontSize: '11px'}}>Ventas MP</th>
                    <th style={{fontSize: '11px'}}>C Scoring</th>
                    <th style={{fontSize: '11px'}}>Obj</th>
                    <th style={{fontSize: '11px'}}>Prod</th>


                    <th>2</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>SubT</th>
                    <th>3</th>
                    <th>8</th>
                    <th>9</th>
                    <th>Sub Tot.</th>
                    <th>Anul 3+7</th>
                    <th>Anul Rechaz.</th>


                    <th>-1</th>
                    <th>-2</th>
                    <th>-3</th>
                    <th>PROM</th>
                    
                    <th>GB</th>
                </tr>
                {
                    array.map(e => 
                        <tr>
                            <td>{e.NomVendedor}</td>
                            <td>{e.FechaAltaVendedor?.slice(0,10).split('-').reverse().join('/')}</td>
                            <td>{e.FechaBajaVendedor?.slice(0,10).split('-').reverse().join('/')}</td>
                            <td  className={styles.tdNumber} style={{backgroundColor: 'violet'}}>{e.Ingresadas ? e.Ingresadas : 0}</td>
                            <td  className={styles.tdNumber}>{e.VentasMP ? e.VentasMP : 0}</td>
                            <td  className={styles.tdNumber}>{e.Crucescoring ? e.Crucescoring : 0}</td>
                            <td  className={styles.tdNumber}>{e.Objetivo ? e.Objetivo : 0}</td>
                            <td  className={styles.tdNumber} style={{backgroundColor: '#79ff799e'}}>{e.Produccion ? e.Produccion : 0}</td>


                            <td  className={styles.tdNumber}>{e.C2 ? e.C2 : 0}</td>
                            <td  className={styles.tdNumber}>{e.C4 ? e.C4 : 0}</td>
                            <td  className={styles.tdNumber}>{e.C5 ? e.C5 : 0}</td>
                            <td  className={styles.tdNumber}>{e.C6 ? e.C6 : 0}</td>
                            <td  className={styles.tdNumber}>{e.C7 ? e.C7 : 0}</td>
                            <td  className={styles.tdNumber} style={{backgroundColor: '#ffff2d8a'}}>{e.C2 + e.C4 + e.C5 + e.C6 +e.C7}</td>
                            <td  className={styles.tdNumber}>{e.C3 ? e.C3 : 0}</td>
                            <td  className={styles.tdNumber}>{e.C8 ? e.C8 : 0}</td>
                            <td  className={styles.tdNumber}>{e.C9 ? e.C9 : 0}</td>
                            <td  className={styles.tdNumber} style={{backgroundColor: '#ffb020a6'}}>{e.C3 + e.C8 + e.C9}</td>
                            <td  className={styles.tdNumber}>{e.AnuladaTresYSiete ? e.AnuladaTresYSiete : 0}</td>
                            <td  className={styles.tdNumber}>{e.AnuladaRechazada ? e.AnuladaRechazada : 0}</td>

                            <td  className={styles.tdNumber}>{e.MesAnt ? e.MesAnt : 0}</td>
                            <td  className={styles.tdNumber}>{e.MesAnt2 ? e.MesAnt2 : 0}</td>
                            <td  className={styles.tdNumber}>{e.MesAnt3 ? e.MesAnt3 : 0}</td>
                            <td  className={styles.tdNumber}>{Math.floor((e.MesAnt + e.MesAnt2 + e.MesAnt3)/3)}</td>
                            <td  className={styles.tdNumber}>{e.Produccion + e.Crucescoring}</td>


                        </tr>
                        )
                }
                <tr style={{backgroundColor: 'white'}}>
                    <th>SUBTOTAL</th>
                    <td></td>
                    <td></td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.Ingresadas + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.VentasMP + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.Crucescoring + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.Objetivo + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.Produccion + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C2 + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C4 + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C5 + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C6 + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C7 + total,0)}</td>
                    <td  className={styles.tdNumber}> {array.reduce((total, array) => array.C7 + array.C2 + array.C4 + array.C5 + array.C6 + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C3 + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C8 + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C9 + total,0)}</td>
                    <td  className={styles.tdNumber}> {array.reduce((total, array) => array.C9 + array.C8 + array.C3 + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.AnuladaTresYSiete + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.AnuladaRechazada + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.MesAnt + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.MesAnt2 + total,0)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.MesAnt3 + total,0)}</td>
                    <td  className={styles.tdNumber}>{Math.floor((array.reduce((total, array) => array.MesAnt3 + array.MesAnt + array.MesAnt2 + total,0))/3)}</td>
                    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.Produccion + array.Crucescoring + total,0)}</td>
                </tr>
            </table>
        </TableContainer>
        }
    </div>
    )
}

export default PreSolItem