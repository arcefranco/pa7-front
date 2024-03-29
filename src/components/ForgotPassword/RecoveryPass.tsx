import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as BiIcons from "react-icons/bi";
import styles from "./RecoveryPass.module.css";
import { recoveryPass } from "../../reducers/Login/loginSlice";
import { AppDispatch, RootState } from "../../store";

export const RecoveryPass = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState({
    username: "",
    empresa: "",
  });

  const { recoveryMessage } = useSelector((state: RootState) => state.login);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newForm = { ...input, [name]: value };
    setInput(newForm);
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(recoveryPass(input));
    setInput({
      username: "",
      empresa: "",
    });
  };
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Planes de Ahorro 7</h3>
      <form className={styles.form} action="">
        <span>Coloque su nombre de usuario y empresa</span>
        <select
          style={{ padding: "0", height: "2.4rem" }}
          name="empresa"
          className={styles.input}
          value={input.empresa}
          onChange={handleChange}
        >
          <option value="">-Elegir empresa-</option>
          <option value="pa7_cg" id="carGroup">
            Car Group S.A.
          </option>
          <option value="pa7_gf_test_2" id="gestionFinanciera">
            Gestion Financiera S.A.
          </option>
          <option value="Auto Net S.A." id="autoNet">
            AutoNet S.A
          </option>
          <option value="Autos del Plata S.A." id="autosDelPlata">
            Autos del Plata S.A.
          </option>
          <option value="Detroit S.A." id="detroit">
            Detroit S.A.
          </option>
          <option
            value="Gestion Financiera Luxcar"
            id="gestionFinancieraLuxcar"
          >
            Gestión Financiera Luxcar
          </option>
          <option value="Alizze S.A." id="alizze">
            Alizze S.A.
          </option>
        </select>
        <div style={{ position: "relative", margin: "1rem" }}>
          <BiIcons.BiUser className={styles.icon} />
          <input
            type="text"
            className={styles.input}
            name="username"
            value={input.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
          />
        </div>
        <button className={styles.btn} onClick={onSubmit}>
          Enviar
        </button>
        {recoveryMessage ? (
          <p style={{ marginTop: "1rem" }}>{recoveryMessage.message}</p>
        ) : null}
      </form>
    </div>
  );
};
