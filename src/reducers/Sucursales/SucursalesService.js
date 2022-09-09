import axios from 'axios'
import { errorsHandling } from '../errorsHandling';
import getHeaderToken from '../../helpers/getHeaderToken';

const getSucursalById = async(id) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'sucursales/id', id).catch((error) => errorsHandling(error))
    return response.data
}

const getAllSucursales = async () => {

    const response = await axios.get(process.env.REACT_APP_HOST + 'sucursales').catch((error) => errorsHandling(error))
    return response.data
  }

  const deleteSucursal = async (id) => {
    const response = await axios.delete(process.env.REACT_APP_HOST + 'sucursales',  {  headers: {
        'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1]
      }, data: { id: id } })
    return response.data
}

const updateSucursal = async (sucursalData) => {
    const headers = getHeaderToken()
    const response = await axios.put(process.env.REACT_APP_HOST + 'sucursales', sucursalData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const endCommit = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'sucursales/endCommit')
    return response.data
}

const createSucursal = async (sucursalData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'sucursales', sucursalData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const SucursalesService = {
getSucursalById,
getAllSucursales,
deleteSucursal,
createSucursal,
updateSucursal,
endCommit
}

export default SucursalesService