import axios, { AxiosError } from "axios";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import getHeaderDB from "../../../helpers/getHeaderDB";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";

const endUpdate = async (sucursalData: EndUpdateParam) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "sucursales/endUpdate",
      sucursalData,
      headers
    );

    return response?.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const beginUpdate = async (sucursalesData) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "sucursales/beginUpdate",
      sucursalesData,
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

const getAllSucursales = async () => {
  try {
    const headers = getHeaderDB();
    const response = await axios.get(
      process.env.REACT_APP_HOST + "sucursales",
      headers
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw Error;
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const deleteSucursal = async (id: EndUpdateParam) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_HOST + "sucursales",
      {
        headers: {
          "x-auth-token": window.localStorage
            .getItem("userToken")
            ?.split(" ")[1] as string,
          "db-connection": window.localStorage.getItem("db") as string,
        },
        data: id,
      }
    );
    return response.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const updateSucursal = async (sucursalData) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.put(
      process.env.REACT_APP_HOST + "sucursales",
      sucursalData,
      headers
    );

    return response.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};

const createSucursal = async (
  sucursalData: Sucursal
): Promise<ResponseStatus> => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "sucursales",
      sucursalData,
      headers
    );

    return response.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error);
  }
};
const getAllTipoPlan = async () => {
  try {
    const headers = getHeaderToken();
    const response = await axios.get(
      process.env.REACT_APP_HOST + "modelos/tipoplan",
      headers
    );
    if (Array.isArray(response.data[0])) {
      return response.data[0];
    } else {
      throw Error;
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error, "(Tipo Plan)");
  }
};
const SucursalesService = {
  getAllSucursales,
  deleteSucursal,
  createSucursal,
  updateSucursal,
  beginUpdate,
  endUpdate,
  getAllTipoPlan,
};

export default SucursalesService;
