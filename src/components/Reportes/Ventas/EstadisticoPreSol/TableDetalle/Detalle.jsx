import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetalleIngresadas, getDetalleAnulRechaz, getDetalleCruceScoring, getDetalleProduccion, getDetallePendientes, getDetalleTresYSiete, getDetalleProdYCS } from "../../../../../reducers/Reportes/Ventas/PreSolSlice";
import { useParams } from "react-router-dom";
import TitleLogo from "../../../../../styled-components/containers/TitleLogo";
import { ReturnLogo } from "../../../../../helpers/ReturnLogo";
import TitlePrimary from "../../../../../styled-components/h/TitlePrimary";
import groupBy from "../../../../../helpers/groupBy";
import TableDetalle from "./TableDetalle";

const Detalle = ({title}) => {
    const {data} = useSelector(state => state.PreSolVentas.preSolDetalle)
    const {isLoading} = useSelector(state => state.PreSolVentas)
    const {empresaReal, codigoMarca} = useSelector(state => state.login.user)
    const [groupBySupervisor, setGroupBySupervisor] = useState([])
    const {fechaD, fechaH, codMarca, codSup} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {

        if(title === 'Ingresadas'){
            
            dispatch(getDetalleIngresadas({
                fechaD: fechaD,
                fechaH: fechaH,
                codMarca: codMarca,
                codSup: JSON.parse(codSup)
            }))
        }else if(title === 'Anuladas Rechazadas'){

            dispatch(getDetalleAnulRechaz({
                fechaD: fechaD,
                fechaH: fechaH,
                codMarca: codMarca,
                codSup: JSON.parse(codSup)
            }))
        }else if(title === 'Cruce Scoring'){

            dispatch(getDetalleCruceScoring({
                fechaD: fechaD,
                fechaH: fechaH,
                codMarca: codMarca,
                codSup: JSON.parse(codSup)
            }))
        }else if(title === 'Produccion'){

            dispatch(getDetalleProduccion({
                fechaD: fechaD,
                fechaH: fechaH,
                codMarca: codMarca,
                codSup: JSON.parse(codSup)
            }))
        }else if(title === 'Pendientes'){

            dispatch(getDetallePendientes({
                fechaD: fechaD,
                fechaH: fechaH,
                codMarca: codMarca,
                codSup: JSON.parse(codSup)
            }))
        }else if(title === 'Anuladas 3 + 7'){

            dispatch(getDetalleTresYSiete({
                fechaD: fechaD,
                fechaH: fechaH,
                codMarca: codMarca,
                codSup: JSON.parse(codSup)
            }))
        }else if(title === 'Produccion + Cruce Scoring'){

            dispatch(getDetalleProdYCS({
                fechaD: fechaD,
                fechaH: fechaH,
                codMarca: codMarca,
                codSup: JSON.parse(codSup)
            }))
        }
        
        
   
        


    }, [])

    useEffect(() => {

        if(Array.isArray(data) && data.length){

            if(title === 'Anuladas Rechazadas'){

                setGroupBySupervisor(groupBy(data, 'NomSup'));
                
            }else{
                
                setGroupBySupervisor(groupBy(data, 'NomSupervisor'));

            }

            
        }
        

    }, [data])

    return ( 
        <div> 

        <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Detalle {title}</TitlePrimary>
        </TitleLogo>
        {
            !isLoading ? 
        <div>
            {
                Object.keys(groupBySupervisor).length && Object.keys(groupBySupervisor).map(e => 
                    <TableDetalle title={e} array={groupBySupervisor[e]}/>
                    )
            }

        </div> : <div>Cargando...</div>
        }
        </div>
    )
}

export default Detalle

