import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";
import {
  beginUpdate,
  endUpdate,
  deleteSupervisores,
  updateSupervisores,
} from "../../../reducers/ConfigDatosGenerales/Supervisores/supervisoresSlice";
import styles from "../../../styles/Table.module.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../store";
import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";
const SupervisoresItem = ({
  Codigo,
  Nombre,
  Email,
  Gerente,
  EsMicro,
  VPM,
  Activo,
  Zona,
}) => {
  const [item, setItem] = useState<Supervisor>({
    Codigo: Codigo,
    Nombre: Nombre,
    Email: Email,
    Gerente: Gerente,
    EsMicro: EsMicro,
    VPM: VPM,
    Activo: Activo,
    Zona: Zona,
  });
  const [edit, setEdit] = useState(false);
  const { statusNuevoSupervisor, gerentes, zonas, isError } = useSelector(
    (state: RootState) => state.supervisores
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parseValue = value;
    if (
      name === "EsMicro" ||
      name === "VPM" ||
      name === "Activo" ||
      name === "Gerente" ||
      name === "Zona"
    ) {
      parseValue = !isNaN(value) ? parseInt(value) : value;
    }
    const newForm = { ...item, [name]: parseValue === "*" ? null : parseValue };

    setItem(newForm);
  };

  const handleEdit = () => {
    dispatch(beginUpdate({ Codigo: Codigo }));
    setEdit(true);
  };

  const handleStopEdit = () => {
    dispatch(endUpdate({ Codigo: Codigo }));
    setEdit(false);
  };
  const handleCheckChange = (e) => {
    const { name } = e.target;
    var value = e.target.checked;
    value = e.target.checked ? 1 : 0;
    const newForm = { ...item, [name]: value };
    setItem(newForm);
  };

  const handleDelete = () => {
    Swal.fire({
      icon: "info",
      title: `Seguro que desea eliminar la sucursal ${Nombre}?`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSupervisores({ Codigo: Codigo }));
      }
    });
  };

  const handleSubmitUpdate = () => {
    dispatch(updateSupervisores(item));
    setEdit(false);
  };

  useEffect(() => {
    if (
      !statusNuevoSupervisor?.hasOwnProperty("status") &&
      !statusNuevoSupervisor?.hasOwnProperty("codigo")
    ) {
      //esta mirando el estado de statusNuevoSupervisor (inUpdate) para inhabilitar la edicion mientras este en false
      setEdit(false);
    }
  }, [statusNuevoSupervisor]);

  const thisGerente = gerentes?.find((e) => e.Codigo === Gerente);
  const thisZona = zonas?.find((e) => e.codigo === Zona);
  return (
    <tr>
      <td>
        <span>{Codigo}</span>
      </td>
      <td>
        {edit ? (
          <input
            type="text"
            name="Nombre"
            value={item.Nombre}
            onChange={handleChange}
          />
        ) : (
          <span>{Nombre}</span>
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="text"
            name="Email"
            value={item.Email}
            onChange={handleChange}
          />
        ) : (
          <span>{Email}</span>
        )}
      </td>

      <td>
        {edit ? (
          <select
            className={styles.select}
            name="Gerente"
            value={typeof item.Gerente === "number" ? item.Gerente : undefined}
            onChange={handleChange}
            id=""
          >
            {thisGerente && (
              <option value={thisGerente.Codigo}>{thisGerente.Nombre}</option>
            )}
            <option value="*">---</option>
            {gerentes &&
              gerentes.map((e) => <option value={e.Codigo}>{e.Nombre}</option>)}
          </select>
        ) : (
          <span>{thisGerente?.Nombre}</span>
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="checkbox"
            name="EsMicro"
            value={item.EsMicro}
            onChange={handleCheckChange}
          />
        ) : item.EsMicro === 1 ? (
          <input type="checkbox" readOnly={true} checked />
        ) : (
          <input type="checkbox" disabled readOnly />
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="text"
            name="VPM"
            value={typeof item.VPM === "number" ? item.VPM : undefined}
            onChange={handleChange}
          />
        ) : (
          <span>{VPM}</span>
        )}
      </td>
      <td>
        {edit ? (
          <input
            type="checkbox"
            name="Activo"
            value={item.Activo}
            onChange={handleCheckChange}
          />
        ) : item.Activo === 1 ? (
          <input type="checkbox" checked readOnly={true} />
        ) : (
          <input type="checkbox" disabled readOnly />
        )}
      </td>
      <td>
        {edit ? (
          <select
            className={styles.select}
            name="Zona"
            value={typeof item.Zona === "number" ? item.Zona : undefined}
            onChange={handleChange}
            id=""
          >
            {thisZona && (
              <option value={thisZona.codigo}>{thisZona.Nombre}</option>
            )}
            <option value="*">---</option>
            {zonas &&
              zonas.map((e) => <option value={e.codigo}>{e.Nombre}</option>)}
          </select>
        ) : (
          <span>{thisZona?.Nombre}</span>
        )}
      </td>

      <td>
        {edit ? (
          <AiIcons.AiFillCloseCircle
            style={{ color: "red", marginLeft: "0.5rem", cursor: "pointer" }}
            onClick={handleStopEdit}
          />
        ) : (
          <AiIcons.AiFillEdit
            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
            onClick={handleEdit}
          />
        )}
      </td>
      <td>
        {item.Nombre !== Nombre ||
        item.Email !== Email ||
        item.Gerente !== Gerente ||
        item.EsMicro !== EsMicro ||
        item.VPM !== VPM ||
        item.Activo !== Activo ||
        item.Zona !== Zona ? (
          <button
            className={`${styles.buttonRows} ${styles.modify}`}
            onClick={handleSubmitUpdate}
          >
            Guardar datos
          </button>
        ) : (
          <button className={`${styles.buttonRows} ${styles.disabled}`}>
            Guardar datos
          </button>
        )}
      </td>
      <td>
        <button
          className={`${styles.buttonRows} ${styles.delete}`}
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default SupervisoresItem;
