import axios from 'axios'
import { errorsHandling } from '../../errorsHandling';
import getHeaderDB from '../../../helpers/getHeaderDB';
import getHeader from '../../../helpers/getHeaderTokenAndDB'

const getOficialSelected = async (oficialName) => {
    const headers = getHeaderDB()
    const response = await axios.post(process.env.REACT_APP_HOST + 'oficiales', oficialName, headers).catch((error) => errorsHandling(error))
    return response.data
}
const beginUpdate = async (oficialData) => {
    const headers = getHeader()
    const response = await axios.post(process.env.REACT_APP_HOST + 'oficiales/beginUpdate', oficialData, headers).catch((error) => errorsHandling(error))
    return response.data
  }
const deleteOficiales = async (oficialData) => {

    const response = await axios.delete(process.env.REACT_APP_HOST + 'oficiales',  {  headers: {
        'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1],
        "db-connection": window.localStorage.getItem('db')
      }, data: oficialData }).catch((error) => errorsHandling(error))
    return response.data
}
const oficialCategoria =  (oficialData) => {
    
    return oficialData
}

const getOficialById = async (oficialData) => {
    const headers = getHeader()
    const response = await axios.post(process.env.REACT_APP_HOST + 'oficiales/id', oficialData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const updateOficiales = async (oficialData) => {
    const headers = getHeaderDB()
    const response = await axios.put(process.env.REACT_APP_HOST + 'oficiales/id', oficialData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const createOficiales = async (oficialData) => {
    const headers = getHeader()
    const response = await axios.post(process.env.REACT_APP_HOST + 'oficiales/create', oficialData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const endUpdate = async (oficialData) => {
    const headers = getHeader()
    const response = await axios.post(process.env.REACT_APP_HOST + 'oficiales/endUpdate', oficialData, headers).catch(err => errorsHandling(err))
    return response.data
}

const OficialesService = {
    getOficialSelected,
    deleteOficiales,
    oficialCategoria,
    getOficialById,
    updateOficiales,
    createOficiales,
    beginUpdate,
    endUpdate
    }
    
export default OficialesService