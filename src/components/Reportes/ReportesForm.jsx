import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ButtonPrimary from '../../styled-components/buttons/ButtonPrimary'
import styles from './Ventas/EstadisticoPreSol/PreSol.module.css'


const ReportesForm = ({dispatchFunc}) => {
    const dispatch = useDispatch()
    const { codigoMarca } = useSelector(state => state.login.user)
    const [form, setForm] = useState({
      fechaD: '',
      fechaH: '',
      pMes: '',
      pAnio: '',
      pMarca: codigoMarca
    })

    const handleSubmit = () => {
        dispatch(dispatchFunc(form))
      }
    const handleChange = (e) => {

        const { name, value } = e.target
        let parseValue;
        if (name === 'fechaD' || name === 'fechaH') {
          const newForm = {
            ...form,
            [name]: value,
          }
    
          setForm(newForm)
        } else {
          parseValue = parseInt(value)
          const newForm = {
            ...form,
            [name]: parseValue,
          }
          setForm(newForm)
        }
    
      }


  return (
    <div className={styles.selectContainer}>
    <div className={styles.selects}>
      <div className={styles.selectGrid}>
        <div>
          <span>Fecha Desde: </span> <br />
          <input type="date" name="fechaD" value={form.fechaD} onChange={handleChange} />
        </div>
        <div>
          <span>Fecha Hasta: </span> <br />
          <input type="date" name="fechaH" value={form.fechaH} onChange={handleChange} />
        </div>
        <div>
          <span>Mes: </span> <br />
          <select name="pMes" value={form.pMes} onChange={handleChange}>
            <option value="*">---</option>
            <option value={1}>Enero</option>
            <option value={2}>Febrero</option>
            <option value={3}>Marzo</option>
            <option value={4}>Abril</option>
            <option value={5}>Mayo</option>
            <option value={6}>Junio</option>
            <option value={7}>Julio</option>
            <option value={8}>Agosto</option>
            <option value={9}>Septiembre</option>
            <option value={10}>Octubre</option>
            <option value={11}>Noviembre</option>
            <option value={12}>Diciembre</option>
          </select>
        </div>
        <div>
          <span>Año: </span> <br />
          <select name="pAnio" value={form.pAnio} onChange={handleChange}>
            <option value="*">---</option>
            <option value={2019}>2019</option>
            <option value={2020}>2020</option>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
          </select>
        </div>
        <ButtonPrimary onClick={handleSubmit}>Ver</ButtonPrimary>
      </div>


    </div>

  </div>
  )
}

export default ReportesForm
