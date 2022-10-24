import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetalleMP } from "../../../../../reducers/Reportes/Ventas/PreSolSlice";
import { useParams } from "react-router-dom";
import TitleLogo from "../../../../../styled-components/containers/TitleLogo";
import { ReturnLogo } from "../../../../../helpers/ReturnLogo";
import TitlePrimary from "../../../../../styled-components/h/TitlePrimary";
import groupBy from "../../../../../helpers/groupBy";
import TableMP from "./TableMP";

const DetalleMP = () => {
    const {data} = useSelector(state => state.PreSolVentas.preSolDetalle)
    const {isLoading} = useSelector(state => state.PreSolVentas)
    const {empresaReal, codigoMarca} = useSelector(state => state.login.user)
    const [groupBySupervisor, setGroupBySupervisor] = useState([])
    const {fechaD, fechaH, codMarca, codSup} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getDetalleMP({
            fechaD: fechaD,
            fechaH: fechaH,
            codMarca: codMarca,
            codSup: JSON.parse(codSup)
        }))

    }, [])

    useEffect(() => {

        if(Array.isArray(data) && data.length){
            
            setGroupBySupervisor(groupBy(data, 'NomSup'))
        }
        

    }, [data])

    return ( 
        <div> 
        <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Detalle Mesa de Planes</TitlePrimary>
        </TitleLogo>

        {
            !isLoading ? 
            <div>
            {
                Object.keys(groupBySupervisor).length && Object.keys(groupBySupervisor).map(e => 
                    <TableMP title={e} array={groupBySupervisor[e]}/>
                    )
            }

            </div> : <div>Cargando...</div>
        }
        </div>
    )
}

export default DetalleMP
