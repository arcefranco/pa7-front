import axios, { AxiosError } from "axios";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import getHeaderDB from "../../../helpers/getHeaderDB";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";
import { ResponseStatus } from "../../../types/Generales/ResponseStatus";
import { getFunction } from "../../Axios/axiosFunctions";

const getAllSucursales = async () => {
  return getFunction("sucursales");
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
  return getFunction("modelos/tipoplan");
};
const SucursalesService = {
  getAllSucursales,
  deleteSucursal,
  createSucursal,
  updateSucursal,
  getAllTipoPlan,
};

export default SucursalesService;
