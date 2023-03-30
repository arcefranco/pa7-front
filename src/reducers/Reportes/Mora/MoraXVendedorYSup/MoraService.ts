import axios, { AxiosResponse, AxiosError } from "axios";
import getHeaderDB from "../../../../helpers/getHeaderDB";
import getHeaderTokenAndDB from "../../../../helpers/getHeaderTokenAndDB";
import { ServiceErrorHandler } from "../../../../helpers/ServiceErrorHandler";

const getMoraXVendedor = async (data) => {
  try {
    const headers = getHeaderTokenAndDB();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + "Reportes/MoraXVendedorYSup",
      data,
      headers
    );
    if (
      response.data.hasOwnProperty("resumen") &&
      response.data.hasOwnProperty("detalle")
    ) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Reportes/MoraXVendedorYSup");
  }
};

const getMoraXSupervisor = async (data) => {
  try {
    const headers = getHeaderTokenAndDB();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + "Reportes/MoraXVendedorYSup/sup",
      data,
      headers
    );
    if (
      response.data.hasOwnProperty("resumen") &&
      response.data.hasOwnProperty("detalle")
    ) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Reportes/MoraXVendedorYSup");
  }
};

const getMoraXSupervisorSC = async (data) => {
  data.SC = 1;
  try {
    const headers = getHeaderTokenAndDB();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + "Reportes/MoraXVendedorYSup/sup",
      data,
      headers
    );
    if (
      response.data.hasOwnProperty("resumen") &&
      response.data.hasOwnProperty("detalle")
    ) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Reportes/MoraXVendedorYSup");
  }
};

/* const getMoraXOficialDetalle = (data) => {
  return postFunctionArray("Reportes/MoraXVendedorYSup/detalle", data);
}; */

const MoraService = {
  getMoraXVendedor,
  getMoraXSupervisor,
  getMoraXSupervisorSC,
  /*   getMoraXOficialDetalle, */
};

export default MoraService;
