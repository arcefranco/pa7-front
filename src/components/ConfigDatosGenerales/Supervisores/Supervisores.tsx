import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSupervisores,
  postSupervisores,
  resetStatus,
  endUpdate,
  getAllGerentes,
  getAllZonas,
} from "../../../reducers/ConfigDatosGenerales/Supervisores/supervisoresSlice";
import styles from "../../../styles/Table.module.css";
import * as AiIcons from "react-icons/ai";
import SupervisoresItem from "./SupervisoresItem";
import Pagination from "../../Pagination/Pagination";
import TitleLogo from "../../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../../styled-components/h/TitlePrimary";
import TableContainer from "../../../styled-components/tables/TableContainer";
import ModalStatus from "../../ModalStatus";
import ReactTooltip from "react-tooltip";
import { ReturnLogo } from "../../../helpers/ReturnLogo";
import ButtonPrimary from "../../../styled-components/buttons/ButtonPrimary";
import { RootState, AppDispatch } from "../../../store";
import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";

const Supervisores = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.login);
  const {
    supervisores,
    statusNuevoSupervisor,
    gerentes,
    zonas,
    isError,
    isSuccess,
  } = useSelector((state: RootState) => state.supervisores);
  const [supervisoresFiltered, setSupervisoresFiltered] = useState<
    Supervisor[]
  >([]);
  const [filterNombre, setFilterNombre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [modal, setModal] = useState(false);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [inEdit, setInEdit] = useState("");
  const [newField, setNewField] = useState(false);
  const [newSupervisor, setNewSupervisor] = useState({
    Nombre: "",
    Email: "",
    Gerente: null,
    EsMicro: 0,
    VPM: null,
    Activo: 0,
    Zona: null,
  });
  const actualInEdit = useRef(inEdit);
  useEffect(() => {
    Promise.all([
      dispatch(getSupervisores()),
      dispatch(getAllGerentes()),
      dispatch(getAllZonas()),
    ]);
  }, []);

  useEffect(() => {
    setSupervisoresFiltered(supervisores);
  }, [supervisores]);

  useEffect(() => {
    actualInEdit.current = inEdit; //Actualizar el estado de inEdit para hacer el endUpdate al actualizar/desmontar
  }, [inEdit]);

  useEffect(() => {
    function endEdit() {
      dispatch(endUpdate({ Codigo: actualInEdit.current }));
    }

    window.addEventListener("beforeunload", endEdit);

    return () => {
      window.removeEventListener("beforeunload", endEdit);
      dispatch(endUpdate({ Codigo: actualInEdit.current }));
    };
  }, []);

  useEffect(() => {
    //Manejar actualizaciones de vendedores (ABM) y su inUpdate
    setModal(true);

    function resetModal() {
      dispatch(resetStatus());
      setModal(false);
    }

    if (
      statusNuevoSupervisor &&
      Object.keys(statusNuevoSupervisor).length &&
      !statusNuevoSupervisor.hasOwnProperty("codigo")
    ) {
      setTimeout(resetModal, 5000);
    }

    if (statusNuevoSupervisor?.status === true) {
      resetNewField();
      dispatch(getSupervisores());
    }
  }, [statusNuevoSupervisor]);

  useEffect(() => {
    if (
      statusNuevoSupervisor &&
      Object.keys(statusNuevoSupervisor).includes("codigo") &&
      typeof statusNuevoSupervisor.codigo === "string"
    ) {
      setInEdit(statusNuevoSupervisor.codigo);
    }

    if (statusNuevoSupervisor?.status === false) {
      setModal(true);
    }
  }, [statusNuevoSupervisor]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let parseValue = value;
    if (
      name === "Zona" ||
      name === "VPM" ||
      name === "Supervisor" ||
      name === "Gerente"
    ) {
      parseValue = !isNaN(value) ? parseInt(value) : value;
    }
    const newForm = {
      ...newSupervisor,
      [name]: parseValue === "*" ? null : parseValue,
    };

    setNewSupervisor(newForm);
  };
  useEffect(() => {
    if (filterNombre.length) {
      setCurrentPage(1);

      setSupervisoresFiltered(
        supervisores.filter((e) => {
          return e.Nombre.toLowerCase().includes(
            filterNombre.toLocaleLowerCase()
          );
        })
      );
    } else {
      setSupervisoresFiltered(supervisores);
    }
  }, [filterNombre]);

  const handleCheckChange = (e) => {
    const { name } = e.target;
    var value = e.target.checked;
    value = e.target.checked ? 1 : 0;
    const newForm = { ...newSupervisor, [name]: value };
    setNewSupervisor(newForm);
  };

  const handleSubmit = () => {
    dispatch(postSupervisores(newSupervisor));
  };

  const resetNewField = () => {
    setNewField(false);
    setNewSupervisor({
      ...newSupervisor,
      Nombre: "",
    });
  };

  const currentRecords = supervisoresFiltered.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(supervisoresFiltered?.length / recordsPerPage);

  return (
    <div className={styles.container}>
      {modal &&
      statusNuevoSupervisor &&
      Object.keys(statusNuevoSupervisor).length &&
      !statusNuevoSupervisor.codigo ? (
        <ModalStatus
          status={statusNuevoSupervisor?.status}
          message={statusNuevoSupervisor?.message}
        />
      ) : null}

      <TitleLogo>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary>Supervisores</TitlePrimary>
      </TitleLogo>
      <div className={styles.buttonAddContainer}>
        <ReactTooltip id="botonTooltip2">Agregar nuevo supervisor</ReactTooltip>
        <AiIcons.AiFillPlusCircle
          className={styles.plusCircle}
          onClick={() => setNewField(!newField)}
          data-tip
          data-for="botonTooltip2"
        />
      </div>

      <TableContainer>
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
            <th>Email</th>
            <th>Gerente</th>
            <th>EsMicro</th>
            <th>V. Promedio Movil</th>
            <th>Activo</th>
            <th>Zona</th>
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
                  value={newSupervisor.Nombre}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="Email"
                  value={newSupervisor.Email}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="Gerente"
                  className={styles.select}
                  onChange={handleChange}
                  id=""
                >
                  <option value="*">---</option>
                  {gerentes &&
                    gerentes.map((e) => (
                      <option value={e.Codigo}>{e.Nombre}</option>
                    ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  name="EsMicro"
                  value={newSupervisor.EsMicro}
                  onChange={handleCheckChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="VPM"
                  value={newSupervisor.VPM ? newSupervisor.VPM : 0}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="Activo"
                  value={newSupervisor.Activo}
                  onChange={handleCheckChange}
                />
              </td>
              <td>
                <select
                  name="Zona"
                  className={styles.select}
                  onChange={handleChange}
                  id=""
                >
                  <option value="*">---</option>
                  {zonas &&
                    zonas.map((e) => (
                      <option value={e.codigo}>{e.Nombre}</option>
                    ))}
                </select>
              </td>
              <td>
                <ButtonPrimary onClick={handleSubmit}>Agregar</ButtonPrimary>
              </td>
              <td></td>
              <td></td>
            </tr>
          )}

          {currentRecords &&
            currentRecords.map((e) => (
              <SupervisoresItem
                key={e.Codigo}
                Codigo={e.Codigo}
                Nombre={e.Nombre}
                Email={e.Email}
                EsMicro={e.EsMicro}
                VPM={e.VPM}
                Gerente={e.Gerente}
                Zona={e.Zona}
                Activo={e.Activo}
              />
            ))}
        </table>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </TableContainer>
    </div>
  );
};

export default Supervisores;
