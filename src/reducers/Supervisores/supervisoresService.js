import axios from 'axios'


const getSupervisores = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'supervisores')
    return response.data[0] 
  }
  const getSupervisoresById = async (supervisoresData) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'supervisores/id',  {Codigo:supervisoresData})
    return response.data[0]
  }
  const getAllGerentes = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'gerentes', )
    return response.data[0]
  }
  const getAllZonas = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'supervisores/zonas', )
    return response.data[0]
  }

const postSupervisores = async (form) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'supervisores', form )
    return response.data[0]
  }
const updateSupervisores = async (form) => {
  const response = await axios.put(process.env.REACT_APP_HOST + 'supervisores' , form)
  return response.data[0]
}  

const deleteSupervisores = async (supervisoresData) => {
  const response = await axios.delete(process.env.REACT_APP_HOST + 'supervisores', {data: supervisoresData})
  return response.data }

const supervisoresService = {
    getSupervisores, postSupervisores, updateSupervisores, deleteSupervisores, getSupervisoresById, getAllGerentes, getAllZonas
  }


export default supervisoresService