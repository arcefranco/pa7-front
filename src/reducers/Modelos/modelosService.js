import axios from 'axios'
import { errorsHandling } from '../errorsHandling';
import getHeaderToken from '../../helpers/getHeaderTokenAndDB';
import getHeaderDB from '../../helpers/getHeaderDB';



const getModeloById = async(id) => {
  const headers = getHeaderDB()

    const response = await axios.post(process.env.REACT_APP_HOST + 'modelos/id',  {Codigo:id}, headers).catch((error) => errorsHandling(error))
    const modelos = response.data
    const array = [];
 
    modelos.forEach(function(e,i){
      if(e.CuotaTerminal === null){ e.CuotaTerminal = 0  }
      if(e.CuotaACobrar === null){ e.CuotaACobrar = 0  }
      if(e.CuotaACobrarA === null){ e.CuotaACobrarA = 0  }
      if(e.Cuota1 === null){ e.Cuota1 = 0  }
      if(e.Cuota2 === null){ e.Cuota2 = 0  }
      if(!this[e.Codigo]){
        this[e.Codigo] = {
          Codigo : e.Codigo,
          Nombre: e.Nombre, 
          NacionalImportado: e.NacionalImportado,
          Activo: e.Activo,
          Nomtipoplan: e.Nomtipoplan,
          ['CuotaTerminal_' + e.Codtipoplan] : parseFloat(e.CuotaTerminal).toFixed(2),
          ['CuotaACobrar_' + e.Codtipoplan] : parseFloat(e.CuotaACobrar).toFixed(2),
          ['CuotaACobrarA_' + e.Codtipoplan] : parseFloat(e.CuotaACobrarA).toFixed(2),
          ['Cuota1_' + e.Codtipoplan] : parseFloat(e.Cuota1).toFixed(2),
          ['Cuota2_' + e.Codtipoplan] : parseFloat(e.Cuota2).toFixed(2)   
        }
        array.push(this[e.Codigo])
      } else {
        this[e.Codigo]['CuotaTerminal_' + e.Codtipoplan]= parseFloat(e.CuotaTerminal).toFixed(2)
        this[e.Codigo]['CuotaACobrar_' + e.Codtipoplan]= parseFloat(e.CuotaACobrar).toFixed(2)
        this[e.Codigo]['CuotaACobrarA_' + e.Codtipoplan]= parseFloat(e.CuotaACobrarA).toFixed(2)
        this[e.Codigo]['Cuota1_' + e.Codtipoplan]= parseFloat(e.Cuota1).toFixed(2)
        this[e.Codigo]['Cuota2_' + e.Codtipoplan]= parseFloat(e.Cuota2).toFixed(2)
      }
     }, {})
     console.log(array)
    return array
}

const getAllModelos = async () => {
  const headers = getHeaderDB()

    const response = await axios.get(process.env.REACT_APP_HOST + 'modelos', headers)
    // .catch((error) => errorsHandling(error))
    const modelos = response.data[0]
    // console.log(modelos)
    const array = [];
    const responsePlan = await axios.get(process.env.REACT_APP_HOST + 'modelos/tipoplan', headers).catch((error) => errorsHandling(error))
    const planes = responsePlan.data[0]
 
    modelos.forEach(function(e,i){
      if(e.CuotaTerminal === null){ e.CuotaTerminal = 0  }
      if(e.CuotaACobrar === null){ e.CuotaACobrar = 0  }
      if(e.CuotaACobrarA === null){ e.CuotaACobrarA = 0  }
      if(e.Cuota1 === null){ e.Cuota1 = 0  }
      if(e.Cuota2 === null){ e.Cuota2 = 0  }
      if(!this[e.Codigo]){
        this[e.Codigo] = {
          Codigo : e.Codigo,
          Nombre: e.Nombre, 
          NacionalImportado: e.NacionalImportado,
          Activo: e.Activo,
          Nomtipoplan: e.Nomtipoplan,
          ['CuotaTerminal_' + e.Codtipoplan] : parseFloat(e.CuotaTerminal).toFixed(2),
          ['CuotaACobrar_' + e.Codtipoplan] : parseFloat(e.CuotaACobrar).toFixed(2),
          ['CuotaACobrarA_' + e.Codtipoplan] : parseFloat(e.CuotaACobrarA).toFixed(2),
          ['Cuota1_' + e.Codtipoplan] : parseFloat(e.Cuota1).toFixed(2),
          ['Cuota2_' + e.Codtipoplan] : parseFloat(e.Cuota2).toFixed(2)   
        }
        array.push(this[e.Codigo])
      } else {
        this[e.Codigo]['CuotaTerminal_' + e.Codtipoplan]= parseFloat(e.CuotaTerminal).toFixed(2)
        this[e.Codigo]['CuotaACobrar_' + e.Codtipoplan]= parseFloat(e.CuotaACobrar).toFixed(2)
        this[e.Codigo]['CuotaACobrarA_' + e.Codtipoplan]= parseFloat(e.CuotaACobrarA).toFixed(2)
        this[e.Codigo]['Cuota1_' + e.Codtipoplan]= parseFloat(e.Cuota1).toFixed(2)
        this[e.Codigo]['Cuota2_' + e.Codtipoplan]= parseFloat(e.Cuota2).toFixed(2)
      }
     }, {})
    return array
  }

  const getAllTipoPlan = async () => {
    const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'modelos/tipoplan', headers).catch((error) => errorsHandling(error))
    const planes = response.data[0]
    // window.localStorage.setItem("tipoPlan", JSON.stringify(planes))
    return planes
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

const endUpdate = async (ModelosData) => {
  const headers = getHeaderToken()
    const response = await axios.get(process.env.REACT_APP_HOST + 'modelos/endUpdate', ModelosData, headers)
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
endUpdate
}

export default modelosService