import axios from "axios";
import { errorsHandling } from "../../errorsHandling";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import { getFunction } from "../../Axios/axiosFunctions";

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
  const headers = getHeaderToken();
  const response = await axios.post(
    process.env.REACT_APP_HOST + "Operaciones/AltaPre/fechaCont",
    marca,
    headers
  );
  return response.data;
};

const verifySolicitud = async (solicitud) => {
  const headers = getHeaderToken();
  const response = await axios
    .post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/verify",
      solicitud,
      headers
    )
    .catch((error) => errorsHandling(error));
  return response.data;
};

const verifySolicitudStatus = async (solicitud) => {
  const headers = getHeaderToken();
  const response = await axios
    .post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/solicitudStatus",
      solicitud,
      headers
    )
    .catch((error) => errorsHandling(error));
  return response.data;
};

const getModeloValorCuota = async (modeloData) => {
  const headers = getHeaderToken();
  const response = await axios
    .post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/getValorCuota",
      modeloData,
      headers
    )
    .catch((error) => errorsHandling(error));
  return response.data;
};

const getModeloPrecio = async (modeloData) => {
  const headers = getHeaderToken();
  const response = await axios
    .post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/getModeloPrecio",
      modeloData,
      headers
    )
    .catch((error) => errorsHandling(error));
  return response.data;
};

const verifyDoc = async (documentoData) => {
  const headers = getHeaderToken();
  const response = await axios
    .post(
      process.env.REACT_APP_HOST + "Operaciones/AltaPre/verifyDoc",
      documentoData,
      headers
    )
    .catch((error) => errorsHandling(error));
  return response.data;
};

const altaPre = async (data) => {
  const headers = getHeaderToken();
  const response = await axios.post(
    process.env.REACT_APP_HOST + "Operaciones/AltaPre/altaPre",
    data,
    headers
  ); /* .catch((error) => errorsHandling(error)) */
  return response.data;
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
