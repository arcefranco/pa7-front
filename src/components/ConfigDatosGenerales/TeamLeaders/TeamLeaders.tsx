import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeamLeaders,
  postTeamLeaders,
  resetStatus,
  endUpdate,
  getAllSupervisores,
} from "../../../reducers/ConfigDatosGenerales/TeamLeaders/teamLeadersSlice";
import styles from "../../../styles/Table.module.css";
import * as AiIcons from "react-icons/ai";
import TeamLeadersItem from "./TeamLeadersItem";
import Pagination from "../../Pagination/Pagination";
import TitleLogo from "../../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../../styled-components/h/TitlePrimary";
import TableContainer from "../../../styled-components/tables/TableContainer";
import ModalStatus from "../../ModalStatus";
import ReactTooltip from "react-tooltip";
import { ReturnLogo } from "../../../helpers/ReturnLogo";
import ButtonPrimary from "../../../styled-components/buttons/ButtonPrimary";
import { AppDispatch, RootState } from "../../../store";

const TeamLeaders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.login);
  const { teamLeaders, statusNuevoTeamLeader, supervisores } = useSelector(
    (state: RootState) => state.teamLeaders
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [modal, setModal] = useState(false);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [inEdit, setInEdit] = useState("");
  const [newField, setNewField] = useState(false);
  const [newTeamLeader, setNewTeamLeader] = useState({
    Nombre: "",
    Activo: 0,
  });
  const actualInEdit = useRef(inEdit);
  useEffect(() => {
    Promise.all([dispatch(getTeamLeaders()), dispatch(getAllSupervisores())]);
  }, []);

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
    if (
      statusNuevoTeamLeader &&
      Object.keys(statusNuevoTeamLeader).length &&
      statusNuevoTeamLeader.hasOwnProperty("status") &&
      statusNuevoTeamLeader.hasOwnProperty("message")
    ) {
      setModal(true);
    }

    function resetModal() {
      dispatch(resetStatus());
      setModal(false);
    }

    if (
      statusNuevoTeamLeader &&
      Object.keys(statusNuevoTeamLeader).length &&
      !statusNuevoTeamLeader.hasOwnProperty("codigo")
    ) {
      setTimeout(resetModal, 5000);
    }

    if (statusNuevoTeamLeader?.status === true) {
      resetNewField();
      dispatch(getTeamLeaders());
    }
  }, [statusNuevoTeamLeader]);

  useEffect(() => {
    if (
      statusNuevoTeamLeader &&
      Object.keys(statusNuevoTeamLeader).includes("codigo") &&
      statusNuevoTeamLeader.codigo
    ) {
      setInEdit(statusNuevoTeamLeader.codigo);
    }

    if (statusNuevoTeamLeader?.status === false) {
      setModal(true);
    }
  }, [statusNuevoTeamLeader]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...newTeamLeader, [name]: value };

    setNewTeamLeader(newForm);
  };

  const handleSubmit = () => {
    dispatch(postTeamLeaders(newTeamLeader));
  };

  const resetNewField = () => {
    setNewField(false);
    setNewTeamLeader({
      Nombre: "",
      Activo: 0,
    });
  };

  const handleCheckChange = (e) => {
    const { name } = e.target;
    var value = e.target.checked;
    value = e.target.checked ? 1 : 0;
    const newForm = { ...newTeamLeader, [name]: value };
    setNewTeamLeader(newForm);
  };

  const currentRecords = teamLeaders.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(teamLeaders?.length / recordsPerPage);

  return (
    <div className={styles.container}>
      {modal && !statusNuevoTeamLeader?.codigo ? (
        <ModalStatus
          status={statusNuevoTeamLeader?.status}
          message={statusNuevoTeamLeader?.message}
        />
      ) : null}

      <TitleLogo>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary>Team Leaders</TitlePrimary>
      </TitleLogo>
      <div className={styles.buttonAddContainer}>
        <ReactTooltip id="botonTooltip2">
          Agregar nuevo Team Leader
        </ReactTooltip>
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
            <th>Nombre</th>
            <th>Supervisor</th>
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
                  value={newTeamLeader.Nombre}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="Supervisor"
                  className={styles.select}
                  onChange={handleChange}
                  id=""
                >
                  <option value="*">---</option>
                  {supervisores &&
                    supervisores.map((e) => (
                      <option value={e.Codigo}>{e.Nombre}</option>
                    ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  name="Activo"
                  value={newTeamLeader.Activo}
                  onChange={handleCheckChange}
                />
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
              <TeamLeadersItem
                key={e.Codigo}
                Codigo={e.Codigo}
                Nombre={e.Nombre}
                Supervisor={e.Supervisor}
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

export default TeamLeaders;
