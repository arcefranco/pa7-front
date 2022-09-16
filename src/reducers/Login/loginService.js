import axios from 'axios'
import getHeaderDB from '../../helpers/getHeaderDB';
const login = async (userData) => {

  const response = await axios.post(process.env.REACT_APP_HOST + 'login', userData) 
  window.localStorage.setItem('userToken', `Bearer ${response.data.token}`)
  window.localStorage.setItem('rolesToken', JSON.stringify(`Roles ${response.data.tokenRoles}`))
  window.localStorage.setItem('db', response.data.db)
  window.localStorage.setItem('user', JSON.stringify(response.data))
  return response.data 
  }

  const logout = async () => {
  const response = await axios.post(process.env.REACT_APP_HOST + 'login/logout')
  localStorage.removeItem('user')
  localStorage.removeItem('userToken')
  localStorage.removeItem('db')
  window.location.replace("/")
    return response.data
  }

const resetPassword = async (verifyData) => { //Para informar del estado del token al front
  const {id, token} = verifyData
  const headers = getHeaderDB()
const response = await axios.get(process.env.REACT_APP_HOST + 'reset/tokenStatus/' + id + '/' + token, headers)
return response.data
}

const forgotPassowrd = async (userData) => { //Para ir a la ruta que genera el mail
  
  const response = await axios.post(process.env.REACT_APP_HOST + 'reset/forgot', userData)
  window.localStorage.setItem('db', response.data.db)
  return response.data
}

const updatePassword = async (userData) => { //Toma los datos para actualizar la password
  const headers = getHeaderDB()
  const response = await axios.post(process.env.REACT_APP_HOST + 'reset/updatePass', userData, headers)
  return response.data
}


    const loginService = {
        login,
        logout,
        resetPassword,
        forgotPassowrd,
        updatePassword
      }

export default loginService