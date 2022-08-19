import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
export const SidebarData = [
  {
    title: 'Operaciones',
    icon: <AiIcons.AiFillHome />,

    cName: 'nav-text',
    options: 
    [
      {title: 'Altas Pre Solicitudes', rol:'1.2.1'},
      {title: 'Actualizaciones Pre Solicitudes', rol:'1.2.2'},
      {title: 'Actualizacion Operaciones', rol:'1.2.3'},
      {title: 'Alta Cartera', rol:'1.2.4'},
      {title: 'AAPE', rol:'1.2.5'},
      {title: 'Scoring', rol:'1.2.6', 
          options: [
          {title:'Scoring', rol: '1.2.6.1'},
          {title:'Consultar Cotizador', rol: '1.2.6.4'},
          {title:'Scoring Avanzado', rol: '1.2.6.3'},
          ]},
      {title: 'Conciliacion Tarjetas', rol:'1.2.7'},
      {title: 'Reporte Personalizado', rol:'1.2.8'},
      {title: 'Excel Datos', rol:'1.2.9'},
      {title: 'Buscar Operaciones', rol:'1.2.10'},
      {title: 'Importaciones', rol:'1.2.11', 
          options:[
          {title: 'Agrupamientos', rol: '1.2.11.1'},
          {title: 'Cambios de Concesionaria', rol: '1.2.11.5'},
          {title: 'Fecha Arribo Unidad y Doc', rol: '1.2.11.7'},
          {title: 'Obvservaciones Acto Adj', rol: '1.2.11.9'},
          {title: 'Comision Vendedores', rol: '1.2.11.4'},
          {title: 'Adjudicaciones', rol: '1.2.11.3'},
          {title: 'Fecha Ingreso Regreso Gestoria', rol: '1.2.11.8'},
          {title: 'Cuotas Encuadre', rol: '1.2.11.1'}, /**ROL A REVISAR */ 
          {title: 'Rescindidos', rol: '1.2.11.2'},
          {title: 'Cuotas', rol: '1.2.11.6'},
          {title: 'Adjudicaciones Vencidas', rol: '1.2.11.1'},
          ]},
      {title: 'Control de solicitudes', rol:'1.2.12'},
      {title: 'Control de Recibos', rol:'1.2.13'},
      {title: 'Control Transferencias', rol:'1.2.14'},
      {title: 'Impresion Recibos', rol:'1.2.15'},
      {title: 'Reclamos', rol:'1.2.16'},
      {title: 'Licitaciones', rol:'1.2.17',
          options: [
            {title: 'Licitaciones', rol:'1.2.17.1'},
            {title: 'Condiciones de Licitar', rol:'1.2.17.2'},
            {title: 'Interesados en Licitar', rol:'1.2.17.1'}, /*ROL A REVISAR*/
            {title: 'Llave x llave', rol:'1.2.17.3'},
            {title: 'Reintegro de Licitaciones', rol:'1.2.17.3'}, 
          ]},
      {title: 'Rep Micro Emprendedores', rol:'1.2.20'},
      {title: 'Reportes', rol:'1.2.21'},
      {title: 'Agrupamientos', rol:'1.2.22'},
    
    ]
  },
  {
    title: 'Mora',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Cuotas Encuadre', rol:'1.4.1'},
      {title: 'Recupero cuotas encuadre', rol:'1.4.2'},
      {title: 'Pagos y recuperos encuadre', rol:'1.4.3'},
      {title: 'Cuadro Performance', rol:'1.4.4'},
      {title: 'Asignacion De Mora', rol:'1.4.5', 
          options: [
            {title: 'Mora temprana', rol: '1.4.5'} /**ROL A REVISAR */
          ]},
      {title: 'Mora Tecnica', rol:'1.4.6'},
      {title: 'Gestion Mora Temprana', rol:'1.4.7'},
      {title: 'Gestion Mora Especializada', rol:'1.4.8'},
      {title: 'Cola De Llamados Mora Temprana', rol:'1.4.9'},
      {title: 'Cola De Llamados Mora Especializada', rol:'1.4.10'},
      {title: 'Supervisor Mora', rol:'1.4.11'},
      {title: 'Ver Toda La Mora', rol:'1.4.12'},
      
      
    ], 
  },

  {
    title: 'Call Center',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    options: [
      {title: 'Definicion Campana Mails', rol:'1.5.1'},
      {title: 'Definicion Campana SMS', rol:'1.5.2'}, 
      {title: 'Generacion Bases Neotel', rol:'1.5.3'}, 
      {title: 'Envio y Recepcion de Mails', rol:'1.5.4'}, 
      {title: 'Envio y Recepcion de SMS', rol:'1.5.5'}, 
      {title: 'Definicion Fecha Vto Agendado Camapana', rol:'1.5.6'}, 
      {title: 'Administracion Mails Enviados Y Recibidos', rol:'1.5.7'}, 
      {title: 'Administracion SMS Enviados Y Recibidos Encuadre', rol:'1.5.8'}, 
  ],
  },
  {
    title: 'Personal',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    options: [
      {title: 'Legajos', rol:'1.6.1', unique:true},
      {title: 'Reportes', rol:'1.6.2', unique:true}, 
      {title: 'Importacion Sueldos', rol:'1.6.3', unique:true}, 
      {title: 'Generacion TXT Acreditacion Haberes', rol:'1.6.4', unique:true}, 
    ]

  },
  {
    title: 'Mesa de Planes',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Admin Ahorristas Adjudicados', rol:'1.3.1'},
      {title: 'Scoring', rol:'1.3.2'},
      {title: 'Haberes Netos', rol:'1.3.3'},
      {title: 'Gestion de Señas Anuladas', rol:'1.3.5'},
  
      {title: 'Autorizador Clasificaciones', rol:'1.3.6'},
      {title: 'Stock Contable', rol:'1.3.7'},
      {title: 'Stock Para Ventas', rol:'1.3.8'},
    ]
  },
  {
    title: 'Configuracion de Datos Generales',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Vendedores', rol:'1.7.1'},
      {title: 'Supervisores', rol:'1.7.2'},
      {title: 'Sucursales', rol:'1.7.3'},
      {title: 'Cambio Modelo', rol:'1.7.4'},
      {title: 'Cambio De Contraseña Sueldos', rol:'1.7.5'},
      {title: 'Modelos', rol:'1.7.6'},
      {title: 'Lista de Precios', rol:'1.7.7'},
      {title: 'Datos Oficiales', rol:'1.7.8'},
      {title: 'Puntos de Venta', rol:'1.7.9'},
      {title: 'Cambio de Contraseña', rol:'1.7.10'},
      {title: 'Objetivos X Marca', rol:'1.7.11'},
      {title: 'Objetivos Mora', rol:'1.7.12'},
      {title: 'Objetivos X Grupo Mora', rol:'1.7.13'},
      {title: 'Objetivos Altas Bajas Mesa de Planes', rol:'1.7.14'},
      {title: 'Parametros', rol:'1.7.15'},
      {title: 'Usuarios', rol:'1.7.16',
        options: [
            {title: 'Administracion de Permisos', rol: '1.7.16.1', unique:true},
            {title: 'Alta y Modificacion de Roles', rol: '1.7.16.2'},
            {title: 'Alta y Modificacion de Usuarios', rol: '1.7.16.3', path: '/usuarios'},
       ]},
      {title: 'ABM Intereses', rol:'1.7.17'},
      {title: 'Gerentes', rol:'1.7.18', path:'/gerentes'},
      {title: 'Team Leader', rol:'1.7.19'},
      {title: 'Estructura Comercial', rol:'1.7.20'},
      {title: 'Entrega Asegurada', rol:'1.7.21'},
    
    ]
  },
  {
    title: 'Contabilidad',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Tesoreria', rol:'1.8.1',
        options: [
          {title: 'Pagos', rol:'1.8.1.1'},
          {title: 'Cobranzas', rol:'1.8.1.2', 
            options:[
              {title:'Cobranza ed Facturas Giama', rol: '1.8.1.3'}
              ]
            }
        ]},
      {title: 'Ventas', rol:'1.8.2', 
        options:[
          {title: 'Importacion Facturas B', rol: '1.8.2.1'},
          {title: 'Conformacion Contable', rol: '1.8.2.2'},
          {title: 'Clientes Facturacion', rol: '1.8.4.7', 
            options: [
              {title: 'Administracion de Clientes', rol: '1.8.4.7.1'},
              {title: 'Medios de Pago', rol: '1.8.4.7.2'},
              {title: 'Composicion de Saldos', rol: '1.8.4.7.4'},
              {title: 'Importacion de Clientes', rol: '1.8.4.7.1'}, /*ROL A REVISAR */
              {title: 'Cuenta Corriente', rol: '1.8.4.7.3'},
              {title: 'Ver Recibos', rol: '1.8.4.7.5'},
            ]},
          {title: 'Facturacion', rol: '1.8.2.3', 
            options: [
              {title: 'Carga Cuotas', rol: '1.8.2.3.1'},
              {title: 'Contabilizacion de facturas', rol: '1.8.2.3.2'},
              {title: 'Calculo de Margen', rol: '1.8.2.3.3'},
              {title: 'Generacion de Conceptos por Op', rol: '1.8.2.3.7'},
              {title: 'Conciliacion de Conceptos a Facturar', rol: '1.8.2.3.5'},
              {title: 'Conciliacion Individual de Conceptos', rol: '1.8.2.3.6'},
              {title: 'Conceptos de Facturas Manuales', rol: '1.8.2.3.4'},
              {title: 'Listas Comisiones', rol: '1.8.2.3.8'},
              {title: 'Conceptos Facturacion', rol: '1.8.2.3.9'},
              {title: 'Facturacion Electronica', rol: '1.8.2.3.10'},
            ]},
          {title: 'Op Pendientes de Conformacion Ctable', rol: '1.8.2.4'},
      ]},
      {title: 'Bancos', rol:'1.8.3', 
        options: [
              {title: 'Valores a Depositar', rol: '1.8.3.1'},
              {title: 'Administracion de Chequeras', rol: '1.8.3.2'},
          ]},
          
          
      {title: 'Contabilidad General', rol:'1.8.4', 
        options:[
          {title: 'Plan de Cuentas', rol: '1.8.4.1'},
          {title: 'Consultas', rol: '1.8.4.2', 
            options:[
              {title: 'Libro Mayor', rol: '1.8.4.2.1'},
              {title: 'Balance de Sumas y Saldos', rol: '1.8.4.2.2'},
              {title: 'Retenciones', rol: '1.8.4.2.6'},
              {title: 'Percepciones', rol: '1.8.4.2.7'},
              {title: 'Libro Diario', rol: '1.8.4.2.3'},
              {title: 'Informes de Compras y Ventas', rol: '1.8.4.2.4'},
              {title: 'Tarjetas de Credito', rol: '1.8.4.2.5'},
            ]},
          {title: 'Asientos Modelo', rol: '1.8.4.3'},
          {title: 'Asiento Contable', rol: '1.8.4.4'},
          {title: 'Modelo OPV', rol: '1.8.4.5'},
          {title: 'Fecha Minima Contabilizacion', rol: '1.8.4.6'},
        ]},
      {title: 'Compras', rol:'1.8.5'},
      {title: 'Centro de Costos', rol:'1.8.6',
        options: [
          {title: 'Administracion', rol: '1.8.6.1'},
          {title: 'Presupuesto de Costos por Supervision', rol: '1.8.4.3'},
        ]},
      {title: 'Proveedores', rol:'1.8.7',
        options: [
          {title: 'Administracion', rol: '1.8.7.1'},
          {title: 'Ajuste de Cuenta Corriente', rol: '1.8.7.2'},
          {title: 'Cuenta Corriente', rol: '1.8.7.3'},
        ]},
      {title: 'Presupuestos', rol:'1.8.8',
        options:[
          {title: 'Plan Cuentas Presupuesto ABM', rol: '1.8.8'}, /*ROL A REVISAR */
          {title: 'Presupuesto', rol: '1.8.8.1'},
          {title: 'ABM de Presupuesto', rol: '1.8.8.3'},
          {title: 'Promedio Presupuesto Real Ult 6 Meses', rol: '1.8.8.4'},
        ]},
      {title: 'Patentamientos Plan de Ahorro', rol:'1.8.9',
        options:[
          {title: 'Alta Gastos Entrega', rol: '1.8.9'}, /**ROL A REVISAR */
          {title: 'Movimientos', rol: '1.8.9.3'},
          {title: 'Cierre de Operaciones', rol: '1.8.9.5'},
          {title: 'Autorizacion de Operaciones', rol: '1.8.9.6'},
          {title: 'Conceptos E.C.', rol: '1.8.9.1'},
          {title: 'Medios de Pago', rol: '1.8.9.4'},
          {title: 'Reportes', rol: '1.8.9.2'},
          {title: 'Registraciones', rol: '1.8.9.8', 
            options:[
              {title: 'Registrcion de Comprobantes', rol: '1.8.9.8.1'},
              {title: 'Consulta de Comprobantes', rol: '1.8.9.8.2'},
              {title: 'Cierre de Operaciones', rol: '1.8.9.8.5',
                options:[
                  {title: 'Procesar Cierre', rol: '1.8.9.8.5.1'},
                  {title: 'Consultas', rol: '1.8.9.8.2'},
                  {title: 'Anular Cierre', rol: '1.8.9.8.3'},
                ]},
              {title: 'Motivos', rol: '1.8.9.8.3'},
              {title: 'Modificacion Importe Comprobante', rol: '1.8.9.8.6'},
              {title: 'Reporte Diario', rol: '1.8.9.8.4'},
            ]},
        ]},
    ]
  },
  {
    title: 'Reportes',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Ejecuta InterEmpresa', rol:'1.10.0'},
      {title: 'Administracion de Planes', rol:'1.10.1'},
      {title: 'Ventas', rol:'1.10.2'},
      {title: 'Mora', rol:'1.10.3'},
      {title: 'Facturacion', rol:'1.10.4'},
      {title: 'Call Center', rol:'1.10.5'},
      {title: 'Mesa de Planes', rol:'1.10.6'},
      {title: 'Scoring', rol:'1.10.7'},
      {title: 'Micro Emprendedores', rol:'1.10.8'},
    ]
  },
  {
    title: 'Emprendedores',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Circulares', rol:'1.13.1'},
    ]
  },
  {
    title: 'Usados',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Cotizaciones', rol:'1.15.1', unique:true},
      {title: 'Recepcion de Unidades Plan de Ahorro', rol:'1.15.2'},
      {title: 'Recepcion de Unidades Convencional', rol:'1.15.3'},
      {title: 'Stock', rol:'1.15.4'},
      {title: 'Egreso de Unidades', rol:'1.15.5'},
      {title: 'Envio de Mails', rol:'1.15.6'},
      {title: 'Cotizacion Gerencia', rol:'1.15.7'},
      {title: 'Listado De Ventas', rol:'1.15.8'},
      {title: 'Listado de Ventas Interempresa', rol:'1.15.9'},
      {title: 'Ventas Interempresa', rol:'1.15.10'},
      {title: 'Usados Interempresa', rol:'1.15.11'},
      {title: 'Cargar PVS', rol:'1.15.12'},
      {title: 'Modificar Tasa Por Tenencia', rol:'1.15.13'},
      {title: 'Imagenes', rol:'1.15.14'},
      {title: 'Vendedores ABM', rol:'1.15.15'},
      {title: 'Capital Vehiculos Usados', rol:'1.15.16'},
      {title: 'Control Precio Toma', rol:'1.15.17'},
      {title: 'Analisis Ingreso-Egreso', rol:'1.15.18'},
    ]
  },
  {
    title: 'Seguros',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Alta', rol:'1.18.0'},
      {title: 'Modificar', rol:'1.18.1'},
      {title: 'Asignar Oficial', rol:'1.18.2'},
      {title: 'Excel', rol:'1.18.3'},
    ]
  },
];