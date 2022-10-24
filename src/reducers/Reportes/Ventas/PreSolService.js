import axios from 'axios'
import { errorsHandling } from '../../errorsHandling';
import getHeaderToken from '../../../helpers/getHeaderTokenAndDB';
import getHeaderDB from '../../../helpers/getHeaderDB';


const getPreSol = async(preSolData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Ventas/PreSol', preSolData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getDetalleIngresadas = async(preSolData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Ventas/PreSol/ingresadas', preSolData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getDetalleMP = async(preSolData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Ventas/PreSol/mp', preSolData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getDetalleAnulRechaz = async(preSolData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Ventas/PreSol/anulRechaz', preSolData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getDetalleCruceScoring = async(preSolData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Ventas/PreSol/cruceScoring', preSolData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getDetalleProduccion = async(preSolData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Ventas/PreSol/produccion', preSolData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getDetallePendientes = async(preSolData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Ventas/PreSol/pendientes', preSolData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getDetalleTresYSiete = async(preSolData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Ventas/PreSol/tresysiete', preSolData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getDetalleProdYCS = async(preSolData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Ventas/PreSol/prodYCS', preSolData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const PreSolService = {
    getPreSol,
    getDetalleIngresadas,
    getDetalleMP,
    getDetalleAnulRechaz,
    getDetalleCruceScoring,
    getDetalleProduccion,
    getDetallePendientes,
    getDetalleTresYSiete,
    getDetalleProdYCS
}

export default PreSolService