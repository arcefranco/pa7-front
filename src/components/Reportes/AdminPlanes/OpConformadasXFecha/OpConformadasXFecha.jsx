import React, { useEffect, useState } from "react";
import BiggerTitleLogo from "../../../../styled-components/containers/BiggerTitleLogo";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import { useSelector } from "react-redux";
import ReportesForm from "../../ReportesForm";
import { getOperacionesXFecha } from "../../../../reducers/Reportes/AdmPlanes/operacionesXFecha/operacionesXFechaSlice";
import DataGrid, {
  Column,
  Export
} from "devextreme-react/data-grid";
import { exportDataGrid } from 'devextreme/pdf_exporter';
import JsPDF from 'jspdf';
import isOdd from "../../../../helpers/isOdd";
import styles from "../EfectividadAdj/Efectividad.module.css";

const OpConformadasXFecha = () => {
  const { user } = useSelector((state) => state.login);
  const { operaciones, isLoading } = useSelector((state) => state.OpXFecha);
  const lastPoint = { x: 0, y: 0 };
  const exportFormats = ["pdf"]
  const [fechas, setFechas] = useState({
    fechaD: '',
    fechaH: ''
  })

  const renderDate = (data) => {
    if (data.data.items) {
      return (
        data?.text?.slice(0, 10).split("-").reverse().join("/") +
        ` (Subtotal del día: ${data.data.items?.length} Op)`
      );
    } else if (data.data.collapsedItems) {
      return (
        data?.text?.slice(0, 10).split("-").reverse().join("/") +
        ` (Subtotal del día: ${data.data.collapsedItems?.length} Op)`
      );
    }
  };

  const renderNombre = (e) => {
    return e.Apellido + ", " + e.Nombres;
  };

  const renderTelefonos = (e) => {
    return (
      `${e.Telefonos} ` +
      (e.Telefonos2
        ? `* ${e.Telefonos2}`
        : "" + e.Telefonos3
        ? `* ${e.Telefonos3}`
        : "" + e.Telefonos4
        ? `* ${e.Telefonos4}`
        : "")
    );
  };

  const onCellPrepared = (e) => {
    if (e.rowType === "data" && isOdd(e.rowIndex)) {
      e.cellElement.style.setProperty("background-color", "#15141430");
    }
    if (e.rowType === "header") {
      e.cellElement.style.setProperty("background-color", "#15141491");
      e.cellElement.style.setProperty("color", "#fff");
    }
  };

  useEffect(() => {
    let smallest = operaciones[0]?.FechaConformacion;
    let biggest = operaciones[0]?.FechaConformacion;
    for(let i = 0; i<=operaciones.length; i++){
      if(operaciones[i] > biggest){
        biggest = operaciones[i].FechaConformacion
      }else if(operaciones[i] < smallest){
        smallest = operaciones[i].FechaConformacion
      }
    }
    setFechas({
      fechaD: smallest?.slice(0, 10).split("-").reverse().join("/"),
      fechaH: biggest?.slice(0, 10).split("-").reverse().join("/")
    })
  }, [operaciones])

  const onExporting = React.useCallback((e) => {
    const doc = new JsPDF('landscape');

    exportDataGrid({
      jsPDFDocument: doc,

       columnWidths:  [45,45,45,45,45], 
      component: e.component,
      margin: {
        top: 30,
        bottom: 16
      },
      topLeft:  { x: 32, y: 0 },
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
        if(gridCell.column.dataField === 'FechaConformacion'){
          console.log(pdfCell.text.split(':')[1].split("T")[0].split('-').reverse().join('/'))
          pdfCell.text = pdfCell.text.split(':')[1].split("T")[0].split('-').reverse().join('/')
        }

        
    } ,
    
      indent: 0,

    }).then(() => {
       const pages = doc.getNumberOfPages()
       let date = new Date()
       let day = date.getDate()
       let month = date.getMonth() + 1
       let year = date.getFullYear()
      const header = `Operaciones conformadas por fecha`;
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setFontSize(9);
      const headerWidth = doc.getTextDimensions(header).w;
        for(let i = 0; i<=pages; i++){
          doc.setPage(i)
          doc.text(header, (pageWidth - headerWidth) / 2, 10);
          doc.text(`Período: ${fechas.fechaD}-${fechas.fechaH}`, 15,  20)
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
      doc.save(`Operaciones_Conformadas_por_fecha_${fechas.fechaD}_${fechas.fechaH}.pdf`);
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
          Operaciones conformadas por fecha - {user?.marca && user.marca}
        </TitlePrimary>
      </BiggerTitleLogo>
     {!operaciones?.length && <ReportesForm
        dispatchFunc={getOperacionesXFecha}
        fechaD={1}
        fechaH={1}
        mes={0}
        anio={0}
      />}
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
        defaultPaging={false}
        dataSource={operaciones ? operaciones : null}
      >
        <Export
          enabled={true}
          formats={exportFormats}
          allowExportSelectedData={false}
        />
        <Column
          dataField={"FechaConformacion"}
          groupIndex={0}
          groupCellRender={renderDate}
          defaultSortOrder="asc"
        />
        <Column
          dataField={"Apellido"}
          caption={"Nombre y Apellido"}
          defaultSortOrder="asc"
          calculateCellValue={renderNombre}
        />
        <Column dataField={"Telefonos"} calculateCellValue={renderTelefonos} />
        <Column dataField={"Domicilio"} />
        <Column dataField={"EmailParticular"} />
        <Column dataField={"EmailLaboral"} />
      </DataGrid>
    </div>
  );
};

export default OpConformadasXFecha;
