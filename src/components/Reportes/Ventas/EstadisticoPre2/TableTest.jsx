import React, { useState } from "react";
import styles from '../EstadisticoPreSol/PreSol.module.css'
import { useSelector, useDispatch } from "react-redux";
import TitleLogo from "../../../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import ButtonPrimary from "../../../../styled-components/buttons/ButtonPrimary";
import { getPreSol } from "../../../../reducers/Reportes/Ventas/PreSolSlice";
import groupBy from "../../../../helpers/groupBy";
import { useEffect } from "react";
import TableContainer from "../../../../styled-components/tables/TableContainer";
import 'devextreme/dist/css/dx.light.css';
import ODataStore from 'devextreme/data/odata/store';
import Menu, { Item } from 'devextreme-react/menu';
import ColorBox from 'devextreme-react/color-box';

import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Summary,
  TotalItem,
  GroupItem
} from 'devextreme-react/data-grid';


const TableTest = () => {
  const dispatch = useDispatch()
  const { empresaReal, codigoMarca } = useSelector(state => state.login.user)
  const { status, data } = useSelector(state => state.PreSolVentas.preSolSelected)

  const [form, setForm] = useState({
    fechaD: '',
    fechaH: '',
    pMes: '',
    pAnio: '',
    pMarca: codigoMarca
  })

  const handleChange = (e) => {

    const { name, value } = e.target
    let parseValue;
    if (name === 'fechaD' || name === 'fechaH') {
      const newForm = {
        ...form,
        [name]: value,
      }

      setForm(newForm)
    } else {
      parseValue = parseInt(value)
      const newForm = {
        ...form,
        [name]: parseValue,
      }
      setForm(newForm)
    }

  }

  const handleSubmit = () => {
    dispatch(getPreSol(form))
  }

  const calculateSubTot1 = (rowData) => {
    return rowData.C2 + rowData.C4 + rowData.C5 + rowData.C6 + rowData.C7
  }

  const calculateSubTot2 = (rowData) => {
    return rowData.C3 + rowData.C8 + rowData.C9 
  }


  const calculateGB = (rowData) => {
    return rowData.Crucescoring + rowData.Produccion
  }
  
  const renderGridCell = (data) => {
    if (data.value === null) return '0'
    else return data.value
  }






const getProm = (data) => {
    return Math.floor((data.MesAnt + data.MesAnt2 + data.MesAnt3)/3)
}


  const EsMicro = (data) => {
    if (data.displayValue === 0) return 'Equipos Propios'
    else return 'Micro Emprendedores'
  }




  return (
    <>
      <TitleLogo>
        <div>
          <span>{empresaReal}</span>
          <ReturnLogo empresa={empresaReal} />
        </div>
        <TitlePrimary>Estadístico Pre-Sol</TitlePrimary>
      </TitleLogo>
      <div className={styles.selectContainer}>
        <div className={styles.selects}>
          <div className={styles.selectGrid}>
            <div>
              <span>Fecha Desde: </span> <br />
              <input type="date" name="fechaD" value={form.fechaD} onChange={handleChange} />
            </div>
            <div>
              <span>Fecha Hasta: </span> <br />
              <input type="date" name="fechaH" value={form.fechaH} onChange={handleChange} />
            </div>
            <div>
              <span>Mes: </span> <br />
              <select name="pMes" value={form.pMes} onChange={handleChange}>
                <option value="*">---</option>
                <option value={1}>Enero</option>
                <option value={2}>Febrero</option>
                <option value={3}>Marzo</option>
                <option value={4}>Abril</option>
                <option value={5}>Mayo</option>
                <option value={6}>Junio</option>
                <option value={7}>Julio</option>
                <option value={8}>Agosto</option>
                <option value={9}>Septiembre</option>
                <option value={10}>Octubre</option>
                <option value={11}>Noviembre</option>
                <option value={12}>Diciembre</option>
              </select>
            </div>
            <div>
              <span>Año: </span> <br />
              <select name="pAnio" value={form.pAnio} onChange={handleChange}>
                <option value="*">---</option>
                <option value={2019}>2019</option>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
              </select>
            </div>
            <ButtonPrimary onClick={handleSubmit}>Buscar</ButtonPrimary>
          </div>


        </div>

      </div>



      <DataGrid
        dataSource={data ? data : null}
        className={styles.dataGrid}
     
      /*         rowAlternationEnabled={true}
              showBorders={true} */
      /*         onContentReady={this.onContentReady} */
      >
        <GroupPanel />
        <Grouping />
        <Column
          dataField='NombreZona'
          groupIndex={0}
          caption="Zona"
        />
        <Column
          dataField="EsMiniEmprendedor"
          groupIndex={1}
          groupCellRender={EsMicro}
          caption="Es micro"
          dataType="number"
        />
        <Column
          dataField="NomSucursal"
          groupIndex={2}

          caption="Sucursal"
          dataType="string"
        />


        <Column cssClass={styles.title}>

          <Column 
            dataField="NomVendedor"
            caption="Vendedor"
            dataType="date"
            width={100}
          /> 

          <Column
            dataField="FechaAltaVendedor"

            caption="Fecha Alta"
            dataType="date"
            width={75}
          />

          <Column dataField="FechaBajaVendedor" caption="Fecha Baja" dataType="date" width={75} />
          <Column dataField="Ingresadas" caption="Ingresadas" cssClass={styles.columnIng} dataType="number" cellRender={renderGridCell} /* width={85} */ />
          <Column dataField="VentasMP" dataType="number" cellRender={renderGridCell} width={85} />
          <Column dataField="Crucescoring" caption="Cruce Scoring" dataType="number" cellRender={renderGridCell}  /* width={85} */ />
          <Column dataField="Objetivo" dataType="number" cellRender={renderGridCell}  /* width={65} */ />
          <Column dataField="Produccion" dataType="number" cssClass={styles.columnProd} cellRender={renderGridCell}  /* width={85} */ />
        </Column>

        <Column caption='CLASFICACIONES PENDIENTES'  cssClass={styles.title}>
          <Column dataField="C2" caption="2" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C4" caption="4" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C5" caption="5" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C6" caption="6" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C7" caption="7" dataType="number" cellRender={renderGridCell} />
          <Column dataField="SubTotal1" dataType="number" cssClass={styles.columnTot1} calculateCellValue={calculateSubTot1} /* width={55} */ />
          <Column dataField="C3" caption="3" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C8" caption="8" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C9" caption="9" dataType="number" cellRender={renderGridCell} />
          <Column dataField="SubTotal2" dataType="number" cssClass={styles.columnTot2} calculateCellValue={calculateSubTot2} /* width={55} */ />
          <Column dataField="AnuladaTresYSiete" caption="Anul.3+7" dataType="number" /* width={65} */ cellRender={renderGridCell} />
          <Column dataField="AnuladaRechazada" caption="Anul.Rechaz" dataType="number" /* width={75} */ cellRender={renderGridCell} />
        </Column>


        <Column caption='MESES ANTERIORES' cssClass={styles.title}>
          <Column dataField="MesAnt" caption="-1" dataType="number" cellRender={renderGridCell} />
          <Column dataField="MesAnt2" caption="-2" dataType="number" cellRender={renderGridCell} />
          <Column dataField="MesAnt3" caption="-3" dataType="number" cellRender={renderGridCell} />
          <Column dataField="PROM" dataType="number" calculateCellValue={getProm} width={50} />
        </Column>

        <Column  cssClass={styles.title}>
          <Column dataField="GB" dataType="number" calculateCellValue={calculateGB} />
        </Column>


        <Summary>


          <GroupItem
            column="Ingresadas"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="VentasMP"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="Crucescoring"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="Objetivo"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="Produccion"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="C2"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="C3"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="C4"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="C5"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="C6"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="C7"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="SubTotal1"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="8"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="9"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="SubTotal2"
            showInGroupFooter={true}

            /*         name="customSummary1" */


            summaryType="sum"
            displayFormat="{0}"
          />

          <GroupItem
            column="AnuladaTresYSiete"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="AnuladaRechazada"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="MesAnt"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="MesAnt2"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="MesAnt3"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="PROM"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="GB"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

        <TotalItem
            column="Ingresadas"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="VentasMP"
            summaryType="sum"
            displayFormat="{0}"
          />

        <TotalItem
            column="Crucescoring"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="Objetivo"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="Produccion"
            summaryType="sum"
            displayFormat="{0}"
          />

          <TotalItem
            column="C2"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="C3"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="C4"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="C5"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="C6"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="C7"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="SubTotal1"
            summaryType="sum"
            displayFormat="{0}"
          />

          <TotalItem
            column="8"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="9"
            summaryType="sum"
            displayFormat="{0}"
          />
          
          <TotalItem
            column="SubTotal2"
            summaryType="sum"
            displayFormat="{0}"
          />

          <TotalItem
            column="AnuladaTresYSiete"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="AnuladaRechazada"
            summaryType="sum"
            displayFormat="{0}"
          />

          <TotalItem
            column="MesAnt"
            summaryType="sum"
            displayFormat="{0}"
          />

          <TotalItem
            column="MesAnt2"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="MesAnt3"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="PROM"
            summaryType="sum"
            displayFormat="{0}"
          />
          <TotalItem
            column="GB"
            summaryType="sum"
            displayFormat="{0}"
          />
        </Summary>

      </DataGrid>

    </>
  )

}

export default TableTest