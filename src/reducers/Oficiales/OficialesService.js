import axios from 'axios'
import { errorsHandling } from '../errorsHandling';


const getOficialSelected = async (oficialName) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'oficiales', oficialName).catch((error) => errorsHandling(error))
    return response.data
}

const deleteOficiales = async (oficialData) => {
    const response = await axios.delete(process.env.REACT_APP_HOST + 'oficiales',  {  headers: {
        'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1]
      }, data: oficialData }).catch((error) => errorsHandling(error))
    return response.data
}
const oficialCategoria =  (oficialData) => {
    
    return oficialData
}

const getOficialById = async (oficialData) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'oficiales/id', oficialData).catch((error) => errorsHandling(error))
    return response.data
}

const updateOficiales = async (oficialData) => {
    const response = await axios.put(process.env.REACT_APP_HOST + 'oficiales/id', oficialData).catch((error) => errorsHandling(error))
    return response.data
}

const createOficiales = async (oficialData) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'oficiales/create', oficialData).catch((error) => errorsHandling(error))
    return response.data
}

const endCommit = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'oficiales/endCommit')
    return response.data
  }
const OficialesService = {
    getOficialSelected,
    deleteOficiales,
    oficialCategoria,
    getOficialById,
    updateOficiales,
    createOficiales,
    endCommit
    }
    
export default OficialesService