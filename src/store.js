import { configureStore } from "@reduxjs/toolkit"
import loginReducer from './reducers/Login/loginSlice'
import gerentesReducer from './reducers/Gerentes/gerentesSlice'
import usuariosReducer from './reducers/Usuarios/UsuariosSlice'
import supervisoresReducer from './reducers/Supervisores/supervisoresSlice'
import { combineReducers } from "@reduxjs/toolkit"
import teamLeadersReducer from "./reducers/TeamLeaders/teamLeadersSlice"


const reducer = combineReducers({
  login: loginReducer,
  gerentes: gerentesReducer,
  usuarios: usuariosReducer,
  supervisores: supervisoresReducer,
  teamLeaders: teamLeadersReducer,
})



export const store = configureStore({
  reducer: reducer
})