import axios, { AxiosError } from "axios";
import { errorsHandling } from "../../errorsHandling";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import { getFunction, postFunction } from "../../Axios/axiosFunctions";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";

const getPreOperaciones = async (data) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "Operaciones/ActualPre/solicitudes",
      data,
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

const getDatosPreSol = async (data) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "Operaciones/ActualPre/datosOp",
      data,
      headers
    );

    if (response.data.hasOwnProperty("Numero")) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Operaciones/AltaPre/fechaCont");
  }
};

const getModelos = async () => {
  return getFunction("Operaciones/ActualPre/modelos");
};

const getOficialesMora = async () => {
  return getFunction("Operaciones/ActualPre/oficialesmora");
};

const getOficialesPC = async () => {
  return getFunction("Operaciones/ActualPre/oficialespc");
};

const getOficialesScoring = async () => {
  return getFunction("Operaciones/ActualPre/oficialesScoring");
};

const getOrigenSuscripcion = async () => {
  return getFunction("Operaciones/ActualPre/origen");
};

const getPuntosVenta = async () => {
  return getFunction("Operaciones/ActualPre/puntosventa");
};

const getParametros = async () => {
  try {
    const headers = getHeaderToken();
    const response = await axios.get(
      process.env.REACT_APP_HOST + "Operaciones/ActualPre/parametros",
      headers
    );

    if (
      response.data.hasOwnProperty("soli") ||
      response.data.hasOwnProperty("sanu")
    ) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "Operaciones/AltaPre/fechaCont");
  }
};

const getFormasPago = async () => {
  return getFunction("Operaciones/ActualPre/formasPago");
};

const getTarjetas = async () => {
  return getFunction("Operaciones/ActualPre/tarjetas");
};

const getIntereses = async () => {
  return getFunction("Operaciones/ActualPre/intereses");
};

const pagoSenia = async (data) => {
  return postFunction("Operaciones/ActualPre/pagoSenia", data);
};

const deletePago = async (data) => {
  return postFunction("Operaciones/ActualPre/deletePago", data);
};

const updatePago = async (data) => {
  return postFunction("Operaciones/ActualPre/updatePago", data);
};

const getSenias = async (data) => {
  try {
    const headers = getHeaderToken();
    const response = await axios.post(
      process.env.REACT_APP_HOST + "Operaciones/ActualPre/datosOpSenias",
      data,
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

const actualPreService = {
  getPreOperaciones,
  getDatosPreSol,
  getModelos,
  getOficialesMora,
  getOficialesPC,
  getOficialesScoring,
  getOrigenSuscripcion,
  getPuntosVenta,
  getParametros,
  getFormasPago,
  getTarjetas,
  getIntereses,
  pagoSenia,
  getSenias,
  updatePago,
  deletePago,
};

export default actualPreService;
