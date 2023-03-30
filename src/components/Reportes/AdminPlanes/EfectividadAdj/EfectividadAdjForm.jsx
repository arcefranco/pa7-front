import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BiggerTitleLogo from "../../../../styled-components/containers/BiggerTitleLogo";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import {
  getAdjudicaciones,
  getOficialesAdj,
  reset
} from "../../../../reducers/Reportes/AdmPlanes/efectividadAdj/efectividadAdjSlice";
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
import { useNavigate } from "react-router-dom";

const EfectividadAdjForm = () => {
  const { user } = useSelector((state) => state.login);
  const { adjudicaciones, isLoading } = useSelector(
    (state) => state.EfectividadAdj
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastPoint = { x: 0, y: 0 };
  const [anio, setAnio] = useState([]);
  const [empresasNombres, setEmpresasNombres] = useState([])
  const exportFormats = ["pdf", "xlsx"];

  useEffect(() => {
    dispatch(getOficialesAdj());

    return () => {
      dispatch(reset())
    }
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
      setEmpresasNombres(
        adjudicaciones.filter((obj, index, arr) => {
          return arr.map(mapObj => mapObj.Empresa).indexOf(obj.Empresa) === index}).map(e => e.Empresa)
      )      
          
    }
  }, [adjudicaciones]);

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
      doc.save(`Reporte_EfectividadADJ_${anio[0].mes  === "1"
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
        : ""} ${anio[11].anio}.pdf`);
    });
  }); 
  const filterAdj = (codigoOficial, Categoria, Empresa) => {
    return adjudicaciones.filter((e) => e.CodOficial === codigoOficial && e.Categoria === Categoria && e.Empresa === Empresa);
  };

  const getTotal = (data) => {

    for(let i = 0; i<=empresasNombres.length - 1; i++){
      if (data.Categoria === "PORS" && data.Empresa === empresasNombres[i]) {
        let Prom;
        let valuePL = Object.values(
          filterAdj(data.CodOficial, "PS", empresasNombres[i])[0]
        )
          .slice(6, 18)
          .reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
        let valueGL = Object.values(
          filterAdj(data.CodOficial, "GS", empresasNombres[i])[0]
        )
          .slice(6, 18)
          .reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
  
        Prom = valuePL / valueGL;
        return Math.round(isNaN(Prom) ? 0 : Prom * 100).toString() + "%";
      }
      if (data?.Categoria === "PORL" && data?.Empresa === empresasNombres[i]) {
        let Prom;
        let valuePL = Object.values(
          filterAdj(data.CodOficial, "PL", empresasNombres[i])[0]
        )
          .slice(6, 18)
          .reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
        let valueGL = Object.values(
          filterAdj(data.CodOficial, "GL", empresasNombres[i])[0]
        )
          .slice(6, 18)
          .reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
        Prom = valuePL / valueGL;
        return Math.round(isNaN(Prom) ? 0 : Prom * 100).toString() + "%";
      }
      if (data.Categoria === "PORE" && data.Empresa === empresasNombres[i]) {
        let Prom;
        let valuePL = Object.values(
          filterAdj(data.CodOficial, "PE", empresasNombres[i])[0]
        )
          .slice(6, 18)
          .reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
        let valueGL = Object.values(
          filterAdj(data.CodOficial, "GE", empresasNombres[i])[0]
        )
          .slice(6, 18)
          .reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
        Prom = valuePL / valueGL;
        return Math.round(isNaN(Prom) ? 0 : Prom * 100).toString() + "%";
      }
      if (data.Categoria === "PORT" && data.Empresa === empresasNombres[i]) {
        let Prom;
        let valuePL = Object.values(
          filterAdj(data.CodOficial, "PT", empresasNombres[i])[0]
        )
          .slice(6, 18)
          .reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
        let valueGL = Object.values(
          filterAdj(data.CodOficial, "GT", empresasNombres[i])[0]
        )
          .slice(6, 18)
          .reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
        Prom = valuePL / valueGL;
        return Math.round(isNaN(Prom) ? 0 : Prom * 100).toString() + "%";
      }

    }
    const values = Object.values(data).slice(6, 18);
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
  
  const onCellClick = (e) => {
    
    let marca;
    let tipo;
    let mes;
    let anioDetalle;
    let oficial;
    let periodoCompleto = 0;

    if(e.data.Empresa === "Car Group S.A."){
      marca = 2
    }else if(e.data.Empresa === "Autonet S.A."){
      marca = 2
    }else if(e.data.Empresa === "Alizze S.A."){
      marca = 11
    }else if(e.data.Empresa === "Elysees S.A."){
      marca = 12
    }else if(e.data.Empresa === "Detroit S.A."){
      marca = 7
    }else if(e.data.Empresa === "Autos del Plata S.A."){
      marca = 6
    }else if(e.data.Empresa === "Gestion Financiera Luxcar S.A."){
      marca = 10
    }else{
      marca = 0
    }


    if(e.data.Categoria === "GS"){
      tipo = 0
    }else if(e.data.Categoria === "GL"){
      tipo = 1
    }else if(e.data.Categoria === "GE"){
      tipo = 2
    }else if(e.data.Categoria === "PS"){
      tipo = 3
    }else if(e.data.Categoria === "PL"){
      tipo = 4
    }else if(e.data.Categoria === "PE"){
       tipo = 5
    }else if(e.data.Categoria === "PEAC"){
      tipo = 9
    }else{
      tipo = null
    }

    if(e.data.CodOficial !== 999999){
      oficial = e.data.CodOficial
    }else if(e.data.CodOficial === 999999){
      oficial = -1
    }
    if(e.column.dataField !== "Total"){
      mes = parseInt(e.column.dataField.split("_")[0])
      anioDetalle = parseInt(e.column.dataField.split("_")[1])
    }else{
      mes = parseInt(anio[anio.length - 1].mes)
      anioDetalle = parseInt(anio[anio.length - 1].anio)
      periodoCompleto = 1
    }

    if(e.rowType !== 'group' && e.value > 0 && e.data.Categoria !== 'GT' && e.data.Categoria !== "PT" &&
    e.data.Categoria !== "PORT" && e.data.Categoria !== "PORS" && e.data.Categoria !== "PORL" && e.data.Categoria !== "PORE"){

      window.open(`/detalleEfectividad/${marca}/${tipo}/${mes}/${anioDetalle}/${oficial}/${periodoCompleto}`, '_blank') 
    }


  }


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
        onCellClick={onCellClick}
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
        {
          empresasNombres.length > 1 &&
          <Column dataField="Empresa" caption="Empresa" groupIndex={1} />
        }
        {
          empresasNombres.length === 1 ? 
          <Column dataField="Tipo" groupIndex={1} groupCellRender={GroupCell} /> : 
          
          <Column dataField="Tipo" groupIndex={2} groupCellRender={GroupCell} />
       
          
        }
        <Column dataField="NombreCategoria" caption=""  />
        {anio.length > 1 &&
          anio.map((e) => {
            if (e && Object.keys(e).length) {
              return (
                <Column
                  cssClass={styles.column}
                  dataField={`${e.mes}_${e.anio}`}
                  alignment={"right"}
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
