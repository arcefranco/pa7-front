import { getFunction, postFunctionArray } from "../../../Axios/axiosFunctions";

const getAdjudicaciones = async (data) => {
  return postFunctionArray("Reportes/efectividadAdj", data);
};

const getOficialesAdj = async () => {
  return getFunction("Reportes/efectividadAdj/oficiales");
};

const getDetalleEfectividad = async (data) => {
  return postFunctionArray("Reportes/efectividadAdj/detalle", data);
};

const efectividadAdjService = {
  getAdjudicaciones,
  getOficialesAdj,
  getDetalleEfectividad,
};

export default efectividadAdjService;
