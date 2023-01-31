import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TitleLogo from "../../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../../styled-components/h/TitlePrimary";
import { ReturnLogo } from "../../../helpers/ReturnLogo";
import {
  getEstructura,
  resetStatus,
} from "../../../reducers/ConfigDatosGenerales/Estructura/EstructuraSlice";
import EstructuraItem from "./EstructuraItem";
import ModalStatus from "../../ModalStatus";
import { AppDispatch, RootState } from "../../../store";
import styles from "./Estructura.module.css";
import { EstructuraItemType } from "../../../types/ConfigDatosGenerales/Estructura/EstructuraItemType";

const Estructura = () => {
  const { user } = useSelector((state: RootState) => state.login);
  const { allEstructura, estructuraActivos, isLoading, estructuraStatus } =
    useSelector((state: RootState) => state.estructura);
  const [activos, setActivos] = useState(false);
  const [filteredGerentes, setFilteredGerentes] = useState<
    EstructuraItemType[]
  >([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getEstructura());
  }, []);

  useEffect(() => {
    let arr: any[] = [];

    if (!activos) {
      allEstructura.forEach(function (el) {
        if (!arr.find((e) => e.Nombre === el.NombreGerente))
          if (el.CodigoSupervisor)
            arr.push({
              Title: "Gerente",
              Codigo: el.CodigoGerente,
              Activo: el.ActivoGerentes,
              Nombre: el.NombreGerente,
              Childrens: [],
            });
          else
            arr.push({
              Title: "Gerente",
              Codigo: el.CodigoGerente,
              Activo: el.ActivoGerentes,
              Nombre: el.NombreGerente,
            });
      });

      allEstructura.forEach(function (el) {
        arr.forEach(function (sup) {
          if (
            !sup.Childrens?.find((e) => e.Nombre === el.NombreSupervisor) &&
            sup.Codigo === el.CodigoGerente
          )
            if (el.CodigoTL)
              sup.Childrens?.push({
                Title: "Supervisor",
                Codigo: el.CodigoSupervisor,
                Activo: el.InactivoSucursales,
                Nombre: el.NombreSupervisor,
                Childrens: [],
              });
            else
              sup.Childrens?.push({
                Title: "Supervisor",
                Codigo: el.CodigoSupervisor,
                Activo: el.InactivoSucursales,
                Nombre: el.NombreSupervisor,
              });
        });
      });

      allEstructura.forEach(function (el) {
        arr.forEach(function (sup) {
          sup.Childrens?.forEach(function (tl) {
            if (
              !tl.Childrens?.find((e) => e.Nombre === el.NombreTL) &&
              tl.Codigo === el.CodigoSupervisor
            )
              if (el.CodigoVendedor)
                tl.Childrens?.push({
                  Title: "Team Leader",
                  Codigo: el.CodigoTL,
                  Activo: el.InactivoTL.data[0],
                  Nombre: el.NombreTL,
                  Childrens: [],
                });
              else
                tl.Childrens?.push({
                  Title: "Team Leader",
                  Codigo: el.CodigoTL,
                  Activo: el.InactivoTL.data[0],
                  Nombre: el.NombreTL,
                });
          });
        });
      });

      allEstructura.forEach(function (el) {
        arr.forEach(function (sup) {
          sup.Childrens?.forEach(function (tl) {
            tl.Childrens?.forEach(function (vend) {
              if (
                !vend.Childrens?.find((e) => e.Nombre === el.NombreVendedor) &&
                vend.Codigo === el.CodigoTL
              )
                vend.Childrens?.push({
                  Title: "Vendedor",
                  Codigo: el.CodigoVendedor,
                  Activo: el.InactivoVendedores,
                  Nombre: el.NombreVendedor,
                });
            });
          });
        });
      });

      setFilteredGerentes(arr);
    } else {
      estructuraActivos.forEach(function (el) {
        if (!arr.find((e) => e.Nombre === el.NombreGerente))
          if (el.CodigoSupervisor)
            arr.push({
              Title: "Gerente",
              Codigo: el.CodigoGerente,
              Nombre: el.NombreGerente,
              Childrens: [],
            });
          else
            arr.push({
              Title: "Gerente",
              Codigo: el.CodigoGerente,
              Nombre: el.NombreGerente,
            });
      });

      estructuraActivos.forEach(function (el) {
        arr.forEach(function (sup) {
          if (
            !sup.Childrens?.find((e) => e.Nombre === el.NombreSupervisor) &&
            sup.Codigo === el.CodigoGerente
          )
            if (el.CodigoTL)
              sup.Childrens?.push({
                Title: "Supervisor",
                Codigo: el.CodigoSupervisor,
                Nombre: el.NombreSupervisor,
                Childrens: [],
              });
            else
              sup.Childrens?.push({
                Title: "Supervisor",
                Codigo: el.CodigoSupervisor,
                Nombre: el.NombreSupervisor,
              });
        });
      });

      estructuraActivos.forEach(function (el) {
        arr.forEach(function (sup) {
          sup.Childrens?.forEach(function (tl) {
            if (
              !tl.Childrens?.find((e) => e.Nombre === el.NombreTL) &&
              tl.Codigo === el.CodigoSupervisor
            )
              if (el.CodigoVendedor)
                tl.Childrens?.push({
                  Title: "Team Leader",
                  Codigo: el.CodigoTL,
                  Nombre: el.NombreTL,
                  Childrens: [],
                });
              else
                tl.Childrens?.push({
                  Title: "Team Leader",
                  Codigo: el.CodigoTL,
                  Nombre: el.NombreTL,
                });
          });
        });
      });

      estructuraActivos.forEach(function (el) {
        arr.forEach(function (sup) {
          sup.Childrens?.forEach(function (tl) {
            tl.Childrens?.forEach(function (vend) {
              if (
                !vend.Childrens?.find((e) => e.Nombre === el.NombreVendedor) &&
                vend.Codigo === el.CodigoTL
              )
                vend.Childrens?.push({
                  Title: "Vendedor",
                  Codigo: el.CodigoVendedor,
                  Nombre: el.NombreVendedor,
                });
            });
          });
        });
      });

      setFilteredGerentes(arr);
    }
  }, [activos, allEstructura]);

  useEffect(() => {
    //Manejar actualizaciones de vendedores (ABM) y su inUpdate
    if (
      estructuraStatus &&
      Object.keys(estructuraStatus).length &&
      estructuraStatus.hasOwnProperty("status") &&
      estructuraStatus.hasOwnProperty("message")
    ) {
      setModal(true);
    }
    function resetModal() {
      dispatch(resetStatus());
      setModal(false);
    }

    if (
      estructuraStatus &&
      Object.keys(estructuraStatus).length &&
      !estructuraStatus.hasOwnProperty("codigo")
    ) {
      setTimeout(resetModal, 5000);
    }
  }, [estructuraStatus]);

  const handleCheck = (e) => {
    if (e.target.checked) {
      setActivos(true);
    } else {
      setActivos(false);
    }
  };

  return (
    <div>
      {modal ? (
        <ModalStatus
          status={estructuraStatus?.status}
          message={estructuraStatus?.message}
        />
      ) : null}
      <TitleLogo style={{ width: "25rem" }}>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary style={{ textAlign: "start" }}>
          Estructura Comercial
        </TitlePrimary>
      </TitleLogo>
      {/*           <button onClick={() => setActivos(!activos)}>Solo activos</button>
          <p>{activos ? 'si' : 'no'}</p> */}

      <div
        style={{
          display: "flex",
          placeItems: "center",
          placeContent: "center",
        }}
      >
        <span>Ocultar inactivos</span>{" "}
        <input
          type="checkbox"
          style={{ marginLeft: "4px" }}
          onChange={(e) => handleCheck(e)}
        />
      </div>
      {isLoading && (
        <div
          style={{
            height: "-webkit-fill-available",
            display: "flex",
            flexDirection: "column",
            placeContent: "center",
            fontSize: "22px",
            color: "#0000007a",
          }}
        >
          Cargando...
        </div>
      )}
      <div className={styles.estructuraItemContainer}>
        {filteredGerentes &&
          filteredGerentes.map((e) => {
            return (
              <EstructuraItem
                key={e.Codigo}
                Activo={e.Activo}
                Title={e.Title}
                Nombre={e.Nombre}
                Childrens={e.Childrens}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Estructura;
