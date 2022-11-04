export const dataSource = { 
    "Name": "DataSource", 
"ConnectionProperties": { 
    "DataProvider": "JSON", 
    "ConnectString": "endpoint=http://localhost:3002/;Header$db-connection=pa7;Header$x-auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI0MSwidXNlciI6ImZyYW5jbyIsImlhdCI6MTY2MzkzNjcxNDQ3MSwiZXhwIjoxNjYzOTM2ODAwODcxfQ.8FmYS27ksb4VB8fn8CiS5J1uHaOWDYawLD6Ih50xHdc;Header$Content-Type=application/json;Header$Accept=*/*" 
} }

export const dataSet = { 
    "Name": "DataSet", 
    "Query": { 
    "DataSourceName": "DataSource", 
    "CommandText": "uri=Reportes/Micro/Zonal;method=POST;body={\\n\"fechaD\": \"20190301\",\\n\"fechaH\": \"20190331\",\\n\"pMes\": 3,\\n\"pAnio\": 2019\\n};jpath=$[*]" }, 
    "Fields": [{ "Name": "t_codigoempresa", "DataField": "t_codigoempresa" }, { "Name": "t_empresa", "DataField": "t_empresa" }, { "Name": "t_codigoGerente", "DataField": "t_codigoGerente" }, { "Name": "t_nombreGerente", "DataField": "t_nombreGerente" }, { "Name": "t_codigoSupervisor", "DataField": "t_codigoSupervisor" }, { "Name": "t_nombreSupervisor", "DataField": "t_nombreSupervisor" }, { "Name": "t_objetivo", "DataField": "t_objetivo" }, { "Name": "t_okCarGroup", "DataField": "t_okCarGroup" }, { "Name": "t_pendienteCarGroup", "DataField": "t_pendienteCarGroup" }, { "Name": "t_ok_Alizze", "DataField": "t_ok_Alizze" }, { "Name": "t_pendiente_Alizze", "DataField": "t_pendiente_Alizze" }, { "Name": "t_ok_Autonet", "DataField": "t_ok_Autonet" }, { "Name": "t_pendiente_Autonet", "DataField": "t_pendiente_Autonet" }, { "Name": "t_ok_Luxcar", "DataField": "t_ok_Luxcar" }, { "Name": "t_pendiente_Luxcar", "DataField": "t_pendiente_Luxcar" }, { "Name": "t_ok_Detroit", "DataField": "t_ok_Detroit" }, { "Name": "t_pendiente_Detroit", "DataField": "t_pendiente_Detroit" }, { "Name": "t_ok_Elysees", "DataField": "t_ok_Elysees" }, { "Name": "t_pendiente_Elysees", "DataField": "t_pendiente_Elysees" }], 
    "Filters": { "Type": "filter", "operator": "and", "items": [] } 
}


export const dataSources = [
    {
        id: "DataSource",
        title: "DataSource",
        template: dataSource,
        canEdit: false,
        datasets: [
            {
                id: "DataSet",
                title: "DataSet",
                template: dataSet,
                canEdit: false,
            },
        ]
    }
]



export const reports = [
    {
        id: "reports/template.rdlx-json",
        displayName: "Customers Table",
    }
];