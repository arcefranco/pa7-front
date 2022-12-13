import axios from 'axios'
import { errorsHandling } from '../../errorsHandling';
import getHeaderToken from '../../../helpers/getHeaderTokenAndDB';

const getPreOperaciones = async(data) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/solicitudes', data, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getDatosPreSol = async(data) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/datosOp', data, headers).catch((error) => errorsHandling(error))
    return response.data
}

const getModelos = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/modelos', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getOficialesMora = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/oficialesmora', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getOficialesPC = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/oficialespc', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getOficialesScoring = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/oficialesScoring', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getOrigenSuscripcion = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/origen', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getPuntosVenta = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/puntosventa', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getParametros = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/parametros', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getFormasPago = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/formasPago', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getTarjetas = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/tarjetas', headers).catch((error) => errorsHandling(error))
    return response.data
}

const getIntereses = async() => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/intereses', headers).catch((error) => errorsHandling(error))
    return response.data
}

const pagoSenia = async(data) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Operaciones/ActualPre/pagoSenia', data, headers).catch((error) => errorsHandling(error))
    return response.data
}


const actualPreService = {
    getPreOperaciones,
    getDatosPreSol,
    getModelos,
    getOficialesMora,
    getOficialesPC,
    getOficialesScoring,
    getOrigenSuscripcion,
    getPuntosVenta,
    getParametros,
    getFormasPago,
    getTarjetas,
    getIntereses,
    pagoSenia
}

export default actualPreService