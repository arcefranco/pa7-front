import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import ButtonPrimary from "../../../../styled-components/buttons/ButtonPrimary";
import styles from "./Efectividad.module.css";

const AdjForm = ({ dispatchFunc }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.login);
  const { oficialesAdj } = useSelector(
    (state: RootState) => state.EfectividadAdj
  );
  const [years, setYears] = useState<number[]>([]);
  const [form, setForm] = useState({
    mes: 0,
    anio: 0,
    oficial: 0,
    codigoMarca: user?.codigoMarca,
  });

  const handleSubmit = () => {
    dispatch(dispatchFunc(form));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let parseValue = parseInt(value);
    const newForm = {
      ...form,
      [name]: parseValue,
    };
    setForm(newForm);
  };

  useEffect(() => {
    let currentYear = new Date().getFullYear(),
      years: number[] = [];
    var startYear: number = 2015;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    setYears(years);
  }, []);

  return (
    <div className={styles.selectContainer}>
      <div className={styles.selects}>
        <div className={styles.selectGrid}>
          <div>
            <span>Mes: </span> <br />
            <select name="mes" value={form.mes} onChange={handleChange}>
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
          <div>
            <span>Oficial: </span> <br />
            <select name="oficial" value={form.oficial} onChange={handleChange}>
              <option value={0}>---</option>
              {oficialesAdj &&
                oficialesAdj.map((e) => {
                  return (
                    <option value={e.Codigo} key={e.Codigo}>
                      {e.Nombre}
                    </option>
                  );
                })}
            </select>
          </div>
          <ButtonPrimary onClick={handleSubmit}>Ver</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AdjForm;
