import { configureStore } from "@reduxjs/toolkit"
import loginReducer from './reducers/Login/loginSlice'
import gerentesReducer from './reducers/Gerentes/gerentesSlice'
import usuariosReducer from './reducers/Usuarios/UsuariosSlice'
import supervisoresReducer from './reducers/Supervisores/supervisoresSlice'
import sucursalesReducer from './reducers/Sucursales/SucursalesSlice'
import { combineReducers } from "@reduxjs/toolkit"
import modelosReducer from "./reducers/Modelos/modelosSlice"
import teamLeadersReducer from "./reducers/TeamLeaders/teamLeadersSlice"
import vendedoresReducer from "./reducers/Vendedores/vendedoresSlice"
import oficialesReducer from './reducers/Oficiales/OficialesSlice'
import puntosReducer from './reducers/PuntosDeVenta/puntosSlice'
import estructuraReducer from './reducers/Estructura/EstructuraSlice'
import listaReducer from './reducers/ListasPrecios/ListaSlice'
const reducer = combineReducers({
  login: loginReducer,
  gerentes: gerentesReducer,
  usuarios: usuariosReducer,
  supervisores: supervisoresReducer,
  listasprecios: listaReducer,
  modelos: modelosReducer,
  sucursales: sucursalesReducer,
  estructura: estructuraReducer,
  teamLeaders: teamLeadersReducer,
  vendedores: vendedoresReducer,
  oficiales: oficialesReducer,
  puntosDeVenta: puntosReducer
})



export const store = configureStore({
  reducer: reducer
})