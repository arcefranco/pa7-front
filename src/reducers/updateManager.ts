import getHeaderTokenAndDB from "../helpers/getHeaderTokenAndDB";
import axios, { AxiosResponse, AxiosError } from "axios";
import { ServiceErrorHandler } from "../helpers/ServiceErrorHandler";
import { oficialParam } from "./ConfigDatosGenerales/Oficiales/OficialesSlice";

export const beginUpdateFunction = async (
  data: EndUpdateParam | oficialParam,
  route: string
) => {
  try {
    const headers = getHeaderTokenAndDB();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + route,
      data,
      headers
    );

    if (response.data.hasOwnProperty("codigo")) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Error al comenzar a editar");
  }
};

export const endUpdateFunction = async (
  data: EndUpdateParam | oficialParam,
  route: string
) => {
  try {
    const headers = getHeaderTokenAndDB();
    const response = await axios.post(
      process.env.REACT_APP_HOST + route,
      data,
      headers
    );

    return response?.data;
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error, "Al terminar edicion");
  }
};
