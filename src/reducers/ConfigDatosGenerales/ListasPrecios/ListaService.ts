import axios from "axios";
import getHeader from "../../../helpers/getHeaderTokenAndDB";
import { Lista } from "../../../types/ConfigDatosGenerales/ListasPrecios/Lista";
import { ModeloFromListaParam, GetListaParams } from "./ListaSlice";
import {
  deleteFunction,
  getFunction,
  postFunction,
  updateFunction,
} from "../../Axios/axiosFunctions";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";
import { AxiosError } from "axios";

const getListas = async () => {
  return getFunction("listas");
};

const getModelos = async () => {
  return getFunction("listas/modelo");
};

const modelosOnLista = async (listaData: GetListaParams) => {
  try {
    const headers = getHeader();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "listas",
      listaData,
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error, "modelosOnLista");
  }
};
const updatePrecioModelo = async (listaData: ModeloFromListaParam) => {
  return updateFunction("listas/modelo", listaData);
};

const insertModeloLista = async (listaData: Lista) => {
  return postFunction("listas/modelo", listaData);
};

const deleteModeloFromLista = async (listaData: ModeloFromListaParam) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_HOST + "listas/modelo",
      {
        headers: {
          "db-connection": window.localStorage.getItem("db") as string,
        },
        data: listaData,
      }
    );
    if (response.data.hasOwnProperty("status") && response.data.status) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Modelo en lista");
  }
};

const createLista = async (listaData: Lista) => {
  return postFunction("listas/nuevaLista", listaData);
};

const updateLista = async (listaData: Lista) => {
  return updateFunction("listas/nuevaLista", listaData);
};

const deleteLista = async (listaData: EndUpdateParam) => {
  return deleteFunction("listas/nuevaLista", listaData);
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
