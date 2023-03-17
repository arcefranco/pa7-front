import { postFunctionArray } from "../../Axios/axiosFunctions";

const getMoraXVendedor = (data) => {
  return postFunctionArray("Reportes/MoraXVendedorYSup", data);
};

const getMoraXSupervisor = (data) => {
  return postFunctionArray("Reportes/MoraXVendedorYSup/sup", data);
};

const MoraService = {
  getMoraXVendedor,
  getMoraXSupervisor,
};

export default MoraService;
