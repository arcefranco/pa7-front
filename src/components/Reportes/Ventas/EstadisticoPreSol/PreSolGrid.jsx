import React, { useState, useEffect } from "react";
import styles from '../EstadisticoPreSol/PreSol.module.css'
import { useSelector, useDispatch } from "react-redux";
import BiggerTitleLogo from "../../../../styled-components/containers/BiggerTitleLogo";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import { getPreSol } from "../../../../reducers/Reportes/Ventas/PreSolSlice";
import 'devextreme/dist/css/dx.light.css';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { useNavigate } from "react-router-dom";
import JsPDF from 'jspdf';
import excelCustomizeConfig from "./excelCustomizeConfig";
import es from 'devextreme/localization/messages/es.json';
import { loadMessages, locale } from "devextreme/localization";
import DataGrid, {
  Column,
  Summary,
  TotalItem,
  GroupItem,
  Scrolling,
  Export
} from 'devextreme-react/data-grid';
import ReportesForm from "../../ReportesForm";


const PreSolGrid = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
   const lastPoint = { x: 0, y: 0 };
  const { empresaReal, codigoMarca, username } = useSelector(state => state.login.user)
  const { data } = useSelector(state => state.PreSolVentas.preSolSelected)
  const { isLoading } = useSelector(state => state.PreSolVentas)
  const {fechaD, fechaH} = useSelector(state => state.PreSolVentas.paramsDetalles)
  const [totalSupervisores, setTotalSupervisores] = useState([])
  const [totalSupervisoresFilter, setTotalSupervisoresFilter] = useState([])
  
  useEffect(() => {
    loadMessages(es)
    locale(navigator.language || navigator.languages)
  }, [])

  useEffect(() => {
    
    setTotalSupervisores(data?.map(e => e.CodSucursal))
   
  }, [data])
  useEffect(() => {
    setTotalSupervisoresFilter(totalSupervisores?.filter((item,
        index) => totalSupervisores.indexOf(item) === index))
  }, [totalSupervisores])

  const calculateSubTot1 = (rowData) => {
    return rowData.C2 + rowData.C4 + rowData.C5 + rowData.C6 + rowData.C7
  }

  const calculateSubTot2 = (rowData) => {
    return rowData.C3 + rowData.C8 + rowData.C9 
  }


  const calculateGB = (rowData) => {
    return rowData.Crucescoring + rowData.Produccion
  }
  
  const renderGridCell = (data) => {
    if (data.value === null) return '0' 
    else return data.value
  }

  const renderDateAlta = (data) => {

    return data.FechaAltaVendedor?.slice(0,10).split('-').reverse().join('/') 
  }
  const renderDateBaja = (data) => {

    return data.FechaBajaVendedor?.slice(0,10).split('-').reverse().join('/') 
  }


  const exportFormats = ['pdf', 'xlsx'];


const getProm = (data) => {
    return Math.floor((data.MesAnt + data.MesAnt2 + data.MesAnt3)/3)
}


  const EsMicro = (data) => {

   if (data.EsMiniEmprendedor === 0) return 'Equipos Propios'
    else return 'Micro Emprendedores' 
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

  const helperOnCellPreprared = (e, url) => {
    let arr = [];
    if (e.row.data.items[0].hasOwnProperty('key')) {
      e.row.data.items.map(e => {
        if (e.hasOwnProperty('collapsedItems')) {
          arr = [...arr, arr.concat(e.collapsedItems[0].CodSucursal)]
        } else {
          arr = [...arr, arr.concat(e.items[0].CodSucursal)]
        }
      })
      arr = arr.flat(1).filter(e => typeof e === 'number')
      window.open(`/reportes/preSol/${url}/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${arr}]`, '_blank')

    } else {
      window.open(`/reportes/preSol/${url}/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${e.row.data.items[0].CodSucursal}]`, '_blank')
    }
  }

  const generatePDF = () => {

    const report = new JsPDF('landscape');
    report.html(document.querySelector('.dx-datagrid')).then(() => {
        report.save('report.pdf');
    });
  }

  const helperOnCellGroup = (e, url) => {
   
    let arr = [];
    e.row.data.items.map(e => {
      if(e.hasOwnProperty('collapsedItems')){
        arr = [...arr, arr.concat(e.collapsedItems)]
      }else{
        arr = [...arr, arr.concat(e.items)]
        
      }
    })
    arr = arr.flat(1).map(e => !Array.isArray(e) ? e.items[0].CodSucursal : e[0].items[0].CodSucursal)
    arr = [...new Set(arr)]
    window.open(`/reportes/preSol/${url}/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${arr}]`, '_blank')  
  }
    

  const onCellClick = (e) => {

  
  if(e.rowType === 'groupFooter' && e.column.dataField === 'Ingresadas' && e.key.length > 1){

    helperOnCellPreprared(e,'ingresadas') 

  } else if(e.rowType === 'groupFooter' && e.column.dataField === 'Ingresadas'){
    helperOnCellGroup(e, 'ingresadas')
  }
  
  else if (e.rowType === 'totalFooter' && e.column.dataField === 'Ingresadas'){
    navigate(`/reportes/preSol/ingresadas/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)
  
  }else if (e.rowType === 'groupFooter' && e.column.dataField === 'VentasMP' && e.key.length > 1){
    helperOnCellPreprared(e, 'MP')

  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'VentasMP'){
    helperOnCellGroup(e, 'MP')
   
  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'VentasMP'){
    navigate(`/reportes/preSol/MP/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)
  
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'Crucescoring'  && e.key.length > 1){
    helperOnCellPreprared(e, 'cruceScoring')

  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'Crucescoring'){
    helperOnCellGroup(e, 'cruceScoring')

  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'Crucescoring'){

    navigate(`/reportes/preSol/cruceScoring/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'Produccion'  && e.key.length > 1){

    helperOnCellPreprared(e, 'Produccion')
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'Produccion'){

    helperOnCellGroup(e, 'Produccion')

  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'Produccion'){

    navigate(`/reportes/preSol/Produccion/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)

  }else if(e.rowType === 'groupFooter' && (e.column.dataField === 'SubTotal1' || e.column.dataField === 'SubTotal2' )  && e.key.length > 1){

    helperOnCellPreprared(e, 'Pendientes')
  }else if(e.rowType === 'groupFooter' && (e.column.dataField === 'SubTotal1' || e.column.dataField === 'SubTotal2' )){

    helperOnCellGroup(e, 'Pendientes')

  }else if (e.rowType === 'totalFooter' && (e.column.dataField === 'SubTotal1' || e.column.dataField === 'SubTotal2' )){

    navigate(`/reportes/preSol/Pendientes/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)

  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'AnuladaTresYSiete'  && e.key.length > 1){

    helperOnCellPreprared(e, 'TresYSiete')
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'AnuladaTresYSiete'){

    helperOnCellGroup(e, 'TresYSiete')

  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'AnuladaTresYSiete'){

    navigate(`/reportes/preSol/TresYSiete/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)

  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'AnuladaRechazada'  && e.key.length > 1){

    helperOnCellPreprared(e, 'anulRechaz')
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'AnuladaRechazada'){

    helperOnCellGroup(e, 'anulRechaz')

  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'AnuladaRechazada'){

    navigate(`/reportes/preSol/anulRechaz/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)

  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'GB'  && e.key.length > 1){

    helperOnCellPreprared(e, 'ProdYCS')
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'GB'){

    helperOnCellGroup(e, 'ProdYCS')

  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'GB'){

    navigate(`/reportes/preSol/ProdYCS/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)

  }

  }



  const onExporting = React.useCallback((e) => {

    if (e.format === 'xlsx')  return excelCustomizeConfig(e)
    const doc = new JsPDF('landscape');

    exportDataGrid({
      jsPDFDocument: doc,

      columnWidths: [38, 16, 16, 9, 9, 9, 9, 9, 8,8,8,8,8,8,8,8,8,8,8,10,10,10,10,11,9],
      component: e.component,
      margin: {
        top: 30,
        bottom: 15
      },
      topLeft:  { x: 15, y: 0 },
      repeatHeaders: true,
      customDrawCell({ rect }) {
        if (lastPoint.x < rect.x + rect.w) {
          lastPoint.x = rect.x + rect.w;
        }
        if (lastPoint.y < rect.y + rect.h) {
          lastPoint.y = rect.y + rect.h;
        }
      },
      customizeCell: function({gridCell, pdfCell}) {


        if(gridCell.rowType === 'header'){
          pdfCell.horizontalAlign = 'center'
          pdfCell.font = {  size: 7 };
          if(pdfCell.text === 'Objetivo'){
            pdfCell.text = 'Obj.'
          }if(pdfCell.text === 'Cruce Scoring'){
            pdfCell.text = 'CSC'
          }if(pdfCell.text === 'Producción'){
            pdfCell.text = 'Prod.'
          }if(pdfCell.text === 'Ingresadas'){
            pdfCell.text = 'ING.'
          }if(pdfCell.text === 'Ventas MP'){
            pdfCell.text = 'MP.'
          }if(pdfCell.text === 'Ingresadas'){
            pdfCell.text = 'ING.'
          }if(pdfCell.text === 'Sub Total 1' || pdfCell.text === 'Sub Total 2'){
            pdfCell.text = 'SBT'
          }if(pdfCell.text === 'Anul.3+7'){
            pdfCell.text = '3+7'
          }if(pdfCell.text === 'Anul.Rechaz'){
            pdfCell.text = 'Rechz'
          }
        
        }else if(gridCell.rowType === 'groupFooter'){
          pdfCell.backgroundColor = '#808080'
          pdfCell.textColor = '#ffffff'
        }else if(gridCell.rowType === 'totalFooter'){
          pdfCell.backgroundColor = '#4b586678'
          pdfCell.textColor = '#ffffff'
        }else{
          pdfCell.font = {  size: 7 };
        }

        if(gridCell.rowType === 'data'){
          if(gridCell.column.dataField === 'Ingresadas'){
            pdfCell.backgroundColor = '#BF40BF'
            pdfCell.textColor = '#ffffff'
          }
          if(gridCell.column.dataField === 'Produccion'){
            pdfCell.backgroundColor = '#097969'
            pdfCell.textColor = '#ffffff'
          }
          if(gridCell.column.dataField === 'SubTotal1'){
            pdfCell.backgroundColor = '#FDDA0D'
            pdfCell.textColor = '#ffffff'
          }
          if(gridCell.column.dataField === 'SubTotal2'){
            pdfCell.backgroundColor = '#F28C28'
            pdfCell.textColor = '#ffffff'
          }
        }
        
    } ,
    
      indent: 0,

    }).then(() => {
       const pages = doc.getNumberOfPages()
       let date = new Date()
       let day = date.getDate()
       let month = date.getMonth() + 1
       let year = date.getFullYear()
       doc.setHeaderFunction('hola')
      const header = 'LISTADO ESTADISTICO DE PRESOLICITUDES INGRESADAS';
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setFontSize(9);
      const headerWidth = doc.getTextDimensions(header).w;
        for(let i = 0; i<=pages; i++){
          doc.setPage(i)
          doc.text(header, (pageWidth - headerWidth) / 2, 10);
          doc.text(`Período: ${fechaD.split('-').reverse().join('/')} - ${fechaH.split('-').reverse().join('/')}`, 15,  20)
          doc.text(`${empresaReal}`, (pageWidth - 40),  20)
          doc.line(15,  25, (pageWidth - 20),  25, 'F')
        }

      

      const footer = 'www.wikipedia.org';
      doc.setFontSize(9);
      doc.setTextColor('#000');
      const footerWidth = doc.getTextDimensions(footer).w;
      for(let i = 0; i<pages; i++){
        doc.setPage(i)
        doc.text(`PB: ${username} -  ${day}/${month}/${year} ${date.toLocaleTimeString()}`, 15, 200);
        doc.text(`Pagina ${i === 0 ? pages : i} de ${pages}`, (pageWidth - 40), 200);
      }
      doc.save(`Reporte_PreSol_${fechaD}_${fechaH}.pdf`);
    });
  }); 
  return (
    <>
    
      <BiggerTitleLogo>
        <div>
          <span>{empresaReal}</span>
          <ReturnLogo empresa={empresaReal} />
        </div>
        <TitlePrimary>Estadístico Pre-Solicitud</TitlePrimary>
       
      </BiggerTitleLogo>

 <ReportesForm dispatchFunc={getPreSol}/>



      {
  isLoading && <div className={styles.loadingGrid}>Cargando...</div>
}

      <DataGrid
        dataSource={data ? data : null}
        onExporting={onExporting}
        className={styles.dataGrid}
        style={{fontSize: '10px'}}
        paging={false}
        onCellClick={onCellClick}
        onCellPrepared={onCellPrepared}
        
        >

        <Export enabled={true} formats={exportFormats} allowExportSelectedData={false} />
        <Scrolling useNative={false} scrollByContent={true} mode="standard" />
         
        <Column
          dataField='NombreZona'
          visible={false}
          defaultVisible={false}        
          groupIndex={0}
          caption="Zona"
        />
        <Column
          dataField="EsMiniEmprendedor"
          groupIndex={1}
          visible={false}
          defaultVisible={false}
/*          groupCellRender={EsMicro}  */
         calculateGroupValue={EsMicro}
          caption=""
          dataType="number"
        />
        <Column
          dataField="NomSucursal"
          groupIndex={2}
          visible={false}
          defaultVisible={false}

          caption="Supervisor"
          dataType="string"
        />


        <Column cssClass={styles.title}>

          <Column 
            dataField="NomVendedor"
            caption="Vendedor"
            dataType="string"
            cssClass={styles.vendedorColumn}
            width={100}
          /> 

          <Column
            dataField="FechaAltaVendedor"
            calculateCellValue={renderDateAlta}
            caption="Fecha Alta"
            dataType="string"
            width={75}
          />

          <Column dataField="FechaBajaVendedor" caption="Fecha Baja" dataType="string"  calculateCellValue={renderDateBaja}  width={75} />
          <Column dataField="Ingresadas" caption="Ingresadas" cssClass={styles.columnIng} dataType="number" cellRender={renderGridCell}/>
          <Column dataField="VentasMP" dataType="number" cellRender={renderGridCell} width={85} />
          <Column dataField="Crucescoring" caption="Cruce Scoring" dataType="number" cellRender={renderGridCell} />
          <Column dataField="Objetivo" dataType="number" cellRender={renderGridCell}   />
          <Column dataField="Produccion" caption="Producción" dataType="number" cssClass={styles.columnProd} cellRender={renderGridCell}/>
        </Column>

        <Column caption='CLASFICACIONES PENDIENTES'  cssClass={styles.title}>
          <Column dataField="C2" caption="2" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C4" caption="4" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C5" caption="5" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C6" caption="6" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C7" caption="7" dataType="number" cellRender={renderGridCell} />
          <Column dataField="SubTotal1" dataType="number" cssClass={styles.columnTot1} calculateCellValue={calculateSubTot1} />
          <Column dataField="C3" caption="3" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C8" caption="8" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C9" caption="9" dataType="number" cellRender={renderGridCell} />
          <Column dataField="SubTotal2" dataType="number" cssClass={styles.columnTot2} calculateCellValue={calculateSubTot2}/>
          <Column dataField="AnuladaTresYSiete" caption="Anul.3+7" dataType="number"  cellRender={renderGridCell} />
          <Column dataField="AnuladaRechazada" caption="Anul.Rechaz" dataType="number" cellRender={renderGridCell} />
        </Column>


        <Column caption='MESES ANTERIORES' cssClass={styles.title}>
          <Column dataField="MesAnt" caption="-1" dataType="number" cellRender={renderGridCell} />
          <Column dataField="MesAnt2" caption="-2" dataType="number" cellRender={renderGridCell} />
          <Column dataField="MesAnt3" caption="-3" dataType="number" cellRender={renderGridCell} />
          <Column dataField="PROM" dataType="number" calculateCellValue={getProm} width={50} />
        </Column>

        <Column  cssClass={styles.title}>
          <Column dataField="GB" dataType="number" /* allowExporting={false}  */calculateCellValue={calculateGB} />
        </Column>



        <Summary >

          <GroupItem
            column="Ingresadas"
            summaryType="sum" 
            skipEmptyValues={true}
            showInGroupFooter={true} 
            displayFormat="{0}"
          
          />

          <GroupItem
            column="VentasMP"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="Crucescoring"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="Objetivo"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="Produccion"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="C2"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="C3"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="C4"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="C5"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="C6"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="C7"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="SubTotal1"
            summaryType="sum"
            valueFormat="#"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="8"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="9"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="SubTotal2"
            showInGroupFooter={true}
            summaryType="sum"
            displayFormat="{0}"
            
          />

          <GroupItem
            column="AnuladaTresYSiete"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="AnuladaRechazada"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="MesAnt"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="MesAnt2"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="MesAnt3"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="PROM"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="GB"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
  

        <TotalItem
            column="Ingresadas"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="VentasMP"
            summaryType="sum"
            displayFormat="{0}"
          />

        <TotalItem
            column="Crucescoring"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="Objetivo"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="Produccion"
            summaryType="sum"
            displayFormat="{0}"
          />

          <TotalItem
            column="C2"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="C3"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="C4"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="C5"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="C6"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="C7"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="SubTotal1"
            summaryType="sum"
            displayFormat="{0}"
          />

          <TotalItem
            column="8"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="9"
            summaryType="sum"
            displayFormat="{0}"
          />
          
          <TotalItem
            column="SubTotal2"
            summaryType="sum"
            displayFormat="{0}"
          />

          <TotalItem
            column="AnuladaTresYSiete"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="AnuladaRechazada"
            summaryType="sum"
            displayFormat="{0}"
          />

          <TotalItem
            column="MesAnt"
            summaryType="sum"
            displayFormat="{0}"
          />

          <TotalItem
            column="MesAnt2"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="MesAnt3"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="PROM"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="GB"
            summaryType="sum"
            displayFormat="{0}"
          />
        </Summary>
      </DataGrid>

    </>
  )

}

export default PreSolGrid