import axios from "axios";
import { AxiosError } from "axios";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import getHeaderDB from "../../../helpers/getHeaderDB";
import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { Zona } from "../../../types/ConfigDatosGenerales/Zonas/Zona";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";

const getSupervisores = async (): Promise<Supervisor[] | ResponseStatus> => {
  try {
    const headers = getHeaderDB();
    const response = await axios.get(
      process.env.REACT_APP_HOST + "supervisores",
      headers
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error;
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const beginUpdate = async (supervisorData: EndUpdateParam) => {
  const headers = getHeaderToken();
  const response = await axios.post(
    process.env.REACT_APP_HOST + "supervisores/beginUpdate",
    supervisorData,
    headers
  );
  return response?.data;
};

const endUpdate = async (gerenteData: EndUpdateParam) => {
  const headers = getHeaderToken();
  const response = await axios.post(
    process.env.REACT_APP_HOST + "supervisores/endUpdate",
    gerenteData,
    headers
  );

  return response?.data;
};

const getAllGerentes = async (): Promise<Gerente[] | ResponseStatus> => {
  try {
    const headers = getHeaderDB();
    const response = await axios.get(
      process.env.REACT_APP_HOST + "gerentes",
      headers
    );
    return response?.data[0];
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      return { status: false, message: error.message };
    } else {
      return { status: false, message: "Error al cargar gerentesS" };
    }
  }
};
const getAllGerentesActivos = async (): Promise<Gerente[] | ResponseStatus> => {
  try {
    const headers = getHeaderDB();
    const response = await axios.get(
      process.env.REACT_APP_HOST + "gerentes/activos",
      headers
    );
    return response?.data[0];
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};
const getAllZonas = async (): Promise<Zona[] | ResponseStatus> => {
  try {
    const headers = getHeaderDB();
    const response = await axios.get(
      process.env.REACT_APP_HOST + "supervisores/zonas",
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error;
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const postSupervisores = async (form: Supervisor): Promise<ResponseStatus> => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "supervisores",
      form,
      headers
    );

    return response?.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};
const updateSupervisores = async (
  form: Supervisor
): Promise<ResponseStatus> => {
  try {
    const headers = getHeaderToken();
    const response = await axios.put(
      process.env.REACT_APP_HOST + "supervisores",
      form,
      headers
    );
    return response?.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const deleteSupervisores = async (
  supervisoresData: EndUpdateParam
): Promise<ResponseStatus> => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_HOST + "supervisores",
      {
        headers: {
          "x-auth-token": window.localStorage
            .getItem("userToken")
            ?.split(" ")[1] as string,
          "db-connection": window.localStorage.getItem("db") as string,
        },
        data: supervisoresData,
      }
    );
    return response?.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const supervisoresService = {
  getSupervisores,
  postSupervisores,
  updateSupervisores,
  deleteSupervisores,
  beginUpdate,
  getAllGerentes,
  getAllGerentesActivos,
  getAllZonas,
  endUpdate,
};

export default supervisoresService;
