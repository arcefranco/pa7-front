import axios from 'axios'
import { errorsHandling } from '../errorsHandling';
import getHeaderToken from '../../helpers/getHeaderToken';

const getModeloById = async(id) => {
    const response = await axios.post(process.env.REACT_APP_HOST + 'modelos/id', {Codigo:id}).catch((error) => errorsHandling(error))
    const modelos = response.data[0]
    // const array = [];
 
    // modelos.forEach(function(e,i){
    //   if(!this[e.Codigo]){
    //     this[e.Codigo] = {
    //       Codigo : e.Codigo,
    //       Nombre: e.Nombre, 
    //       NacionalImportado: e.NacionalImportado,
    //       Activo: e.Activo,
    //       Nomtipoplan: e.Nomtipoplan,
    //       ['CuotaTerminal_' + e.Codtipoplan] : e.CuotaTerminal,
    //       ['CuotaACobrar_' + e.Codtipoplan] : e.CuotaACobrar,
    //       ['CuotaACobrarA_' + e.Codtipoplan] : e.CuotaACobrarA,
    //       ['Cuota1_' + e.Codtipoplan] : e.Cuota1,
    //       ['Cuota2_' + e.Codtipoplan] : e.Cuota2   
    //     }
    //     array.push(this[e.Codigo])
    //   } else {
    //     this[e.Codigo]['CuotaTerminal_' + e.Codtipoplan]= e.CuotaTerminal
    //     this[e.Codigo]['CuotaACobrar_' + e.Codtipoplan]= e.CuotaACobrar
    //     this[e.Codigo]['CuotaACobrarA_' + e.Codtipoplan]= e.CuotaACobrarA
    //     this[e.Codigo]['Cuota1_' + e.Codtipoplan]= e.Cuota1
    //     this[e.Codigo]['Cuota2_' + e.Codtipoplan]= e.Cuota2
    //   }
    //  }, {})
     
    return modelos
}

const getAllModelos = async () => {

    const response = await axios.get(process.env.REACT_APP_HOST + 'modelos').catch((error) => errorsHandling(error))
    const modelos = response.data[0]
    const array = [];
 
    modelos.forEach(function(e,i){
      if(!this[e.Codigo]){
        this[e.Codigo] = {
          Codigo : e.Codigo,
          Nombre: e.Nombre, 
          NacionalImportado: e.NacionalImportado,
          Activo: e.Activo,
          Nomtipoplan: e.Nomtipoplan,
          ['CuotaTerminal_' + e.Codtipoplan] : e.CuotaTerminal,
          ['CuotaACobrar_' + e.Codtipoplan] : e.CuotaACobrar,
          ['CuotaACobrarA_' + e.Codtipoplan] : e.CuotaACobrarA,
          ['Cuota1_' + e.Codtipoplan] : e.Cuota1,
          ['Cuota2_' + e.Codtipoplan] : e.Cuota2   
        }
        array.push(this[e.Codigo])
      } else {
        this[e.Codigo]['CuotaTerminal_' + e.Codtipoplan]= e.CuotaTerminal
        this[e.Codigo]['CuotaACobrar_' + e.Codtipoplan]= e.CuotaACobrar
        this[e.Codigo]['CuotaACobrarA_' + e.Codtipoplan]= e.CuotaACobrarA
        this[e.Codigo]['Cuota1_' + e.Codtipoplan]= e.Cuota1
        this[e.Codigo]['Cuota2_' + e.Codtipoplan]= e.Cuota2
      }
     }, {})
    return array
  }

  const getAllTipoPlan = async () => {

    const response = await axios.get(process.env.REACT_APP_HOST + 'modelos/tipoplan').catch((error) => errorsHandling(error))
    return response.data[0]
  } 

  const deleteModelos = async (id) => {
    const response = await axios.delete(process.env.REACT_APP_HOST + 'modelos',  {  headers: {
        'x-auth-token': window.localStorage.getItem('userToken').split(" ")[1]
      }, data: { id: id } })
    return response.data
}

const updateModelos = async (ModelosData) => {
    const headers = getHeaderToken()
    const response = await axios.put(process.env.REACT_APP_HOST + 'modelos', ModelosData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const endCommit = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + 'modelos/endCommit')
    return response.data
}

const createModelos = async (ModelosData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'modelos', ModelosData, headers).catch((error) => errorsHandling(error))
    return response.data
}

const modelosService = {
getModeloById,
getAllModelos,
getAllTipoPlan,
deleteModelos,
createModelos,
updateModelos,
endCommit
}

export default modelosService