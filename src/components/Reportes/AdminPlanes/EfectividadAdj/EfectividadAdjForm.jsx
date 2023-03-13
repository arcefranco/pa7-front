import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BiggerTitleLogo from "../../../../styled-components/containers/BiggerTitleLogo";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import {
  getAdjudicaciones,
  getOficialesAdj,
} from "../../../../reducers/Operaciones/efectividadAdj/efectividadAdjSlice";
import JsPDF from 'jspdf';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import AdjForm from "./AdjForm";
import DataGrid, {
  Column,
  Scrolling,
  Export,
} from "devextreme-react/data-grid";
import styles from "./Efectividad.module.css";
import { addCommas } from "../../../../helpers/addComas";
import excelCustomizeConfig from "./excelCustomizeConfig";

const EfectividadAdjForm = () => {
  const { user } = useSelector((state) => state.login);
  const { adjudicaciones, isLoading } = useSelector(
    (state) => state.EfectividadAdj
  );
  const dispatch = useDispatch();
  const lastPoint = { x: 0, y: 0 };
  const [anio, setAnio] = useState([]);
  const exportFormats = ["pdf", "xlsx"];

  const onExporting = React.useCallback((e) => {

  if (e.format === 'xlsx')  return excelCustomizeConfig(e) 
    const doc = new JsPDF('landscape');

    exportDataGrid({
      jsPDFDocument: doc,

      columnWidths: [55, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
      component: e.component,
      margin: {
        top: 30,
        bottom: 15
      },
      topLeft:  { x: 20, y: 0 },
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

        if(gridCell.rowType === "group" && gridCell.column.dataField === "Tipo"){
          pdfCell.text = ""
          
        } 
        if(gridCell.hasOwnProperty('data') && gridCell.value){
          pdfCell.text = addCommas(gridCell.value)
        }
        if(gridCell.hasOwnProperty('data') && !gridCell.value){
          pdfCell.text = "0"
        }
        if(gridCell.rowType === "group"){
          pdfCell.backgroundColor = "#495057"
          pdfCell.textColor = "#ffffff"
        }
         if(gridCell.hasOwnProperty('data') && (gridCell.data.Categoria === "PT" || 
        gridCell.data.Categoria === "GT" || 
        gridCell.data.Categoria === "PORT")){
          pdfCell.backgroundColor = '#808080'
        } 
        if(gridCell.column.dataField === 'Total'){
          pdfCell.backgroundColor = '#097969'
          pdfCell.textColor = '#ffffff'
        }
        if(gridCell.rowType === 'header'){
          pdfCell.horizontalAlign = 'center'
          pdfCell.font = {  size: 7 };
               
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
          doc.text(`Período: ${anio && `${anio[0].mes  === "1"
          ? "Enero"
          : anio[0].mes === "2"
          ? "Febrero"
          : anio[0].mes === "3"
          ? "Marzo"
          : anio[0].mes === "4"
          ? "Abril"
          : anio[0].mes === "5"
          ? "Mayo"
          : anio[0].mes === "6"
          ? "Junio"
          : anio[0].mes === "7"
          ? "Julio"
          : anio[0].mes === "8"
          ? "Agosto"
          : anio[0].mes === "9"
          ? "Septiembre"
          : anio[0].mes === "10"
          ? "Octubre"
          : anio[0].mes === "11"
          ? "Noviembre"
          : anio[0].mes === "12"
          ? "Diciembre"
          : ""} ${anio[0].anio} - ${anio[11].mes  === "1"
            ? "Enero"
            : anio[11].mes === "2"
            ? "Febrero"
            : anio[11].mes === "3"
            ? "Marzo"
            : anio[11].mes === "4"
            ? "Abril"
            : anio[11].mes === "5"
            ? "Mayo"
            : anio[11].mes === "6"
            ? "Junio"
            : anio[11].mes === "7"
            ? "Julio"
            : anio[11].mes === "8"
            ? "Agosto"
            : anio[11].mes === "9"
            ? "Septiembre"
            : anio[11].mes === "10"
            ? "Octubre"
            : anio[11].mes === "11"
            ? "Noviembre"
            : anio[11].mes === "12"
            ? "Diciembre"
            : ""} ${anio[11].anio}`} ${adjudicaciones.length === 13 ? 
              `(Oficial ${adjudicaciones[0].NombreOficial}) (Excluye Planes Propios Cancelados)` : "(Excluye Planes Propios Cancelados)"}`
            , 15,  20)
          doc.text(`${user?.empresaReal} ${day}/${month}/${year}`, (pageWidth - 40),  20)
          doc.line(15,  25, (pageWidth - 20),  25, 'F')
        }

      

      doc.setFontSize(9);
      doc.setTextColor('#000');
      for(let i = 0; i<pages; i++){
        doc.setPage(i)
        doc.text(`PB: ${user?.username} -  ${day}/${month}/${year} ${date.toLocaleTimeString()}`, 15, 200);
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
        .slice(6, 18)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      let valueGL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "GS")[0]
      )
        .slice(6, 18)
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
        .slice(6, 18)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      let valueGL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "GL")[0]
      )
        .slice(6, 18)
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
        .slice(6, 18)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      let valueGL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "GE")[0]
      )
        .slice(6, 18)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      Prom = valuePL / valueGL;
      return Math.round(isNaN(Prom) ? 0 : Prom * 100).toString() + "%";
    }
    if (data.Categoria === "PORT") {
      let Prom;
      let valuePL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "PT")[0]
      )
        .slice(6, 18)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      let valueGL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "GT")[0]
      )
        .slice(6, 18)
        .reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
      Prom = valuePL / valueGL;
      return Math.round(isNaN(Prom) ? 0 : Prom * 100).toString() + "%";
    }
    const values = Object.values(data).slice(6, 18);
    console.log(values)
    return values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  };
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
  useEffect(() => {
    dispatch(getOficialesAdj());
  }, []);

  useEffect(() => {
    let keys;
    if (adjudicaciones.length) {
      console.log(adjudicaciones.length)
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
  const GroupCell = options => <div></div>;
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
      <h1>{}</h1>
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
        <Column dataField="NomOficial" caption="Oficial" groupIndex={0} />
        <Column dataField="Empresa" caption="Empresa" groupIndex={1} />
        <Column dataField="Tipo" groupIndex={2} groupCellRender={GroupCell} />
        <Column dataField="NombreCategoria" caption="" />
        {anio.length > 1 &&
          anio.map((e) => {
            if (e && Object.keys(e).length) {
              return (
                <Column
                  dataField={`${e.mes}_${e.anio}`}
                  caption={`${
                    e.mes === "1"
                      ? "Ene."
                      : e.mes === "2"
                      ? "Feb."
                      : e.mes === "3"
                      ? "Mar."
                      : e.mes === "4"
                      ? "Abr."
                      : e.mes === "5"
                      ? "May."
                      : e.mes === "6"
                      ? "Jun."
                      : e.mes === "7"
                      ? "Jul."
                      : e.mes === "8"
                      ? "Ago."
                      : e.mes === "9"
                      ? "Sept."
                      : e.mes === "10"
                      ? "Oct."
                      : e.mes === "11"
                      ? "Nov."
                      : e.mes === "12"
                      ? "Dic."
                      : ""
                  } ${e.anio.slice(2)}`}
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
