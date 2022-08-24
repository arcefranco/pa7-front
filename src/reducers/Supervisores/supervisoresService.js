import axios from 'axios'
const API_URL = 'http://localhost:3001/'

const getSupervisores = async () => {
    const response = await axios.get(API_URL + 'supervisores')
    return response.data[0] 
  }
  const getSupervisoresById = async (supervisoresData) => {
    const response = await axios.post(API_URL + 'supervisores/id',  {Codigo:supervisoresData})
    return response.data[0]
  }

const postSupervisores = async (form) => {
    const response = await axios.post(API_URL + 'supervisores', form )
    return response.data 
  }
const updateSupervisores = async (form) => {
  const response = await axios.put(API_URL + 'supervisores' , form)
  return response.data[0] 
}  

const deleteSupervisores = async (supervisoresData) => {
  const response = await axios.delete(API_URL + 'supervisores', {data: {id: supervisoresData}})
  return response.data }

const supervisoresService = {
    getSupervisores, postSupervisores, updateSupervisores, deleteSupervisores, getSupervisoresById
  }


export default supervisoresService