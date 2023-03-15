import { saveAs } from "file-saver";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";

const excelCustomizeConfig = (e) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Main sheet");
  exportDataGrid({
    component: e.component,
    worksheet: worksheet,
    customizeCell: function ({ excelCell, gridCell }) {
      console.log("gridCell: ", gridCell, "excelCell: ", excelCell);
      if (
        gridCell.rowType === "data" &&
        gridCell.column.dataField === "Total"
      ) {
        excelCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "a280f0" },
          bgColor: { argb: "ab00ff" },
        };
      }

      if (
        gridCell.rowType === "group" &&
        gridCell.column.dataField === "Tipo"
      ) {
        excelCell.value = "";
      }

      if (
        gridCell.column.name === "FechaAdj" ||
        gridCell.column.name === "FechaSus" ||
        gridCell.column.name === "FechaAgrup" ||
        gridCell.column.name === "FechaPedido" ||
        gridCell.column.name === "FechaAceptacionPedido"
      ) {
        excelCell.value = excelCell.value
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/");
      }

      if (gridCell.column.name === "tipoplan") {
        if (excelCell.value === 1) {
          excelCell.value = "100%";
        }
        if (excelCell.value === 2) {
          excelCell.value = "70/30";
        }
        if (excelCell.value === 3) {
          excelCell.value = "60/40";
        }
        if (excelCell.value === 5) {
          excelCell.value = "80/20";
        }
      }
    },
  }).then(function () {
    workbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        "Reporte_ADJ.xlsx"
      );
    });
  });
  e.cancel = true;
};

export default excelCustomizeConfig;
