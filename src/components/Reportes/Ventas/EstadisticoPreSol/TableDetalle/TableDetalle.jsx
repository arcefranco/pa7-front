import React from "react";
import 'devextreme/dist/css/dx.light.compact.css';
import styles from '../PreSol.module.css'
import { useSelector } from "react-redux";
import DataGrid, {
  Column,
  Scrolling
  
} from 'devextreme-react/data-grid';


const TableDetalle = ({title, array}) => {

const {empresaReal, codigoMarca} = useSelector(state => state.login.user)

const renderDate = (data) => {
    return data.text?.slice(0,10).split('-').reverse().join('/')
}

const renderTipoPlan = (data) => {

        if (empresaReal === 'Alizze S.A.' && data.text === '1') return 'PLAN 84' 
        if (empresaReal === 'Alizze S.A.' && data.text === '2') return 'PLAN 120' 
        if(data.text === '1')  return '100 %' 
        if(data.text === '2') return '70/30' 
        if(data.text === '3') return '60/40' 
        if(data.text === '4') return '75/25' 
        if(data.text === '5') return '80/20'  
        if(data.text === '6') return '90/10' 
    
}

const renderCuota = (data) => {
  console.log(data)
    return (+data.text).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') 
    
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
    if( data.value === 1 ) return 'Producción' 
    if( data.value === 2 ) return 'Lista para enviar a terminal' 
    if( data.value === 3 ) return 'Seña' 
    if( data.value === 4 ) return 'Pendiente scoring terminal' 
    if( data.value === 5 ) return 'Pendiente scoring terminal con faltante documentación'
    if( data.value === 6 ) return 'Aprobadas scoring terminal con faltante documentación'  
    if( data.value === 7 ) return 'Pendiente de Pre Scoring' 
    if( data.value === 8 ) return 'Pre Scoring rechazado'  
    if( data.value === 9 ) return 'Scoring terminal rechazado' 
    if( data.value === 10) return  'Seña + Pend. Pre Scoring' 
    if( data.value === 11) return  'Rechazadas' 
}

const renderButtonOperacion = () => {
    return <button className={styles.buttonOperacion}>Ver Operación</button>
}

const onCellPrepared = (e) => {
  if(e.rowType === 'header') {  
    e.cellElement.style.setProperty('background-color', '#15141491')
    e.cellElement.style.setProperty('color', '#fff')
 }  
}


return (
    <div>
        <DataGrid
        dataSource={array ? array : null}
        height={500}
        onCellPrepared={onCellPrepared}
        className={styles.dataGrid}
        style={{fontSize: '10px'}}
        paging={false}
        columnAutoWidth={true}
        
        >
        <Scrolling useNative={false} scrollByContent={true} scrollByThumb={true} mode="standard" />
        {
            title !== 'Mesa de Planes' ?
          <Column
            dataField="NomSupervisor"
            groupIndex={0}
            visible={false}
            defaultVisible={false}
            caption="Supervisor"
            dataType="string"
          /> :
          <Column
            dataField="NomSup"
            groupIndex={0}
            visible={false}
            defaultVisible={false}
            caption="Supervisor"
            dataType="string"
          />

      }
      {
        title !== 'Mesa de Planes' ?
          <Column
          head
            dataField="Fecha"
            alignment={'center'}
            cellRender={renderDate}
            caption="Fecha Alta"
            dataType="string"

          /> :
          <Column
            dataField="FechaVenta"
            alignment={'center'}
            cellRender={renderDate}
            caption="Fecha Alta"
            dataType="string"

          />
      }

      <Column
        cssClass={styles.detalleTitle}
        dataField="Solicitud"
        caption="Solicitud"
        dataType="number"
      />

      <Column
        dataField="Cliente"
        caption="Cliente"
        head
        dataType="string"
      />
      <Column
        dataField="NomVendedor"
        caption="Vendedor"
        dataType="string"
      />
      {
        title !== 'Mesa de Planes' ?
          <Column
            dataField="Vehiculo"
            caption="Modelo"
            dataType="string"
          /> :
          <Column
            dataField="NomModelo"
            caption="Modelo"
            dataType="string"
          />
      }
      {
        title === 'Mesa de Planes' &&
        <Column
          dataField="VendedorVinculado"
          caption="Vendedor Vinculado"
          dataType="string"
        />
      }
      {
        title === 'Mesa de Planes' &&
        <Column
          dataField="SupervisorVinculado"
          caption="Supervisor Vinculado"
          dataType="string"
        />
      }

      <Column
        dataField="codigotipoplan"
        width={50}
        caption="Tipo Plan"
        cellRender={renderTipoPlan}
        dataType="string"
      />

      <Column
        dataField="ImporteCuota"
        alignment={'right'}
        caption="Importe Total Cuota"
        cellRender={renderCuota}
        dataType="string"
      />

      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="Saldo"
          caption="Saldo"
          alignment={'right'}
          cellRender={renderCuota}
          dataType="string"
        />
      }
      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="FechaCancelacion"
          alignment={'center'}
          width={80}
          cellRender={renderDate}
          caption="Fecha Estim. Cancelación"
          dataType="string"
        />

      }
      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="Dni"
          width={40}
          cellRender={renderCheck}
          alignment={'center'}
          caption="Tiene DNI"
          dataType="string"
        />
      }

      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="Servicio"
          width={40}
          cellRender={renderCheck}
          alignment={'center'}
          caption="Tiene Servicio"
          dataType="string"
        />
      }

      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="Anexos"
          width={40}
          cellRender={renderCheck}
          alignment={'center'}
          caption="Tiene Anexos"
          dataType="string"
        />
      }
      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="EstadoPrescoring"
          caption="Estado Pre Scoring"
          dataType="string"
          cellRender={renderScoring}
        />
      }

      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="Estadoscoring"
          caption="Estado Scoring"
          dataType="string"
          cellRender={renderScoring}
        />
      }

      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="Clasificacion"
          caption=""
          dataType="string"
        />
      }

      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="Clasificacion"
          caption="Clasificación"
          cellRender={renderClasificacion}
          dataType="string"
        />
      }
      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="TipoPrecio"
          caption="Tipo Precio"
          alignment={'center'}
          width={40}
          dataType="string"
        />
      }


      <Column
        dataField="Precio"
        alignment={'right'}
        cellRender={renderCuota}
        caption="Valor del Vehículo"
        dataType="string"
      />

      <Column
        dataField="DebitoAutomatico"
        width={40}
        cellRender={renderCheck}
        alignment={'center'}
        caption="Deb. Aut."
        dataType="string"
      />
      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="DebitoAutomaticoScoring"
          width={40}
          cellRender={renderCheck}
          alignment={'center'}
          caption="Deb. Aut. Sc."
          dataType="string"
        />
      }

      <Column
        dataField="FechaIngresoTerminal"
        width={80}
        alignment={'center'}
        cellRender={renderDate}
        caption="Fecha Ing. Term."
        dataType="string"
      />
      {
        title !== 'Mesa de Planes' ?
          <Column
            dataField="NomSupervisor"
            caption="Supervisor"
            dataType="string"
          /> :
          <Column
            dataField="NomSup"
            caption="Supervisor"
            dataType="string"
          />
      }

      <Column
        dataField="EsMicro"
        width={40}
        cellRender={renderCheck}
        alignment={'center'}
        caption="MiniEmprend."
        dataType="string"
      />
      {
        title !== 'Mesa de Planes' &&
        <Column
          dataField="NombreOficialPC"
          caption="Oficial Plan Canje"
          dataType="string"
        />
      }
      {
        title !== 'Mesa de Planes' &&
        <Column
          cellRender={renderButtonOperacion}
          width={100}
        />
      }

    </DataGrid>
    </div>
)

}

export default TableDetalle