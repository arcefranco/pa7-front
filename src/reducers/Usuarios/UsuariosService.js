import axios from 'axios'
import getHeaderToken from '../../helpers/getHeaderToken';
import { API_URL } from '../APIURL';
const headers = getHeaderToken();

const getUsuarioById = async(id) => {
    const response = await axios.post(API_URL + 'usuarios/id', id)
    return response.data
}

const getAllUsuarios = async () => {

    const response = await axios.get(API_URL + 'usuarios/todos')
    return response.data
  }
const getAllVendedores = async () => {
    const response = await axios.get(API_URL + 'usuarios/vendedores')
    return response.data
}
const getAllGerentes = async () => {
    const response = await axios.get(API_URL + 'usuarios/gerentes')
    return response.data
}
const getAllSupervisores = async () => {
    const response = await axios.get(API_URL + 'usuarios/supervisores')
    return response.data
}
const getAllTeamLeaders = async () => {
    const response = await axios.get(API_URL + 'usuarios/teamLeaders')
    return response.data
}

const getSelectedRoles = async (rol) => {
    const response = await axios.post(API_URL + 'roles', rol)
    return response.data
}
const getUserSelectedRoles = async (user) => {
    const response = await axios.post(API_URL + 'roles/user', {user: user})
    return response.data
}
const addRol = async (rolData) => {
    const {Usuario, rol} = rolData
    const response = await axios.post(API_URL + 'roles/rol', {Usuario: Usuario, rol: rol})
    return response.data
}

const deleteRol = async (rolData) => {
    const response = await axios.delete(API_URL + 'roles',  { data: rolData })
    return response.data
}

const copyRoles = async (usersData) => {
    const response = await axios.post(API_URL + 'roles/copy', usersData)
    return response.data
}
const replaceRoles = async (usersData) => {
    const response = await axios.post(API_URL + 'roles/replace', usersData)
    return response.data
}
const createUsuario = async (usuarioData) => {
    const response = await axios.post(API_URL + 'usuarios', usuarioData, headers)
    return response.data
}
const updateUsuario = async (usuarioData) => {
    const response = await axios.put(API_URL + 'usuarios', usuarioData, headers)
    return response.data
}
const deleteUsuario = async (usuarioData) => {
    const response = await axios.delete(API_URL + 'usuarios',  {  headers: {
        'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1]
      }, data: { Codigo: usuarioData } })
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
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
  }


export default usuariosService