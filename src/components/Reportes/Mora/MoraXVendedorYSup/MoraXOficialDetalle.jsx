import React, {useState, useEffect} from "react"
import BiggerTitleLogo from "../../../../styled-components/containers/BiggerTitleLogo";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import { useParams } from "react-router-dom";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import DataGrid, {
    Column,
    Summary,
    Scrolling,
    Export,
    TotalItem
} from "devextreme-react/data-grid";
import { useSelector } from "react-redux";
import styles from './Mora.module.css'
const MoraXOficialDetalle = () => {
const { user } = useSelector((state) => state.login);
const { MoraXVendedor, MoraDetalle, isLoading } = useSelector((state) => state.MoraXVendedorYSup);
const {esVendedor ,Codigo, Capa, Pagadas} = useParams()
const [detalleFiltered, setDetalleFiltered] = useState([])

useEffect(() => {
    if(Pagadas == -1){
        if(esVendedor == 1){
            setDetalleFiltered(MoraDetalle.filter(e => e.NomVendedor == Codigo && e.Capa == Capa))
        }else{
            
            setDetalleFiltered(MoraDetalle.filter(e => e.CodSucursal == Codigo && e.Capa == Capa))
        }
    }else if(Pagadas == 1){

        if(esVendedor == 1){
            setDetalleFiltered(MoraDetalle.filter(e => e.NomVendedor == Codigo && e.Capa == Capa && e.Pagada == 0))
        }else{

            setDetalleFiltered(MoraDetalle.filter(e => e.CodSucursal == Codigo && e.Capa == Capa && e.Pagada == 0))
        }
    }
}, [])
const renderDate = (data) => {
    return data.text?.slice(0,10).split('-').reverse().join('/')
  }

const renderGrupoOrden = (e) => {
    return e.Apellido + ", " + e.Nombres 
}
return (
    <>
    <BiggerTitleLogo>
    <div>
      <span>{user?.empresaReal}</span>
      <ReturnLogo empresa={user?.empresaReal} />
    </div>
    <TitlePrimary>
      CONSOLIDADO. Período: {MoraXVendedor[0]?.Mes === 1 ? 'Enero' : 
        MoraXVendedor[0]?.Mes === 2 ? 'Febrero' : MoraXVendedor[0]?.Mes === 3 ? 'Marzo' :
        MoraXVendedor[0]?.Mes === 4 ? 'Abril' : MoraXVendedor[0]?.Mes === 5 ? 'Mayo' : 
        MoraXVendedor[0]?.Mes === 6 ? 'Junio' : MoraXVendedor[0]?.Mes === 7 ? 'Julio' :
        MoraXVendedor[0]?.Mes === 8 ? 'Agosto' : MoraXVendedor[0]?.Mes === 9 ? 'Septiembre' : 
        MoraXVendedor[0]?.Mes === 10 ? 'Octubre' : MoraXVendedor[0]?.Mes === 11 ? 'Noviembre' : 
        MoraXVendedor[0]?.Mes === 12 ? 'Diciembre' : ''} {MoraXVendedor[0]?.Anio} {' '} 
         (Incluye cuotas pagadas por Giama). {esVendedor == 1 ? "Vendedor: " : "Supervisor: "} 
         {esVendedor == 1 ? Codigo : MoraDetalle.find(e => e.CodSucursal == Codigo)?.NomSucursal}. Capa {Capa}. {Pagadas == -1 ? "Vencidos" : "Morosos"}. Cant Op: {detalleFiltered.length}.
    </TitlePrimary>
    </BiggerTitleLogo>

    <DataGrid
        style={{ fontSize: "10px" }}
        height={650}
        className={styles.dataGrid}
        columnAutoWidth={true}
        defaultPaging={false}
        dataSource={detalleFiltered ? detalleFiltered : null}
      >
        <Column dataField="Solicitud" alignment="center"/>
        <Column dataField="FechaSus" cellRender={renderDate} caption="Fecha Susc." alignment="center"/>
        <Column dataField="Apellido" caption="Cliente" calculateCellValue={renderGrupoOrden}/>
        <Column dataField="provincia" caption="Provincia"/>
        <Column dataField="NomVendedor" caption="Vendedor"/>
        <Column dataField="NomSucursal" caption="Codigo"/>
        <Column dataField="FechaPrescoring" caption="Fecha Pre Scoring" cellRender={renderDate} alignment="center"/>
        <Column dataField="NomOficial" caption="Oficial Mora"/>
        <Column dataField="NomClasificacion" caption="Clasificacion Mora"/>
      </DataGrid>
    </>
)

}


export default MoraXOficialDetalle