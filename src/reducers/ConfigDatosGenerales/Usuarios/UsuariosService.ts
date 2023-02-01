import axios from "axios";
import getHeaderToken from "../../../helpers/getHeaderTokenAndDB";
import getHeaderDB from "../../../helpers/getHeaderDB";
import { errorsHandling } from "../../errorsHandling";
import {
  deleteFunction,
  getFunction,
  postFunction,
  updateFunction,
} from "../../Axios/axiosFunctions";
import { Usuario } from "../../../types/ConfigDatosGenerales/Usuarios/Usuario";

const getAllUsuarios = async () => {
  return getFunction("usuarios/todos");
};
const getAllVendedores = async () => {
  return getFunction("usuarios/vendedores");
};
const getAllGerentes = async () => {
  return getFunction("usuarios/gerentes");
};
const getAllSupervisores = async () => {
  return getFunction("usuarios/supervisores");
};
const getAllTeamLeaders = async () => {
  return getFunction("usuarios/teamLeaders");
};

const getSelectedRoles = async (rol: string) => {
  const headers = getHeaderDB();
  const response = await axios
    .post(process.env.REACT_APP_HOST + "roles", rol, headers)
    .catch((error) => errorsHandling(error));
  return response.data;
};
const getUserSelectedRoles = async (user) => {
  const headers = getHeaderDB();
  const response = await axios
    .post(process.env.REACT_APP_HOST + "roles/user", { user: user }, headers)
    .catch((error) => errorsHandling(error));
  return response.data;
};
const addRol = async (rolData) => {
  const headers = getHeaderDB();
  const { Usuario, rol } = rolData;
  const response = await axios
    .post(
      process.env.REACT_APP_HOST + "roles/rol",
      { Usuario: Usuario, rol: rol },
      headers
    )
    .catch((error) => errorsHandling(error));
  return response.data;
};

const deleteRol = async (rolData) => {
  const response = await axios
    .delete(process.env.REACT_APP_HOST + "roles", {
      headers: {
        "x-auth-token": window.localStorage
          .getItem("userToken")
          ?.split(" ")[1] as string,
        "db-connection": window.localStorage.getItem("db") as string,
      },
      data: rolData,
    })
    .catch((error) => errorsHandling(error));
  return response.data;
};

const copyRoles = async (usersData) => {
  const headers = getHeaderDB();
  const response = await axios
    .post(process.env.REACT_APP_HOST + "roles/copy", usersData, headers)
    .catch((error) => errorsHandling(error));
  return response.data;
};
const replaceRoles = async (usersData) => {
  const headers = getHeaderDB();
  const response = await axios
    .post(process.env.REACT_APP_HOST + "roles/replace", usersData, headers)
    .catch((error) => errorsHandling(error));
  return response.data;
};
const createUsuario = async (usuarioData: Usuario) => {
  return postFunction("usuarios", usuarioData);
};
const updateUsuario = async (usuarioData: Usuario) => {
  return updateFunction("usuarios", usuarioData);
};
const deleteUsuario = async (usuarioData) => {
  return deleteFunction("usuarios", usuarioData);
};
const giveMaster = async (rolData) => {
  const headers = getHeaderToken();
  const response = await axios
    .post(process.env.REACT_APP_HOST + "roles/master", rolData, headers)
    .catch((error) => errorsHandling(error));
  return response.data;
};

const usuariosService = {
  getAllUsuarios,
  getAllVendedores,
  getAllGerentes,
  getAllSupervisores,
  getAllTeamLeaders,
  getSelectedRoles,
  getUserSelectedRoles,
  addRol,
  deleteRol,
  copyRoles,
  replaceRoles,
  giveMaster,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};

export default usuariosService;
