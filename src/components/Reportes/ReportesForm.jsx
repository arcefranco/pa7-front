import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ButtonPrimary from '../../styled-components/buttons/ButtonPrimary'
import styles from './Ventas/EstadisticoPreSol/PreSol.module.css'


const ReportesForm = ({dispatchFunc, fechaD, fechaH, mes, anio}) => {
    const dispatch = useDispatch()
    const { codigoMarca } = useSelector(state => state.login.user)
    const [form, setForm] = useState({
      fechaD: '',
      fechaH: '',
      pMes: '',
      pAnio: '',
      pMarca: codigoMarca
    })
    const [years, setYears] = useState([]);

    useEffect(() => {
      let currentYear = new Date().getFullYear(),
        years = [];
      var startYear = 2015;
      while (startYear <= currentYear) {
        years.push(startYear++);
      }
      setYears(years);
    }, []);


    const handleSubmit = () => {

        dispatch(dispatchFunc({
          fechaD: form.fechaD.split("-").join(""),
          fechaH: form.fechaH.split("-").join(""),
          pMarca: codigoMarca
        }))
      }
    const handleChange = (e) => {

        const { name, value } = e.target
        let parseValue;
        if (name === 'fechaD' || name === 'fechaH') {
          const newForm = {
            ...form,
            [name]: value/* .split("-").reverse().join("") */,
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
        {
          fechaD === 1 &&
        <div>
          <span>Fecha Desde: </span> <br />
          <input type="date" name="fechaD" value={form.fechaD} onChange={handleChange} />
        </div>
        }
        {
          fechaH === 1 &&
        <div>
          <span>Fecha Hasta: </span> <br />
          <input type="date" name="fechaH" value={form.fechaH} onChange={handleChange} />
        </div>
        }
        {
          mes === 1 &&
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
        }
        {
          anio === 1 &&
        <div>
          <span>Año: </span> <br />
            {years && (
              <select name="anio" value={form.anio} onChange={handleChange}>
                <option value={0}>---</option>
                {years.map((e) => {
                  return (
                    <option value={e} key={e}>
                      {e.toLocaleString()}
                    </option>
                  );
                })}
              </select>
            )}
        </div>
        }
        <ButtonPrimary onClick={handleSubmit}>Ver</ButtonPrimary>
      </div>


    </div>

  </div>
  )
}

export default ReportesForm
