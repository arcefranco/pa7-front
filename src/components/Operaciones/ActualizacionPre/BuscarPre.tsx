import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPreOperaciones } from "../../../reducers/Operaciones/actualPre/actualPreSlice";
import styles from "./ActualPre.module.css";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../store";

const BuscarPre = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.login);
  const { solicitudes } = useSelector((state: RootState) => state.ActualPre);

  const [input, setInput] = useState({
    Solicitud: "",
    Apellido: "",
    Documento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...input, [name]: value };

    setInput(newForm);
  };

  const onSubmit = () => {
    dispatch(
      getPreOperaciones({
        marca: user?.codigoMarca ? user.codigoMarca : 0,
        Solicitud: input.Solicitud,
        Apellido: input.Apellido,
        Documento: input.Documento,
      })
    );
  };

  useEffect(() => {
    solicitudes?.length === 1 &&
      navigate(
        `/operaciones/actualizacionPre/${user?.codigoMarca}/${solicitudes[0]?.Numero}`
      );
  }, [solicitudes]);

  return (
    <div className={styles.searchForm}>
      <div className={styles.inputForm}>
        <span>Nro. Solicitud</span>
        {solicitudes.length ? (
          <input type="text" disabled></input>
        ) : (
          <input
            name="Solicitud"
            value={input.Solicitud}
            onChange={handleChange}
            type="number"
          />
        )}
      </div>

      <div className={styles.inputForm}>
        <span>Apellido</span>
        {solicitudes.length ? (
          <input type="text" disabled></input>
        ) : (
          <input
            name="Apellido"
            value={input.Apellido}
            onChange={handleChange}
            type="text"
          />
        )}
      </div>

      <div className={styles.inputForm}>
        <span>Nro. Documento</span>
        {solicitudes.length ? (
          <input type="text" disabled></input>
        ) : (
          <input
            name="Documento"
            value={input.Documento}
            onChange={handleChange}
            type="number"
          />
        )}
      </div>
      {solicitudes.length ? (
        <div className={styles.inputForm}>
          <span>
            <b>Seleccione</b>
          </span>
          <div></div>
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              background: "white",
              maxHeight: "10rem",
            }}
          >
            <table
              style={{
                fontSize: "x-small",
                display: "flex",
                overflowY: "scroll",
                width: "17rem",
                flexDirection: "column",
              }}
            >
              <tr
                style={{
                  position: "fixed",
                  display: "flex",
                  background: "gray",
                  color: "white",

                  width: "16rem",
                }}
              >
                <td style={{ width: "3rem" }}>Numero</td>
                <td style={{ width: "3rem" }}>Solicitud</td>
                <td style={{ marginLeft: "20px" }}>Nombre</td>
              </tr>
              <tr className={styles.optionTr}>
                {" "}
                {/* para que no se tape el primer item, esto no se ve pero esta por debajo del encabezado orginial */}
                <td style={{ width: "3rem" }}>Numero</td>
                <td style={{ width: "3rem" }}>Solicitud</td>
                <td style={{ marginLeft: "20px" }}>Nombre</td>
              </tr>

              {solicitudes
                ? solicitudes?.map((e) => (
                    <tr
                      onClick={() =>
                        navigate(
                          `/operaciones/actualizacionPre/${user?.codigoMarca}/${e.Numero}`
                        )
                      }
                      className={styles.optionTr}
                    >
                      <td style={{ width: "3rem" }}>{e.Numero}</td>
                      <td style={{ width: "3rem", marginLeft: "7px" }}>
                        {e.Solicitud}
                      </td>
                      <td
                        style={{
                          display: "flex",
                          marginLeft: "15px",
                          width: "10rem",
                        }}
                      >
                        {e.Apellido}, {e.Nombres}
                      </td>
                    </tr>
                  ))
                : null}
            </table>
          </div>
        </div>
      ) : null}

      {solicitudes.length ? (
        <button className={styles.searchButtonDisabled}>Buscar</button>
      ) : (
        <button onClick={onSubmit} className={styles.searchButton}>
          Buscar
        </button>
      )}
    </div>
  );
};

export default BuscarPre;
