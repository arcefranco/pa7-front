import axios, { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import getHeaderDB from "../../../helpers/getHeaderDB";
import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";
import { TeamLeader } from "../../../types/ConfigDatosGenerales/TeamLeader/TeamLeader";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";
import { getFunction } from "../../Axios/axiosFunctions";

const getTeamLeaders = async (): Promise<TeamLeader[] | ResponseStatus> => {
  return getFunction("teamleaders");
};

const getAllSupervisores = async (): Promise<Supervisor[] | ResponseStatus> => {
  return getFunction("supervisores");
};
const getAllSupervisoresActivos = async (): Promise<
  Supervisor[] | ResponseStatus
> => {
  return getFunction("supervisores/activos");
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
  getAllSupervisores,
  getAllSupervisoresActivos,
};

export default teamLeadersService;
