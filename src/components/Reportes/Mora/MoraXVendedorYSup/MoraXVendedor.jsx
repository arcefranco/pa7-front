import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormReportes from "../../FormReportes"
import BiggerTitleLogo from "../../../../styled-components/containers/BiggerTitleLogo";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMoraXVendedor, getMoraXSupervisor, getMoraXSupervisorSC, reset } from "../../../../reducers/Reportes/MoraXVendedorYSup/MoraSlice";
import DataGrid, {
    Column,
    Summary,
    Scrolling,
    Export,
    TotalItem
  } from "devextreme-react/data-grid";
import excelCustomizeConfig from "./excelCustomizeConfig"
import JsPDF from 'jspdf';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import styles from './Mora.module.css'

const MoraXVendedor = () => {
    const { user } = useSelector((state) => state.login);
    const { MoraXVendedor, isLoading } = useSelector((state) => state.MoraXVendedorYSup);
    const {Sup} = useParams()
    const exportFormats = ['pdf', 'xlsx'];
    const lastPoint = { x: 0, y: 0 };
    const [mes, setMes] = useState('')
    const [anio, setAnio] = useState('')
    const dispatch = useDispatch()
    const renderDate = (data) => {
        return data.text?.slice(0,10).split('-').reverse().join('/')
    }

    useEffect(() => {
      return () => {
        dispatch(reset())
      }
    }, [])

    useEffect(() => {
      if(Sup === 1 || Sup === 2 || !Sup) dispatch(reset())
    }, [Sup])

    useEffect(() => {
      
      if(MoraXVendedor.length){
        setMes(MoraXVendedor[0]?.Mes === 1 ? 'Enero' : 
        MoraXVendedor[0]?.Mes === 2 ? 'Febrero' : MoraXVendedor[0]?.Mes === 3 ? 'Marzo' :
        MoraXVendedor[0]?.Mes === 4 ? 'Abril' : MoraXVendedor[0]?.Mes === 5 ? 'Mayo' : 
        MoraXVendedor[0]?.Mes === 6 ? 'Junio' : MoraXVendedor[0]?.Mes === 7 ? 'Julio' :
        MoraXVendedor[0]?.Mes === 8 ? 'Agosto' : MoraXVendedor[0]?.Mes === 9 ? 'Septiembre' : 
        MoraXVendedor[0]?.Mes === 10 ? 'Octubre' : MoraXVendedor[0]?.Mes === 11 ? 'Noviembre' : 
        MoraXVendedor[0]?.Mes === 12 ? 'Diciembre' : '')

        setAnio(MoraXVendedor[0]?.Anio)
      }
    }, [MoraXVendedor])       
      const onCellPrepared = (e) => {


        if(e.rowType === "data" && e.data.Categoria === "PT" || 
        e.rowType === "data" && e.data.Categoria === "GT" || 
        e.rowType === "data" && e.data.Categoria === "PORT"){
          e.cellElement.style.backgroundColor = "#4b5866ad";
        }
        if (e.rowType === "totalFooter") {
          e.cellElement.style.backgroundColor = "#4b5866ad";
        } else if (e.rowType === "groupFooter") {
          if (e.data.key === "P" || e.data.key === "G" || e.data.key === "POR") {
            e.cellElement.style.backgroundColor = "#4b586678";
          }
        }
        if (e.rowType === "header") {
          e.cellElement.style.setProperty("background-color", "#15141491");
          e.cellElement.style.setProperty("color", "#fff");
        }
      };
      /*CALCULO TOTAL PORCENTAJES */
      const calculateCustomSummary = (options) => {
        if(options.name == "PER2"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M2)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V2;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }          
        }
        if(options.name == "PER3"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M3)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V3;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }        
        }
        if(options.name == "PER4"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M4)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V4;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }         
        }
        if(options.name == "PER5"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M5)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V5;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }        
        }
        if(options.name == "PER6"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M6)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V6;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }       
        }
        if(options.name == "PER7"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M7)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V7;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }         
        }
        if(options.name == "PER8"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M8)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V8;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }       
        }
        if(options.name == "PER9"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M9)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V9;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }        
        }
        if(options.name == "PER10"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M10)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V10;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }          
        }
        if(options.name == "PER11"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M11)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V11;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }        
        }
        if(options.name == "PER12"){
          let totalM = MoraXVendedor.reduce((acc, value) => {
            return acc + parseFloat(value.M12)
          }, 0)
          let totalV = MoraXVendedor.reduce((acc, value) => {
            return acc + value.V12;
          }, 0)
          
          switch(options.summaryProcess) {
            case "start":
                options.totalValue = 0
            case "finalize":
                options.totalValue = Math.round((totalM / (totalV === 0 ? 1 : totalV)) * 100).toString() + "%"
                break;
          }        
        }
    }

    const onExporting = React.useCallback((e) => {

      if (e.format === 'xlsx')  return excelCustomizeConfig(e, mes, anio)
      const doc = new JsPDF('landscape');
  
      exportDataGrid({
        jsPDFDocument: doc,
  
        columnWidths: Sup ? [20, 6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9] :
         [20, 15, 20, 6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9,6,6,9],
        component: e.component,
        margin: {
          top: 30,
          bottom: 16
        },
        topLeft:  { x: Sup ? 15 : 5, y: 0 },
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
            pdfCell.font = {  size: 6 };
            pdfCell.backgroundColor = "#15141491"
            pdfCell.textColor = "#ffffff"
          
          }else if(gridCell.rowType === 'groupFooter'){
            pdfCell.backgroundColor = '#808080'
            pdfCell.textColor = '#ffffff'
          }else if(gridCell.rowType === 'totalFooter'){
            pdfCell.backgroundColor = '#4b586678'
            pdfCell.textColor = '#ffffff'
            pdfCell.font = {  size: 4 };
          }else{
            pdfCell.font = {  size: 5 };
          }
  
          if(gridCell.rowType === 'data'){
            pdfCell.font = {  size: 5 };
            if(gridCell.column.dataField === 'V2' || gridCell.column.dataField === 'M2' || gridCell.column.dataField === 'PER2' 
            || gridCell.column.dataField === 'V6' || gridCell.column.dataField === 'M6' || gridCell.column.dataField === 'PER6' ||
            gridCell.column.dataField === 'V10' || gridCell.column.dataField === 'M10' || gridCell.column.dataField === 'PER10'){
              pdfCell.backgroundColor = '#F66C6C'
              pdfCell.textColor = '#ffffff'
            }
            if(gridCell.column.dataField === 'V3' || gridCell.column.dataField === 'M3' || gridCell.column.dataField === 'PER3' 
            || gridCell.column.dataField === 'V7' || gridCell.column.dataField === 'M7' || gridCell.column.dataField === 'PER7' ||
            gridCell.column.dataField === 'V11' || gridCell.column.dataField === 'M11' || gridCell.column.dataField === 'PER11'){
              pdfCell.backgroundColor = '#F28C28' 
              pdfCell.textColor = '#ffffff'
            }
            if(gridCell.column.dataField === 'V4' || gridCell.column.dataField === 'M4' || gridCell.column.dataField === 'PER4' 
            || gridCell.column.dataField === 'V8' || gridCell.column.dataField === 'M8' || gridCell.column.dataField === 'PER8' ||
            gridCell.column.dataField === 'V12' || gridCell.column.dataField === 'M12' || gridCell.column.dataField === 'PER12'){
              pdfCell.backgroundColor = '#FDDA0D' 
              pdfCell.textColor = '#ffffff'
            }
            if(gridCell.column.dataField === 'V5' || gridCell.column.dataField === 'M5' || gridCell.column.dataField === 'PER5' 
            || gridCell.column.dataField === 'V9' || gridCell.column.dataField === 'M9' || gridCell.column.dataField === 'PER9'){
              pdfCell.backgroundColor = '#097969' 
              pdfCell.textColor = '#ffffff'
            }
            if(gridCell.column.dataField === 'FechaBaja'){
              pdfCell.text = pdfCell.text?.slice(0,10).split('-').reverse().join('/')
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
        const header = `REPORTE DE MORA POR ${Sup === 1 ? "SUPERVISOR" : Sup === 2 ? "SUPERVISOR (SIN CRUCE)" : "VENDEDOR"} SEGÚN VENCIMIENTO CUOTA`;
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.setFontSize(9);
        const headerWidth = doc.getTextDimensions(header).w;
          for(let i = 0; i<=pages; i++){
            doc.setPage(i)
            doc.text(header, (pageWidth - headerWidth) / 2, 10);
            doc.text(`CONSOLIDADO Período: ${mes} ${anio} (Incluye cuotas pagadas por Giama)`, 15,  20)
            doc.text(`${user?.empresaReal}`, (pageWidth - 40),  20)
            doc.line(15,  25, (pageWidth - 20),  25, 'F')
          }
  
        
  
        doc.setFontSize(9);
        doc.setTextColor('#000');
        for(let i = 0; i<pages; i++){
          doc.setPage(i)
          doc.text(`PB: ${user?.username} -  ${day}/${month}/${year} ${date.toLocaleTimeString()}`, 15, 200);
          doc.text(`Pagina ${i === 0 ? pages : i} de ${pages}`, (pageWidth - 40), 200);
        }
        doc.save(`Mora_por_${Sup === 1 ? "Supervisor" : Sup === 2 ? "Supervisor_Sin_Cruce" : "Vendedor"}_${mes}_${anio}.pdf`);
      });
    })
    return (
        <div>
        <BiggerTitleLogo>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary>
          Mora por {Sup === "1" ? "Supervisor" : Sup === "2" ? "Supervisor Sin Cruce" : "Vendedor"}  - {user?.marca && user.marca}
        </TitlePrimary>
      </BiggerTitleLogo>
          <FormReportes dispatchFunc={Sup === "1" ? getMoraXSupervisor : Sup === "2"  ? getMoraXSupervisorSC : getMoraXVendedor} oficial={0} todasLasEmpresas={0}/>
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
        style={{ fontSize: "10px" }}
        height={650}
        className={styles.dataGrid}
        onExporting={onExporting}
        onCellPrepared={onCellPrepared}
        columnAutoWidth={true}
        defaultPaging={false}
        dataSource={MoraXVendedor ? MoraXVendedor : null}
      >
        <Export enabled={true} formats={exportFormats} allowExportSelectedData={false} />
        {
          Sup === "1" || Sup === "2"? <Column dataField="Supervisor" defaultSortOrder="asc" width={150}/> : 
          <Column dataField="Vendedor" defaultSortOrder="asc" width={150}/>
        }
        {
          Sup === "1" || Sup === "2"? null : 
        <Column dataField="FechaBaja" cellRender={renderDate}/>
        }
        {
          Sup === "1" || Sup === "2"? null : 
          <Column dataField="Supervisor" width={150}/>
        }
        
        <Column caption="Cuota 2" alignment="center">
            <Column dataField="V2" caption="V" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="M2" caption="M" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="PER2" caption="%" alignment="center" width={40} cssClass={styles.columnRed}/>
        </Column>
        <Column caption="Cuota 3" alignment="center">
            <Column dataField="V3" caption="V" alignment="center" width={40} cssClass={styles.columnOrange}/>
            <Column dataField="M3" caption="M" alignment="center" width={40} cssClass={styles.columnOrange} />
            <Column dataField="PER3" caption="%" alignment="center" width={40} cssClass={styles.columnOrange} />
        </Column>
        <Column caption="Cuota 4" alignment="center">
            <Column dataField="V4" caption="V" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="M4" caption="M" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="PER4" caption="%" alignment="center" width={40} cssClass={styles.columnYellow}/>
        </Column>
        <Column caption="Cuota 5" alignment="center">
            <Column dataField="V5" caption="V" alignment="center" width={40} cssClass={styles.columnGreen}/>
            <Column dataField="M5" caption="M" alignment="center" width={40} cssClass={styles.columnGreen}/>
            <Column dataField="PER5" caption="%" alignment="center" width={40} cssClass={styles.columnGreen}/>
        </Column>
        <Column caption="Cuota 6" alignment="center">
            <Column dataField="V6" caption="V" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="M6" caption="M" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="PER6" caption="%" alignment="center" width={40} cssClass={styles.columnRed}/>
        </Column>
        <Column caption="Cuota 7" alignment="center">
            <Column dataField="V7" caption="V" alignment="center" width={40} cssClass={styles.columnOrange} />
            <Column dataField="M7" caption="M" alignment="center" width={40} cssClass={styles.columnOrange} />
            <Column dataField="PER7" caption="%" alignment="center" width={40} cssClass={styles.columnOrange} />
        </Column>
        <Column caption="Cuota 8" alignment="center">
            <Column dataField="V8" caption="V" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="M8" caption="M" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="PER8" caption="%" alignment="center" width={40} cssClass={styles.columnYellow}/>
        </Column>
        <Column caption="Cuota 9" alignment="center">
            <Column dataField="V9" caption="V" alignment="center" width={40} cssClass={styles.columnGreen}/>
            <Column dataField="M9" caption="M" alignment="center" width={40} cssClass={styles.columnGreen}/>
            <Column dataField="PER9" caption="%" alignment="center" width={40} cssClass={styles.columnGreen}/>
        </Column>
        <Column caption="Cuota 10" alignment="center">
            <Column dataField="V10" caption="V" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="M10" caption="M" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="PER10" caption="%" alignment="center" width={40} cssClass={styles.columnRed}/>
        </Column>
        <Column caption="Cuota 11" alignment="center">
            <Column dataField="V11" caption="V" alignment="center" width={40} cssClass={styles.columnOrange} />
            <Column dataField="M11" caption="M" alignment="center" width={40} cssClass={styles.columnOrange} />
            <Column dataField="PER11" caption="%" alignment="center" width={40} cssClass={styles.columnOrange} />
        </Column>
        <Column caption="Cuota 12" alignment="center">
            <Column dataField="V12" caption="V" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="M12" caption="M" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="PER12" caption="%" alignment="center" width={40} cssClass={styles.columnYellow}/>
        </Column>
        <Summary  calculateCustomSummary={calculateCustomSummary}>
            <TotalItem
            column="V2"
            summaryType="sum"
            name="V2"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M2"
            summaryType="sum"
            name="M2"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER2"
            summaryType="custom"
            name="PER2"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V3"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M3"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER3"
            summaryType="custom"
            name="PER3"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V4"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M4"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER4"
            summaryType="custom"
            name="PER4"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V5"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M5"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER5"
            summaryType="custom"
            name="PER5"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V6"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M6"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER6"
            summaryType="custom"
            name="PER6"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V7"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M7"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER7"
            summaryType="custom"
            name="PER7"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V8"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M8"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER8"
            summaryType="custom"
            name="PER8"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V9"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M9"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER9"
            summaryType="custom"
            name="PER9"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V10"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M10"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER10"
            summaryType="custom"
            name="PER10"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V11"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M11"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER11"
            summaryType="custom"
            name="PER11"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V12"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M12"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="PER12"
            summaryType="custom"
            name="PER12"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
        </Summary>
      </DataGrid>
        </div>
    )
}

export default MoraXVendedor