import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TableContainer2 from "../../../../styled-components/tables/TableContainer2";
import styles from './PreSol.module.css'
const PreSolTableTotal = ({array}) => {

    const navigate = useNavigate()
    const [totalIngresadas, setTotalIngresadas] = useState([])
    const [totalIngresadasFiltered, setTotalIngresadasFiltered] = useState([])
    const {fechaD, fechaH, pMarca} = useSelector(state => state.PreSolVentas.paramsDetalles)
    useEffect(() => {

        if(array.length){
            setTotalIngresadas(array.map(e => e.CodSucursal))
        }
    }, [])
    useEffect(() => {
        setTotalIngresadasFiltered(totalIngresadas.filter((item,
            index) => totalIngresadas.indexOf(item) === index))
    }, [totalIngresadas])
    return (
        <div className={styles.item}>

   
        <TableContainer2>

        <table>
           
        <tr style={{backgroundColor: '#6c757d8c', visibility: 'collapse'}} >
                    <th style={{minWidth: '3rem', maxWidth: '3rem', border:'none'}} colSpan="8"></th>
                    <th style={{minWidth: '4rem', maxWidth: '4rem', border:'none'}} colSpan="12">Clasificaciones de pendientes</th>
                    <th style={{minWidth: '1rem', maxWidth: '1rem', border:'none'}} colSpan="4">Mesas Anteriores</th>
                    <th style={{border: 'none'}}></th>
                    
                </tr>
                    <tr style={{visibility: 'collapse'}} className={styles.noHeader}>
                    <th style={{width: '7rem' , maxWidth: '7rem', minWidth: '7rem', border: 'none'}}>Vendedor</th>
                    <th style={{width: '4rem', maxWidth: '4rem', minWidth: '4rem' , border: 'none'}}>Fecha Alta</th>
                    <th style={{width: '5rem' , maxWidth: '5rem', minWidth: '5rem' , border: 'none'}}>Fecha Baja</th>
                    <th style={{ border: 'none'}}>Ingresados</th>
                    <th style={{ border: 'none'}}>Ventas MP</th>
                    <th style={{ border: 'none'}}>Cruce Scoring</th>
                    <th style={{ border: 'none'}}>Objetivo</th>
                    <th style={{ border: 'none'}}>Produccion</th>


                    <th style={{ border: 'none'}}>2</th>
                    <th style={{ border: 'none'}}>4</th>
                    <th style={{ border: 'none'}}>5</th>
                    <th style={{ border: 'none'}}>6</th>
                    <th style={{ border: 'none'}}>7</th>
                    <th style={{ border: 'none'}}>SubT</th>
                    <th style={{ border: 'none'}}>3</th>
                    <th style={{ border: 'none'}}>8</th>
                    <th style={{ border: 'none'}}>9</th>
                    <th style={{ border: 'none'}}>Sub Tot.</th>
                    <th style={{ border: 'none'}}>Anul 3+7</th>
                    <th style={{ border: 'none'}}>Anul Rechaz.</th>


                    <th style={{ border: 'none'}}>-1</th>
                    <th style={{ border: 'none'}}>-2</th>
                    <th style={{ border: 'none'}}>-3</th>
                    <th style={{ border: 'none'}}>PROM</th>
                    
                    <th style={{ border: 'none'}}>GB</th>
                </tr>

<tr style={{border: '1px solid #00000057' ,background: '#00000085', color: 'white'}}>
    <td style={{width: '7rem' , maxWidth: '7rem', minWidth: '7rem'}}> </td>
    <td style={{width: '4rem', maxWidth: '4rem', minWidth: '4.4rem'}}></td>
    <td style={{width: '5rem' , maxWidth: '5rem', minWidth: '5rem'}}></td>

    
    <td onClick={() => navigate(`/reportes/preSol/ingresadas/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${pMarca}/${JSON.stringify(totalIngresadasFiltered)}`)} 
    className={styles.tdNumber}  style={{backgroundColor: 'violet'}}>
        {array.reduce((total, array) => array.Ingresadas + total,0)}
        </td>
    <td  className={styles.tdNumber} onClick={() => navigate(`/reportes/preSol/MP/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${pMarca}/${JSON.stringify(totalIngresadasFiltered)}`)}>
        {array.reduce((total, array) => array.VentasMP + total,0)}
    </td>
    <td  className={styles.tdNumber} onClick={() => navigate(`/reportes/preSol/cruceScoring/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${pMarca}/${JSON.stringify(totalIngresadasFiltered)}`)}>
        {array.reduce((total, array) => array.Crucescoring + total,0)}
    </td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.Objetivo + total,0)}</td>
    <td  className={styles.tdNumber} style={{backgroundColor: '#79ff799e'}} onClick={() => navigate(`/reportes/preSol/Produccion/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${pMarca}/${JSON.stringify(totalIngresadasFiltered)}`)}>
        {array.reduce((total, array) => array.Produccion + total,0)}
        
    </td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C2 + total,0)}</td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C4 + total,0)}</td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C5 + total,0)}</td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C6 + total,0)}</td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C7 + total,0)}</td>
    <td  className={styles.tdNumber} style={{backgroundColor: '#ffff2d8a'}} onClick={() => navigate(`/reportes/preSol/Pendientes/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${pMarca}/${JSON.stringify(totalIngresadasFiltered)}`)}>
        {array.reduce((total, array) => array.C7 + array.C2 + array.C4 + array.C5 + array.C6 + total,0)}
    </td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C3 + total,0)}</td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C8 + total,0)}</td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.C9 + total,0)}</td>
    <td  className={styles.tdNumber} style={{backgroundColor: '#ffb020a6'}} onClick={() => navigate(`/reportes/preSol/Pendientes/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${pMarca}/${JSON.stringify(totalIngresadasFiltered)}`)}>
        {array.reduce((total, array) => array.C9 + array.C8 + array.C3 + total,0)}
    </td>
    <td  className={styles.tdNumber} onClick={() => navigate(`/reportes/preSol/TresYSiete/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${pMarca}/${JSON.stringify(totalIngresadasFiltered)}`)}>
        {array.reduce((total, array) => array.AnuladaTresYSiete + total,0)}
    </td>
    <td  className={styles.tdNumber} onClick={() => navigate(`/reportes/preSol/anulRechaz/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${pMarca}/${JSON.stringify(totalIngresadasFiltered)}`)}>
        {array.reduce((total, array) => array.AnuladaRechazada + total,0)}
    </td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.MesAnt + total,0)}</td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.MesAnt2 + total,0)}</td>
    <td  className={styles.tdNumber}>{array.reduce((total, array) => array.MesAnt3 + total,0)}</td>
    <td  className={styles.tdNumber}>{Math.floor((array.reduce((total, array) => array.MesAnt3 + array.MesAnt + array.MesAnt2 + total,0))/3)}</td>
    <td  className={styles.tdNumber} onClick={() => navigate(`/reportes/preSol/ProdYCS/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${pMarca}/${JSON.stringify(totalIngresadasFiltered)}`)}>
        {array.reduce((total, array) => array.Produccion + array.Crucescoring + total,0)}
    </td>
</tr>

        </table>
        </TableContainer2>
        </div>
    )
}

export default PreSolTableTotal