import {
  deleteFunction,
  postFunction,
  updateFunction,
} from "../../Axios/axiosFunctions";
import axios from "axios";
import getHeaderTokenAndDB from "../../../helpers/getHeaderTokenAndDB";
import { AxiosResponse } from "axios";
import { ServiceErrorHandler } from "../../../helpers/ServiceErrorHandler";
const getOficialSelected = async (oficialName) => {
  try {
    const headers = getHeaderTokenAndDB();
    const response: AxiosResponse = await axios.post(
      process.env.REACT_APP_HOST + "oficiales",
      oficialName,
      headers
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    return ServiceErrorHandler(error, "oficiales");
  }
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

const OficialesService = {
  getOficialSelected,
  deleteOficiales,
  oficialCategoria,
  updateOficiales,
  createOficiales,
};

export default OficialesService;
