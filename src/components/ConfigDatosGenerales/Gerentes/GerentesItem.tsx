import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";
import {
  updateGerentes,
  deleteGerentes,
  beginUpdate,
  endUpdate,
} from "../../../reducers/ConfigDatosGenerales/Gerentes/gerentesSlice";
import styles from "../../../styles/Table.module.css";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../../../store";

const GerentesItem = ({ Codigo, Nombre, Activo }) => {
  const [item, setItem] = useState<Gerente>({
    Codigo: Codigo,
    Nombre: Nombre,
    Activo: Activo,
  });

  const { statusNuevoGerente, isError } = useSelector(
    (state: RootState) => state.gerentes
  );

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!statusNuevoGerente?.hasOwnProperty("codigo")) {
      //esta mirando el estado de statusNuevoGerente (inUpdate) para inhabilitar la edicion mientras este en false
      setEdit(false);
    }
  }, [statusNuevoGerente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = { ...item, [name]: value };

    setItem(newForm);
  };

  const handleCheckChange = (e) => {
    const { name } = e.target;
    var value = e.target.checked;
    value = e.target.checked ? 1 : 0;
    const newForm = { ...item, [name]: value };
    setItem(newForm);
  };

  const handleSubmitUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(updateGerentes(item));
  };

  const handleDelete = () => {
    Swal.fire({
      icon: "info",
      title: `Seguro que desea eliminar el gerente ${Nombre}?`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGerentes({ Codigo: Codigo }));
      }
    });
  };

  const handleEdit = () => {
    dispatch(beginUpdate({ Codigo: Codigo }));
    setEdit(true);
  };

  return (
    <tr>
      <td>{Codigo}</td>

      <td style={{ width: "30rem" }}>
        {edit ? (
          <span style={{ width: "5rem" }}>
            <input
              type="text"
              className={styles.inputFilter}
              name="Nombre"
              value={item.Nombre}
              onChange={handleChange}
            />
          </span>
        ) : (
          <span style={{ width: "5rem" }}>{item.Nombre}</span>
        )}
      </td>

      <td>
        {edit ? (
          <input
            name="Activo"
            type="checkbox"
            value={item.Activo}
            checked={item.Activo === 1 ? true : false}
            onChange={handleCheckChange}
          />
        ) : (
          <input
            name="Activo"
            type="checkbox"
            disabled
            checked={item.Activo === 1 ? true : false}
            onChange={handleCheckChange}
          />
        )}
      </td>

      <td>
        {!edit ? (
          <AiIcons.AiFillEdit
            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
            onClick={handleEdit}
          />
        ) : (
          <AiIcons.AiFillCloseCircle
            style={{ color: "red", marginLeft: "0.5rem", cursor: "pointer" }}
            onClick={() => {
              dispatch(endUpdate({ Codigo: Codigo }));
              setEdit(false);
            }}
          />
        )}
      </td>
      <td>
        {item.Activo === Activo && item.Nombre === Nombre ? (
          <button
            disabled
            className={`${styles.buttonRows} ${styles.disabled}`}
          >
            Guardar datos
          </button>
        ) : (
          <button
            className={`${styles.buttonRows} ${styles.modify}`}
            onClick={(e) => handleSubmitUpdate(e)}
          >
            Guardar datos
          </button>
        )}
      </td>
      <td>
        <button
          onClick={handleDelete}
          className={`${styles.buttonRows} ${styles.delete}`}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default GerentesItem;
