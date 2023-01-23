import axios, { AxiosResponse } from "axios";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import getHeaderDB from "../../../helpers/getHeaderDB";
import { PuntoDeVenta } from "../../../types/ConfigDatosGenerales/PuntoDeVenta/PuntoDeVenta";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { getFunction } from "../../Axios/axiosFunctions";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";

const getAllPuntosDeVenta = async (): Promise<
  PuntoDeVenta[] | ResponseStatus
> => {
  return getFunction("puntosDeVenta");
};

const createPuntoDeVenta = async (
  puntoData: PuntoDeVenta
): Promise<ResponseStatus> => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "puntosDeVenta",
      puntoData,
      headers
    );
    return response.data;
  } catch (error) {
    return ServiceErrorHandler(error, "Error al agregar punto de venta");
  }
};
const deletePuntoDeVenta = async (puntoData: EndUpdateParam) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_HOST + "puntosDeVenta",
      {
        headers: {
          "x-auth-token": window.localStorage
            .getItem("userToken")
            ?.split(" ")[1] as string,
          "db-connection": window.localStorage.getItem("db") as string,
        },
        data: puntoData,
      }
    );
    return response.data;
  } catch (error) {
    return ServiceErrorHandler(error, "Error al eliminar punto de venta");
  }
};
const updatePuntoDeVenta = async (puntoData: PuntoDeVenta) => {
  try {
    const headers = getHeaderDB();
    const response = await axios.put(
      process.env.REACT_APP_HOST + "puntosDeVenta",
      puntoData,
      headers
    );
    return response.data;
  } catch (error) {
    return ServiceErrorHandler(error, "Error al actualizar punto de venta");
  }
};

const puntosService = {
  getAllPuntosDeVenta,
  deletePuntoDeVenta,
  updatePuntoDeVenta,
  createPuntoDeVenta,
};

export default puntosService;
