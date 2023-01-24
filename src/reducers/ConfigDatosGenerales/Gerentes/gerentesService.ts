import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import {
  deleteFunction,
  getFunction,
  postFunction,
  updateFunction,
} from "../../Axios/axiosFunctions";
const getGerentes = async (): Promise<Gerente[] | ResponseStatus> => {
  return getFunction("gerentes");
};

const postGerentes = async (form: Gerente): Promise<ResponseStatus> => {
  return postFunction("gerentes", form);
};
const updateGerentes = async (form: Gerente) => {
  return updateFunction("gerentes", form);
};

const deleteGerentes = async (gerentesData: EndUpdateParam) => {
  return deleteFunction("gerentes", gerentesData);
};

const gerentesService = {
  getGerentes,
  postGerentes,
  updateGerentes,
  deleteGerentes,
};

export default gerentesService;
