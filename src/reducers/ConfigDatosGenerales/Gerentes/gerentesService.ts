import axios, { AxiosError, AxiosResponse } from "axios";
import { errorsHandling } from "../../errorsHandling";
import getHeaderDB from "../../../helpers/getHeaderDB";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";

const getGerentes = async (): Promise<Gerente[] | ResponseStatus> => {
  try {
    const headers = getHeaderDB();
    const response = await axios.get(
      process.env.REACT_APP_HOST + "gerentes",
      headers
    );
    if (Array.isArray(response.data[0])) {
      return response.data[0];
    } else {
      throw Error;
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const getGerentesById = async (gerentesData) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "gerentes/id",
      { Codigo: gerentesData },
      headers
    );

    return response?.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      return { status: false, message: JSON.stringify(error.message) };
    } else {
      return { status: false, message: "Error, comunicarse con sistemas" };
    }
  }
};

const endUpdate = async (gerenteData: EndUpdateParam) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "gerentes/endUpdate",
      gerenteData,
      headers
    );

    return response?.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};
const beginUpdate = async (puntoData: EndUpdateParam) => {
  try {
    const headers = getHeaderToken();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + "gerentes/beginUpdate",
      puntoData,
      headers
    );
    if (response.data.hasOwnProperty("codigo")) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "(Error al comenzar a editar)");
  }
};

const postGerentes = async (form: Gerente): Promise<ResponseStatus> => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "gerentes",
      form,
      headers
    );

    return response?.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};
const updateGerentes = async (form: Gerente) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.put(
      process.env.REACT_APP_HOST + "gerentes",
      form,
      headers
    );
    return response.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const deleteGerentes = async (gerentesData: EditGerente) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_HOST + "gerentes",
      {
        headers: {
          "db-connection": window.localStorage.getItem("db") as string,
        },
        data: gerentesData,
      }
    );

    return response.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const gerentesService = {
  getGerentes,
  postGerentes,
  updateGerentes,
  beginUpdate,
  deleteGerentes,
  getGerentesById,
  endUpdate,
};

export default gerentesService;
