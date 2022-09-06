import axios from 'axios'
import { errorsHandling } from '../errorsHandling'

const getSupervisores = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'supervisores')
    .catch(function (error) {
      errorsHandling(error)
    })
    return response.data[0] 
  }
  const getSupervisoresById = async (supervisoresData) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'supervisores/id',  {Codigo:supervisoresData}).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllGerentes = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'gerentes', ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllZonas = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'supervisores/zonas', ).catch((error) => errorsHandling(error))
    return response.data[0]
  }

const postSupervisores = async (form) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'supervisores', form ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
const updateSupervisores = async (form) => {
  const response = await axios.put(process.env.REACT_APP_HOST + 'supervisores' , form).catch((error) => errorsHandling(error))
  return response.data[0]
}  

const deleteSupervisores = async (supervisoresData) => {
  const response = await axios.delete(process.env.REACT_APP_HOST + 'supervisores', {data: supervisoresData}).catch((error) => errorsHandling(error))
  return response.data }

const supervisoresService = {
    getSupervisores, postSupervisores, updateSupervisores, deleteSupervisores, getSupervisoresById, getAllGerentes, getAllZonas
  }


export default supervisoresService