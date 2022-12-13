import React, { useEffect } from 'react'
import styles from './ActualPre.module.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import * as BsIcons from 'react-icons/bs'



const FormaPagoItem = ({FechaSenia, ImpoSenia, Interes, NomFormaPago, CodFormaDePago, NroRecibo, FechaCheque, isReadOnly}) => {

    const [inEdit, setInEdit] = useState(false)
    const {formasPago} = useSelector(state => state.ActualPre)

    const [inputPago, setInputPago] = useState({
        Fecha: FechaSenia?.slice(0,10),
        Importe: ImpoSenia,
        Interes: Interes,
        ImpAbonado: isNaN((parseInt(ImpoSenia)) ? 0 : parseInt(ImpoSenia) * isNaN(parseInt(Interes)) ? 0 : parseInt(Interes)/100) + isNaN(parseInt(ImpoSenia)) ? 0 : parseInt(ImpoSenia),
        FormaDePago: CodFormaDePago,

        NroRecibo: NroRecibo,
        FechaVto: FechaCheque?.slice(0,10)
    })
    const handlePago = (e) => {
                
        const {name , value} = e.target

        const newForm = {...inputPago,
            [name]: value,
          }
          
          setInputPago(newForm)
      }



  return (
    <tr>
    <td style={{width: '1rem'}}><button className={styles.submitButton} disabled={isReadOnly} onClick={() => setInEdit(!inEdit)}><BsIcons.BsPencilFill/></button></td>
    <td>{inEdit ? <input type="date" value={inputPago.Fecha} onChange={handlePago} name="Fecha"/> : FechaSenia?.slice(0,10).split('-').reverse().join('/')}</td>
    <td>{inEdit ? <input type="text" value={inputPago.Importe} size={5} onChange={handlePago} name="Importe"/> : ImpoSenia}</td>
    <td>{inEdit ? <input type="text" value={inputPago.Interes} size={5} onChange={handlePago} name="Interes"/> : Interes}</td>
    <td>{inEdit ? <input type="text" value={inputPago.ImpAbonado} size={5} onChange={handlePago} name="ImpAbonado"/> : isNaN((parseInt(ImpoSenia)) ? 0 : parseInt(ImpoSenia) * isNaN(parseInt(Interes)) ? 0 : parseInt(Interes)/100) + isNaN(parseInt(ImpoSenia)) ? 0 : parseInt(ImpoSenia)}</td>
    <td>{inEdit ? 
    <select name="FormaDePago" 
    style={{width: '7rem'}}
     value={inputPago.FormaDePago} onChange={handlePago} id="">
        <option value="">---</option>
        {
            formasPago.status && formasPago.data.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
        }
    </select>
    : 
    NomFormaPago
    }</td>
    <td>{inEdit ? <input type="text" value={inputPago.NroRecibo} size={12} name="NroRecibo" onChange={handlePago}/> :  NroRecibo}</td>
    <td>{inEdit ? <input type="date" value={inputPago.FechaVto} name="FechaVto" onChange={handlePago} /> : FechaCheque?.slice(0,10).split('-').reverse().join('/')}</td>
    <td>{inEdit ? <button className={styles.submitButton}>Modificar</button> : <button className={styles.submitButton} disabled>Modificar</button>}</td>
    </tr>
  )
}

export default FormaPagoItem