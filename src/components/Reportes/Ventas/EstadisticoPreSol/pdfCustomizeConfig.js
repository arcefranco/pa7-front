import { exportDataGrid } from "devextreme/excel_exporter";
import jsPDF from "jspdf";

const pdfCustomizeConfig = (e, fechaD, fechaH) => {
    
    const doc = new jsPDF('landscape');
    exportDataGrid({
      jsPDFDocument: doc,
    
      columnWidths: [38, 16, 16, 9, 9, 9, 9, 9, 8,8,8,8,8,8,8,8,8,8,8,10,10,10,10,11,9],
      component: e.component,
      margin: 5,
      customizeCell: function({gridCell, pdfCell}) {
    
    
        if(gridCell.rowType === 'header'){
          
          pdfCell.font = {  size: 7 };
          if(pdfCell.text === 'Objetivo'){
            pdfCell.text = 'Obj.'
          }if(pdfCell.text === 'Cruce Scoring'){
            pdfCell.text = 'CSC'
          }if(pdfCell.text === 'Producción'){
            pdfCell.text = 'Prod.'
          }if(pdfCell.text === 'Ingresadas'){
            pdfCell.text = 'ING.'
          }if(pdfCell.text === 'Ventas MP'){
            pdfCell.text = 'MP.'
          }if(pdfCell.text === 'Ingresadas'){
            pdfCell.text = 'ING.'
          }if(pdfCell.text === 'Sub Total 1' || pdfCell.text === 'Sub Total 2'){
            pdfCell.text = 'SBT'
          }if(pdfCell.text === 'Anul.3+7'){
            pdfCell.text = '3+7'
          }if(pdfCell.text === 'Anul.Rechaz'){
            pdfCell.text = 'Rechz'
          }
        
        }else if(gridCell.rowType === 'groupFooter'){
          pdfCell.backgroundColor = '#808080'
          pdfCell.textColor = '#ffffff'
        }else if(gridCell.rowType === 'totalFooter'){
          pdfCell.backgroundColor = '#4b586678'
          pdfCell.textColor = '#ffffff'
        }else{
          pdfCell.font = {  size: 7 };
        }
    
        if(gridCell.rowType === 'data'){
          if(gridCell.column.dataField === 'Ingresadas'){
            pdfCell.backgroundColor = '#BF40BF'
            pdfCell.textColor = '#ffffff'
          }
          if(gridCell.column.dataField === 'Produccion'){
            pdfCell.backgroundColor = '#097969'
            pdfCell.textColor = '#ffffff'
          }
          if(gridCell.column.dataField === 'SubTotal1'){
            pdfCell.backgroundColor = '#FDDA0D'
            pdfCell.textColor = '#ffffff'
          }
          if(gridCell.column.dataField === 'SubTotal2'){
            pdfCell.backgroundColor = '#F28C28'
            pdfCell.textColor = '#ffffff'
          }
        }
        
    } ,
    
      indent: 0,
    
    }).then(() => {
      doc.save(`Reporte_PreSol_${fechaD}_${fechaH}.pdf`);
    });
}

export default pdfCustomizeConfig