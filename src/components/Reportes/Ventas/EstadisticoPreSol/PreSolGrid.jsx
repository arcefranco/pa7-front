import React, { useState, useEffect } from "react";
import styles from '../EstadisticoPreSol/PreSol.module.css'
import { useSelector, useDispatch } from "react-redux";
import TitleLogo from "../../../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../../../styled-components/h/TitlePrimary";
import { ReturnLogo } from "../../../../helpers/ReturnLogo";
import ButtonPrimary from "../../../../styled-components/buttons/ButtonPrimary";
import { getPreSol } from "../../../../reducers/Reportes/Ventas/PreSolSlice";
import 'devextreme/dist/css/dx.light.css';
import { useNavigate } from "react-router-dom";
import DataGrid, {
  Column,
  Summary,
  TotalItem,
  GroupItem,
  Scrolling
} from 'devextreme-react/data-grid';


const PreSolGrid = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { empresaReal, codigoMarca } = useSelector(state => state.login.user)
  const { status, data } = useSelector(state => state.PreSolVentas.preSolSelected)
  const {fechaD, fechaH, pMarca} = useSelector(state => state.PreSolVentas.paramsDetalles)
  const [supBsAs, setSupBsAs] = useState([])
  const [totalSupervisores, setTotalSupervisores] = useState([])
  const [totalSupervisoresFilter, setTotalSupervisoresFilter] = useState([])
  

  useEffect(() => {
    
    setTotalSupervisores(data?.map(e => e.CodSucursal))
   
  }, [data])
  useEffect(() => {
    setTotalSupervisoresFilter(totalSupervisores?.filter((item,
        index) => totalSupervisores.indexOf(item) === index))
  }, [totalSupervisores])

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

  const renderDate = (data) => {
    return data.text?.slice(0,10).split('-').reverse().join('/')
  }






const getProm = (data) => {
    return Math.floor((data.MesAnt + data.MesAnt2 + data.MesAnt3)/3)
}


  const EsMicro = (data) => {
    if (data.displayValue === 0) return 'Equipos Propios'
    else return 'Micro Emprendedores'
  }

  const onCellPrepared2 = (e) => {
    if (e.rowType === 'totalFooter') {
      e.cellElement.style.backgroundColor = '#4b5866ad' 
    }else if (e.rowType === 'groupFooter'){
      e.cellElement.style.backgroundColor = '#4b586678' 
    }
    }

  const helperOnCellPreprared = (e, url) => {
    console.log('aca')
      let arr = [];
      if(e.row.data.items[0].hasOwnProperty('key')){
        e.row.data.items.map(e => {
          if(e.hasOwnProperty('collapsedItems')){
            arr = [...arr, arr.concat(e.collapsedItems[0].CodSucursal)]
          }else{
            arr = [...arr, arr.concat(e.items[0].CodSucursal)]
          }
        })
        arr = arr.flat(1).filter(e => typeof e === 'number')
          navigate(`/reportes/preSol/${url}/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${arr}]`)  

        }else{
          navigate(`/reportes/preSol/${url}/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${e.row.data.items[0].CodSucursal}]`)
        }
    }

  const helperOnCellGroup = (e, url) => {
   
    let arr = [];
    e.row.data.items.map(e => {
      if(e.hasOwnProperty('collapsedItems')){
        arr = [...arr, arr.concat(e.collapsedItems)]
      }else{
        arr = [...arr, arr.concat(e.items)]
        
      }
    })
    arr = arr.flat(1).map(e => !Array.isArray(e) ? e.items[0].CodSucursal : e[0].items[0].CodSucursal)
    arr = [...new Set(arr)]
    navigate(`/reportes/preSol/${url}/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${arr}]`)  
  }
    

  const onCellPrepared = (e) => {

  
  if(e.rowType === 'groupFooter' && e.column.dataField === 'Ingresadas' && e.key.length > 1){

    helperOnCellPreprared(e,'ingresadas') 

  } else if(e.rowType === 'groupFooter' && e.column.dataField === 'Ingresadas'){
    helperOnCellGroup(e, 'ingresadas')
  }
  
  else if (e.rowType === 'totalFooter' && e.column.dataField === 'Ingresadas'){
    navigate(`/reportes/preSol/ingresadas/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)
  
  }else if (e.rowType === 'groupFooter' && e.column.dataField === 'VentasMP' && e.key.length > 1){
    helperOnCellPreprared(e, 'MP')

  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'VentasMP'){
    helperOnCellGroup(e, 'MP')
   
  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'VentasMP'){
    navigate(`/reportes/preSol/MP/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)
  
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'Crucescoring'  && e.key.length > 1){
    helperOnCellPreprared(e, 'cruceScoring')

  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'Crucescoring'){
    helperOnCellGroup(e, 'cruceScoring')

  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'Crucescoring'){

    navigate(`/reportes/preSol/cruceScoring/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'Produccion'  && e.key.length > 1){

    helperOnCellPreprared(e, 'Produccion')
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'Produccion'){

    helperOnCellGroup(e, 'Produccion')

  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'Produccion'){

    navigate(`/reportes/preSol/Produccion/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)

  }else if(e.rowType === 'groupFooter' && (e.column.dataField === 'SubTotal1' || e.column.dataField === 'SubTotal2' )  && e.key.length > 1){

    helperOnCellPreprared(e, 'Pendientes')
  }else if(e.rowType === 'groupFooter' && (e.column.dataField === 'SubTotal1' || e.column.dataField === 'SubTotal2' )){

    helperOnCellGroup(e, 'Pendientes')

  }else if (e.rowType === 'totalFooter' && (e.column.dataField === 'SubTotal1' || e.column.dataField === 'SubTotal2' )){

    navigate(`/reportes/preSol/Pendientes/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)

  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'AnuladaTresYSiete'  && e.key.length > 1){

    helperOnCellPreprared(e, 'TresYSiete')
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'AnuladaTresYSiete'){

    helperOnCellGroup(e, 'TresYSiete')

  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'AnuladaTresYSiete'){

    navigate(`/reportes/preSol/TresYSiete/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)

  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'AnuladaRechazada'  && e.key.length > 1){

    helperOnCellPreprared(e, 'anulRechaz')
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'AnuladaRechazada'){

    helperOnCellGroup(e, 'anulRechaz')

  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'AnuladaRechazada'){

    navigate(`/reportes/preSol/anulRechaz/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)

  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'GB'  && e.key.length > 1){

    helperOnCellPreprared(e, 'ProdYCS')
  }else if(e.rowType === 'groupFooter' && e.column.dataField === 'GB'){

    helperOnCellGroup(e, 'ProdYCS')

  }else if (e.rowType === 'totalFooter' && e.column.dataField === 'GB'){

    navigate(`/reportes/preSol/ProdYCS/${fechaD.split('-').join("")}/${fechaH.split('-').join("")}/${codigoMarca}/[${totalSupervisoresFilter}]`)

  }

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
            <ButtonPrimary onClick={handleSubmit}>Ver</ButtonPrimary>
          </div>


        </div>

      </div>



      <DataGrid
        dataSource={data ? data : null}
        className={styles.dataGrid}
        style={{fontSize: '10px'}}
        paging={false}
        onCellClick={onCellPrepared}
        onCellPrepared={onCellPrepared2}
        
        >

        <Scrolling useNative={false} scrollByContent={true} mode="standard" />
          
        <Column
          dataField='NombreZona'
          visible={false}
          defaultVisible={false}        
          groupIndex={0}
          caption="Zona"
        />
        <Column
          dataField="EsMiniEmprendedor"
          groupIndex={1}
          visible={false}
          defaultVisible={false}
          groupCellRender={EsMicro}
          caption="Es micro"
          dataType="number"
        />
        <Column
          dataField="NomSucursal"
          groupIndex={2}
          visible={false}
          defaultVisible={false}

          caption="Supervisor"
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
            cellRender={renderDate}
            caption="Fecha Alta"
            dataType="string"
            width={75}
          />

          <Column dataField="FechaBajaVendedor" caption="Fecha Baja" dataType="string" cellRender={renderDate} width={75} />
          <Column dataField="Ingresadas" caption="Ingresadas" cssClass={styles.columnIng} dataType="number" cellRender={renderGridCell}/>
          <Column dataField="VentasMP" dataType="number" cellRender={renderGridCell} width={85} />
          <Column dataField="Crucescoring" caption="Cruce Scoring" dataType="number" cellRender={renderGridCell} />
          <Column dataField="Objetivo" dataType="number" cellRender={renderGridCell}   />
          <Column dataField="Produccion" dataType="number" cssClass={styles.columnProd} cellRender={renderGridCell}/>
        </Column>

        <Column caption='CLASFICACIONES PENDIENTES'  cssClass={styles.title}>
          <Column dataField="C2" caption="2" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C4" caption="4" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C5" caption="5" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C6" caption="6" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C7" caption="7" dataType="number" cellRender={renderGridCell} />
          <Column dataField="SubTotal1" dataType="number" cssClass={styles.columnTot1} calculateCellValue={calculateSubTot1} />
          <Column dataField="C3" caption="3" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C8" caption="8" dataType="number" cellRender={renderGridCell} />
          <Column dataField="C9" caption="9" dataType="number" cellRender={renderGridCell} />
          <Column dataField="SubTotal2" dataType="number" cssClass={styles.columnTot2} calculateCellValue={calculateSubTot2}/>
          <Column dataField="AnuladaTresYSiete" caption="Anul.3+7" dataType="number"  cellRender={renderGridCell} />
          <Column dataField="AnuladaRechazada" caption="Anul.Rechaz" dataType="number" cellRender={renderGridCell} />
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



        <Summary >

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

export default PreSolGrid