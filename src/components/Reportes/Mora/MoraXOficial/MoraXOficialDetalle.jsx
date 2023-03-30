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
import styles from '../MoraXVendedorYSup/Mora.module.css'
import isOdd from "../../../../helpers/isOdd";
const MoraXOficialDetalle = () => {
const { user } = useSelector((state) => state.login);
const {MoraXOficialDetalle, mes, anio} = useSelector((state) => state.MoraXOficial);
const {esVendedor ,Codigo, Capa, Pagadas} = useParams()
const [detalleFiltered, setDetalleFiltered] = useState([])

useEffect(() => {
    if(Pagadas == -1){ //VENCIDOS

            if(Codigo === "todos"){
                setDetalleFiltered(MoraXOficialDetalle.filter(e => e.Capa == Capa))
            }else{
                setDetalleFiltered(MoraXOficialDetalle.filter(e => e.NomOficial == Codigo && e.Capa == Capa))
            }
        

    }else if(Pagadas == 1){ //MOROSOS

   
            if(Codigo === "todos"){
                setDetalleFiltered(MoraXOficialDetalle.filter(e =>  e.Capa == Capa && e.Pagada == 0))
            }else{
                console.log(MoraXOficialDetalle.filter(e => e.NomOficial == Codigo && e.Capa == Capa && e.Pagada == 0))
                setDetalleFiltered(MoraXOficialDetalle.filter(e => e.NomOficial == Codigo && e.Capa == Capa && e.Pagada == 0))
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
    </div>
     <TitleSecondary2>
      CONSOLIDADO. Período: {mes === 1 ? 'Enero' : 
        mes === 2 ? 'Febrero' : mes === 3 ? 'Marzo' :
        mes === 4 ? 'Abril' : mes === 5 ? 'Mayo' : 
        mes === 6 ? 'Junio' : mes === 7 ? 'Julio' :
        mes === 8 ? 'Agosto' : mes === 9 ? 'Septiembre' : 
        mes === 10 ? 'Octubre' : mes === 11 ? 'Noviembre' : 
        mes === 12 ? 'Diciembre' : ''} {anio} {' '} 
         (Incluye cuotas pagadas por Giama). {Codigo == "todos" ? "Todos los Oficiales" : "Oficial: " }
         {Codigo == "todos" ? "" : Codigo}. Capa {Capa}. 
        {" "}{Pagadas == -1 ? "Vencidos" : "Morosos"}. Cant Op: {detalleFiltered.length}.
    </TitleSecondary2> 
    </BiggerTitleLogo>

    <DataGrid
        style={{ fontSize: "10px" }}
        height={650}
        onCellPrepared={onCellPrepared}
        className={styles.dataGrid}
        defaultPaging={false}
        dataSource={detalleFiltered ? detalleFiltered : null}
      >
        <Export enabled={true} formats={["xlsx"]} allowExportSelectedData={false} />
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


export default MoraXOficialDetalle