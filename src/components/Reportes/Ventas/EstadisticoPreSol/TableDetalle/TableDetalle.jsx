import React from "react";
import 'devextreme/dist/css/dx.light.css';
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
    return data.text.slice(0, data.text.length-3)
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
    return <button className={styles.buttonOperacion}>Ver Operacion</button>
}


return (
    <div>
        <DataGrid
        dataSource={array ? array : null}
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
                dataField="Fecha"
                cellRender={renderDate}
                caption="Fecha Alta"
                dataType="string"
                
              /> : 
              <Column
              dataField="FechaVenta"
              cellRender={renderDate}
              caption="Fecha Alta"
              dataType="string"
              
            />
        }

          
        <Column 
            dataField="Solicitud"
            caption="Solicitud"
            dataType="number"
          /> 

        <Column 
            dataField="Cliente"
            caption="Cliente"
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
            caption="Tipo Plan"
            cellRender={renderTipoPlan}
            dataType="string"
          />
          
        <Column 
            dataField="ImporteCuota"
            caption="Importe Total Cuota"
            cellRender={renderCuota}
            dataType="string"
          />

        {
            title !== 'Mesa de Planes' &&
        <Column 
            dataField="Saldo"
            caption="Saldo"
            cellRender={renderCuota}
            dataType="string"
          />
        }
        {
            title !== 'Mesa de Planes' &&
        <Column
            dataField="FechaCancelacion"
            cellRender={renderDate}
            caption="Fecha Estim. Cancelación"
            dataType="string"
          />
        
        }
        {
            title !== 'Mesa de Planes' &&
        <Column
            dataField="Dni"
            cellRender={renderCheck}
            caption="Tiene DNI"
            dataType="string"
          />
        }

        {
            title !== 'Mesa de Planes' &&
        <Column
            dataField="Servicio"
            cellRender={renderCheck}
            caption="Tiene Servicio"
            dataType="string"
          />
        }

        {
            title !== 'Mesa de Planes' &&
        <Column
            dataField="Anexos"
            cellRender={renderCheck}
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
            caption="Clasificacion"
            cellRender={renderClasificacion}
            dataType="string"
          />
        }
        {
            title !== 'Mesa de Planes' &&
        <Column 
            dataField="TipoPrecio"
            caption="Tipo Precio"
            dataType="string"
          />
        }


        <Column 
            dataField="Precio"
            caption="Valor del Vehiculo"
            dataType="string"
        />

        <Column
            dataField="DebitoAutomatico"
            cellRender={renderCheck}
            caption="Deb. Aut."
            dataType="string"
        />
        {
            title !==  'Mesa de Planes' &&
        <Column
            dataField="DebitoAutomaticoScoring"
            cellRender={renderCheck}
            caption="Deb. Aut. Sc."
            dataType="string"
          />
        }

        <Column
            dataField="FechaIngresoTerminal"
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
            cellRender={renderCheck}
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