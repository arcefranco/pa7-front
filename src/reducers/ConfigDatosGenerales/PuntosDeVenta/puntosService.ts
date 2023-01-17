import axios, { AxiosResponse } from "axios";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import getHeaderDB from "../../../helpers/getHeaderDB";
import { PuntoDeVenta } from "../../../types/ConfigDatosGenerales/PuntoDeVenta/PuntoDeVenta";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { AxiosError } from "axios";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";

const getAllPuntosDeVenta = async (): Promise<
  PuntoDeVenta[] | ResponseStatus
> => {
  try {
    const headers = getHeaderDB();
    const response: AxiosResponse = await axios.get(
      process.env.REACT_APP_HOST + "puntosDeVenta",
      headers
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.log(response.data);
      throw Error(response.data);
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error, "(puntos de venta)");
  }
};
const beginUpdate = async (puntoData: EndUpdateParam) => {
  try {
    const headers = getHeaderToken();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + "puntosDeVenta/beginUpdate",
      puntoData,
      headers
    );
    return response.data;
  } catch (error) {
    return ServiceErrorHandler(error);
  }
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

const endUpdate = async (puntoData: EndUpdateParam) => {
  try {
    const headers = getHeaderToken();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + "puntosDeVenta/endUpdate",
      puntoData,
      headers
    );
    return response.data;
  } catch (error) {
    return ServiceErrorHandler(error);
  }
};

const puntosService = {
  getAllPuntosDeVenta,
  beginUpdate,
  deletePuntoDeVenta,
  updatePuntoDeVenta,
  createPuntoDeVenta,
  endUpdate,
};

export default puntosService;
