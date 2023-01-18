import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";
import {
  endUpdate,
  updateTeamLeaders,
  deleteTeamLeaders,
  beginUpdate,
} from "../../../reducers/ConfigDatosGenerales/TeamLeaders/teamLeadersSlice";
import styles from "../../../styles/Table.module.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../store";
const TeamLeadersItem = ({ Codigo, Nombre, Supervisor, Activo }) => {
  const [item, setItem] = useState({
    Codigo: Codigo,
    Nombre: Nombre,
    Supervisor: Supervisor,
    Activo: Activo,
  });
  const [edit, setEdit] = useState(false);
  const { statusNuevoTeamLeader, supervisores, isError } = useSelector(
    (state: RootState) => state.teamLeaders
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parseValue = value;
    if (name === "Supervisor") {
      parseValue = parseInt(value);
    }
    const newForm = { ...item, [name]: parseValue };

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

  const handleDelete = () => {
    Swal.fire({
      icon: "info",
      title: `Seguro que desea eliminar el Team Leader ${Nombre}?`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTeamLeaders({ Codigo: Codigo }));
      }
    });
  };

  const handleSubmitUpdate = () => {
    dispatch(updateTeamLeaders(item));
    setEdit(false);
  };

  const handleCheckChange = (e) => {
    const { name } = e.target;
    var value = e.target.checked;
    value = e.target.checked ? 1 : 0;
    const newForm = { ...item, [name]: value };
    setItem(newForm);
  };

  useEffect(() => {
    if (
      !statusNuevoTeamLeader?.hasOwnProperty("status") &&
      !statusNuevoTeamLeader?.hasOwnProperty("codigo")
    ) {
      //esta mirando el estado de sucursalStatus (inUpdate) para inhabilitar la edicion mientras este en false
      setEdit(false);
    }
  }, [statusNuevoTeamLeader]);

  const thisSupervisor = supervisores?.find((e) => e.Codigo === Supervisor);

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
        {!edit ? (
          <span>{thisSupervisor?.Nombre}</span>
        ) : (
          <select
            style={{
              border: "none",
              background: "none",
            }}
            name="Supervisor"
            value={item.Supervisor}
            onChange={handleChange}
            id=""
          >
            {thisSupervisor && (
              <option value={thisSupervisor.Codigo}>
                {thisSupervisor.Nombre}
              </option>
            )}
            <option value="*">---</option>
            {supervisores &&
              supervisores.map((e) => (
                <option value={e.Codigo}>{e.Nombre}</option>
              ))}
          </select>
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
          <input type="checkbox" disabled checked />
        ) : (
          <input type="checkbox" disabled />
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
        item.Activo !== Activo ||
        item.Supervisor !== Supervisor ? (
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

export default TeamLeadersItem;
