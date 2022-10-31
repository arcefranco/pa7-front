import { configureStore } from "@reduxjs/toolkit"
import loginReducer from './reducers/Login/loginSlice'
import gerentesReducer from './reducers/ConfigDatosGenerales/Gerentes/gerentesSlice'
import usuariosReducer from './reducers/ConfigDatosGenerales/Usuarios/UsuariosSlice'
import supervisoresReducer from './reducers/ConfigDatosGenerales/Supervisores/supervisoresSlice'
import sucursalesReducer from './reducers/ConfigDatosGenerales/Sucursales/SucursalesSlice'
import { combineReducers } from "@reduxjs/toolkit"
import modelosReducer from "./reducers/ConfigDatosGenerales/Modelos/modelosSlice"
import teamLeadersReducer from "./reducers/ConfigDatosGenerales/TeamLeaders/teamLeadersSlice"
import vendedoresReducer from "./reducers/Vendedores/vendedoresSlice"
import oficialesReducer from './reducers/ConfigDatosGenerales/Oficiales/OficialesSlice'
import puntosReducer from './reducers/ConfigDatosGenerales/PuntosDeVenta/puntosSlice'
import estructuraReducer from './reducers/ConfigDatosGenerales/Estructura/EstructuraSlice'
import listaReducer from './reducers/ConfigDatosGenerales/ListasPrecios/ListaSlice'
import PreSolVentasReducer from './reducers/Reportes/Ventas/PreSolSlice'
import ReporteZonalReducer from './reducers/Reportes/Micro/ZonalSlice'


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
  puntosDeVenta: puntosReducer,
  PreSolVentas: PreSolVentasReducer,
  ReporteZonal: ReporteZonalReducer
})



export const store = configureStore({
  reducer: reducer
})