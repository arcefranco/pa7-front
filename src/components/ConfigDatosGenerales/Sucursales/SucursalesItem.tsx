import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";
import {
  beginUpdate,
  endUpdate,
  deleteSucursal,
  updateSucursal,
} from "../../../reducers/ConfigDatosGenerales/Sucursales/SucursalesSlice";
import styles from "../../../styles/Table.module.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../store";
const SucursalesItem = ({ Codigo, Nombre }) => {
  const [item, setItem] = useState({
    Codigo: Codigo,
    Nombre: Nombre,
  });
  const [edit, setEdit] = useState(false);
  const { sucursalStatus } = useSelector(
    (state: RootState) => state.sucursales
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...item, [name]: value };

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
      title: `Seguro que desea eliminar la sucursal ${Nombre}?`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSucursal({ Codigo: Codigo }));
      }
    });
  };

  const handleSubmitUpdate = () => {
    if (sucursalStatus?.codigo) {
      dispatch(updateSucursal(item));
    }
    setEdit(false);
  };

  useEffect(() => {
    if (!sucursalStatus?.hasOwnProperty("codigo")) {
      //esta mirando el estado de sucursalStatus (inUpdate) para inhabilitar la edicion mientras este en false
      setEdit(false);
    }
  }, [sucursalStatus]);
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
        {item.Nombre !== Nombre ? (
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

export default SucursalesItem;
