import axios from "axios";
import getHeaderDB from "../../../helpers/getHeaderDB";
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

const getSelectedRoles = async (rol: { rol: string }) => {
  const headers = getHeaderDB();
  const response = await axios.post(
    process.env.REACT_APP_HOST + "roles",
    rol,
    headers
  );
  return response.data;
};
const getUserSelectedRoles = async (user: string) => {
  const headers = getHeaderDB();
  const response = await axios.post(
    process.env.REACT_APP_HOST + "roles/user",
    { user: user },
    headers
  );
  return response.data;
};
const addRol = async (rolData) => {
  return postFunction("roles/rol", rolData);
};

const deleteRol = async (rolData) => {
  return deleteFunction("roles", rolData);
};

const copyRoles = async (usersData) => {
  return postFunction("roles/copy", usersData);
};
const replaceRoles = async (usersData) => {
  return postFunction("roles/replace", usersData);
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
  return postFunction("roles/master", rolData);
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
