import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";
import {
  beginUpdate,
  endUpdate,
  deletePuntoDeVenta,
  updatePuntoDeVenta,
} from "../../../reducers/ConfigDatosGenerales/PuntosDeVenta/puntosSlice";
import styles from "../../../styles/Table.module.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../store";
const PuntosItem = ({ Codigo, Nombre }) => {
  const [item, setItem] = useState({
    Codigo: Codigo,
    Nombre: Nombre,
  });
  const [edit, setEdit] = useState(false);
  const { sucursales } = useSelector((state: RootState) => state);
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
      title: `Seguro que desea eliminar el punto de venta ${Nombre}?`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePuntoDeVenta({ Codigo: Codigo }));
      }
    });
  };

  const handleSubmitUpdate = () => {
    dispatch(updatePuntoDeVenta(item));
    setEdit(false);
  };

  useEffect(() => {
    if (
      !sucursales?.sucursalStatus?.hasOwnProperty("status") &&
      !sucursales?.sucursalStatus?.hasOwnProperty(
        "codigo"
      ) /* || sucursales.isError */
    ) {
      //esta mirando el estado de sucursales?.sucursalStatus (inUpdate) para inhabilitar la edicion mientras este en false
      setEdit(false);
    }
  }, [sucursales?.sucursalStatus]);
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

export default PuntosItem;
