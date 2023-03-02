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

const EfectividadAdjForm = () => {
  const { user } = useSelector((state: RootState) => state.login);
  const { adjudicaciones } = useSelector(
    (state: RootState) => state.EfectividadAdj
  );
  const dispatch = useDispatch<AppDispatch>();

  const [anio, setAnio] = useState({
    Enero: "",
    Febrero: "",
    Marzo: "",
    Abril: "",
    Mayo: "",
    Junio: "",
    Julio: "",
    Agosto: "",
    Septiembre: "",
    Octubre: "",
    Noviembre: "",
    Diciembre: "",
  });

  useEffect(() => {
    dispatch(getOficialesAdj());
  }, []);

  useEffect(() => {
    let keys;
    if (adjudicaciones.length) {
      keys = Object.keys(adjudicaciones[0]).map((e) => e.split("_"));
      setAnio({
        Enero: keys.find((e) => e[0] === "1")[1],
        Febrero: keys.find((e) => e[0] === "2")[1],
        Marzo: keys.find((e) => e[0] === "3")[1],
        Abril: keys.find((e) => e[0] === "4")[1],
        Mayo: keys.find((e) => e[0] === "5")[1],
        Junio: keys.find((e) => e[0] === "6")[1],
        Julio: keys.find((e) => e[0] === "7")[1],
        Agosto: keys.find((e) => e[0] === "8")[1],
        Septiembre: keys.find((e) => e[0] === "9")[1],
        Octubre: keys.find((e) => e[0] === "10")[1],
        Noviembre: keys.find((e) => e[0] === "11")[1],
        Diciembre: keys.find((e) => e[0] === "12")[1],
      });
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
        className={styles.dataGrid}
        columnAutoWidth={true}
        defaultPaging={false}
        dataSource={adjudicaciones ? adjudicaciones : null}
      >
        <Scrolling useNative={false} scrollByContent={true} mode="standard" />

        <Column dataField="NombreOficial" caption="Oficial" groupIndex={0} />
        <Column dataField="Tipo" groupIndex={1} />
        <Column dataField="NombreCategoria" caption="" />
        <Column
          dataField={`1_${anio.Enero}`}
          caption={`Enero ${anio?.Enero}`}
        />
        <Column
          dataField={`2_${anio.Febrero}`}
          caption={`Febrero ${anio?.Febrero}`}
        />
        <Column
          dataField={`3_${anio.Marzo}`}
          caption={`Marzo ${anio?.Marzo}`}
        />
        <Column
          dataField={`4_${anio.Abril}`}
          caption={`Abril ${anio?.Abril}`}
        />
        <Column dataField={`5_${anio.Mayo}`} caption={`Mayo ${anio?.Mayo}`} />
        <Column
          dataField={`6_${anio.Junio}`}
          caption={`Junio ${anio?.Junio}`}
        />
        <Column
          dataField={`7_${anio.Julio}`}
          caption={`Julio ${anio?.Julio}`}
        />
        <Column
          dataField={`8_${anio.Agosto}`}
          caption={`Agosto ${anio?.Agosto}`}
        />
        <Column
          dataField={`9_${anio.Septiembre}`}
          caption={`Septiembre ${anio?.Septiembre}`}
        />
        <Column
          dataField={`10_${anio.Octubre}`}
          caption={`Octubre ${anio?.Octubre}`}
        />
        <Column
          dataField={`11_${anio.Noviembre}`}
          caption={`Noviembre ${anio?.Noviembre}`}
        />
        <Column
          dataField={`12_${anio.Diciembre}`}
          caption={`Diciembre ${anio?.Diciembre}`}
        />
      </DataGrid>
    </div>
  );
};

export default EfectividadAdjForm;
