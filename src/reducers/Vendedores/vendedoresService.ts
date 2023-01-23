import { Vendedor } from "../../types/ConfigDatosGenerales/Vendedor/Vendedor";
import { ResponseStatus } from "../../types/Generales/ResponseStatus";
import { TeamLeader } from "../../types/ConfigDatosGenerales/TeamLeader/TeamLeader";
import { Escala } from "../../types/ConfigDatosGenerales/Vendedor/Escala";
import {
  OficialMora,
  OficialScoring,
} from "../../types/ConfigDatosGenerales/Oficiales/Oficiales";
import {
  deleteFunction,
  getFunction,
  postFunction,
  updateFunction,
} from "../Axios/axiosFunctions";

const getVendedores = async (): Promise<Vendedor[] | ResponseStatus> => {
  return getFunction("vendedores");
};

const getAllTeamLeaders = async (): Promise<TeamLeader[] | ResponseStatus> => {
  return getFunction("teamleaders");
};
const getAllTeamLeadersActivos = async (): Promise<
  TeamLeader[] | ResponseStatus
> => {
  return getFunction("teamleaders/activos");
};
const getAllEscalas = async (): Promise<Escala[] | ResponseStatus> => {
  return getFunction("vendedores/escalas");
};
const getAllOficialesScoring = async (): Promise<
  OficialScoring[] | ResponseStatus
> => {
  return getFunction("vendedores/oficialesScoring");
};

const getAllOficialesMora = async (): Promise<
  OficialMora[] | ResponseStatus
> => {
  return getFunction("vendedores/oficialesMora");
};

const getAllOficialesScoringActivos = async (): Promise<
  OficialScoring[] | ResponseStatus
> => {
  return getFunction("vendedores/oficialesScoringActivos");
};
const getAllOficialesMoraActivos = async (): Promise<
  OficialMora[] | ResponseStatus
> => {
  return getFunction("vendedores/oficialesMoraActivos");
};
const postVendedores = async (form: Vendedor): Promise<ResponseStatus> => {
  return postFunction("vendedores", form);
};
const updateVendedores = async (form: Vendedor) => {
  return updateFunction("vendedores", form);
};

const deleteVendedores = async (vendedoresData: EndUpdateParam) => {
  return deleteFunction("vendedores", vendedoresData);
};

const vendedoresService = {
  getVendedores,
  postVendedores,
  updateVendedores,
  deleteVendedores,
  getAllEscalas,
  getAllOficialesMora,
  getAllOficialesScoring,
  getAllOficialesMoraActivos,
  getAllOficialesScoringActivos,
  getAllTeamLeaders,
  getAllTeamLeadersActivos,
};

export default vendedoresService;
