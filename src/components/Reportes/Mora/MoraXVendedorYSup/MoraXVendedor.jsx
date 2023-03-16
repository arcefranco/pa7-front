import React from "react";
import FormReportes from "../../FormReportes"
import BiggerTitleLogo from "../../../../styled-components/containers/BiggerTitleLogo";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import { useSelector } from "react-redux";
import { getMoraXVendedor } from "../../../../reducers/Reportes/MoraXVendedorYSup/MoraSlice";
import DataGrid, {
    Column,
    Summary,
    Scrolling,
    Export,
    TotalItem
  } from "devextreme-react/data-grid";
import styles from './Mora.module.css'

const MoraXVendedor = () => {
    const { user } = useSelector((state) => state.login);
    const { MoraXVendedor } = useSelector((state) => state.MoraXVendedorYSup);
    const renderDate = (data) => {
        return data.text?.slice(0,10).split('-').reverse().join('/')
      }       
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
    return (
        <div>
        <BiggerTitleLogo>
        <div>
          <span>{user?.empresaReal}</span>
          <ReturnLogo empresa={user?.empresaReal} />
        </div>
        <TitlePrimary>
          Mora por Vendedor - {user?.marca && user.marca}
        </TitlePrimary>
      </BiggerTitleLogo>
          <FormReportes dispatchFunc={getMoraXVendedor} oficial={0} todasLasEmpresas={0}/>

          <DataGrid
        style={{ fontSize: "10px" }}
        height={650}
        className={styles.dataGrid}
        onCellPrepared={onCellPrepared}
        columnAutoWidth={true}
        defaultPaging={false}
        dataSource={MoraXVendedor ? MoraXVendedor : null}
      >
        <Column dataField="Vendedor" width={150}/>
        <Column dataField="FechaBaja" cellRender={renderDate}/>
        <Column dataField="Supervisor" width={150}/>
        <Column caption="Cuota 2" alignment="center">
            <Column dataField="V2" caption="V" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="M2" caption="M" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="PER2" caption="%" alignment="center" width={40} cssClass={styles.columnRed}/>
        </Column>
        <Column caption="Cuota 3" alignment="center">
            <Column dataField="V3" caption="V" alignment="center" width={40} cssClass={styles.columnOrange}/>
            <Column dataField="M3" caption="M" alignment="center" width={40} cssClass={styles.columnOrange} />
            <Column dataField="PER3" caption="%" alignment="center" width={40} cssClass={styles.columnOrange} />
        </Column>
        <Column caption="Cuota 4" alignment="center">
            <Column dataField="V4" caption="V" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="M4" caption="M" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="PER4" caption="%" alignment="center" width={40} cssClass={styles.columnYellow}/>
        </Column>
        <Column caption="Cuota 5" alignment="center">
            <Column dataField="V5" caption="V" alignment="center" width={40} cssClass={styles.columnGreen}/>
            <Column dataField="M5" caption="M" alignment="center" width={40} cssClass={styles.columnGreen}/>
            <Column dataField="PER5" caption="%" alignment="center" width={40} cssClass={styles.columnGreen}/>
        </Column>
        <Column caption="Cuota 6" alignment="center">
            <Column dataField="V6" caption="V" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="M6" caption="M" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="PER6" caption="%" alignment="center" width={40} cssClass={styles.columnRed}/>
        </Column>
        <Column caption="Cuota 7" alignment="center">
            <Column dataField="V7" caption="V" alignment="center" width={40} cssClass={styles.columnOrange} />
            <Column dataField="M7" caption="M" alignment="center" width={40} cssClass={styles.columnOrange} />
            <Column dataField="PER7" caption="%" alignment="center" width={40} cssClass={styles.columnOrange} />
        </Column>
        <Column caption="Cuota 8" alignment="center">
            <Column dataField="V8" caption="V" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="M8" caption="M" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="PER8" caption="%" alignment="center" width={40} cssClass={styles.columnYellow}/>
        </Column>
        <Column caption="Cuota 9" alignment="center">
            <Column dataField="V9" caption="V" alignment="center" width={40} cssClass={styles.columnGreen}/>
            <Column dataField="M9" caption="M" alignment="center" width={40} cssClass={styles.columnGreen}/>
            <Column dataField="PER9" caption="%" alignment="center" width={40} cssClass={styles.columnGreen}/>
        </Column>
        <Column caption="Cuota 10" alignment="center">
            <Column dataField="V10" caption="V" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="M10" caption="M" alignment="center" width={40} cssClass={styles.columnRed}/>
            <Column dataField="PER10" caption="%" alignment="center" width={40} cssClass={styles.columnRed}/>
        </Column>
        <Column caption="Cuota 11" alignment="center">
            <Column dataField="V11" caption="V" alignment="center" width={40} cssClass={styles.columnOrange} />
            <Column dataField="M11" caption="M" alignment="center" width={40} cssClass={styles.columnOrange} />
            <Column dataField="PER11" caption="%" alignment="center" width={40} cssClass={styles.columnOrange} />
        </Column>
        <Column caption="Cuota 12" alignment="center">
            <Column dataField="V12" caption="V" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="M12" caption="M" alignment="center" width={40} cssClass={styles.columnYellow}/>
            <Column dataField="PER12" caption="%" alignment="center" width={40} cssClass={styles.columnYellow}/>
        </Column>
        <Summary>
            <TotalItem
            column="V2"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M2"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V3"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M3"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V4"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M4"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V5"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M5"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="V6"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M6"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
                        <TotalItem
            column="V7"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M7"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
                        <TotalItem
            column="V8"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M8"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
                        <TotalItem
            column="V9"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M9"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
                        <TotalItem
            column="V10"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M10"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
                        <TotalItem
            column="V11"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M11"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
                        <TotalItem
            column="V12"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
            <TotalItem
            column="M12"
            summaryType="sum"
            showInGroupFooter={true} 
            displayFormat="{0}"/>
        </Summary>
      </DataGrid>
        </div>
    )
}

export default MoraXVendedor