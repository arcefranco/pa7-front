import axios from 'axios'

import { errorsHandling } from '../errorsHandling'

import getHeaderToken from '../../helpers/getHeaderToken';



const getTeamLeaders = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'teamleaders')
    .catch(function (error) {
      errorsHandling(error)
    })
    return response.data[0] 
  }
  const getTeamLeadersById = async (teamLeadersData) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'teamleaders/id',  {Codigo:teamLeadersData}).catch((error) => errorsHandling(error))
    return response.data[0]
  }
  const getAllSupervisores = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'supervisores', ).catch((error) => errorsHandling(error))
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
const endCommit = async () => {
  const response = await axios.get(process.env.REACT_APP_HOST + 'teamleaders/endCommit')
  return response.data
}

const deleteTeamLeaders = async (teamLeadersData) => {
  const headers = getHeaderToken();
  const response = await axios.delete(process.env.REACT_APP_HOST + 'teamleaders', {data: teamLeadersData}).catch((error) => errorsHandling(error))
  return response.data }

const teamLeadersService = {
    getTeamLeaders, postTeamLeaders, updateTeamLeaders, deleteTeamLeaders, getTeamLeadersById, getAllSupervisores, endCommit 
  }


export default teamLeadersService