import axios from 'axios'

import { errorsHandling } from '../errorsHandling'

import getHeaderToken from '../../helpers/getHeaderToken';



const getVendedores = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'vendedores')
    .catch(function (error) {
      errorsHandling(error)
    })
    return response.data[0] 
  }
  const getVendedoresById = async (vendedoresData) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'vendedores/id',  {Codigo:vendedoresData}).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllTeamLeaders = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'teamleaders', ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllEscalas = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'vendedores/escalas', ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllOficialesScoring = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'vendedores/oficialesScoring', ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllOficialesMora = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'vendedores/oficialesMora', ).catch((error) => errorsHandling(error))
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
  const headers = getHeaderToken();
  const response = await axios.delete(process.env.REACT_APP_HOST + 'vendedores', {data: vendedoresData}).catch((error) => errorsHandling(error))
  return response.data }

const vendedoresService = {
    getVendedores, postVendedores, updateVendedores, deleteVendedores, getVendedoresById, getAllEscalas, getAllOficialesMora, getAllOficialesScoring, getAllTeamLeaders 
  }


export default vendedoresService