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


  const getTotal = (data) => {
   const values = Object.values(data).slice(7,18)
    return values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0)
}

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
            <div className={styles.loadingSpans}>
            <span>Cargando...</span>
            <span>Esto puede demorar unos minutos</span>

            </div>
          </div> : <div></div>
        }
        <DataGrid
        onCellPrepared={onCellPrepared}
        style={{fontSize: '10px'}}
        height={450}
        columnAutoWidth={true}
        paging={false}
        dataSource={data ? Object.values(data[0]) : null}>

        <Scrolling useNative={false} scrollByContent={true} /* scrollByThumb={true} */ mode="standard" />

          <Column alignment={'center'} caption="">
          <Column alignment={'center'}  dataField="t_nombreGerente" caption="Gerente" groupIndex={0}></Column>
          <Column 
          dataField="t_nombreSupervisor"
          caption="Supervisor"
          width={200}
         
         
          />
          
          <Column alignment={'center'} dataField="t_objetivo" cssClass={styles.columnRed} caption="Objetivo"/>
          </Column>
          <Column alignment={'center'} caption="Fiat CarGroup" >
          <Column alignment={'center'} dataField="t_okCarGroup" cssClass={styles.columnGreen} caption="OK"/>
          <Column alignment={'center'} dataField="t_pendienteCarGroup" cssClass={styles.columnGreen} caption="Pendiente"/>
          </Column>

          <Column alignment={'center'} caption="VW Luxcar">
          <Column alignment={'center'} dataField="t_ok_Luxcar" cssClass={styles.columnOrange} caption="OK"/>
          <Column alignment={'center'} dataField="t_pendiente_Luxcar" cssClass={styles.columnOrange} caption="Pendiente"/>
          </Column>

          <Column alignment={'center'} caption="Peugeot Alizze">
          <Column alignment={'center'} dataField="t_ok_Alizze" cssClass={styles.columnRed} caption="OK"/>
          <Column alignment={'center'} dataField="t_pendiente_Alizze" cssClass={styles.columnRed} caption="Pendiente"/>
          </Column>

          <Column alignment={'center'} caption="Jeep Detroit">
          <Column alignment={'center'} dataField="t_ok_Detroit" cssClass={styles.columnViolet} caption="OK"/>
          <Column alignment={'center'} dataField="t_pendiente_Detroit" cssClass={styles.columnViolet} caption="Pendiente"/>
          </Column>

          <Column alignment={'center'} caption="Fiat Autonet">
          <Column alignment={'center'} dataField="t_ok_Autonet"  cssClass={styles.columnYellow}  caption="OK"/>
          <Column alignment={'center'} dataField="t_pendiente_Autonet" cssClass={styles.columnYellow} caption="Pendiente"/>
          </Column>

          <Column alignment={'center'} caption="Citroen Elysees">
          <Column alignment={'center'} dataField="t_ok_Elysees" cssClass={styles.columnGreen} caption="OK"/>
          <Column alignment={'center'} dataField="t_pendiente_Elysees" cssClass={styles.columnGreen} caption="Pendiente"/>
          </Column>

          <Column caption="Total"  alignment={'center'}>
            <Column alignment={'center'} dataField="Total" cssClass={styles.columnLightblue} calculateCellValue={getTotal} caption="Total"/>
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
            column="t_pendienteCarGroup"
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


            <GroupItem          
            column="Total"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            

            <TotalItem          
            column="t_objetivo"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>


            <TotalItem          
            column="t_okCarGroup"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            
            <TotalItem          
            column="t_pendienteCarGroup"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <TotalItem          
            column="t_ok_Luxcar"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <TotalItem          
            column="t_pendiente_Luxcar"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <TotalItem          
            column="t_ok_Alizze"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <TotalItem          
            column="t_pendiente_Alizze"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>


            <TotalItem          
            column="t_ok_Detroit"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <TotalItem          
            column="t_pendiente_Detroit"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>


            <TotalItem          
            column="t_ok_Autonet"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <TotalItem          
            column="t_pendiente_Autonet"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <TotalItem          
            column="t_ok_Elysees"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

            <TotalItem          
            column="t_pendiente_Elysees"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>


            <TotalItem          
            column="Total"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>

          </Summary>
       
        </DataGrid>
    </div>
  )
}

export default ReporteZonal
