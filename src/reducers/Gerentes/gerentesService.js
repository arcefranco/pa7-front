import axios from 'axios'


const getGerentes = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'gerentes')
    return response.data[0] 
  }
  const getGerentesById = async (gerentesData) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'gerentes/id',  {Codigo:gerentesData})
    return response.data[0]
  }

const postGerentes = async (form) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'gerentes', form )
    return response.data 
  }
const updateGerentes = async (form) => {
  const response = await axios.put(process.env.REACT_APP_HOST + 'gerentes' , form)
  return response.data[0] 
}  

const deleteGerentes = async (gerentesData) => {
  const response = await axios.delete(process.env.REACT_APP_HOST + 'gerentes', {data: {id: gerentesData}})
  return response.data }

const gerentesService = {
    getGerentes, postGerentes, updateGerentes, deleteGerentes, getGerentesById
  }


export default gerentesService