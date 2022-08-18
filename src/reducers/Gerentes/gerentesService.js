import axios from 'axios'
const API_URL = 'http://localhost:3001/'

const getGerentes = async () => {
    const response = await axios.get(API_URL + 'gerentes')
    return response.data[0] 
  }
const postGerentes = async (form) => {
    const response = await axios.post(API_URL + 'gerentes', form )
    return response.data 
  }
const updateGerentes = async () => {
  const response = await axios.put(API_URL + 'gerentes')
  return response.data[0] 
}  

const deleteGerentes = async (json) => {
  const response = await axios.delete(API_URL + 'gerentes', json)
  return response.data }

const gerentesService = {
    getGerentes, postGerentes, updateGerentes, deleteGerentes
  }


export default gerentesService