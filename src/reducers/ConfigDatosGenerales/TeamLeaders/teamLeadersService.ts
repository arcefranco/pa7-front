import axios, { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import getHeaderDB from "../../../helpers/getHeaderDB";
import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";
import { TeamLeader } from "../../../types/ConfigDatosGenerales/TeamLeader/TeamLeader";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";

const getTeamLeaders = async (): Promise<TeamLeader[] | ResponseStatus> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "teamleaders",
      headers
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};
const beginUpdate = async (sucursalesData: EndUpdateParam) => {
  const headers = getHeaderToken();
  const response: AxiosResponse = await axios.post(
    process.env.REACT_APP_HOST + "teamleaders/beginUpdate",
    sucursalesData,
    headers
  );

  return response?.data;
};

const endUpdate = async (gerenteData: EndUpdateParam) => {
  const headers = getHeaderToken();
  const response: AxiosResponse = await axios.post(
    process.env.REACT_APP_HOST + "teamleaders/endUpdate",
    gerenteData,
    headers
  );
  return response?.data;
};
const getAllSupervisores = async (): Promise<Supervisor[] | ResponseStatus> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "supervisores",
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error(response.data);
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};
const getAllSupervisoresActivos = async (): Promise<
  Supervisor[] | ResponseStatus
> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "supervisores/activos",
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error;
    }
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      return { status: false, message: error.message };
    } else {
      return { status: false, message: "Error al cargar supervisores" };
    }
  }
};

const postTeamLeaders = async (form: TeamLeader) => {
  try {
    const headers = getHeaderToken();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + "teamleaders",
      form,
      headers
    );

    return response.data;
  } catch (error: any | AxiosError) {
    ServiceErrorHandler(error);
  }
};
const updateTeamLeaders = async (form: TeamLeader): Promise<ResponseStatus> => {
  try {
    const headers = getHeaderToken();
    const response: AxiosResponse = await axios.put(
      process.env.REACT_APP_HOST + "teamleaders",
      form,
      headers
    );

    return response.data;
  } catch (error) {
    return ServiceErrorHandler(error);
  }
};

const deleteTeamLeaders = async (
  teamLeadersData: EndUpdateParam
): Promise<ResponseStatus> => {
  try {
    const response: AxiosResponse = await axios.delete(
      process.env.REACT_APP_HOST + "teamleaders",
      {
        headers: {
          "x-auth-token": window.localStorage
            .getItem("userToken")
            ?.split(" ")[1] as string,
          "db-connection": window.localStorage.getItem("db") as string,
        },
        data: teamLeadersData,
      }
    );
    return response?.data;
  } catch (error) {
    return ServiceErrorHandler(error);
  }
};

const teamLeadersService = {
  getTeamLeaders,
  postTeamLeaders,
  updateTeamLeaders,
  deleteTeamLeaders,
  beginUpdate,
  getAllSupervisores,
  getAllSupervisoresActivos,
  endUpdate,
};

export default teamLeadersService;
