import { postFunctionArray } from "../../Axios/axiosFunctions";

const getMoraXVendedor = (data) => {
  return postFunctionArray("Reportes/MoraXVendedorYSup", data);
};

const MoraService = {
  getMoraXVendedor,
};

export default MoraService;
