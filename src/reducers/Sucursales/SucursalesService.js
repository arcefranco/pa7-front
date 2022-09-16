import axios from 'axios'
import { errorsHandling } from '../errorsHandling';
import getHeaderToken from '../../helpers/getHeaderTokenAndDB';
import getHeaderDB from '../../helpers/getHeaderDB';

const getSucursalById = async(id) => {
    const headers = getHeaderDB()
    const response = await axios.post(process.env.REACT_APP_HOST + 'sucursales/id', id, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getAllSucursales = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'sucursales', headers).catch((error) => errorsHandling(error))
    return response.data
  }

  const deleteSucursal = async (id) => {
    const response = await axios.delete(process.env.REACT_APP_HOST + 'sucursales',  {  headers: {
        'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1],
        "db-connection": window.localStorage.getItem('db')
      }, data: { id: id } })
    return response.data
}

const updateSucursal = async (sucursalData) => {
    const headers = getHeaderToken()
    const response = await axios.put(process.env.REACT_APP_HOST + 'sucursales', sucursalData, headers).catch((error) => errorsHandling(error))
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
updateSucursal
}

export default SucursalesService