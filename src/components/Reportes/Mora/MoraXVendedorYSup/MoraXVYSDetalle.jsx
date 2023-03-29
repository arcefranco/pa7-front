import React, {useState, useEffect} from "react"
import BiggerTitleLogo from "../../../../styled-components/containers/BiggerTitleLogo";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import { useParams } from "react-router-dom";
import TitleSecondary2 from "../../../../styled-components/h/TitleSecondary2";
import DataGrid, {
    Column,
    Summary,
    Scrolling,
    Export,
    TotalItem
} from "devextreme-react/data-grid";
import { useSelector } from "react-redux";
import styles from './Mora.module.css'
import isOdd from "../../../../helpers/isOdd";
const MoraXVYSDetalle = () => {
const { user } = useSelector((state) => state.login);
const {MoraDetalle, MoraXVendedor} = useSelector((state) => state.MoraXVendedorYSup);
const {esVendedor ,Codigo, Capa, Pagadas} = useParams()
const [detalleFiltered, setDetalleFiltered] = useState([])

useEffect(() => {

    if(Pagadas == -1){ //VENCIDOS

        if(esVendedor == 1){ // Vendedor
            if(Codigo === "todos"){
                setDetalleFiltered(MoraDetalle.filter(e =>  e.Capa == Capa))
            }else{
                setDetalleFiltered(MoraDetalle.filter(e => e.NomVendedor == Codigo && e.Capa == Capa))
            } 
        }else{ // Supervisor
            if(Codigo === "todos"){
                setDetalleFiltered(MoraDetalle.filter(e =>  e.Capa == Capa))
            }else{
                setDetalleFiltered(MoraDetalle.filter(e => e.CodSucursal == Codigo && e.Capa == Capa))
            }
        }
    }else if(Pagadas == 1){ //MOROSOS


        if(esVendedor == 1){ // Vendedor
            if(Codigo === "todos"){
                setDetalleFiltered(MoraDetalle.filter(e => e.Capa == Capa && e.Pagada == 0))
            }else{
                setDetalleFiltered(MoraDetalle.filter(e => e.NomVendedor == Codigo && e.Capa == Capa && e.Pagada == 0))
            }

        }else{
            if(Codigo === "todos"){ // Supervisor
                setDetalleFiltered(MoraDetalle.filter(e =>  e.Capa == Capa && e.Pagada == 0))
            }else{

                setDetalleFiltered(MoraDetalle.filter(e => e.CodSucursal == Codigo && e.Capa == Capa && e.Pagada == 0))
            }
        }
    }


}, [])
const renderDate = (data) => {
    return data.text?.slice(0,10).split('-').reverse().join('/')
  }

const renderGrupoOrden = (e) => {
    return e.Apellido + ", " + e.Nombres 
}

const renderEntregaUsado = (data) => {
    if(data.text === "3"){
        return "SI"
    }else{
        return "NO"
    }
}

const onCellPrepared = (e) => {
if(e.rowType === "data" && isOdd(e.rowIndex)){
    e.cellElement.style.setProperty("background-color", "#15141430");
}
    if (e.rowType === "header") {
      e.cellElement.style.setProperty("background-color", "#15141491");
      e.cellElement.style.setProperty("color", "#fff");
    }
  };

const renderOperacion = options => <button className={styles.buttonOperacion}>Ver Operación</button>
return (
    <>
    <BiggerTitleLogo>
    <div>
      <span>{user?.empresaReal}</span>
      <ReturnLogo empresa={user?.empresaReal} />
    </div>{
        MoraXVendedor &&
     <TitleSecondary2>
      CONSOLIDADO. Período: {MoraXVendedor[0]?.Mes === 1 ? 'Enero' : 
        MoraXVendedor[0]?.Mes === 2 ? 'Febrero' : MoraXVendedor[0]?.Mes === 3 ? 'Marzo' :
        MoraXVendedor[0]?.Mes === 4 ? 'Abril' : MoraXVendedor[0]?.Mes === 5 ? 'Mayo' : 
        MoraXVendedor[0]?.Mes === 6 ? 'Junio' : MoraXVendedor[0]?.Mes === 7 ? 'Julio' :
        MoraXVendedor[0]?.Mes === 8 ? 'Agosto' : MoraXVendedor[0]?.Mes === 9 ? 'Septiembre' : 
        MoraXVendedor[0]?.Mes === 10 ? 'Octubre' : MoraXVendedor[0]?.Mes === 11 ? 'Noviembre' : 
        MoraXVendedor[0]?.Mes === 12 ? 'Diciembre' : ''} {MoraXVendedor[0]?.Anio} {' '} 
         (Incluye cuotas pagadas por Giama). {esVendedor == 1 && Codigo === "todos" ? "Todos los Vendedores" : esVendedor != 1 && Codigo === "todos" ? 
         "Todos los Supervisores" : esVendedor == 1 && Codigo !== "todos" ? "Vendedor: " : "Supervisor: "} 
         {esVendedor == 1 && Codigo == "todos" ? "" : esVendedor == 1 ? Codigo : MoraDetalle.find(e => e.CodSucursal == Codigo)?.NomSucursal}. Capa {Capa}. 
        {" "}{Pagadas == -1 ? "Vencidos" : "Morosos"}. Cant Op: {detalleFiltered.length}.
    </TitleSecondary2> 
    }
    </BiggerTitleLogo>

    <DataGrid
        style={{ fontSize: "10px" }}
        height={650}
        onCellPrepared={onCellPrepared}
        className={styles.dataGrid}
        defaultPaging={false}
        dataSource={detalleFiltered ? detalleFiltered : null}
      >
        <Column dataField="Solicitud" width={70} alignment="center"/>
        <Column dataField="FechaSus" cellRender={renderDate} caption="Fecha Susc." width={70} alignment="center"/>
        <Column dataField="Apellido" caption="Cliente" calculateCellValue={renderGrupoOrden} width={120}/>
        <Column dataField="provincia" caption="Provincia" width={150}/>
        <Column dataField="NomVendedor" caption="Vendedor"/>
        <Column dataField="NomSucursal" caption="Supervisor"/>
        <Column dataField="FechaPrescoring" caption="Fecha Pre Scoring" width={70} cellRender={renderDate} alignment="center"/>
        <Column dataField="NomOficial" caption="Oficial Mora" width={100}/>
        <Column dataField="NomClasificacion" width={110} caption="Clasificacion Mora"/>
        {
            esVendedor == 1 && 
            <Column dataField="entrega_usado" width={50} cellRender={renderEntregaUsado} caption="LL X LL"/>
        }
        <Column  caption="" alignment="center" width={100} cellRender={renderOperacion}/>
      </DataGrid>
    </>
)

}


export default MoraXVYSDetalle