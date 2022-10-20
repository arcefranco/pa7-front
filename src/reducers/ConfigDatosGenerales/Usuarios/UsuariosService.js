import axios from 'axios'
import getHeaderToken from '../../../helpers/getHeaderTokenAndDB';
import getHeaderDB from '../../../helpers/getHeaderDB';
import { errorsHandling } from '../../errorsHandling';

const getUsuarioById = async(id) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'usuarios/id', id, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getAllUsuarios = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'usuarios/todos', headers).catch((error) => errorsHandling(error))
    return response.data
  }
const getAllVendedores = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'usuarios/vendedores', headers).catch((error) => errorsHandling(error))
    return response.data
}
const getAllGerentes = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'usuarios/gerentes', headers).catch((error) => errorsHandling(error))
    return response.data
}
const getAllSupervisores = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'usuarios/supervisores', headers).catch((error) => errorsHandling(error))
    return response.data
}
const getAllTeamLeaders = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'usuarios/teamLeaders', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getSelectedRoles = async (rol) => {
    const headers = getHeaderDB()
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles', rol, headers).catch((error) => errorsHandling(error))
    return response.data
}
const getUserSelectedRoles = async (user) => {
    const headers = getHeaderDB()
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles/user', {user: user}, headers).catch((error) => errorsHandling(error))
    return response.data
}
const addRol = async (rolData) => {
    const headers = getHeaderDB()
    const {Usuario, rol} = rolData
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles/rol', {Usuario: Usuario, rol: rol}, headers).catch((error) => errorsHandling(error))
    return response.data
}

const deleteRol = async (rolData) => {
    const response = await axios.delete(process.env.REACT_APP_HOST + 'roles',{  headers: {
        'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1],
        "db-connection": window.localStorage.getItem('db')
      }, data:  rolData  }).catch((error) => errorsHandling(error))
    return response.data
}

const copyRoles = async (usersData) => {
    const headers = getHeaderDB()
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles/copy', usersData, headers).catch((error) => errorsHandling(error))
    return response.data
}
const replaceRoles = async (usersData) => {
    const headers = getHeaderDB()
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles/replace', usersData, headers).catch((error) => errorsHandling(error))
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
        'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1],
        "db-connection": window.localStorage.getItem('db')
      }, data: { Codigo: usuarioData } })
    return response.data
}
const giveMaster = async (rolData) => {
    const headers = getHeaderToken();
    const response = await axios.post(process.env.REACT_APP_HOST + 'roles/master', rolData, headers).catch((error) => errorsHandling(error))
    return response.data
}


const endUpdate = async (usuarioData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'usuarios/endUpdate', usuarioData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const beginUpdate = async (usuarioData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'usuarios/beginUpdate', usuarioData, headers).catch((error) => errorsHandling(error))
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
    deleteUsuario,
    endUpdate,
    beginUpdate
  }


export default usuariosService