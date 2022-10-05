import axios from 'axios'

import { errorsHandling } from '../errorsHandling'

import getHeaderToken from '../../helpers/getHeaderTokenAndDB';

import getHeaderDB from '../../helpers/getHeaderDB';

const getVendedores = async () => {
  const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'vendedores', headers)
    .catch(function (error) {
      errorsHandling(error)
    })
    return response.data[0] 
  }
  const getVendedoresById = async (vendedoresData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'vendedores/id',  {Codigo:vendedoresData}, headers).catch((error) => errorsHandling(error))
    return response.data
  }

  const endUpdate = async (gerenteData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'vendedores/endUpdate', gerenteData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const beginUpdate = async (gerenteData) => {
  const headers = getHeaderToken()
  const response = await axios.post(process.env.REACT_APP_HOST + 'vendedores/beginUpdate', gerenteData, headers).catch((error) => errorsHandling(error))
  return response.data
}
  const getAllTeamLeaders = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'teamleaders', headers ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllTeamLeadersActivos = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'teamleaders/activos', headers ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllEscalas = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'vendedores/escalas', headers ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllOficialesScoring = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'vendedores/oficialesScoring', headers ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllOficialesMora = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'vendedores/oficialesMora', headers ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllOficialesScoringActivos = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'vendedores/oficialesScoringActivos', headers ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllOficialesMoraActivos = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'vendedores/oficialesMoraActivos', headers ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
const postVendedores = async (form) => {

    const headers = getHeaderToken();
    const response = await axios.post(process.env.REACT_APP_HOST + 'vendedores', form, headers ).catch((error) => errorsHandling(error))
    return response.data
  }
const updateVendedores = async (form) => {
  const headers = getHeaderToken();
  const response = await axios.put(process.env.REACT_APP_HOST + 'vendedores' , form, headers).catch((error) => errorsHandling(error))
  return response.data
} 


const deleteVendedores = async (vendedoresData) => {
  const response = await axios.delete(process.env.REACT_APP_HOST + 'vendedores' ,{  headers: {
    'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1],
    "db-connection": window.localStorage.getItem('db')
  }, data: vendedoresData }).catch((error) => errorsHandling(error))
  return response.data }

const vendedoresService = {
    getVendedores, 
    postVendedores,
    beginUpdate, 
    updateVendedores, 
    deleteVendedores, 
    getVendedoresById, 
    getAllEscalas, 
    getAllOficialesMora, 
    getAllOficialesScoring, 
    getAllOficialesMoraActivos, 
    getAllOficialesScoringActivos, 
    getAllTeamLeaders, 
    getAllTeamLeadersActivos, 
    endUpdate
  }


export default vendedoresService