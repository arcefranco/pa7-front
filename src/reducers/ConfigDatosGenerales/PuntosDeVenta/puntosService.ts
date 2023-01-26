import { PuntoDeVenta } from "../../../types/ConfigDatosGenerales/PuntoDeVenta/PuntoDeVenta";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import {
  deleteFunction,
  getFunction,
  postFunction,
  updateFunction,
} from "../../Axios/axiosFunctions";

const getAllPuntosDeVenta = async (): Promise<
  PuntoDeVenta[] | ResponseStatus
> => {
  return getFunction("puntosDeVenta");
};
const createPuntoDeVenta = async (
  puntoData: PuntoDeVenta
): Promise<ResponseStatus> => {
  return postFunction("puntosDeVenta", puntoData);
};
const deletePuntoDeVenta = async (puntoData: EndUpdateParam) => {
  return deleteFunction("puntosDeVenta", puntoData);
};

const updatePuntoDeVenta = async (puntoData: PuntoDeVenta) => {
  return updateFunction("puntosDeVenta", puntoData);
};

const puntosService = {
  getAllPuntosDeVenta,
  deletePuntoDeVenta,
  updatePuntoDeVenta,
  createPuntoDeVenta,
};

export default puntosService;
