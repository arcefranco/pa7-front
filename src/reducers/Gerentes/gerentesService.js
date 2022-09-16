import axios from 'axios'
import { errorsHandling } from '../errorsHandling' 
import getHeaderDB from '../../helpers/getHeaderDB'
const getGerentes = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'gerentes', headers).catch((error) => errorsHandling(error))
    return response.data[0] 
  }
  const getGerentesById = async (gerentesData) => {
    const headers = getHeaderDB()
    const response = await axios.post(process.env.REACT_APP_HOST + 'gerentes/id',  {Codigo:gerentesData}, headers).catch((error) => errorsHandling(error))
    return response.data[0]
  }

const postGerentes = async (form) => {
    const headers = getHeaderDB()
    const response = await axios.post(process.env.REACT_APP_HOST + 'gerentes', form, headers ).catch((error) => errorsHandling(error))
    return response.data 
  }
const updateGerentes = async (form) => {
  const headers = getHeaderDB()
  const response = await axios.put(process.env.REACT_APP_HOST + 'gerentes' , form, headers)
  return response.data 
}  

const deleteGerentes = async (gerentesData) => {
  const response = await axios.delete(process.env.REACT_APP_HOST + 'gerentes', {  headers: {
    'db-connection': window.localStorage.getItem('db')
  }, data: gerentesData } )

  return response.data }

const gerentesService = {
    getGerentes, postGerentes, updateGerentes, deleteGerentes, getGerentesById
  }


export default gerentesService