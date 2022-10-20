import axios from 'axios'

import { errorsHandling } from '../../errorsHandling'

import getHeaderToken from '../../../helpers/getHeaderTokenAndDB';
import getHeaderDB from '../../../helpers/getHeaderDB';


const getSupervisores = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'supervisores', headers)
    .catch(function (error) {
      errorsHandling(error)
    })
    return response.data[0] 
  } 
  const beginUpdate = async (supervisorData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'supervisores/beginUpdate', supervisorData, headers).catch((error) => errorsHandling(error))
    return response.data
  }


  const endUpdate = async (gerenteData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'supervisores/endUpdate', gerenteData, headers).catch((error) => errorsHandling(error))
    return response.data
}

  const getAllGerentes = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'gerentes', headers ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllGerentesActivos = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'gerentes/activos', headers).catch((error) => errorsHandling(error))
    return response.data[0]}
  const getAllZonas = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'supervisores/zonas',  headers).catch((error) => errorsHandling(error))
    return response.data[0]
  }

const postSupervisores = async (form) => {

    const headers = getHeaderToken();
    const response = await axios.post(process.env.REACT_APP_HOST + 'supervisores', form, headers ).catch((error) => errorsHandling(error))
    return response.data
  }
const updateSupervisores = async (form) => {
  const headers = getHeaderToken();
  const response = await axios.put(process.env.REACT_APP_HOST + 'supervisores' , form, headers).catch((error) => errorsHandling(error))
  return response.data
}  


const deleteSupervisores = async (supervisoresData) => {
  const response = await axios.delete(process.env.REACT_APP_HOST + 'supervisores',{  headers: {
    'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1],
    "db-connection": window.localStorage.getItem('db')
  }, data: supervisoresData }).catch((error) => errorsHandling(error))
  return response.data }

const supervisoresService = {
    getSupervisores, 
    postSupervisores, 
    updateSupervisores, 
    deleteSupervisores, 
    beginUpdate, 
    getAllGerentes, 
    getAllGerentesActivos, 
    getAllZonas,
    endUpdate
  }


export default supervisoresService