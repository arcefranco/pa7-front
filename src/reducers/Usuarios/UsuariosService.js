import axios from 'axios'

const API_URL = 'http://localhost:3001/'

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


const usuariosService = {
    getAllUsuarios,
    getAllVendedores,
    getAllGerentes,
    getAllSupervisores,
    getAllTeamLeaders
  }


export default usuariosService