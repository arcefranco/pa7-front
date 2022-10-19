import axios from 'axios'
import { errorsHandling } from '../../errorsHandling';
import getHeaderToken from '../../../helpers/getHeaderTokenAndDB';
import getHeaderDB from '../../../helpers/getHeaderDB';


const getPreSol = async(preSolData) => {
    const headers = getHeaderToken()
    const response = await axios.post(process.env.REACT_APP_HOST + 'Reportes/Ventas/PreSol', preSolData, headers).catch((error) => errorsHandling(error))
    return response.data
}


const PreSolService = {
    getPreSol
}

export default PreSolService