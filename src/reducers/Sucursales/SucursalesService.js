import axios from 'axios'
import { errorsHandling } from '../errorsHandling';
import getHeaderToken from '../../helpers/getHeaderTokenAndDB';
import getHeaderDB from '../../helpers/getHeaderDB';

const getSucursalById = async(id) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'sucursales/id', id, headers).catch((error) => errorsHandling(error))
    return response.data
}

const endUpdate = async (sucursalData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'sucursales/endUpdate', sucursalData, headers).catch((error) => errorsHandling(error))
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
const getAllTipoPlan = async () => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'modelos/tipoplan', headers).catch((error) => errorsHandling(error))
    const planes = response.data[0]
    // window.localStorage.setItem("tipoPlan", JSON.stringify(planes))
    return planes
  } 
const SucursalesService = {
getSucursalById,
getAllSucursales,
deleteSucursal,
createSucursal,
updateSucursal,
endUpdate,
getAllTipoPlan,
}

export default SucursalesService