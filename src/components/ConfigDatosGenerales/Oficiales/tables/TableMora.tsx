import { useEffect, useState, useRef } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../../styled-components/tables/TableContainer";
import ButtonPrimary from "../../../../styled-components/buttons/ButtonPrimary";
import {
  deleteOficiales,
  getOficialSelected,
  createOficiales,
  endUpdate,
} from "../../../../reducers/ConfigDatosGenerales/Oficiales/OficialesSlice";
import styles from "../../../../styles/Table.module.css";
import * as AiIcons from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import Pagination from "../../../Pagination/Pagination";
import { useParams } from "react-router-dom";
import OficialItem from "../OficialItem";
import { AppDispatch, RootState } from "../../../../store";
import { Oficial } from "../../../../types/ConfigDatosGenerales/Oficiales/Oficiales";

const TableMora = () => {
  const { oficialesSelected, oficialStatus } = useSelector(
    (state: RootState) => state.oficiales
  );
  const { usuarios } = useSelector((state: RootState) => state.usuarios);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.login);
  const rolAltayModif = user?.roles.find(
    (e) => e.rl_codigo === "1.2.2" || e.rl_codigo === "1"
  );
  const [oficialesFiltered, setOficialesFiltered] = useState<Oficial[]>([]);
  const [filterNombre, setFilterNombre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [modal, setModal] = useState(false);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [inEdit, setInEdit] = useState("");
  const [newField, setNewField] = useState(false);
  const [newOficial, setNewOficial] = useState<Oficial>({
    categoria: "Mora",
    Nombre: "",
    Activo: 0,
    TipoOficialMora: null,
    Usuario: "",
  });
  const actualInEdit = useRef(inEdit);
  const { table } = useParams();

  useEffect(() => {
    dispatch(getOficialSelected({ oficialName: "Mora" }));
  }, []);

  useEffect(() => {
    setOficialesFiltered(oficialesSelected);
  }, [oficialesSelected]);

  useEffect(() => {
    if (filterNombre.length) {
      setCurrentPage(1);

      setOficialesFiltered(
        oficialesSelected.filter((e) => {
          return e.Nombre.toLowerCase().includes(
            filterNombre.toLocaleLowerCase()
          );
        })
      );
    } else {
      setOficialesFiltered(oficialesSelected);
    }
  }, [filterNombre]);

  useEffect(() => {
    actualInEdit.current = inEdit; //Actualizar el estado de inEdit para hacer el endUpdate al actualizar/desmontar
  }, [inEdit]);

  useEffect(() => {
    function endEdit() {
      dispatch(
        endUpdate({ Codigo: parseInt(actualInEdit.current), categoria: "Mora" })
      );
    }

    window.addEventListener("beforeunload", endEdit);

    return () => {
      window.removeEventListener("beforeunload", endEdit);
      dispatch(
        endUpdate({ Codigo: parseInt(actualInEdit.current), categoria: "Mora" })
      );
    };
  }, []);

  useEffect(() => {
    if (oficialStatus && Object.keys(oficialStatus).includes("codigo")) {
      setInEdit(oficialStatus?.codigo ? oficialStatus.codigo : "");
    }

    if (oficialStatus?.status === false) {
      setModal(true);
    }
  }, [oficialStatus]);

  useEffect(() => {
    //Manejar actualizaciones de vendedores (ABM) y su inUpdate
    setModal(true);

    if (oficialStatus?.status === true) {
      resetNewField();
      dispatch(getOficialSelected({ oficialName: "Mora" }));
    }
  }, [oficialStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parseValue = value;
    if (name === "TipoOficialMora") {
      parseValue = !isNaN(value) ? parseInt(value) : value;
    }
    const newForm = {
      ...newOficial,
      [name]: parseValue === "*" ? null : parseValue,
    };

    setNewOficial(newForm);
  };
  const handleSubmit = () => {
    dispatch(createOficiales(newOficial));
  };
  const handleCheckChange = (e) => {
    const { name } = e.target;
    var value = e.target.checked;
    value = e.target.checked ? 1 : 0;
    const newForm = { ...newOficial, [name]: value };
    setNewOficial(newForm);
  };

  const resetNewField = () => {
    setNewField(false);
    setNewOficial({
      Nombre: "",
      Activo: 0,
    });
  };
  const currentRecords = oficialesFiltered.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(oficialesFiltered?.length / recordsPerPage);
  return (
    <TableContainer>
      <div className={styles.buttonAddContainer}>
        <ReactTooltip id="botonTooltip2">Agregar nuevo oficial</ReactTooltip>
        <AiIcons.AiFillPlusCircle
          className={styles.plusCircle}
          onClick={() => setNewField(!newField)}
          data-tip
          data-for="botonTooltip2"
        />
      </div>
      <table>
        <tr>
          <th>Código</th>
          <th>
            Nombre
            <br />
            <input
              type="text"
              className={styles.inputFilterColumn}
              value={filterNombre}
              onChange={(e) => setFilterNombre(e.target.value)}
            />
          </th>
          <th>Usuario</th>
          <th>Tipo Oficial Mora</th>
          <th>Activo</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>

        {newField && (
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                name="Nombre"
                value={newOficial.Nombre}
                onChange={handleChange}
              />
            </td>
            <td>
              <select
                name="Usuario"
                id=""
                value={newOficial.Usuario}
                onChange={handleChange}
              >
                <option value="*">---</option>
                {usuarios &&
                  usuarios.map((e) => (
                    <option value={e.Usuario}>{e.Usuario}</option>
                  ))}
              </select>
            </td>
            <td>
              <select
                value={
                  newOficial.TipoOficialMora ? newOficial.TipoOficialMora : ""
                }
                name="TipoOficialMora"
                onChange={handleChange}
              >
                <option value="*">---</option>
                <option value={1}>Temprana</option>
                <option value={2}>Especializada</option>
                <option value={3}>Encuadre</option>
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                name="Activo"
                value={newOficial.Activo}
                onChange={handleCheckChange}
              />
            </td>
            <td></td>
            <td>
              <ButtonPrimary onClick={handleSubmit}>Agregar</ButtonPrimary>
            </td>
            <td></td>
          </tr>
        )}

        {currentRecords &&
          currentRecords.map((e) => (
            <OficialItem
              key={e.Codigo}
              Categoria={"Mora"}
              Codigo={e.Codigo}
              Nombre={e.Nombre}
              Activo={e.Activo}
              Inactivo={e.Inactivo}
              IdUsuarioLogin={e.IdUsuarioLogin}
              TipoOficialMora={e.TipoOficialMora}
              HNMayor40={null}
              Objetivo={null}
              Supervisor={null}
              login={null}
            />
          ))}
      </table>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </TableContainer>
  );
};

export default TableMora;
