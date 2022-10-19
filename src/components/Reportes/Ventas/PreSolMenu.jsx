import React, {useState} from "react";
import styles from './PreSol.module.css'
import { useSelector, useDispatch } from "react-redux";
import TitleLogo from "../../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../../styled-components/h/TitlePrimary";
import { ReturnLogo } from "../../../helpers/ReturnLogo";
import ButtonPrimary from "../../../styled-components/buttons/ButtonPrimary";
import PreSolItem from "./PreSolItem";
import PreSolTableTotal from "./PreSolTableTotal";
import { getPreSol } from "../../../reducers/Reportes/Ventas/PreSolSlice";
import PreSolItemZona from "./PreSolItemZona";
import TableContainer2 from "../../../styled-components/TableContainer2";
import { useEffect } from "react";



const PreSolMenu = () => {

    const dispatch = useDispatch()
    const {empresaReal, codigoMarca} = useSelector(state => state.login.user)
    const {status, data} = useSelector(state => state.PreSolVentas.preSolSelected)

    const [filterBsAs, setFilterBsAs] = useState([])
    const [filterMdq, setFilterMdq] = useState([])
    const [filterZonaNull, setFilterZonaNull] = useState([])

    const [miniBsAs, setMiniBsAs] = useState([])
    const [miniMdq, setMiniMdq] = useState([])
    const [miniZonaNull, setMiniZonaNull] = useState([])

    const [propioBsAs, setPropioBsAs] = useState([])
    const [propioMdq, setPropioMdq] = useState([])
    const [propioZonaNull, setPropioZonaNull] = useState([])

    const [BsAsSucursalMini, setBsAsSucursalMini] = useState([])
    const [BsAsSucursalPropio, setBsAsSucursalPropio] = useState([])

    const [MdqSucursalMini, setMdqSucursalMini] = useState([])
    const [MdqSucursalPropio, setMdqSucursalPropio] = useState([])
    
    const [zonaNullSucursalMini, setZonaNullSucursalMini] = useState([])
    const [zonaNullSucursalPropio, setZonaNullSucursalPropio] = useState([])

    const [arrayMini, setArrayMini] = useState([])
    const [arrayPropio, setArrayPropio] = useState([])

    const [arraySucursalMini, setArraySucursalMini] = useState([])
    const [arraySucursalPropio, setArraySucursalPropio] = useState([])




    const [form, setForm] = useState({
        fechaD: '',
        fechaH: '',
        pMes: '',
        pAnio: '',
        pMarca: codigoMarca
    })

    useEffect(() => {
        if(Array.isArray(data)){
            setFilterBsAs(data.filter(e => e.NombreZona === 'Buenos Aires'))
            setFilterMdq(data.filter(e => e.NombreZona === 'Mar del Plata'))
            setFilterZonaNull(data.filter(e => e.NombreZona === null))
            setArrayMini(data.filter(e => e.EsMiniEmprendedor === 1))
            setArrayPropio(data.filter(e => e.EsMiniEmprendedor === 0))
        }
    }, [data])

    useEffect(() => {

        setMiniBsAs(filterBsAs.filter(e => e.EsMiniEmprendedor === 1))
        setPropioBsAs(filterBsAs.filter(e => e.EsMiniEmprendedor === 0))

        setMiniMdq(filterMdq.filter(e => e.EsMiniEmprendedor === 1))
        setPropioMdq(filterMdq.filter(e => e.EsMiniEmprendedor === 0))

        setMiniZonaNull(filterZonaNull.filter(e => e.EsMiniEmprendedor === 1))
        setPropioZonaNull(filterZonaNull.filter(e => e.EsMiniEmprendedor === 0))




    }, [filterBsAs, filterMdq, filterZonaNull])

    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

    useEffect(() => {
        setBsAsSucursalMini(groupBy(miniBsAs, 'NomSucursal'))
        setBsAsSucursalPropio(groupBy(propioBsAs, 'NomSucursal'))
        
        setMdqSucursalMini(groupBy(miniMdq, 'NomSucursal'))
        setMdqSucursalPropio(groupBy(propioMdq, 'NomSucursal'))
        setZonaNullSucursalMini(groupBy(miniZonaNull, 'NomSucursal'))
        setZonaNullSucursalPropio(groupBy(propioZonaNull, 'NomSucursal'))
        setArraySucursalMini(groupBy(arrayMini, 'NomSucursal'))
        setArraySucursalPropio(groupBy(arrayPropio, 'NomSucursal'))
        
    }, [miniBsAs, propioBsAs, miniMdq, propioMdq, miniZonaNull, propioZonaNull, arrayMini, arrayPropio])



    const handleChange = (e) => {
                
        const {name , value} = e.target
        let parseValue;
        if(name === 'fechaD' || name === 'fechaH'){
            const newForm = {...form,
                [name]: value,
            }
            
            setForm(newForm)
        }else{
            parseValue = parseInt(value)
            const newForm = {...form,
                [name]: parseValue,
            }
            setForm(newForm)
        }
        
    }
    
    const handleSubmit = () => {
        dispatch(getPreSol(form))
    }


    return (
        <div className={styles.container}>
            
        <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Estadístico Pre-Sol</TitlePrimary>
        </TitleLogo>
        <div className={styles.selectContainer}>
        <div className={styles.selects}>
            <div className={styles.selectGrid}>
                <div>
                    <span>Fecha Desde: </span> <br />
                    <input type="date"  name="fechaD" value={form.fechaD} onChange={handleChange}/>
                </div>
                <div>
                <span>Fecha Hasta: </span> <br />
                    <input type="date"  name="fechaH" value={form.fechaH} onChange={handleChange}/>
                </div>
                <div>
                <span>Mes: </span> <br />
                    <select  name="pMes" value={form.pMes} onChange={handleChange}>
                        <option value="*">---</option>
                        <option value={1}>Enero</option>
                        <option value={2}>Febrero</option>
                        <option value={3}>Marzo</option>
                        <option value={4}>Abril</option>
                        <option value={5}>Mayo</option>
                        <option value={6}>Junio</option>
                        <option value={7}>Julio</option>
                        <option value={8}>Agosto</option>
                        <option value={9}>Septiembre</option>
                        <option value={10}>Octubre</option>
                        <option value={11}>Noviembre</option>
                        <option value={12}>Diciembre</option>
                    </select>
                </div>
                <div>
                <span>Año: </span> <br />
                    <select  name="pAnio" value={form.pAnio} onChange={handleChange}>
                        <option value="*">---</option>
                        <option value={2019}>2019</option>
                        <option value={2020}>2020</option>
                        <option value={2021}>2021</option>
                        <option value={2022}>2022</option>
                    </select>
                </div>
                <ButtonPrimary onClick={handleSubmit}>Buscar</ButtonPrimary>
            </div>

          
        </div>

        </div>

        {
            empresaReal === 'Detroit S.A.' || empresaReal === 'Alyzze S.A.' ? (
                <div style={{marginTop: '2rem'}}>

                    <PreSolItemZona title={'Sin Zona'} 
                    arrayPropioSucursal={zonaNullSucursalPropio} 
                    arrayPropioTotal={propioZonaNull}
                    arrayMiniSucursal={zonaNullSucursalMini}
                    arrayMiniTotal={miniZonaNull}
                    />

                    <PreSolItemZona title={'Buenos Aires'} 
                    arrayPropioSucursal={BsAsSucursalPropio} 
                    arrayPropioTotal={propioBsAs}
                    arrayMiniSucursal={BsAsSucursalMini}
                    arrayMiniTotal={miniBsAs}
                    />

                    <PreSolItemZona title={'Mar del Plata'} 
                    arrayPropioSucursal={MdqSucursalPropio} 
                    arrayPropioTotal={propioMdq}
                    arrayMiniSucursal={MdqSucursalMini}
                    arrayMiniTotal={miniMdq}
                    />
                </div>
            ) : 
            <div style={{marginTop: '2rem'}}>
                    <PreSolItemZona 
                    arrayPropioSucursal={arraySucursalPropio} 
                    arrayPropioTotal={arrayPropio}
                    arrayMiniSucursal={arraySucursalMini}
                    arrayMiniTotal={arrayMini}
                    />
            </div>
        }

        </div>


    )
}


export default PreSolMenu