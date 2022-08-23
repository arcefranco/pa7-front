import axios from 'axios'
import getHeaderToken from '../../helpers/getHeaderToken';
const API_URL = 'http://localhost:3001/'
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

const createUsuario = async (usuarioData) => {
    const response = await axios.post(API_URL + 'usuarios', usuarioData, headers)
    return response.data
}
const updateUsuario = async (usuarioData) => {
    const response = await axios.put(API_URL + 'usuarios', usuarioData, headers)
    return response.data
}
const deleteUsuario = async (usuarioData) => {
    const response = await axios.delete(API_URL + 'usuarios',  { data: { Codigo: usuarioData } }, headers)
    return response.data
}




const usuariosService = {
    getAllUsuarios,
    getAllVendedores,
    getAllGerentes,
    getAllSupervisores,
    getAllTeamLeaders,
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
  }


export default usuariosService