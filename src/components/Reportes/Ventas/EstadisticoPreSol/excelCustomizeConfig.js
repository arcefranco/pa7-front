import { saveAs } from "file-saver";
import {Workbook} from 'exceljs'
import { exportDataGrid } from "devextreme/excel_exporter";

const excelCustomizeConfig = (e) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');   
    exportDataGrid({
      
        component: e.component,
        worksheet: worksheet,
        customizeCell: function({excelCell, gridCell}) {
          if(gridCell.rowType === 'groupFooter' || gridCell.rowType === 'totalFooter'){
            excelCell.fill = {
              type: 'pattern',
              pattern:'solid',
              fgColor:{argb:'666363'},
              bgColor:{argb:'666363'}
            }
            excelCell.font = {
              color: { argb: 'ffffff' }
            }
            if ((gridCell.column.dataField !== 'NombreZona'|| gridCell.column.dataField !== 'EsMiniEmprendedor' 
            || gridCell.column.dataField !== 'NomSucursal' || gridCell.column.dataField !== 'NomVendedor' ||
             gridCell.column.dataField !== 'FechaAltaVendedor' ||
             gridCell.column.dataField !== 'FechaBajaVendedor') 
            && !isNaN(parseInt(excelCell.value))) {
 
              excelCell.value = parseInt(gridCell.value); 
            }

          }
          if(gridCell.rowType === 'data' && gridCell.column.dataField === 'Ingresadas'){
            excelCell.fill = {
              type: 'pattern',
              pattern:'solid',
              fgColor:{argb:'a280f0'},
              bgColor:{argb:'ab00ff'}
            };
          }

          if(gridCell.rowType === 'data' && gridCell.column.dataField === 'Produccion'){
            excelCell.fill = {
              type: 'pattern',
              pattern:'solid',
              fgColor:{argb:'95f796'},
              bgColor:{argb:'95f796'}
            };
          }

          if(gridCell.rowType === 'data' && gridCell.column.dataField === 'SubTotal1'){
            excelCell.fill = {
              type: 'pattern',
              pattern:'solid',
              fgColor:{argb:'dff780'},
              bgColor:{argb:'dff780'}
            };
          }
          if(gridCell.rowType === 'data' && gridCell.column.dataField === 'SubTotal2'){
            excelCell.fill = {
              type: 'pattern',
              pattern:'solid',
              fgColor:{argb:'f7c080'},
              bgColor:{argb:'f7c080'}
            };
          }

        } 
    }).then(function() {
        workbook.xlsx.writeBuffer()
            .then(function(buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
            });
    });
    e.cancel = true;


}

export default excelCustomizeConfig