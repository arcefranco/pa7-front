import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../Pagination/Pagination";
import ModalStatus from "../../ModalStatus";
import {
  getListas,
  getModelos,
  createLista,
  reset,
} from "../../../reducers/ConfigDatosGenerales/ListasPrecios/ListaSlice";
import TitleLogo from "../../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../../styled-components/h/TitlePrimary";
import styles from "./ListaItem.module.css";
import Swal from "sweetalert2";
import { ReturnLogo } from "../../../helpers/ReturnLogo";
import * as AiIcons from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import ButtonPrimary from "../../../styled-components/buttons/ButtonPrimary";
import ListaItem from "./ListaItem";
import { AppDispatch, RootState } from "../../../store";
import { Lista } from "../../../types/ConfigDatosGenerales/ListasPrecios/Lista";

const ListasPrecios = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    updatedLista,
    listas,
    nuevaLista,
    deletedLista,
    createdModelo,
    listaStatus,
  } = useSelector((state: RootState) => state.listasprecios);
  const { user } = useSelector((state: RootState) => state.login);
  const [newList, setNewList] = useState(false);
  const [input, setInput] = useState<Lista>({
    Marca: user ? user.codigoMarca : null,
    Nombre: "",
    VigenciaDesde: "",
    VigenciaHasta: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(7);
  const [filteredListas, setFilteredListas] = useState<Lista[]>([]);
  const [inputFilter, setInputFilter] = useState("");
  const [modal, setModal] = useState(true);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  /*   const currentRecords = filteredListas?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  ); */
  const [currentRecords, setCurrentRecords] = useState<Lista[]>([]);

  const nPages = Math.ceil(filteredListas?.length / recordsPerPage);

  useEffect(() => {
    dispatch(getListas());
  }, []);

  useEffect(() => {
    if (nuevaLista?.status === true) dispatch(getListas());
    if (nuevaLista?.status === false) {
      Swal.fire({
        icon: "error",
        title: nuevaLista.message,
        showConfirmButton: true,
        showCancelButton: true,
        timer: 10000,
      });
    }
    if (deletedLista?.status === true) dispatch(getListas());
    if (deletedLista?.status === false) {
      Swal.fire({
        icon: "error",
        title: deletedLista?.message,
        showConfirmButton: true,
        showCancelButton: true,
        timer: 10000,
      });
    }
  }, [nuevaLista, deletedLista]);

  useEffect(() => {
    if (Array.isArray(listas)) {
      setCurrentRecords(
        filteredListas?.slice(indexOfFirstRecord, indexOfLastRecord)
      );
    }
  }, [filteredListas]);

  useEffect(() => {
    dispatch(getModelos());
  }, []);

  useEffect(() => {
    setFilteredListas(listas);
  }, [listas]);

  useEffect(() => {
    if (Array.isArray(listas)) {
      setFilteredListas(
        listas?.filter((e) =>
          e.Descripcion?.toLowerCase().includes(inputFilter.toLowerCase())
        )
      );
    }
  }, [inputFilter]);

  useEffect(() => {
    setModal(true);

    if (listaStatus && typeof listaStatus?.message === "string") {
      setTimeout(() => {
        setModal(false);
      }, 5000);
    }
    if (listaStatus?.status === true) {
      dispatch(getListas());
    }
  }, [listaStatus]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(reset());
    }, 9000);
  }, [modal]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newForm = { ...input, [name]: value };
    setInput(newForm);
  };

  return (
    <div className={styles.container}>
      {listaStatus && typeof listaStatus?.message === "string" && modal ? (
        <ModalStatus
          message={listaStatus?.message}
          status={listaStatus?.status}
        />
      ) : null}
      <TitleLogo>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary>Listas de precios ({user?.marca})</TitlePrimary>
      </TitleLogo>
      <div className={styles.addButtonContainer}>
        <ReactTooltip id="botonTooltip2">Agregar nueva lista</ReactTooltip>
        <AiIcons.AiFillPlusCircle
          style={{
            marginRight: "20px",
            marginBottom: "20px",
            width: "2rem",
            height: "2rem",
            cursor: "pointer",
          }}
          onClick={() => setNewList(!newList)}
          data-tip
          data-for="botonTooltip2"
        />
      </div>
      {filteredListas.length ? (
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
      <input
        value={inputFilter}
        onChange={(e) => setInputFilter(e.target.value)}
        type="text"
        className={styles.inputFilter}
        placeholder="Buscar por nombre"
      />
      <div className={styles.listasContainer}>
        {newList && (
          <div
            className={styles.item}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <input
              type="text"
              name="Nombre"
              className={styles.inputFilter}
              style={{ margin: "0" }}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <div>
              <span>Vigencia Desde: </span>
              <input type="date" onChange={handleChange} name="VigenciaDesde" />
            </div>
            <div>
              <span>Vigencia Hasta: </span>
              <input type="date" onChange={handleChange} name="VigenciaHasta" />
            </div>
            <ButtonPrimary
              onClick={() => {
                dispatch(createLista(input));
                setInput({
                  Marca: user ? user.codigoMarca : null,
                  Nombre: "",
                  VigenciaDesde: "",
                  VigenciaHasta: "",
                });
                setNewList(false);
              }}
            >
              Agregar
            </ButtonPrimary>
          </div>
        )}

        {currentRecords &&
          currentRecords.map((e) => (
            <ListaItem
              Codigo={e.Codigo}
              Descripcion={e.Descripcion}
              VigenciaD={e.VigenciaDesde?.slice(0, 10)}
              VigenciaH={e.VigenciaHasta ? e.VigenciaHasta.slice(0, 10) : null}
            />
          ))}
      </div>
    </div>
  );
};

export default ListasPrecios;
