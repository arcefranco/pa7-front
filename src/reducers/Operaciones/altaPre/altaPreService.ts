import axios from 'axios'
import { errorsHandling } from '../../errorsHandling';
import getHeaderToken from '../../../helpers/getHeaderTokenAndDB';
import getHeaderDB from '../../../helpers/getHeaderDB';


const getModelos = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/modelos', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getSucursales = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/sucursales', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getFormasPago = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/formaspago', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getVendedores = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/vendedores', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getPuntosVenta = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/puntosventa', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getOficialCanje = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/oficialcanje', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getTeamLeaders = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/teamleaders', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getSupervisores = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/supervisores', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getIntereses = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/intereses', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getTarjetas = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/tarjetas', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getOrigenSuscripcion = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/origen', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getFechaMinimaCont = async(marca) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/fechaCont', marca, headers).catch((error) => errorsHandling(error))
    return response.data
}

const verifySolicitud = async(solicitud) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/verify', solicitud, headers).catch((error) => errorsHandling(error))
    return response.data
}

const verifySolicitudStatus = async(solicitud) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/solicitudStatus', solicitud, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getModeloValorCuota = async(modeloData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/getValorCuota', modeloData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getModeloPrecio = async(modeloData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/getModeloPrecio', modeloData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const verifyDoc = async(documentoData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/verifyDoc', documentoData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const altaPre = async(data) => { 
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Operaciones/AltaPre/altaPre', data, headers)/* .catch((error) => errorsHandling(error)) */
    return response.data
}

const altaPreService = {
    getModelos,
    getSucursales,
    getFormasPago,
    getVendedores,
    getPuntosVenta,
    getOficialCanje,
    getTeamLeaders,
    getSupervisores,
    getIntereses,
    getTarjetas,
    getOrigenSuscripcion,
    getFechaMinimaCont,
    verifySolicitud,
    verifySolicitudStatus,
    getModeloValorCuota,
    getModeloPrecio,
    verifyDoc,
    altaPre

}

export default altaPreService