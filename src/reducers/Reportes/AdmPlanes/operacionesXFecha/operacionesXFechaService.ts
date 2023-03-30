import { postFunctionArray } from "../../../Axios/axiosFunctions";

const getOperacionesXFecha = async (data) => {
  return postFunctionArray("Reportes/AdmPlanes/operacionesPorFecha", data);
};

const operacionesXFechaService = {
  getOperacionesXFecha,
};

export default operacionesXFechaService;
