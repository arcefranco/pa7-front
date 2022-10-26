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

  const suma = () => {
    return 10 + 7;
  }
  const [columns] = useState([
    { name: 'NomVendedor', title: 'Vendedor' },
    { name: 'gender', title: 'Gender' },
    { name: 'EsMiniEmprendedor', title: 'Tipo Equipo' },
    { name: 'car', title: 'Car' },
  ]);


  const getChildGroups = groups => groups
    .map(group => ({ key: group.key, childRows: group.items }));

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

          caption="Es micro"
          dataType="number"
        />
        <Column
          dataField="NomSucursal"
          groupIndex={2}
          caption="Sucursal"
          dataType="string"
        />
        <Column
          dataField="NomVendedor"
          caption="Vendedor"
          dataType="date"
        />

        <Column
          dataField="FechaAltaVendedor"
          caption="Fecha Alta"
          dataType="date"
        />
        <Column dataField="FechaBajaVendedor" caption="Fecha Baja" dataType="date" />
        <Column dataField="Ingresadas" caption="Ingresadas" dataType="number" />
        <Column dataField="VentasMP" dataType="number" />
        <Column dataField="Objetivo" dataType="number" />
        <Column dataField="Produccion" dataType="number" />
        <Column dataField="C2" dataType="number" />
        <Column dataField="C3" dataType="number" />
        <Column dataField="C4" dataType="number" />
        <Column dataField="C5" dataType="number" />
        <Column dataField="C6" dataType="number" />
        <Column dataField="C7" dataType="number" />

        <Column dataField="SubTotal" dataType="number" />
        <Column dataField="3" dataType="number" />
        <Column dataField="8" dataType="number" />
        <Column dataField="9" dataType="number" />
        <Column dataField="Anul.3+7" dataType="number" />
        <Column dataField="Anul.Rechaz" dataType="number" />
        <Column dataField="-1" dataType="number" />
        <Column dataField="-2" dataType="number" />
        <Column dataField="-3" dataType="number" />
        <Column dataField="PROM" dataType="number" />
        <Column dataField="GB" dataType="number" />
        
        <Summary>
          <GroupItem
            column="FechaBajaVendedor"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
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
            column="SubTotal"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="3"
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
            column="Anul.3+7"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="Anul.Rechaz"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="-1"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />

          <GroupItem
            column="-2"
            summaryType="sum"
            showInGroupFooter={true}
            displayFormat="{0}"
          />
          <GroupItem
            column="-3"
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
            column="GB"
            summaryType="count" />
        </Summary>

      </DataGrid>


    </>
  )

}

export default TableTest