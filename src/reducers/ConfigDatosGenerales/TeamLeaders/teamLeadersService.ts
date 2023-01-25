import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";
import { TeamLeader } from "../../../types/ConfigDatosGenerales/TeamLeader/TeamLeader";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import {
  deleteFunction,
  getFunction,
  postFunction,
  updateFunction,
} from "../../Axios/axiosFunctions";

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
  return postFunction("teamleaders", form);
};
const updateTeamLeaders = async (form: TeamLeader): Promise<ResponseStatus> => {
  return updateFunction("teamleaders", form);
};

const deleteTeamLeaders = async (
  teamLeadersData: EndUpdateParam
): Promise<ResponseStatus> => {
  return deleteFunction("teamleaders", teamLeadersData);
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
