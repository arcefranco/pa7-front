import {
  deleteFunction,
  postFunction,
  updateFunction,
} from "../../Axios/axiosFunctions";

const getOficialSelected = async (oficialName) => {
  return postFunction("oficiales", oficialName);
};

const deleteOficiales = async (oficialData) => {
  return deleteFunction("oficiales", oficialData);
};
const oficialCategoria = (oficialData) => {
  return oficialData;
};

const updateOficiales = async (oficialData) => {
  return updateFunction("oficiales/id", oficialData);
};

const createOficiales = async (oficialData) => {
  return postFunction("oficiales/create", oficialData);
};

const getOficialById = async (oficialData) => {
  return postFunction("oficiales/id", oficialData);
};

const OficialesService = {
  getOficialSelected,
  deleteOficiales,
  oficialCategoria,
  updateOficiales,
  createOficiales,
  getOficialById,
};

export default OficialesService;
