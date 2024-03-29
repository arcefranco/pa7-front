import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as MdIcons from "react-icons/md";
import Swal from "sweetalert2";
import styles from "./ListaItem.module.css";
import {
  getListas,
  modelosOnLista,
  reset,
  insertModeloLista,
  deleteLista,
  updateLista,
  resetStatus,
} from "../../../reducers/ConfigDatosGenerales/ListasPrecios/ListaSlice";
import TableContainer from "../../../styled-components/tables/TableContainer";
import { useEffect } from "react";
import ReactTooltip from "react-tooltip";
import ButtonPrimary from "../../../styled-components/buttons/ButtonPrimary";
import * as AiIcons from "react-icons/ai";

import ModeloItem from "./ModeloItem";
import { AppDispatch, RootState } from "../../../store";

const ListaItem = ({ Codigo, Descripcion, VigenciaD, VigenciaH }) => {
  const [activo, setActivo] = useState(false);

  const [newModelo, setNewModelo] = useState(false);
  const [edit, setEdit] = useState(false);
  const { user } = useSelector((state: RootState) => state.login);
  const { modeloOnLista, modelos, createdModelo, deletedModelo, updatedLista } =
    useSelector((state: RootState) => state.listasprecios);
  const [createModelo, setCreateModelo] = useState({
    Modelo: "",
    Precio: "",
    Lista: Codigo,
    Marca: user?.codigoMarca,
  });

  const [editLista, setEditLista] = useState({
    Codigo: Codigo,
    Descripcion: Descripcion,
    VigenciaDesde: VigenciaD,
    VigenciaHasta: VigenciaH,
  });

  const dispatch = useDispatch<AppDispatch>();

  const onClick = (lista) => {
    setActivo(!activo);
    dispatch(
      modelosOnLista({
        lista: lista,
        marca: user?.codigoMarca,
      })
    );
  };

  useEffect(() => {
    if (createdModelo?.lista) {
      dispatch(
        modelosOnLista({
          lista: createdModelo.lista,
          marca: user?.codigoMarca,
        })
      );
      dispatch(resetStatus());
      setNewModelo(false);
    }
  }, [createdModelo?.lista]);

  useEffect(() => {
    if (deletedModelo?.lista) {
      dispatch(
        modelosOnLista({
          lista: deletedModelo.lista,
          marca: user?.codigoMarca,
        })
      );
      dispatch(resetStatus());
    }
  }, [deletedModelo?.lista]);

  useEffect(() => {
    if (updatedLista?.status === true) {
      dispatch(getListas());
    }
  }, [updatedLista]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newForm = { ...createModelo, [name]: value };
    setCreateModelo(newForm);
  };

  const handleEditChange = (e) => {
    let { name, value } = e.target;
    if (name === "VigenciaD") value = value.split("-").reverse().join("-");
    if (name === "VigenciaH") value = value.split("-").reverse().join("-");
    const newForm = { ...editLista, [name]: value };
    setEditLista(newForm);
  };

  const onClickDown = () => {
    dispatch(reset());
    setActivo(!activo);
  };

  const onDelete = (codigo) => {
    Swal.fire({
      icon: "info",
      title:
        "¿Esta seguro que desea eliminar la lista y los precios de sus modelos asociados?",
      showConfirmButton: true,
      showCancelButton: true,
      timer: 10000,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLista({ Codigo: codigo }));
      }
    });
  };

  const handleInsertModelo = () => {
    dispatch(insertModeloLista(createModelo));
    setCreateModelo({
      Modelo: "",
      Precio: "",
      Lista: Codigo,
      Marca: user?.codigoMarca,
    });
  };

  return (
    <div className={styles.item}>
      {activo ? (
        <MdIcons.MdOutlineKeyboardArrowDown
          className={styles.arrow}
          onClick={() => onClickDown()}
        />
      ) : (
        <MdIcons.MdOutlineKeyboardArrowDown
          className={styles.arrowDown}
          onClick={() => onClick(Codigo)}
        />
      )}
      {edit ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <span className={styles.span}>Codigo: {Codigo}</span>

          <input
            type="text"
            value={editLista.Descripcion}
            name="Descripcion"
            placeholder="Descripcion"
            onChange={handleEditChange}
          />
          <div>
            <span className={styles.span}>
              <b>Vigencia Desde: </b>{" "}
            </span>
            <input
              type="date"
              name="VigenciaD"
              value={editLista.VigenciaDesde.split("-").reverse().join("-")}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <span className={styles.span}>
              {" "}
              <b>Vigencia Hasta: </b>
            </span>
            <input
              type="date"
              name="VigenciaH"
              value={editLista.VigenciaHasta?.split("-").reverse().join("-")}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <AiIcons.AiFillCheckCircle
              onClick={() => {
                dispatch(updateLista(editLista));
                setEdit(false);
              }}
            />
          </div>
          <div>
            <AiIcons.AiFillCloseCircle
              onClick={() => {
                setEdit(false);
                setEditLista({
                  Codigo: Codigo,
                  Descripcion: Descripcion,
                  VigenciaDesde: VigenciaD,
                  VigenciaHasta: VigenciaH,
                });
              }}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <span className={styles.span}>Codigo: {Codigo}</span>
          <span className={styles.span}>{Descripcion}</span>
          <span className={styles.span}>
            <b>Vigencia Desde:</b> {VigenciaD}
          </span>
          <span className={styles.span}>
            {" "}
            <b>Vigencia Hasta:</b> {VigenciaH}
          </span>
          {activo ? (
            <div>
              <ReactTooltip id="botonTooltip">
                Agregar nuevo modelo
              </ReactTooltip>
              <AiIcons.AiFillPlusCircle
                data-tip
                data-for="botonTooltip"
                onClick={() => {
                  setNewModelo(!newModelo);
                }}
              />
            </div>
          ) : (
            <div>
              <AiIcons.AiFillCloseCircle
                style={{ color: "red" }}
                onClick={() => onDelete(Codigo)}
              />
              <AiIcons.AiFillEdit
                style={{ marginLeft: "0.5rem" }}
                onClick={() => setEdit(true)}
              />
            </div>
          )}
        </div>
      )}
      {activo && modeloOnLista && (
        <TableContainer>
          <table>
            <tr>
              <th>Codigo</th>
              <th>Modelo</th>
              <th>Precio</th>
              <th></th>
              <th></th>
            </tr>
            {newModelo && (
              <tr>
                <td></td>
                <td>
                  <select name="Modelo" id="" onChange={handleChange}>
                    <option value="*">---</option>
                    {modelos &&
                      modelos
                        .filter((m) => {
                          return !modeloOnLista.some((object) => {
                            return m.Codigo === object.CodigoModelo;
                          });
                        })
                        .map((e) => (
                          <option value={e.Codigo}>
                            {e.Codigo} {e.Nombre}
                          </option>
                        ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="Precio"
                    value={createModelo.Precio}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <ButtonPrimary
                    style={{ margin: "0.8em" }}
                    onClick={handleInsertModelo}
                  >
                    Agregar
                  </ButtonPrimary>
                </td>
              </tr>
            )}
            {Array.isArray(modeloOnLista) &&
              modeloOnLista?.map((e) => (
                <ModeloItem
                  key={e.CodigoModelo}
                  Lista={Codigo}
                  Codigo={e.CodigoModelo}
                  Nombre={e.Nombre}
                  Precio={e.Precio}
                />
              ))}
          </table>
        </TableContainer>
      )}
    </div>
  );
};

export default ListaItem;
