import axios, { AxiosError } from "axios";
import { errorsHandling } from "../../errorsHandling";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import { getFunction, postFunction } from "../../Axios/axiosFunctions";

const getModelos = async () => {
  return getFunction("Operaciones/AltaPre/modelos");
};

const getSucursales = async () => {
  return getFunction("Operaciones/AltaPre/sucursales");
};

const getFormasPago = async () => {
  return getFunction("Operaciones/AltaPre/formaspago");
};

const getVendedores = async () => {
  return getFunction("Operaciones/AltaPre/vendedores");
};

const getPuntosVenta = async () => {
  return getFunction("Operaciones/AltaPre/puntosventa");
};

const getOficialCanje = async () => {
  return getFunction("Operaciones/AltaPre/oficialcanje");
};

const getTeamLeaders = async () => {
  return getFunction("Operaciones/AltaPre/teamleaders");
};

const getSupervisores = async () => {
  return getFunction("Operaciones/AltaPre/supervisores");
};

const getIntereses = async () => {
  return getFunction("Operaciones/AltaPre/intereses");
};

const getTarjetas = async () => {
  return getFunction("Operaciones/AltaPre/tarjetas");
};

const getOrigenSuscripcion = async () => {
  return getFunction("Operaciones/AltaPre/origen");
};

const getFechaMinimaCont = async (marca) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/fechaCont",
      marca,
      headers
    );
    if (response.data.hasOwnProperty("ValorSTR")) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Operaciones/AltaPre/fechaCont");
  }
};

const verifySolicitud = async (solicitud) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/verify",
      solicitud,
      headers
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error: any | AxiosError) {
    return ServiceErrorHandler(error, "Operaciones/AltaPre/verify");
  }
};

const verifySolicitudStatus = async (solicitud) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/solicitudStatus",
      solicitud,
      headers
    );
    if (response.data.hasOwnProperty("Solicitud")) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Operaciones/AltaPre/solicitudStatus");
  }
};

const getModeloValorCuota = async (modeloData) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/getValorCuota",
      modeloData,
      headers
    );

    if (response.data.hasOwnProperty("CuotaTerminal")) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Operaciones/AltaPre/getValorCuota");
  }
};

const getModeloPrecio = async (modeloData) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/getModeloPrecio",
      modeloData,
      headers
    );

    if (response.data.hasOwnProperty("PrecioA")) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Operaciones/AltaPre/getModeloPrecio");
  }
};

const verifyDoc = async (documentoData) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/verifyDoc",
      documentoData,
      headers
    );

    if (response.data.hasOwnProperty("docStatus")) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Operaciones/AltaPre/getModeloPrecio");
  }
};

const altaPre = async (data) => {
  return postFunction("Operaciones/AltaPre/altaPre", data);
};

const altaPreService = {
  getModelos,
  getSucursales,
  getFormasPago,
  getVendedores,
  getPuntosVenta,
  getOficialCanje,
  getTeamLeaders,
  getSupervisores,
  getIntereses,
  getTarjetas,
  getOrigenSuscripcion,
  getFechaMinimaCont,
  verifySolicitud,
  verifySolicitudStatus,
  getModeloValorCuota,
  getModeloPrecio,
  verifyDoc,
  altaPre,
};

export default altaPreService;
