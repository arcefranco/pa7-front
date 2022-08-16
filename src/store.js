import { configureStore } from "@reduxjs/toolkit"
import loginReducer from './reducers/Login/loginSlice'
import gerentesReducer from './reducers/Gerentes/gerentesSlice'
import usuariosReducer from './reducers/Usuarios/UsuariosSlice'

import { combineReducers } from "@reduxjs/toolkit"


const reducer = combineReducers({
  login: loginReducer,
  gerentes: gerentesReducer,
  usuarios: usuariosReducer
})



export const store = configureStore({
  reducer: reducer
})