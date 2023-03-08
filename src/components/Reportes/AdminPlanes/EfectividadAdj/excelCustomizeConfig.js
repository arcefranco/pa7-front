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
