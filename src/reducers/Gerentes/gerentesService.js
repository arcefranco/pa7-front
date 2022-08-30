import axios from 'axios'
const API_URL = 'http://localhost:3001/'

const getGerentes = async () => {
    const response = await axios.get(API_URL + 'gerentes')
    return response.data[0] 
  }
  const getGerentesById = async (gerentesData) => {
    const response = await axios.post(API_URL + 'gerentes/id',  {Codigo:gerentesData})
    return response.data[0]
  }

const postGerentes = async (form) => {
    const response = await axios.post(API_URL + 'gerentes', form )
    return response.data 
  }
const updateGerentes = async (form) => {
  const response = await axios.put(API_URL + 'gerentes' , form)
  return response.data[0] 
}  

const deleteGerentes = async (gerentesData) => {
  const response = await axios.delete(API_URL + 'gerentes', {data: {id: gerentesData}})
  return response.data }

const gerentesService = {
    getGerentes, postGerentes, updateGerentes, deleteGerentes, getGerentesById
  }


export default gerentesService