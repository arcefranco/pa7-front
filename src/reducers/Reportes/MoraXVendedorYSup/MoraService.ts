import { postFunctionArray } from "../../Axios/axiosFunctions";

const getMoraXVendedor = (data) => {
  return postFunctionArray("Reportes/MoraXVendedorYSup", data);
};

const getMoraXSupervisor = (data) => {
  return postFunctionArray("Reportes/MoraXVendedorYSup/sup", data);
};

const getMoraXSupervisorSC = (data) => {
  data.SC = 1;
  return postFunctionArray("Reportes/MoraXVendedorYSup/sup", data);
};

const MoraService = {
  getMoraXVendedor,
  getMoraXSupervisor,
  getMoraXSupervisorSC,
};

export default MoraService;
