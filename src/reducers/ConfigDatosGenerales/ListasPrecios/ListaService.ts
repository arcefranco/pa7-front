import axios from "axios";
import { errorsHandling } from "../../errorsHandling";
import getHeader from "../../../helpers/getHeaderTokenAndDB";
import { Lista } from "../../../types/ConfigDatosGenerales/ListasPrecios/Lista";
import { ModeloFromListaParam, GetListaParams } from "./ListaSlice";

const getListas = async () => {
  const headers = getHeader();
  const response = await axios
    .get(process.env.REACT_APP_HOST + "listas", headers)
    .catch((err) => errorsHandling(err));
  return response.data;
};

const getModelos = async () => {
  const headers = getHeader();
  const response = await axios
    .get(process.env.REACT_APP_HOST + "listas/modelo", headers)
    .catch((err) => errorsHandling(err));
  return response.data;
};

const modelosOnLista = async (listaData: GetListaParams) => {
  const headers = getHeader();
  const response = await axios
    .post(process.env.REACT_APP_HOST + "listas", listaData, headers)
    .catch((err) => errorsHandling(err));
  return response.data;
};
const updatePrecioModelo = async (listaData: ModeloFromListaParam) => {
  const headers = getHeader();
  const response = await axios
    .put(process.env.REACT_APP_HOST + "listas/modelo", listaData, headers)
    .catch((err) => errorsHandling(err));
  return response.data;
};

const insertModeloLista = async (listaData: Lista) => {
  const headers = getHeader();
  const response = await axios
    .post(process.env.REACT_APP_HOST + "listas/modelo", listaData, headers)
    .catch((err) => errorsHandling(err));
  return response.data;
};

const deleteModeloFromLista = async (listaData: ModeloFromListaParam) => {
  const response = await axios
    .delete(process.env.REACT_APP_HOST + "listas/modelo", {
      headers: {
        "db-connection": window.localStorage.getItem("db") as string,
      },
      data: listaData,
    })
    .catch((err) => errorsHandling(err));
  return response.data;
};

const createLista = async (listaData: Lista) => {
  const headers = getHeader();
  const response = await axios
    .post(process.env.REACT_APP_HOST + "listas/nuevaLista", listaData, headers)
    .catch((err) => errorsHandling(err));
  return response.data;
};

const updateLista = async (listaData: Lista) => {
  const headers = getHeader();
  const response = await axios
    .put(process.env.REACT_APP_HOST + "listas/nuevaLista", listaData, headers)
    .catch((err) => errorsHandling(err));
  return response.data;
};

const deleteLista = async (listaData: EndUpdateParam) => {
  const response = await axios
    .delete(process.env.REACT_APP_HOST + "listas/nuevaLista", {
      headers: {
        "db-connection": window.localStorage.getItem("db") as string,
      },
      data: listaData,
    })
    .catch((err) => errorsHandling(err));
  return response.data;
};

const ListaService = {
  getListas,
  getModelos,
  modelosOnLista,
  updatePrecioModelo,
  deleteLista,
  updateLista,
  insertModeloLista,
  createLista,
  deleteModeloFromLista,
};

export default ListaService;
