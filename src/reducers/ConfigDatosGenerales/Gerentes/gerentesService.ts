import axios, { AxiosError, AxiosResponse } from "axios";
import { errorsHandling } from "../../errorsHandling";
import getHeaderDB from "../../../helpers/getHeaderDB";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";

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
    if (axios.isAxiosError(error)) {
      return { status: false, message: error.message };
    } else {
      return { status: false, message: "Error, comunicarse con sistemas" };
    }
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

    console.log(response);
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
    if (axios.isAxiosError(error)) {
      return { status: false, message: JSON.stringify(error.message) };
    } else {
      return { status: false, message: "Error, comunicarse con sistemas" };
    }
  }
};
const beginUpdate = async (
  gerenteData: EndUpdateParam
): Promise<ResponseStatus> => {
  const headers = getHeaderToken();
  try {
    const response: AxiosResponse<ResponseStatus> = await axios.post(
      process.env.REACT_APP_HOST + "gerentes/beginUpdate",
      gerenteData,
      headers
    );

    return response.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      return { status: false, message: JSON.stringify(error.message) };
    } else {
      return { status: false, message: "Error, comunicarse con sistemas" };
    }
  }
};

const postGerentes = async (form: Gerente) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "gerentes",
      form,
      headers
    );

    return response?.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      return { status: false, message: error.message };
    } else {
      return { status: false, message: "Error, comunicarse con sistemas" };
    }
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
    if (axios.isAxiosError(error)) {
      return { status: false, message: error.message };
    } else {
      return { status: false, message: "Error, comunicarse con sistemas" };
    }
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
    if (axios.isAxiosError(error)) {
      return { status: false, message: error.message };
    } else {
      return { status: false, message: "Error, comunicarse con sistemas" };
    }
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
