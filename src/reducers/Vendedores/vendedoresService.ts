import axios, { AxiosResponse } from "axios";
import getHeaderToken from "../../helpers/getHeaderTokenAndDB";
import getHeaderDB from "../../helpers/getHeaderDB";
import { Vendedor } from "../../types/ConfigDatosGenerales/Vendedor/Vendedor";
import { ResponseStatus } from "../../types/Generales/ResponseStatus";
import { AxiosError } from "axios";
import { ServiceErrorHandler } from "../../helpers/ServiceErrorHandler";
import { TeamLeader } from "../../types/ConfigDatosGenerales/TeamLeader/TeamLeader";
import { Escala } from "../../types/ConfigDatosGenerales/Vendedor/Escala";
import {
  OficialMora,
  OficialScoring,
} from "../../types/ConfigDatosGenerales/Oficiales/Oficiales";

const getVendedores = async (): Promise<Vendedor[] | ResponseStatus> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "vendedores",
      headers
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error(response.data);
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error, "(vendedores)");
  }
};

const endUpdate = async (gerenteData: EndUpdateParam) => {
  const headers = getHeaderToken();
  const response: AxiosResponse = await axios.post(
    process.env.REACT_APP_HOST + "vendedores/endUpdate",
    gerenteData,
    headers
  );
  return response.data;
};

const beginUpdate = async (gerenteData: EndUpdateParam) => {
  try {
    const headers = getHeaderToken();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + "vendedores/beginUpdate",
      gerenteData,
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
const getAllTeamLeaders = async (): Promise<TeamLeader[] | ResponseStatus> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "teamleaders",
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error(response.data);
    }
  } catch (error) {
    return ServiceErrorHandler(error, "(team leaders)");
  }
};
const getAllTeamLeadersActivos = async (): Promise<
  TeamLeader[] | ResponseStatus
> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "teamleaders/activos",
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error;
    }
  } catch (error) {
    return ServiceErrorHandler(error);
  }
};
const getAllEscalas = async (): Promise<Escala[] | ResponseStatus> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "vendedores/escalas",
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error(response.data);
    }
  } catch (error) {
    return ServiceErrorHandler(error, "(escalas)");
  }
};
const getAllOficialesScoring = async (): Promise<
  OficialScoring[] | ResponseStatus
> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "vendedores/oficialesScoring",
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error(response.data);
    }
  } catch (error) {
    return ServiceErrorHandler(error, "(oficiales scoring)");
  }
};
const getAllOficialesMora = async (): Promise<
  OficialMora[] | ResponseStatus
> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "vendedores/oficialesMora",
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error(response.data);
    }
  } catch (error) {
    return ServiceErrorHandler(error, "(oficiales mora)");
  }
};
const getAllOficialesScoringActivos = async (): Promise<
  OficialScoring[] | ResponseStatus
> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "vendedores/oficialesScoringActivos",
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error;
    }
  } catch (error) {
    return ServiceErrorHandler(error);
  }
};
const getAllOficialesMoraActivos = async (): Promise<
  OficialMora[] | ResponseStatus
> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "vendedores/oficialesMoraActivos",
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error;
    }
  } catch (error) {
    return ServiceErrorHandler(error);
  }
};
const postVendedores = async (form: Vendedor): Promise<ResponseStatus> => {
  try {
    const headers = getHeaderToken();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + "vendedores",
      form,
      headers
    );

    return response.data;
  } catch (error) {
    return ServiceErrorHandler(error, "Error al agregar vendedor");
  }
};
const updateVendedores = async (form: Vendedor) => {
  try {
    const headers = getHeaderToken();
    const response: AxiosResponse = await axios.put(
      process.env.REACT_APP_HOST + "vendedores",
      form,
      headers
    );
    return response.data;
  } catch (error) {
    return ServiceErrorHandler(error, "Error al actualizar vendedor");
  }
};

const deleteVendedores = async (vendedoresData: EndUpdateParam) => {
  try {
    const response: AxiosResponse = await axios.delete(
      process.env.REACT_APP_HOST + "vendedores",
      {
        headers: {
          "x-auth-token": window.localStorage
            .getItem("userToken")
            ?.split(" ")[1] as string,
          "db-connection": window.localStorage.getItem("db") as string,
        },
        data: vendedoresData,
      }
    );

    return response.data;
  } catch (error) {
    return ServiceErrorHandler(error, "(vendedores)");
  }
};

const vendedoresService = {
  getVendedores,
  postVendedores,
  beginUpdate,
  updateVendedores,
  deleteVendedores,
  getAllEscalas,
  getAllOficialesMora,
  getAllOficialesScoring,
  getAllOficialesMoraActivos,
  getAllOficialesScoringActivos,
  getAllTeamLeaders,
  getAllTeamLeadersActivos,
  endUpdate,
};

export default vendedoresService;
