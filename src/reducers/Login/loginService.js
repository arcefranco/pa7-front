import axios from 'axios'

const API_URL = 'http://ec2-52-33-204-119.us-west-2.compute.amazonaws.com:3001/'

const login = async (userData) => {

    const response = await axios.post(API_URL + 'login', userData) 
    window.localStorage.setItem('userToken', `Bearer ${response.data.token}`)
    window.localStorage.setItem('rolesToken', JSON.stringify(`Roles ${response.data.tokenRoles}`))
    window.localStorage.setItem('user', JSON.stringify(response.data))
    return response.data 
  }

  const logout = async () => {
  const response = await axios.post(API_URL + 'login/logout')
  localStorage.removeItem('user')
  localStorage.removeItem('userToken')
  window.location.replace("/")
    return response.data
  }

const resetPassword = async (verifyData) => { //Para informar del estado del token al front
  const {id, token} = verifyData
const response = await axios.get(API_URL + 'reset/tokenStatus/' + id + '/' + token)
return response.data
}

const forgotPassowrd = async (login) => { //Para ir a la ruta que genera el mail
  const response = await axios.post(API_URL + 'reset/forgot', {login: login})
  return response.data
}

const updatePassword = async (userData) => { //Toma los datos para actualizar la password
  const response = await axios.post(API_URL + 'reset/updatePass', userData)
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