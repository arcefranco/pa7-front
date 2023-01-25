import { Supervisor } from "../../../types/ConfigDatosGenerales/Supervisor/Supervisor";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { Zona } from "../../../types/ConfigDatosGenerales/Zonas/Zona";
import {
  deleteFunction,
  getFunction,
  postFunction,
  updateFunction,
} from "../../Axios/axiosFunctions";

const getSupervisores = async (): Promise<Supervisor[] | ResponseStatus> => {
  return getFunction("supervisores");
};

const getAllGerentes = async (): Promise<Gerente[] | ResponseStatus> => {
  return getFunction("gerentes");
};
const getAllGerentesActivos = async (): Promise<Gerente[] | ResponseStatus> => {
  return getFunction("gerentes/activos");
};
const getAllZonas = async (): Promise<Zona[] | ResponseStatus> => {
  return getFunction("supervisores/zonas");
};

const postSupervisores = async (form: Supervisor): Promise<ResponseStatus> => {
  return postFunction("supervisores", form);
};
const updateSupervisores = async (
  form: Supervisor
): Promise<ResponseStatus> => {
  return updateFunction("supervisores", form);
};

const deleteSupervisores = async (
  supervisoresData: EndUpdateParam
): Promise<ResponseStatus> => {
  return deleteFunction("supervisores", supervisoresData);
};

const supervisoresService = {
  getSupervisores,
  postSupervisores,
  updateSupervisores,
  deleteSupervisores,
  getAllGerentes,
  getAllGerentesActivos,
  getAllZonas,
};

export default supervisoresService;
