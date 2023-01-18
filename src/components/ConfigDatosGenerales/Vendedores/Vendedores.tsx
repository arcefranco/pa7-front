import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getVendedores,
  getAllOficialesScoring,
  reset,
  getAllTeamLeaders,
  getAllOficialesMora,
  postVendedores,
  endUpdate,
  resetStatus,
} from "../../../reducers/Vendedores/vendedoresSlice";
import TableContainer from "../../../styled-components/tables/TableContainer";
import * as AiIcons from "react-icons/ai";
import VendedorItem from "./VendedorItem";
import styles from "../../../styles/Table.module.css";
import Pagination from "../../Pagination/Pagination";
import TitlePrimary from "../../../styled-components/h/TitlePrimary";
import TitleLogo from "../../../styled-components/containers/TitleLogo";
import { ReturnLogo } from "../../../helpers/ReturnLogo";
import ButtonPrimary from "../../../styled-components/buttons/ButtonPrimary";
import ModalStatus from "../../ModalStatus";
import ReactTooltip from "react-tooltip";
import { AppDispatch, RootState } from "../../../store";
import { Vendedor } from "../../../types/ConfigDatosGenerales/Vendedor/Vendedor";

const Vendedores = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.login);
  const {
    vendedores,
    statusNuevoVendedor,
    teamleader,
    oficialesScoring,
    oficialesMora,
  } = useSelector((state: RootState) => state.vendedores);
  const [newField, setNewField] = useState(false);
  const [newVendedor, setNewVendedor] = useState<Vendedor>({
    Nombre: "",
    TeamLeader: null,
    OficialS: null,
    OficialM: null,
    FechaBaja: "",
    Escala: null,
    Activo: 0,
  });
  const [vendedoresFiltered, setVendedoresFiltered] = useState<Vendedor[]>([]);
  const [filterNombre, setFilterNombre] = useState<string>("");
  const [filterActivo, setFilterActivo] = useState<string>("");
  const [modal, setModal] = useState<boolean>(true);
  const [inEdit, setInEdit] = useState<string>("");
  const actualInEdit = useRef(inEdit);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  useEffect(() => {
    Promise.all([
      dispatch(getVendedores()),
      dispatch(getAllOficialesScoring()),
      dispatch(getAllTeamLeaders()),
      dispatch(getAllOficialesMora()),
    ]);
  }, []);

  useEffect(() => {
    actualInEdit.current = inEdit; //Actualizar el estado de inEdit para hacer el endUpdate al actualizar/desmontar
  }, [inEdit]);

  useEffect(() => {
    setVendedoresFiltered(vendedores);
  }, [vendedores]);

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
    if (filterNombre.length || filterActivo.length) {
      setCurrentPage(1);

      if (filterActivo.length) {
        setVendedoresFiltered(
          vendedores.filter((e) => {
            return (
              e.Nombre.toLowerCase().includes(
                filterNombre.toLocaleLowerCase()
              ) && e.Activo === parseInt(filterActivo)
            );
          })
        );
      } else {
        setVendedoresFiltered(
          vendedores.filter((e) => {
            return e.Nombre.toLowerCase().includes(
              filterNombre.toLocaleLowerCase()
            );
          })
        );
      }
    } else {
      setVendedoresFiltered(vendedores);
    }
  }, [filterActivo, filterNombre]);

  const currentRecords: Vendedor[] = vendedoresFiltered.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(vendedoresFiltered?.length / recordsPerPage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parseValue = value;
    if (
      name === "OficialS" ||
      name === "OficialM" ||
      name === "TeamLeader" ||
      name === "Escala"
    ) {
      parseValue = parseInt(value);
    }
    const newForm = { ...newVendedor, [name]: parseValue };

    setNewVendedor(newForm);
  };

  const resetNewField = () => {
    dispatch(postVendedores(newVendedor));
    setNewVendedor({
      Nombre: "",
      TeamLeader: null,
      OficialS: null,
      OficialM: null,
      FechaBaja: "",
      Escala: null,
      Activo: 0,
    });
    setNewField(false);
  };

  useEffect(() => {
    //Manejar actualizaciones de vendedores (ABM) y su inUpdate
    setModal(true);

    function resetModal() {
      dispatch(resetStatus());
      setModal(false);
    }
    if (
      statusNuevoVendedor &&
      Object.keys(statusNuevoVendedor).includes("codigo")
    ) {
      setInEdit(statusNuevoVendedor?.codigo ? statusNuevoVendedor.codigo : "");
    }

    if (
      statusNuevoVendedor &&
      Object.keys(statusNuevoVendedor).length &&
      !statusNuevoVendedor.hasOwnProperty("codigo")
    ) {
      setTimeout(resetModal, 5000);
    }

    if (statusNuevoVendedor?.status === true) {
      dispatch(getVendedores());
    }
  }, [statusNuevoVendedor]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(reset());
    }, 5000);
  }, [modal]);

  const handleCheckChange = (e) => {
    const { name } = e.target;
    var value = e.target.checked;
    value = e.target.checked ? 1 : 0;
    const newForm = { ...newVendedor, [name]: value };
    setNewVendedor(newForm);
  };

  return (
    <div>
      {modal &&
      statusNuevoVendedor &&
      Object.keys(statusNuevoVendedor).length &&
      !statusNuevoVendedor?.codigo ? (
        <ModalStatus
          status={statusNuevoVendedor?.status}
          message={statusNuevoVendedor?.message}
        />
      ) : null}

      <TitleLogo>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary>Vendedores</TitlePrimary>
      </TitleLogo>
      <div className={styles.buttonAddContainer}>
        <ReactTooltip id="botonTooltip2">Agregar nuevo vendedor</ReactTooltip>
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
              <span>Nombre</span> <br />
              <input
                type="text"
                className={styles.inputFilterColumn}
                value={filterNombre}
                onChange={(e) => setFilterNombre(e.target.value)}
              />
            </th>
            <th>Team Leader</th>
            <th>Oficial Scoring</th>
            <th>Oficial Mora</th>
            <th>Fecha Baja</th>
            <th>Escala</th>
            <th>
              <span>Activo</span> <br />
              <select
                onChange={(e) => setFilterActivo(e.target.value)}
                name=""
                id=""
              >
                <option value={""}>Todos</option>
                <option value={1}>Si</option>
                <option value={0}>No</option>
              </select>
            </th>
            <th></th>
            <th></th>
          </tr>

          {newField && (
            <tr>
              <td></td>
              <td>
                <input
                  value={newVendedor.Nombre}
                  name="Nombre"
                  onChange={handleChange}
                  type="text"
                />
              </td>
              <td>
                <select
                  name="TeamLeader"
                  id=""
                  value={newVendedor.TeamLeader ? newVendedor.TeamLeader : ""}
                  onChange={handleChange}
                >
                  <option value="*">---</option>
                  {teamleader &&
                    teamleader.map((e) => (
                      <option value={e.Codigo}>{e.Nombre}</option>
                    ))}
                </select>
              </td>
              <td>
                <select
                  name="OficialS"
                  id=""
                  value={newVendedor.OficialS ? newVendedor.OficialS : ""}
                  onChange={handleChange}
                >
                  <option value="*">---</option>
                  {oficialesScoring &&
                    oficialesScoring.map((e) => (
                      <option value={e.Codigo}>{e.Nombre}</option>
                    ))}
                </select>
              </td>
              <td>
                <select
                  name="OficialM"
                  id=""
                  value={newVendedor.OficialM ? newVendedor.OficialM : ""}
                  onChange={handleChange}
                >
                  <option value="*">---</option>
                  {oficialesMora &&
                    oficialesMora.map((e) => (
                      <option value={e.Codigo}>{e.Nombre}</option>
                    ))}
                </select>
              </td>
              <td>
                <input
                  type="date"
                  name="FechaBaja"
                  value={newVendedor.FechaBaja}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="Escala"
                  value={newVendedor.Escala ? newVendedor.Escala : ""}
                  onChange={handleChange}
                  id=""
                >
                  <option value="*">---</option>
                  <option value={1}>Margian</option>
                  <option value={2}>Gestión Financiera</option>
                </select>
              </td>
              <td style={{ textAlign: "center" }}>
                <input
                  value={newVendedor.Activo}
                  name="Activo"
                  onChange={handleCheckChange}
                  type="checkbox"
                />
              </td>
              <td></td>
              <td>
                <ButtonPrimary
                  style={{ margin: "0.8em" }}
                  onClick={resetNewField}
                >
                  Agregar
                </ButtonPrimary>
              </td>
              <td></td>
            </tr>
          )}

          {currentRecords &&
            currentRecords.map((e) => (
              <VendedorItem
                key={e.Codigo}
                Codigo={e.Codigo}
                Nombre={e.Nombre}
                TeamLeader={e.TeamLeader}
                OficialS={e.OficialS}
                OficialM={e.OficialM}
                Categoria={e.Categoria}
                Escala={e.Escala}
                FechaBaja={e.FechaBaja}
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

export default Vendedores;
