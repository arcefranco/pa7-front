import React from 'react'
import { useSelector } from 'react-redux'
import '../../../App.css'
import {Viewer, Designer } from '@grapecity/activereports-react'

const ReportTemplate = () => {
    const {reporteZonal} = useSelector(state => state.ReporteZonal)
    async function loadReport() {
        // load report definition from the file
        const reportResponse = await fetch(
          "/template.rdlx-json"
        );
        const report = await reportResponse.json();
        return report;
      }

      const viewerRef = React.useRef();


    React.useEffect(() => {
      async function openReport() {
        const report = await loadReport();
        report.DataSources[0].ConnectionProperties.ConnectString =
          "jsondata=" + JSON.stringify(reporteZonal);
        viewerRef.current.Viewer.open(report);
      }
      openReport();
    }, []);

    return (
      <div id="viewer-host">
        <Viewer ref={viewerRef} />
      </div>
    );
  
}

export default ReportTemplate
