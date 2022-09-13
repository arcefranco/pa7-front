import { configureStore } from "@reduxjs/toolkit"
import loginReducer from './reducers/Login/loginSlice'
import gerentesReducer from './reducers/Gerentes/gerentesSlice'
import usuariosReducer from './reducers/Usuarios/UsuariosSlice'
import supervisoresReducer from './reducers/Supervisores/supervisoresSlice'
import sucursalesReducer from './reducers/Sucursales/SucursalesSlice'
import { combineReducers } from "@reduxjs/toolkit"
import teamLeadersReducer from "./reducers/TeamLeaders/teamLeadersSlice"
import vendedoresReducer from "./reducers/Vendedores/vendedoresSlice"
import oficialesReducer from './reducers/Oficiales/OficialesSlice'


const reducer = combineReducers({
  login: loginReducer,
  gerentes: gerentesReducer,
  usuarios: usuariosReducer,
  supervisores: supervisoresReducer,

  sucursales: sucursalesReducer,

  teamLeaders: teamLeadersReducer,
  vendedores: vendedoresReducer,
  oficiales: oficialesReducer
})



export const store = configureStore({
  reducer: reducer
})