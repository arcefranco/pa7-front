import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import BiggerTitleLogo from '../../../styled-components/containers/BiggerTitleLogo';
import TitlePrimary from '../../../styled-components/h/TitlePrimary';
import { ReturnLogo } from '../../../helpers/ReturnLogo';
import styles from './ReporteZonal.module.css'
import DataGrid, {
  Column,

} from 'devextreme-react/data-grid';


const TableDetallesZonal = () => {
 const {data} = useSelector(state => state.ReporteZonal.reporteSelected)
 const { empresaReal } = useSelector(state => state.login.user)
 const [dataFiltered, setDataFiltered] = useState([])
 const {empresa, gerente, clasificacion} = useParams()

 const renderDate = (data) => {
  return data.text?.slice(0,10).split('-').reverse().join('/')
}

const renderCuota = (data) => {
    if(data.value === null) return null
    else return (+data.text).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') 
    
}

const renderCheck = (data) => {
  if(data.value === 1) return <input type="checkbox" checked readOnly={true} />
  else return <input type="checkbox" disabled />
}

const renderScoring = (data) => {
  if(data.value === 2) return 'Ok'
  else return 'Pendiente'
}

const renderClasificacion = (data) => {
  if( data.value === '1' ) return 'Producción' 
  if( data.value === '2' ) return 'Lista para enviar a terminal' 
  if( data.value === '3' ) return 'Seña' 
  if( data.value === '4' ) return 'Pendiente scoring terminal' 
  if( data.value === '5' ) return 'Pendiente scoring terminal con faltante documentación'
  if( data.value === '6' ) return 'Aprobadas scoring terminal con faltante documentación'  
  if( data.value === '7' ) return 'Pendiente de Pre Scoring' 
  if( data.value === '8' ) return 'Pre Scoring rechazado'  
  if( data.value === '9' ) return 'Scoring terminal rechazado' 
  if( data.value === '10') return  'Seña + Pend. Pre Scoring' 
  if( data.value === '11') return  'Rechazadas' 
}

const onCellPrepared = (e) => {
  if(e.rowType === 'header') {  
    e.cellElement.style.setProperty('background-color', '#15141491')
    e.cellElement.style.setProperty('color', '#fff')
 }  
  }

 useEffect(() => {
  if(data){
    if(gerente !== 'todos'){
      console.log('entro acá')
      setDataFiltered(Object.values(data[1]).filter(e => e.CodigoEmpresa === parseInt(empresa)).filter(f => f.NombreGerente.toUpperCase() === gerente.toUpperCase()).filter(c => c.Clasificacion === clasificacion)) 
    }else{
      setDataFiltered(Object.values(data[1]).filter(e => e.CodigoEmpresa === parseInt(empresa)).filter(c => c.Clasificacion === clasificacion)) 
    }
  }
 }, [])
  return (
    <div>
        <BiggerTitleLogo>
        <div>
          <span>{empresaReal}</span>
          <ReturnLogo empresa={empresaReal} />
        </div>
        <TitlePrimary>Detalle {clasificacion === "1" ? 'Ok' : 'Pendiente'} {dataFiltered && dataFiltered[0]?.Empresa}. {dataFiltered && gerente !== 'todos' ? dataFiltered[0]?.NombreGerente : null}</TitlePrimary>
       
      </BiggerTitleLogo>
        <DataGrid 
        onCellPrepared={onCellPrepared}
        dataSource={dataFiltered ? dataFiltered : null}
        style={{fontSize: '10px'}}
        className={styles.dataGridDetail}
        columnAutoWidth={true}
        paging={false}
        >
          <Column 
          dataField="fechaAlta"
          cellRender={renderDate}
          />
          <Column
          dataField="Solicitud"
          />
          <Column
          dataField="nombrecliente"
          caption="Cliente"
          />
          <Column
          dataField="NombreVendedor"
          caption="Vendedor"
          />
          <Column
          dataField="Vehiculo"
          caption="Modelo"
          />
          <Column
          dataField="ImporteTotalCuota"
          alignment={"right"}
          cellRender={renderCuota}
          />

          <Column
          dataField="saldopagado"
          alignment={"right"}
          width={100}
          caption="Saldo"
          cellRender={renderCuota}
          />
          <Column
          dataField="FechaEstimaCancelacion"
          caption="Fecha Estim. Cancelacion"
          cellRender={renderDate}
          />
          
          <Column
          dataField="Dni"
          alignment={"center"}
          cellRender={renderCheck}
          />
          <Column
          dataField="Servicio"
          alignment={"center"}
          cellRender={renderCheck}
          />
          <Column
          dataField="Anexos"
          alignment={"center"}
          cellRender={renderCheck}
          />
          <Column
          dataField="EstadoPreScoring"
          cellRender={renderScoring}
          />
          <Column
          dataField="EstadoScoring"
          cellRender={renderScoring}
          />
          <Column
          dataField="Clasificacion"
          caption=""
          />

          <Column
          dataField="Clasificacion"
          caption="Clasificacion"
          cellRender={renderClasificacion}
          />

          <Column
          dataField="FechaPasoAOP"
          alignment={"center"}
          width={80}
          caption="Fecha Conformación"
          cellRender={renderDate}
          />

          <Column
          dataField="TipoPrecio"
          alignment={"center"}
          width={50}
          caption="Tipo Precio"
          />

          <Column
          dataField="PrecioVehiculo"
          caption="Valor del Vehículo"
          cellRender={renderCuota}
          />  

          <Column
          dataField="DebitoAutomatico"
          alignment={"center"}
          width={50}
          caption="Deb. Aut."
          cellRender={renderCheck}
          />

          <Column
          dataField="FechaIngresoTerminal"
          alignment={"center"}
          width={80}
          caption="Fecha Ing. Term."
          cellRender={renderDate}
          />

          <Column
          dataField="nombresupervisor"
          caption="Supervisor"
          />

          <Column
          dataField="EsMiniEmprendedor"
          caption="MiniEmprend."
          alignment={"center"}
          width={50}
          cellRender={renderCheck}
          />
        </DataGrid>
    </div>
  )
}

export default TableDetallesZonal
