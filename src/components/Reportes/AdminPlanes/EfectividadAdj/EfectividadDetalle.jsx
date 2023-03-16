import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import BiggerTitleLogo from '../../../../styled-components/containers/BiggerTitleLogo'
import { ReturnLogo } from '../../../../helpers/ReturnLogo'
import TitlePrimary from '../../../../styled-components/h/TitlePrimary'
import { useSelector, useDispatch } from 'react-redux'
import { getDetalleEfectividad } from '../../../../reducers/Reportes/efectividadAdj/efectividadAdjSlice'
import styles from './Efectividad.module.css'
import DataGrid, {
    Column,
    Scrolling,
    Export,
  } from "devextreme-react/data-grid";
import excelCustomizeConfig from './excelCustomizeConfig'

const EfectividadDetalle = () => {

const {marca, tipo, mes, anio, oficial, periodoCompleto} = useParams()
const [tituloCategoria, setTituloCategoria] = useState("")
const { user } = useSelector((state) => state.login);
const {adjudicacionesDetalle, isLoading} = useSelector((state) => state.EfectividadAdj)
const dispatch = useDispatch()
const exportFormats = ["xlsx"];

useEffect(() => {

dispatch(getDetalleEfectividad({marca: marca, tipo: tipo, /* el parseInt va en el back, no acá */
    mes: mes, anio: anio, oficial: oficial, periodoCompleto: periodoCompleto}))
}, [])


const renderOperacion = options => <button className={styles.buttonOperacion}>Ver Operación</button>
const renderGrupoOrden = (e) => {
    return e.Grupo + "-" + e.Orden.toString()
}
const renderDate = (data) => {
    return data.text?.slice(0,10).split('-').reverse().join('/')
  }
const renderTipoPlan = (e) => {
    if(e.value === 1) return "100%"
    if(e.value === 2) return "70/30"
    if(e.value === 3) return "60/40"
    if(e.value === 5) return "80/20"
}

const renderCliente = (e) => {
    return e.Apellido + " " + e.Nombres
}

const onCellPrepared = (e) => {
    if (e.rowType === "header") {
        e.cellElement.style.setProperty("background-color", "#15141491");
        e.cellElement.style.setProperty("color", "#fff");
      }
}

const onExporting = React.useCallback((e) => {

    if (e.format === 'xlsx')  return excelCustomizeConfig(e) 
})
  return (
    <div>
        <BiggerTitleLogo>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary>
          Efectividad Detalle - {
        tipo === "0" ? 
          "Ganadas por Sorteo del Acto" : 
        tipo === "1" ? 
          "Ganadas por Licitación del Acto" :  
        tipo === "2" ? 
          "Ganadas por Entrega del Acto" :
        tipo === "3" ?
          "Pedidos Aceptados por Sorteo de Acto" : 
        tipo === "4" ?
          "Pedidos Aceptados por Licitación del Acto" :
        tipo === "5" ?
          "Pedidos Aceptados por Entrega del Acto" : 
        tipo === "9" ?
          "Pedidos Aceptados del Mes" : 
          ""} - {
            mes === "1" ? "Enero" :
            mes === "2" ? "Feb." :
            mes === "3" ? "Mar." :
            mes === "4" ? "Abr." : 
            mes === "5" ? "May." :
            mes === "6" ? "Jun." : 
            mes === "7" ? "Jul." :
            mes === "8" ? "Ago." :
            mes === "10" ? "Oct." :
            mes === "11" ? "Nov." :
            mes === "12" ? "Dic" : 
            ""
          } {anio}
        </TitlePrimary>
      </BiggerTitleLogo>
       
        <h5> Cant. Op: {adjudicacionesDetalle?.length}</h5>
        {
          isLoading ? 
          <div className={styles.loadingDiv}>
        <div className={styles.loadingSpans}>
            <span>Cargando...</span>
         </div>
          </div> : <div></div>
        }
       <DataGrid
        style={{ fontSize: "10px" }}
        onCellPrepared={onCellPrepared}
        height={650}
        className={styles.dataGrid}
          onExporting={onExporting}
        defaultPaging={false}
        dataSource={adjudicacionesDetalle ? adjudicacionesDetalle : null}>
        <Export
          enabled={true}
          formats={exportFormats}
          allowExportSelectedData={false}
        />
        <Column
        dataField="Codigo"width={70} caption="Código Op." alignment={"right"}/>
        <Column
        dataField="Solicitud"width={70} caption="Solicitud" alignment={"right"}/>
        <Column
        dataField="Grupo" caption="Grupo Orden" width={100} calculateCellValue={renderGrupoOrden} alignment={"right"}/>
        <Column
        dataField="Nombres" caption="Cliente" calculateCellValue={renderCliente}
        />
        <Column
        dataField="tipoplan" caption="Tipo  Plan" width={80} cellRender={renderTipoPlan} alignment={"right"}/>
        <Column
        dataField="FechaSus" caption="Fecha Susc." width={70} cellRender={renderDate} alignment={"right"}/>
        <Column
        dataField="FechaAgrup" caption="Fecha Agrup." width={70} cellRender={renderDate} alignment={"right"}/>
        <Column
        dataField="FechaAdj" caption="Fecha Adj." width={70} cellRender={renderDate} alignment={"right"}/>
        <Column
        dataField="FechaPedido" caption="Fecha Pedido" width={70} cellRender={renderDate} alignment={"right"}/>
        <Column
        dataField="FechaAceptacionPedido" caption="Fecha Acept. Pedido" width={70} cellRender={renderDate} alignment={"right"}/>
        <Column
        dataField="NomOficialAdjudicacion" caption="Oficial Adj." alignment={"right"}/>
        <Column
        dataField="Nommodelo" width={150} caption="Modelo" alignment={"right"}/>
        <Column
         caption="" cellRender={renderOperacion} alignment={"center"}/>
       </DataGrid>
     
        
    </div>
  )
}

export default EfectividadDetalle