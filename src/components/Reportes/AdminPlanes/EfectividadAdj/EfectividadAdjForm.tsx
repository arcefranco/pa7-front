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

interface anioSorted {
  anio: string;
  mes: string;
}
const EfectividadAdjForm = () => {
  const { user } = useSelector((state: RootState) => state.login);
  const { adjudicaciones } = useSelector(
    (state: RootState) => state.EfectividadAdj
  );
  const dispatch = useDispatch<AppDispatch>();

  const [anio, setAnio] = useState([]);

  const filterAdj = (codigoOficial: number) => {
    return adjudicaciones.filter((e) => e.CodOficial === codigoOficial);
  };

  const getTotal = (data) => {
    if (data.Categoria === "PORS") {
      let Prom;
      let valuePL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "PS")[0]
      )
        .slice(5, 17)
        .reduce((accumulator: any, value: any) => {
          return accumulator + value;
        }, 0);
      let valueGL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "GS")[0]
      )
        .slice(5, 17)
        .reduce((accumulator: any, value: any) => {
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
        .reduce((accumulator: any, value: any) => {
          return accumulator + value;
        }, 0);
      let valueGL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "GL")[0]
      )
        .slice(5, 17)
        .reduce((accumulator: any, value: any) => {
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
        .reduce((accumulator: any, value: any) => {
          return accumulator + value;
        }, 0);
      let valueGL = Object.values(
        filterAdj(data.CodOficial).filter((e) => e.Categoria === "GE")[0]
      )
        .slice(5, 17)
        .reduce((accumulator: any, value: any) => {
          return accumulator + value;
        }, 0);
      Prom = valuePL / valueGL;
      return Math.round(isNaN(Prom) ? 0 : Prom * 100).toString() + "%";
    }
    const values = Object.values(data).slice(5, 17);
    return values.reduce((accumulator: any, value: any) => {
      return accumulator + value;
    }, 0);
  };
  const onCellPrepared = (e) => {
    if (e.rowType === "totalFooter") {
      e.cellElement.style.backgroundColor = "#4b5866ad";
    } else if (e.rowType === "groupFooter") {
      console.log(e);
      e.cellElement.style.backgroundColor = "#4b586678";
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
        className={styles.dataGrid}
        onCellPrepared={onCellPrepared}
        columnAutoWidth={true}
        defaultPaging={false}
        dataSource={adjudicaciones ? adjudicaciones : null}
      >
        <Scrolling useNative={false} scrollByContent={true} mode="standard" />

        <Column dataField="NombreOficial" caption="Oficial" groupIndex={0} />
        <Column dataField="Tipo" groupIndex={1} />
        <Column dataField="NombreCategoria" caption="" />
        {anio.length > 1 &&
          anio.map((e: anioSorted) => {
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

        <Summary>
          {anio.length > 1 &&
            anio.map((e: anioSorted) => {
              if (e && Object.keys(e).length) {
                return (
                  <GroupItem
                    column={`${e.mes}_${e.anio}`}
                    summaryType="sum"
                    showInGroupFooter={true}
                    displayFormat="{0}"
                  />
                );
              }
            })}
        </Summary>
      </DataGrid>
    </div>
  );
};

export default EfectividadAdjForm;
