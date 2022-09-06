import axios from 'axios'
import getHeaderToken from '../../helpers/getHeaderToken';
import { errorsHandling } from '../errorsHandling';

const getUsuarioById = async(id) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'usuarios/id', id).catch((error) => errorsHandling(error))
    return response.data
}

const getAllUsuarios = async () => {

    const response = await axios.get(process.env.REACT_APP_HOST + 'usuarios/todos').catch((error) => errorsHandling(error))
    return response.data
  }
const getAllVendedores = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'usuarios/vendedores').catch((error) => errorsHandling(error))
    return response.data
}
const getAllGerentes = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'usuarios/gerentes').catch((error) => errorsHandling(error))
    return response.data
}
const getAllSupervisores = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'usuarios/supervisores').catch((error) => errorsHandling(error))
    return response.data
}
const getAllTeamLeaders = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'usuarios/teamLeaders').catch((error) => errorsHandling(error))
    return response.data
}

const getSelectedRoles = async (rol) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles', rol).catch((error) => errorsHandling(error))
    return response.data
}
const getUserSelectedRoles = async (user) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles/user', {user: user}).catch((error) => errorsHandling(error))
    return response.data
}
const addRol = async (rolData) => {
    const {Usuario, rol} = rolData
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles/rol', {Usuario: Usuario, rol: rol}).catch((error) => errorsHandling(error))
    return response.data
}

const deleteRol = async (rolData) => {
    const response = await axios.delete(process.env.REACT_APP_HOST + 'roles',  { data: rolData }).catch((error) => errorsHandling(error))
    return response.data
}

const copyRoles = async (usersData) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles/copy', usersData).catch((error) => errorsHandling(error))
    return response.data
}
const replaceRoles = async (usersData) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles/replace', usersData).catch((error) => errorsHandling(error))
    return response.data
}
const createUsuario = async (usuarioData) => {
    const headers = getHeaderToken();
    const response = await axios.post(process.env.REACT_APP_HOST + 'usuarios', usuarioData, headers).catch((error) => errorsHandling(error))
    return response.data
}
const updateUsuario = async (usuarioData) => {
    const headers = getHeaderToken();
    const response = await axios.put(process.env.REACT_APP_HOST + 'usuarios', usuarioData, headers).catch((error) => errorsHandling(error))
    return response.data
}
const deleteUsuario = async (usuarioData) => {
    const response = await axios.delete(process.env.REACT_APP_HOST + 'usuarios',  {  headers: {
        'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1]
      }, data: { Codigo: usuarioData } })
    return response.data
}
const giveMaster = async (rolData) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles/master', rolData).catch((error) => errorsHandling(error))
    return response.data
}




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
    getUsuarioById,
    updateUsuario,
    deleteUsuario
  }


export default usuariosService