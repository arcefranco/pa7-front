import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { getReporte } from '../../../reducers/Reportes/Micro/ZonalSlice';
import BiggerTitleLogo from '../../../styled-components/containers/BiggerTitleLogo';
import TitlePrimary from '../../../styled-components/h/TitlePrimary';
import { ReturnLogo } from '../../../helpers/ReturnLogo';
import styles from './ReporteZonal.module.css'
import ReportesForm from '../ReportesForm'
import DataGrid, {
  Column,
  Summary,
  TotalItem,
  GroupItem,
  Scrolling
} from 'devextreme-react/data-grid';
import es from 'devextreme/localization/messages/es.json'
import { loadMessages, locale } from "devextreme/localization";


const ReporteZonal = () => {

  const { empresaReal } = useSelector(state => state.login.user)
  const {data} = useSelector(state => state.ReporteZonal.reporteSelected)
  const { isLoading } = useSelector(state => state.ReporteZonal)

  useEffect(() => {
    loadMessages(es)
    locale(navigator.language || navigator.languages)
  }, [])

  const onCellPrepared = (e) => {
    if (e.rowType === 'totalFooter') {
      e.cellElement.style.backgroundColor = '#4b5866ad' 
    }else if (e.rowType === 'groupFooter'){
      e.cellElement.style.backgroundColor = '#4b586678' 
    }
    if(e.rowType === 'header') {  
      e.cellElement.style.setProperty('background-color', '#15141491')
      e.cellElement.style.setProperty('color', '#fff')
   }  
    }
  return (
    <div>
        <BiggerTitleLogo>
        <div>
          <span>{empresaReal}</span>
          <ReturnLogo empresa={empresaReal} />
        </div>
        <TitlePrimary>Reporte Zonal</TitlePrimary>
       
      </BiggerTitleLogo>
        <ReportesForm dispatchFunc={getReporte}/>
        {
          isLoading ? 
          <div className={styles.loadingDiv}>
            <span>Cargando...</span>
            <span>Esto puede demorar unos minutos</span>
          </div> : <div></div>
        }
        <DataGrid
        onCellPrepared={onCellPrepared}
        style={{fontSize: '10px'}}
        paging={false}
        dataSource={data ? Object.values(data[0]) : null}>
          <Column alignment={'center'} caption="">
          <Column alignment={'center'}  dataField="t_nombreGerente" caption="Gerente" groupIndex={0}></Column>
          <Column 
          dataField="t_nombreSupervisor"
          caption="Supervisor"
          />
          
          <Column alignment={'center'} dataField="t_objetivo" caption="Objetivo"/>
          </Column>
          <Column alignment={'center'} caption="Fiat CarGroup">
          <Column alignment={'center'} dataField="t_okCarGroup" caption="OK"/>
          <Column alignment={'center'} dataField="pendienteCarGroup" caption="Pendiente"/>
          </Column>

          <Column alignment={'center'} caption="VW Luxcar">
          <Column alignment={'center'} dataField="t_ok_Luxcar" caption="OK"/>
          <Column alignment={'center'} dataField="t_pendiente_Luxcar" caption="Pendiente"/>
          </Column>

          <Column alignment={'center'} caption="Peugeot Alizze">
          <Column alignment={'center'} dataField="t_ok_Alizze" caption="OK"/>
          <Column alignment={'center'} dataField="t_pendiente_Alizze" caption="Pendiente"/>
          </Column>

          <Column alignment={'center'} caption="Jeep Detroit">
          <Column alignment={'center'} dataField="t_ok_Detroit" caption="OK"/>
          <Column alignment={'center'} dataField="t_pendiente_Detroit" caption="Pendiente"/>
          </Column>

          <Column alignment={'center'} caption="Fiat Autonet">
          <Column alignment={'center'} dataField="t_ok_Autonet" caption="OK"/>
          <Column alignment={'center'} dataField="t_pendiente_Autonet" caption="Pendiente"/>
          </Column>

          <Column alignment={'center'} caption="Citroen Elysees">
          <Column alignment={'center'} dataField="t_ok_Elysees" caption="OK"/>
          <Column alignment={'center'} dataField="t_pendiente_Elysees" caption="Pendiente"/>
          </Column>

          <Summary>

            <GroupItem          
            column="t_objetivo"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>


            <GroupItem          
            column="t_okCarGroup"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            
            <GroupItem          
            column="pendienteCarGroup"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <GroupItem          
            column="t_ok_Luxcar"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <GroupItem          
            column="t_pendiente_Luxcar"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <GroupItem          
            column="t_ok_Alizze"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <GroupItem          
            column="t_pendiente_Alizze"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>


            <GroupItem          
            column="t_ok_Detroit"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <GroupItem          
            column="t_pendiente_Detroit"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>


            <GroupItem          
            column="t_ok_Autonet"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <GroupItem          
            column="t_pendiente_Autonet"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <GroupItem          
            column="t_ok_Elysees"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <GroupItem          
            column="t_pendiente_Elysees"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

          </Summary>
       
        </DataGrid>
    </div>
  )
}

export default ReporteZonal
