import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import BiggerTitleLogo from "../../../../styled-components/containers/BiggerTitleLogo";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import {
  getAdjudicaciones,
  getOficialesAdj,
} from "../../../../reducers/Operaciones/efectividadAdj/efectividadAdjSlice";
import JsPDF from 'jspdf';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { AppDispatch } from "../../../../store";
import AdjForm from "./AdjForm";
import DataGrid, {
  Column,
  Summary,
  TotalItem,
  GroupItem,
  Scrolling,
  Export,
} from "devextreme-react/data-grid";
import styles from "./Efectividad.module.css";
import { ConnectingAirportsOutlined } from "@mui/icons-material";


const EfectividadAdjForm = () => {
  const { user } = useSelector((state) => state.login);
  const { adjudicaciones } = useSelector(
    (state) => state.EfectividadAdj
  );
  const dispatch = useDispatch();
  const lastPoint = { x: 0, y: 0 };
  const [anio, setAnio] = useState([]);
  const exportFormats = ["pdf", "xlsx"];

  const onExporting = React.useCallback((e) => {

/*     if (e.format === 'xlsx')  return excelCustomizeConfig(e) */
    const doc = new JsPDF('landscape');

    exportDataGrid({
      jsPDFDocument: doc,

      columnWidths: [38, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17],
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
        console.log(gridCell, pdfCell)

        if(gridCell.rowType === 'header'){
          pdfCell.horizontalAlign = 'center'
          pdfCell.font = {  size: 7 };
               
        }else if(gridCell.rowType === 'groupFooter'){
            
          pdfCell.backgroundColor = '#808080'
          pdfCell.textColor = '#ffffff'
        }else if(gridCell.rowType === 'totalFooter'){
          pdfCell.backgroundColor = '#ffffff'
          pdfCell.textColor = '#ffffff'
        }else{
          pdfCell.font = {  size: 7 };
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
      const header = 'REPORTE DE ADJUDICACIONES';
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setFontSize(9);
      const headerWidth = doc.getTextDimensions(header).w;
        for(let i = 0; i<=pages; i++){
          doc.setPage(i)
          doc.text(header, (pageWidth - headerWidth) / 2, 10);
          doc.text('Período:', 15,  20)
          doc.text(`${user?.empresaReal}`, (pageWidth - 40),  20)
          doc.line(15,  25, (pageWidth - 20),  25, 'F')
        }

      

      doc.setFontSize(9);
      doc.setTextColor('#000');
      for(let i = 0; i<pages; i++){
        doc.setPage(i)
        doc.text(`PB: ${user} -  ${day}/${month}/${year} ${date.toLocaleTimeString()}`, 15, 200);
        doc.text(`Pagina ${i === 0 ? pages : i} de ${pages}`, (pageWidth - 40), 200);
      }
      doc.save(`Reporte_ADJ.pdf`);
    });
  }); 
  const filterAdj = (codigoOficial) => {
    return adjudicaciones.filter((e) => e.CodOficial === codigoOficial);
  };

  const getTotal = (data) => {
    if (data.Categoria === "PORS") {
      let Prom;
      let valuePL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "PS")[0]
      )
        .slice(5, 17)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      let valueGL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "GS")[0]
      )
        .slice(5, 17)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      Prom = valuePL / valueGL;
      return Math.round(isNaN(Prom) ? 0 : Prom * 100).toString() + "%";
    }
    if (data.Categoria === "PORL") {
      let Prom;
      let valuePL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "PL")[0]
      )
        .slice(5, 17)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      let valueGL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "GL")[0]
      )
        .slice(5, 17)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      Prom = valuePL / valueGL;
      return Math.round(isNaN(Prom) ? 0 : Prom * 100).toString() + "%";
    }
    if (data.Categoria === "PORE") {
      let Prom;
      let valuePL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "PE")[0]
      )
        .slice(5, 17)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      let valueGL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "GE")[0]
      )
        .slice(5, 17)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      Prom = valuePL / valueGL;
      return Math.round(isNaN(Prom) ? 0 : Prom * 100).toString() + "%";
    }
    const values = Object.values(data).slice(5, 17);
    return values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  };
  const onCellPrepared = (e) => {
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
  useEffect(() => {
    dispatch(getOficialesAdj());
  }, []);

  useEffect(() => {
    let keys;
    if (adjudicaciones.length) {
      keys = Object.keys(adjudicaciones[0]).map((e) => e.split("_"));

      setAnio(
        keys
          .map((e) => {
            if (e.length === 2) {
              return {
                anio: e[1],
                mes: e[0],
              };
            }
          })
          .sort(function (a, b) {
            var MONTH = {
              Enero: 0,
              Febrero: 1,
              Marzo: 2,
              Abril: 3,
              Mayo: 4,
              Junio: 5,
              Julio: 6,
              Agosto: 7,
              Septiembre: 8,
              Octubre: 9,
              Noviembre: 10,
              Diciembre: 11,
            };
            return a.año - b.año || MONTH[a.mes] - MONTH[b.mes];
          })
          .filter(function (element) {
            return element !== undefined;
          })
      );
    }
  }, [adjudicaciones]);

  return (
    <div>
      <BiggerTitleLogo>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary>
          Efectividad Adjudicaciones - {user?.marca && user.marca}
        </TitlePrimary>
      </BiggerTitleLogo>

      <AdjForm dispatchFunc={getAdjudicaciones} />

      <DataGrid
        style={{ fontSize: "10px" }}
        height={650}
        onExporting={onExporting}
        className={styles.dataGrid}
        onCellPrepared={onCellPrepared}
        columnAutoWidth={true}
        defaultPaging={false}
        dataSource={adjudicaciones ? adjudicaciones : null}
      >
        <Scrolling useNative={false} scrollByContent={true} mode="standard" />
        <Export
          enabled={true}
          formats={exportFormats}
          allowExportSelectedData={false}
        />
        <Column dataField="NombreOficial" caption="Oficial" groupIndex={0} />
        <Column dataField="Tipo" groupIndex={1} />
        <Column dataField="NombreCategoria" caption="" />
        {anio.length > 1 &&
          anio.map((e) => {
            if (e && Object.keys(e).length) {
              return (
                <Column
                  dataField={`${e.mes}_${e.anio}`}
                  caption={`${
                    e.mes === "1"
                      ? "Enero"
                      : e.mes === "2"
                      ? "Febrero"
                      : e.mes === "3"
                      ? "Marzo"
                      : e.mes === "4"
                      ? "Abril"
                      : e.mes === "5"
                      ? "Mayo"
                      : e.mes === "6"
                      ? "Junio"
                      : e.mes === "7"
                      ? "Julio"
                      : e.mes === "8"
                      ? "Agosto"
                      : e.mes === "9"
                      ? "Septiembre"
                      : e.mes === "10"
                      ? "Octubre"
                      : e.mes === "11"
                      ? "Noviembre"
                      : e.mes === "12"
                      ? "Diciembre"
                      : ""
                  } ${e.anio}`}
                />
              );
            }
          })}
        <Column
          caption="Total"
          alignment={"center"}
          dataField="Total"
          cssClass={styles.columnYellow}
          calculateCellValue={getTotal}
        />


      </DataGrid>
    </div>
  );
};

export default EfectividadAdjForm;
