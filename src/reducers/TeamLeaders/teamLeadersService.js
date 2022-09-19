import axios from 'axios'

import { errorsHandling } from '../errorsHandling'

import getHeaderToken from '../../helpers/getHeaderTokenAndDB';
import getHeaderDB from '../../helpers/getHeaderDB';


const getTeamLeaders = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'teamleaders', headers)
    .catch(function (error) {
      errorsHandling(error)
    })
    return response.data[0] 
  }
  const getTeamLeadersById = async (teamLeadersData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'teamleaders/id',  {Codigo:teamLeadersData}, headers).catch((error) => errorsHandling(error))
    return response.data
  }

  const endUpdate = async (gerenteData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'teamleaders/endUpdate', gerenteData, headers).catch((error) => errorsHandling(error))
    return response.data
}
  const getAllSupervisores = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'supervisores', headers ).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllSupervisoresActivos = async () => {
    const headers = getHeaderDB()
    const response = await axios.get(process.env.REACT_APP_HOST + 'supervisores/activos', headers ).catch((error) => errorsHandling(error))
    return response.data[0]
  }


const postTeamLeaders = async (form) => {

    const headers = getHeaderToken();
    const response = await axios.post(process.env.REACT_APP_HOST + 'teamleaders', form, headers ).catch((error) => errorsHandling(error))
    return response.data
  }
const updateTeamLeaders = async (form) => {
  const headers = getHeaderToken();
  const response = await axios.put(process.env.REACT_APP_HOST + 'teamleaders' , form, headers).catch((error) => errorsHandling(error))
  return response.data
}  


const deleteTeamLeaders = async (teamLeadersData) => {
  const response = await axios.delete(process.env.REACT_APP_HOST + 'teamleaders', {  headers: {
    'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1],
    "db-connection": window.localStorage.getItem('db')
  }, data: teamLeadersData }).catch((error) => errorsHandling(error))
  return response.data }

const teamLeadersService = {
    getTeamLeaders, 
    postTeamLeaders, 
    updateTeamLeaders, 
    deleteTeamLeaders, 
    getTeamLeadersById, 
    getAllSupervisores, 
    getAllSupervisoresActivos,
    endUpdate
  }


export default teamLeadersService