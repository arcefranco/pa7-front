import axios from 'axios'
import { errorsHandling } from '../errorsHandling';
import getHeaderToken from '../../helpers/getHeaderToken';

const getModeloById = async(id) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'modelos/id', id).catch((error) => errorsHandling(error))
    return response.data [0]
}

const getAllModelos = async () => {

    const response = await axios.get(process.env.REACT_APP_HOST + 'modelos').catch((error) => errorsHandling(error))
    return response.data[0]
  }

  const getAllTipoPlan = async () => {

    const response = await axios.get(process.env.REACT_APP_HOST + 'modelos/tipoplan').catch((error) => errorsHandling(error))
    return response.data
  } 

  const deleteModelos = async (id) => {
    const response = await axios.delete(process.env.REACT_APP_HOST + 'modelos',  {  headers: {
        'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1]
      }, data: { id: id } })
    return response.data
}

const updateModelos = async (ModelosData) => {
    const headers = getHeaderToken()
    const response = await axios.put(process.env.REACT_APP_HOST + 'modelos', ModelosData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const endCommit = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'modelos/endCommit')
    return response.data
}

const createModelos = async (ModelosData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'modelos', ModelosData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const modelosService = {
getModeloById,
getAllModelos,
getAllTipoPlan,
deleteModelos,
createModelos,
updateModelos,
endCommit
}

export default modelosService