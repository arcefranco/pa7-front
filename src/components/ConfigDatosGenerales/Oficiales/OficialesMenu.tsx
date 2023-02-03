import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import OficialesItem from "./OficialesItem";
import TitleLogo from "../../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../../styled-components/h/TitlePrimary";
import { ReturnLogo } from "../../../helpers/ReturnLogo";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { resetOficiales } from "../../../reducers/ConfigDatosGenerales/Oficiales/OficialesSlice";

const OficialesMenu = () => {
  const { user } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(resetOficiales());
  }, []);
  const oficialesData = [
    {
      table: "Adjudicación",
      color: "#65c0c347",
      id: 1,
    },
    {
      table: "Licitación",
      color: "#20b2aa85",
      id: 2,
    },
    {
      table: "Mora",
      color: "#87ceebad",
      id: 3,
    },
    {
      table: "Plan Canje",
      color: "#5aaf926e",
      id: 4,
    },
    {
      table: "Scoring",
      color: "#5f9ea0ad",
      id: 5,
    },
    {
      table: "Carga",
      color: "cadetblue",
      id: 6,
    },
    {
      table: "Patentamiento",
      color: "#e5eff7",
      id: 7,
    },
    {
      table: "Asignación",
      color: "#9bc7e1",
      id: 8,
    },
    {
      table: "Subite",
      color: "#00ffff2b",
      id: 9,
    },
    {
      table: "Compra",
      color: "#008b8b91",
      id: 10,
    },
  ];

  return (
    <div>
      <TitleLogo>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary style={{ textAlign: "start" }}>
          Oficiales Menú
        </TitlePrimary>
      </TitleLogo>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {oficialesData &&
          oficialesData.map((e) => (
            <OficialesItem key={e.id} title={e.table} color={e.color} />
          ))}
      </div>
    </div>
  );
};

export default OficialesMenu;
