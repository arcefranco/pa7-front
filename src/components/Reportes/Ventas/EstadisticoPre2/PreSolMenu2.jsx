import React, { useState } from "react";
import styles from '../EstadisticoPreSol/PreSol.module.css'
import { useSelector, useDispatch } from "react-redux";
import TitleLogo from "../../../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import ButtonPrimary from "../../../../styled-components/buttons/ButtonPrimary";
import { getPreSol } from "../../../../reducers/Reportes/Ventas/PreSolSlice";
import groupBy from "../../../../helpers/groupBy";
import { useEffect } from "react";
import TableContainer from "../../../../styled-components/tables/TableContainer";


const PreSolMenu2 = () => {

    const dispatch = useDispatch()
    const { empresaReal, codigoMarca } = useSelector(state => state.login.user)
    const { status, data } = useSelector(state => state.PreSolVentas.preSolSelected)

    const [form, setForm] = useState({
        fechaD: '',
        fechaH: '',
        pMes: '',
        pAnio: '',
        pMarca: codigoMarca
    })

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

    const handleSubmit = () => {
        dispatch(getPreSol(form))
    }


    return (
        <>
            <TitleLogo>
                <div>
                    <span>{empresaReal}</span>
                    <ReturnLogo empresa={empresaReal} />
                </div>
                <TitlePrimary>Estadístico Pre-Sol 2</TitlePrimary>
            </TitleLogo>

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
                            </select>
                        </div>
                        <ButtonPrimary onClick={handleSubmit}>Buscar</ButtonPrimary>
                    </div>


                </div>

            </div>


        </>
    )
}

export default PreSolMenu2