import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import Home from "./components/Home/Home";
import PrivateMasterRoute from "./PrivateMasterRoute";
import SideBar from "./components/SideBar/SideBar";
import { ResetPassword } from "./components/ForgotPassword/ResetPassword";
import { RecoveryPass } from "./components/ForgotPassword/RecoveryPass";
import CopyRoles from "./components/ConfigDatosGenerales/RolesForm/CopyRoles";
import ErrorDB from "./pages/ErrorDB";
import TeamLeaders from "./components/ConfigDatosGenerales/TeamLeaders/TeamLeaders";
import Supervisores from "./components/ConfigDatosGenerales/Supervisores/Supervisores";
import { useSelector } from "react-redux";
import NotPermission from "./NotPermission";
import RolesForm from "./components/ConfigDatosGenerales/RolesForm/RolesForm";
import ModelosTable from "./components/ConfigDatosGenerales/ModelosTable/ModelosTable";
import ModelosFormulario from "./components/ConfigDatosGenerales/ModelosTable/ModelosFormulario";
import Usuarios from "./components/ConfigDatosGenerales/Usuarios/Usuarios";
import PuntosDeVenta from "./components/ConfigDatosGenerales/PuntosDeVenta/PuntosDeVenta";
import OficialesTable from "./components/ConfigDatosGenerales/Oficiales/OficialesTable";
import OficialesForm from "./components/ConfigDatosGenerales/Oficiales/OficialesForm";
import Estructura from "./components/ConfigDatosGenerales/EstructuraComercial/Estructura";
import Error404 from "./pages/Error404";
import OficialesMenu from "./components/ConfigDatosGenerales/Oficiales/OficialesMenu";
import ListasPrecios from "./components/ConfigDatosGenerales/ListasPrecios/ListasPrecios";
import Gerentes from "./components/ConfigDatosGenerales/Gerentes/Gerentes";
import Vendedores from "./components/ConfigDatosGenerales/Vendedores/Vendedores";
import Sucursales from "./components/ConfigDatosGenerales/Sucursales/Sucursales";
import React from "react";
import Error552 from "./pages/Error552";
import Detalle from "./components/Reportes/Ventas/EstadisticoPreSol/TableDetalle/Detalle";
import PreSolGrid from "./components/Reportes/Ventas/EstadisticoPreSol/PreSolGrid";
import ReporteZonal from "./components/Reportes/Micro/ReporteZonal";
import TableDetallesZonal from "./components/Reportes/Micro/TableDetallesZonal";
import ReportTemplate from "./components/Reportes/Micro/ReportTemplate";
import AltaPre from "./components/Operaciones/AltaPre/AltaPre";
import ActualPreScreen from "./components/Operaciones/ActualizacionPre/ActualPreScreen";
import ActualForm from "./components/Operaciones/ActualizacionPre/ActualForm";
import EfectividadAdjForm from "./components/Reportes/AdminPlanes/EfectividadAdj/EfectividadAdjForm";
import EfectividadDetalle from "./components/Reportes/AdminPlanes/EfectividadAdj/EfectividadDetalle";
import MoraXVendedor from "./components/Reportes/Mora/MoraXVendedorYSup/MoraXVendedor";

function App() {
  const { user, toggle } = useSelector((state) => state.login);

  React.useEffect(() => {
    let timeInterval = setInterval(() => {
      let lastAcivity = localStorage.getItem("lastActvity");
      var diffMs = Math.abs(new Date(lastAcivity) - new Date()); // milliseconds between now & last activity
      var seconds = Math.floor(diffMs / 1000);
      var minute = Math.floor(seconds / 60);
      /*         console.log(seconds +' sec and '+minute+' min since last activity') */
      if (minute == 30) {
        console.log("No activity from last 10 minutes... Logging Out");
        clearInterval(timeInterval);
        localStorage.removeItem("user");
        localStorage.removeItem("userToken");
        localStorage.removeItem("db");
      }
    }, 1000);
  }, [user]);
  return user &&
    (user?.newUser === 0 || user?.newUser === null || !user?.newUser) ? (
    <div className="App">
      <SideBar />
      <div
        className="appContainer"
        style={{
          width: "100%",
          position: "absolute",
          paddingLeft: "5em",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "red",
            width: "100%",
            heigth: "2rem",
            textAlignLast: "center",
            color: "white",
          }}
        >
          <h4 style={{ margin: "0" }}>Servidor de desarrollo</h4>
        </div>
        <div
          style={{
            width: "100%",
            opacity: 0.5,
            position: "fixed",
            height: "100vh",
            zIndex: toggle ? 1 : -1,
            backgroundColor: "black",
            display: !toggle && "none",
            overflow: "hidden",
          }}
        ></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/gerentes"
            element={<PrivateMasterRoute rol={"1.7.18"} />}
          >
            <Route path="/gerentes" element={<Gerentes />} />
          </Route>
          <Route path="/teamleaders" element={<TeamLeaders />} />
          <Route path="/supervisores" element={<Supervisores />} />
          <Route
            path="/usuarios"
            element={<PrivateMasterRoute rol={"1.7.16"} />}
          >
            <Route path="/usuarios" element={<Usuarios />} />
          </Route>
          <Route path="/modelos" element={<ModelosTable />} />
          <Route path="/altaModelos/" element={<ModelosFormulario />} />
          <Route path="/modifModelos/:id" element={<ModelosFormulario />} />
          <Route path="/vendedores" element={<Vendedores />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/puntosDeVenta" element={<PuntosDeVenta />} />
          <Route path="/roles" element={<RolesForm />} />
          <Route path="/copyRoles" element={<CopyRoles />} />
          <Route path="/oficiales" element={<OficialesMenu />} />
          <Route path="/oficiales/:table" element={<OficialesTable />} />
          <Route path="/permission" element={<NotPermission />} />
          <Route path="/480" element={<ErrorDB />}></Route>
          <Route path="/Estructura" element={<Estructura />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/listasprecios" element={<ListasPrecios />} />
          <Route path="/reportes/preSol" element={<PreSolGrid />} />
          <Route
            path="/reportes/preSol/ingresadas/:fechaD/:fechaH/:codMarca/:codSup"
            element={<Detalle title={"Ingresadas"} />}
          />
          <Route
            path="/reportes/preSol/anulRechaz/:fechaD/:fechaH/:codMarca/:codSup"
            element={<Detalle title={"Anuladas Rechazadas"} />}
          />
          <Route
            path="/reportes/preSol/cruceScoring/:fechaD/:fechaH/:codMarca/:codSup"
            element={<Detalle title={"Cruce Scoring"} />}
          />
          <Route
            path="/reportes/preSol/Produccion/:fechaD/:fechaH/:codMarca/:codSup"
            element={<Detalle title={"Produccion"} />}
          />
          <Route
            path="/reportes/preSol/Pendientes/:fechaD/:fechaH/:codMarca/:codSup"
            element={<Detalle title={"Pendientes"} />}
          />
          <Route
            path="/reportes/preSol/TresYSiete/:fechaD/:fechaH/:codMarca/:codSup"
            element={<Detalle title={"Anuladas 3 + 7"} />}
          />
          <Route
            path="/reportes/preSol/ProdYCS/:fechaD/:fechaH/:codMarca/:codSup"
            element={<Detalle title={"Produccion + Cruce Scoring"} />}
          />
          <Route
            path="/reportes/preSol/MP/:fechaD/:fechaH/:codMarca/:codSup"
            element={<Detalle title={"Mesa de Planes"} />}
          />
          <Route path="/reportes/Micro/Zonal" element={<ReporteZonal />} />
          <Route
            path="/reportes/Micro/Zonal/:empresa/:gerente/:clasificacion"
            element={<TableDetallesZonal />}
          />
          <Route path="/reportTemplate" element={<ReportTemplate />} />
          <Route path="/operaciones/altaPre" element={<AltaPre />} />
          <Route
            path="/operaciones/actualizacionPre"
            element={<ActualPreScreen />}
          />
          <Route
            path="/operaciones/actualizacionPre/:codigoMarca/:Numero"
            element={<ActualForm />}
          />
          <Route
            path="reportes/efectividadAdj"
            element={<EfectividadAdjForm />}
          />
          <Route
            path="/detalleEfectividad/:marca/:tipo/:mes/:anio/:oficial/:periodoCompleto"
            element={<EfectividadDetalle />}
          />
          <Route path="reportes/MoraXVendedor" element={<MoraXVendedor />} />
        </Routes>
      </div>
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recovery" element={<RecoveryPass />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="/552" element={<Error552 />} />
    </Routes>
  );
}

export default App;
