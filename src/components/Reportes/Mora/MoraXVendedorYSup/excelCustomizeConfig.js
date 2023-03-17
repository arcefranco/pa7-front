import { saveAs } from "file-saver";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";

const excelCustomizeConfig = (e, mes, anio) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Main sheet");
  exportDataGrid({
    component: e.component,
    worksheet: worksheet,
    customizeCell: function ({ excelCell, gridCell }) {
      if (
        gridCell.rowType === "groupFooter" ||
        gridCell.rowType === "totalFooter"
      ) {
        excelCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "666363" },
          bgColor: { argb: "666363" },
        };
        excelCell.font = {
          color: { argb: "ffffff" },
        };
      }
      if (
        gridCell.rowType === "data" &&
        (gridCell.column.dataField === "V2" ||
          gridCell.column.dataField === "M2" ||
          gridCell.column.dataField === "PER2" ||
          gridCell.column.dataField === "V6" ||
          gridCell.column.dataField === "M6" ||
          gridCell.column.dataField === "PER6" ||
          gridCell.column.dataField === "V10" ||
          gridCell.column.dataField === "M10" ||
          gridCell.column.dataField === "PER10")
      ) {
        excelCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "a280f0" },
          bgColor: { argb: "#ff0000" },
        };
      }

      if (
        gridCell.rowType === "data" &&
        (gridCell.column.dataField === "V3" ||
          gridCell.column.dataField === "M3" ||
          gridCell.column.dataField === "PER3" ||
          gridCell.column.dataField === "V7" ||
          gridCell.column.dataField === "M7" ||
          gridCell.column.dataField === "PER7" ||
          gridCell.column.dataField === "V11" ||
          gridCell.column.dataField === "M11" ||
          gridCell.column.dataField === "PER11")
      ) {
        excelCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "f7c080" },
          bgColor: { argb: "f7c080" },
        };
      }

      if (
        gridCell.rowType === "data" &&
        (gridCell.column.dataField === "V4" ||
          gridCell.column.dataField === "M4" ||
          gridCell.column.dataField === "PER4" ||
          gridCell.column.dataField === "V8" ||
          gridCell.column.dataField === "M8" ||
          gridCell.column.dataField === "PER8" ||
          gridCell.column.dataField === "V12" ||
          gridCell.column.dataField === "M12" ||
          gridCell.column.dataField === "PER12")
      ) {
        excelCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "dff780" },
          bgColor: { argb: "dff780" },
        };
      }
      if (
        gridCell.rowType === "data" &&
        (gridCell.column.dataField === "V5" ||
          gridCell.column.dataField === "M5" ||
          gridCell.column.dataField === "PER5" ||
          gridCell.column.dataField === "V9" ||
          gridCell.column.dataField === "M9" ||
          gridCell.column.dataField === "PER9")
      ) {
        excelCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "95f796" },
          bgColor: { argb: "95f796" },
        };
      }
    },
  }).then(function () {
    workbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `Mora_por_Vendedor_${mes}_${anio}.xlsx`
      );
    });
  });
  e.cancel = true;
};

export default excelCustomizeConfig;
