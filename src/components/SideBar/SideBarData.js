import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import {  BiMenu, BiLogOut, BiBus,BiListPlus, BiFile, BiTimeFive, BiPhoneCall,
  BiIdCard, BiGroup, BiCog, BiLineChart, BiPrinter,
   BiTachometer, BiLinkExternal, BiCart, BiCar, BiLock, BiChevronUp, BiChevronDown
 } from "react-icons/bi";
export const SidebarData = [
  {
    title: 'Operaciones',
    icon: <BiListPlus />,

    cName: 'nav-text',
    options: 
    [
      {title: 'Altas Pre Solicitudes', rol:'1.2.1', cName:'subMenuL2'},
      {title: 'Actualizaciones Pre Solicitudes', rol:'1.2.2', cName:'subMenuL2'},
      {title: 'Actualizacion Operaciones', rol:'1.2.3', cName:'subMenuL2'},
      {title: 'Alta Cartera', rol:'1.2.4', cName:'subMenuL2'},
      {title: 'AAPE', rol:'1.2.5', cName:'subMenuL2'},
      {title: 'Scoring', rol:'1.2.6', cName:'subMenuL2', 
          options: [
          {title:'Scoring', rol: '1.2.6.1', cName:'subMenuL2'},
          {title:'Consultar Cotizador', rol: '1.2.6.4', cName:'subMenuL2'},
          {title:'Scoring Avanzado', rol: '1.2.6.3', cName:'subMenuL2'},
          ]},
      {title: 'Conciliacion Tarjetas', rol:'1.2.7', cName:'subMenuL2'},
      {title: 'Reporte Personalizado', rol:'1.2.8', cName:'subMenuL2'},
      {title: 'Excel Datos', rol:'1.2.9', cName:'subMenuL2'},
      {title: 'Buscar Operaciones', rol:'1.2.10', cName:'subMenuL2'},
      {title: 'Importaciones', rol:'1.2.11', cName:'subMenuL2', 
          options:[
          {title: 'Agrupamientos', rol: '1.2.11.1', cName:'subMenuL2'},
          {title: 'Cambios de Concesionaria', rol: '1.2.11.5', cName:'subMenuL2'},
          {title: 'Fecha Arribo Unidad y Doc', rol: '1.2.11.7', cName:'subMenuL2'},
          {title: 'Obvservaciones Acto Adj', rol: '1.2.11.9', cName:'subMenuL2'},
          {title: 'Comision Vendedores', rol: '1.2.11.4', cName:'subMenuL2'},
          {title: 'Adjudicaciones', rol: '1.2.11.3', cName:'subMenuL2'},
          {title: 'Fecha Ingreso Regreso Gestoria', rol: '1.2.11.8', cName:'subMenuL2'},
          {title: 'Cuotas Encuadre', rol: '1.2.11.1', cName:'subMenuL2'}, /**ROL A REVISAR */ 
          {title: 'Rescindidos', rol: '1.2.11.2', cName:'subMenuL2'},
          {title: 'Cuotas', rol: '1.2.11.6', cName:'subMenuL2'},
          {title: 'Adjudicaciones Vencidas', rol: '1.2.11.1', cName:'subMenuL2'},
          ]},
      {title: 'Control de solicitudes', rol:'1.2.12', cName:'subMenuL2'},
      {title: 'Control de Recibos', rol:'1.2.13', cName:'subMenuL2'},
      {title: 'Control Transferencias', rol:'1.2.14', cName:'subMenuL2'},
      {title: 'Impresion Recibos', rol:'1.2.15', cName:'subMenuL2'},
      {title: 'Reclamos', rol:'1.2.16', cName:'subMenuL2'},
      {title: 'Licitaciones', rol:'1.2.17', cName:'subMenuL2',
          options: [
            {title: 'Licitaciones', rol:'1.2.17.1', cName:'subMenuL2'},
            {title: 'Condiciones de Licitar', rol:'1.2.17.2', cName:'subMenuL2'},
            {title: 'Interesados en Licitar', rol:'1.2.17.1', cName:'subMenuL2'}, /*ROL A REVISAR*/
            {title: 'Llave x llave', rol:'1.2.17.3', cName:'subMenuL2'},
            {title: 'Reintegro de Licitaciones', rol:'1.2.17.3', cName:'subMenuL2'}, 
          ]},
      {title: 'Rep Micro Emprendedores', rol:'1.2.20', cName:'subMenuL2'},
      {title: 'Reportes', rol:'1.2.21', cName:'subMenuL2'},
      {title: 'Agrupamientos', rol:'1.2.22', cName:'subMenuL2'},
    
    ]
  },
  {
    title: 'Mesa de Planes',
    icon: <BiFile />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Admin Ahorristas Adjudicados', rol:'1.3.1', cName:'subMenuL2'},
      {title: 'Scoring', rol:'1.3.2', cName:'subMenuL2'},
      {title: 'Haberes Netos', rol:'1.3.3', cName:'subMenuL2'},
      {title: 'Gestion de Señas Anuladas', rol:'1.3.5', cName:'subMenuL2'},
  
      {title: 'Autorizador Clasificaciones', rol:'1.3.6', cName:'subMenuL2'},
      {title: 'Stock Contable', rol:'1.3.7', cName:'subMenuL2'},
      {title: 'Stock Para Ventas', rol:'1.3.8', cName:'subMenuL2'},
    ]
  },
  {
    title: 'Mora',
    icon: <BiTimeFive />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Cuotas Encuadre', rol:'1.4.1', cName:'subMenuL2'},
      {title: 'Recupero cuotas encuadre', rol:'1.4.2', cName:'subMenuL2'},
      {title: 'Pagos y recuperos encuadre', rol:'1.4.3', cName:'subMenuL2'},
      {title: 'Cuadro Performance', rol:'1.4.4', cName:'subMenuL2'},
      {title: 'Asignacion De Mora', rol:'1.4.5', cName:'subMenuL2', 
          options: [
            {title: 'Mora temprana', rol: '1.4.5', cName:'subMenuL2'} /**ROL A REVISAR */
          ]},
      {title: 'Mora Tecnica', rol:'1.4.6', cName:'subMenuL2'},
      {title: 'Gestion Mora Temprana', rol:'1.4.7', cName:'subMenuL2'},
      {title: 'Gestion Mora Especializada', rol:'1.4.8', cName:'subMenuL2'},
      {title: 'Cola De Llamados Mora Temprana', rol:'1.4.9', cName:'subMenuL2'},
      {title: 'Cola De Llamados Mora Especializada', rol:'1.4.10', cName:'subMenuL2'},
      {title: 'Supervisor Mora', rol:'1.4.11', cName:'subMenuL2'},
      {title: 'Ver Toda La Mora', rol:'1.4.12', cName:'subMenuL2'},
      
      
    ], 
  },

  {
    title: 'Call Center',
    icon: <BiPhoneCall />,
    cName: 'nav-text',
    options: [
      {title: 'Definicion Campana Mails', rol:'1.5.1', cName:'subMenuL2'},
      {title: 'Definicion Campana SMS', rol:'1.5.2', cName:'subMenuL2'}, 
      {title: 'Generacion Bases Neotel', rol:'1.5.3', cName:'subMenuL2'}, 
      {title: 'Envio y Recepcion de Mails', rol:'1.5.4', cName:'subMenuL2'}, 
      {title: 'Envio y Recepcion de SMS', rol:'1.5.5', cName:'subMenuL2'}, 
      {title: 'Definicion Fecha Vto Agendado Camapana', rol:'1.5.6', cName:'subMenuL2'}, 
      {title: 'Administracion Mails Enviados Y Recibidos', rol:'1.5.7', cName:'subMenuL2'}, 
      {title: 'Administracion SMS Enviados Y Recibidos Encuadre', rol:'1.5.8', cName:'subMenuL2'}, 
  ],
  },
  {
    title: 'Personal',
    icon: <BiIdCard />,
    cName: 'nav-text',
    options: [
      {title: 'Legajos', rol:'1.6.1', cName:'subMenuL2', unique:true},
      {title: 'Reportes', rol:'1.6.2', cName:'subMenuL2', unique:true}, 
      {title: 'Importacion Sueldos', rol:'1.6.3', cName:'subMenuL2', unique:true}, 
      {title: 'Generacion TXT Acreditacion Haberes', rol:'1.6.4', cName:'subMenuL2', unique:true}, 
    ]

  },
  {
    title: 'Emprendedores',
    icon: <BiGroup />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Circulares', rol:'1.13.1', cName:'subMenuL2'},
    ]
  },
  
  {
    title: 'Configuracion de Datos Generales',
    icon: <BiCog />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Vendedores', rol:'1.7.1', cName:'subMenuL2'},
      {title: 'Supervisores', rol:'1.7.2', path:'/supervisores', cName:'subMenuL2'},
      {title: 'Sucursales', rol:'1.7.3', cName:'subMenuL2'},
      {title: 'Cambio Modelo', rol:'1.7.4', cName:'subMenuL2'},
      {title: 'Cambio De Contraseña Sueldos', rol:'1.7.5', cName:'subMenuL2'},
      {title: 'Modelos', rol:'1.7.6', cName:'subMenuL2'},
      {title: 'Lista de Precios', rol:'1.7.7', cName:'subMenuL2'},
      {title: 'Datos Oficiales', rol:'1.7.8', cName:'subMenuL2'},
      {title: 'Puntos de Venta', rol:'1.7.9', cName:'subMenuL2'},
      {title: 'Cambio de Contraseña', rol:'1.7.10', cName:'subMenuL2'},
      {title: 'Objetivos X Marca', rol:'1.7.11', cName:'subMenuL2'},
      {title: 'Objetivos Mora', rol:'1.7.12', cName:'subMenuL2'},
      {title: 'Objetivos X Grupo Mora', rol:'1.7.13', cName:'subMenuL2'},
      {title: 'Objetivos Altas Bajas Mesa de Planes', rol:'1.7.14', cName:'subMenuL2'},
      {title: 'Parametros', rol:'1.7.15', cName:'subMenuL2'},
      {title: 'Usuarios', rol:'1.7.16', cName:'subMenuL2',
        options: [
            {title: 'Administracion de Permisos', rol: '1.7.16.1', cName:'subMenuL2', unique:true},
            {title: 'Alta y Modificacion de Roles', rol: '1.7.16.2', cName:'subMenuL2', 
              options:[
                {title: 'Alta y Modificacion de Roles', rol: '1.7.16.2', path:'/roles', cName:'subMenuL2'},
                {title: 'Copiar Roles', rol: '1.7.16.2', path:'/copyRoles', cName:'subMenuL2'}
            ]},
            {title: 'Alta y Modificacion de Usuarios', rol: '1.7.16.3', path: '/usuarios', cName:'subMenuL2'},
       ]},
      {title: 'ABM Intereses', rol:'1.7.17', cName:'subMenuL2'},
      {title: 'Gerentes', rol:'1.7.18', path:'/gerentes', cName:'subMenuL2'},
      {title: 'Team Leader', rol:'1.7.19', path:'/teamleaders', cName:'subMenuL2'},
      {title: 'Estructura Comercial', rol:'1.7.20', cName:'subMenuL2'},
      {title: 'Entrega Asegurada', rol:'1.7.21', cName:'subMenuL2'},
    
    ]
  },
  {
    title: 'Contabilidad',
    icon: <BiLineChart />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Tesoreria', rol:'1.8.1', cName:'subMenuL2',
        options: [
          {title: 'Pagos', rol:'1.8.1.1', cName:'subMenuL2'},
          {title: 'Cobranzas', rol:'1.8.1.2', cName:'subMenuL2', 
            options:[
              {title:'Cobranza ed Facturas Giama', rol: '1.8.1.3', cName:'subMenuL2'}
              ]
            }
        ]},
      {title: 'Ventas', rol:'1.8.2', cName:'subMenuL2', 
        options:[
          {title: 'Importacion Facturas B', rol: '1.8.2.1', cName:'subMenuL2'},
          {title: 'Conformacion Contable', rol: '1.8.2.2', cName:'subMenuL2'},
          {title: 'Clientes Facturacion', rol: '1.8.4.7', cName:'subMenuL2', 
            options: [
              {title: 'Administracion de Clientes', rol: '1.8.4.7.1', cName:'subMenuL2'},
              {title: 'Medios de Pago', rol: '1.8.4.7.2', cName:'subMenuL2'},
              {title: 'Composicion de Saldos', rol: '1.8.4.7.4', cName:'subMenuL2'},
              {title: 'Importacion de Clientes', rol: '1.8.4.7.1', cName:'subMenuL2'}, /*ROL A REVISAR */
              {title: 'Cuenta Corriente', rol: '1.8.4.7.3', cName:'subMenuL2'},
              {title: 'Ver Recibos', rol: '1.8.4.7.5', cName:'subMenuL2'},
            ]},
          {title: 'Facturacion', rol: '1.8.2.3', cName:'subMenuL2', 
            options: [
              {title: 'Carga Cuotas', rol: '1.8.2.3.1', cName:'subMenuL2'},
              {title: 'Contabilizacion de facturas', rol: '1.8.2.3.2', cName:'subMenuL2'},
              {title: 'Calculo de Margen', rol: '1.8.2.3.3', cName:'subMenuL2'},
              {title: 'Generacion de Conceptos por Op', rol: '1.8.2.3.7', cName:'subMenuL2'},
              {title: 'Conciliacion de Conceptos a Facturar', rol: '1.8.2.3.5', cName:'subMenuL2'},
              {title: 'Conciliacion Individual de Conceptos', rol: '1.8.2.3.6', cName:'subMenuL2'},
              {title: 'Conceptos de Facturas Manuales', rol: '1.8.2.3.4', cName:'subMenuL2'},
              {title: 'Listas Comisiones', rol: '1.8.2.3.8', cName:'subMenuL2'},
              {title: 'Conceptos Facturacion', rol: '1.8.2.3.9', cName:'subMenuL2'},
              {title: 'Facturacion Electronica', rol: '1.8.2.3.10', cName:'subMenuL2'},
            ]},
          {title: 'Op Pendientes de Conformacion Ctable', rol: '1.8.2.4', cName:'subMenuL2'},
      ]},
      {title: 'Bancos', rol:'1.8.3', cName:'subMenuL2', 
        options: [
              {title: 'Valores a Depositar', rol: '1.8.3.1', cName:'subMenuL2'},
              {title: 'Administracion de Chequeras', rol: '1.8.3.2', cName:'subMenuL2'},
          ]},
          
          
      {title: 'Contabilidad General', rol:'1.8.4', cName:'subMenuL2', 
        options:[
          {title: 'Plan de Cuentas', rol: '1.8.4.1', cName:'subMenuL2'},
          {title: 'Consultas', rol: '1.8.4.2', cName:'subMenuL2', 
            options:[
              {title: 'Libro Mayor', rol: '1.8.4.2.1', cName:'subMenuL2'},
              {title: 'Balance de Sumas y Saldos', rol: '1.8.4.2.2', cName:'subMenuL2'},
              {title: 'Retenciones', rol: '1.8.4.2.6', cName:'subMenuL2'},
              {title: 'Percepciones', rol: '1.8.4.2.7', cName:'subMenuL2'},
              {title: 'Libro Diario', rol: '1.8.4.2.3', cName:'subMenuL2'},
              {title: 'Informes de Compras y Ventas', rol: '1.8.4.2.4', cName:'subMenuL2'},
              {title: 'Tarjetas de Credito', rol: '1.8.4.2.5', cName:'subMenuL2'},
            ]},
          {title: 'Asientos Modelo', rol: '1.8.4.3', cName:'subMenuL2'},
          {title: 'Asiento Contable', rol: '1.8.4.4', cName:'subMenuL2'},
          {title: 'Modelo OPV', rol: '1.8.4.5', cName:'subMenuL2'},
          {title: 'Fecha Minima Contabilizacion', rol: '1.8.4.6', cName:'subMenuL2'},
        ]},
      {title: 'Compras', rol:'1.8.5', cName:'subMenuL2'},
      {title: 'Centro de Costos', rol:'1.8.6', cName:'subMenuL2',
        options: [
          {title: 'Administracion', rol: '1.8.6.1', cName:'subMenuL2'},
          {title: 'Presupuesto de Costos por Supervision', rol: '1.8.4.3', cName:'subMenuL2'},
        ]},
      {title: 'Proveedores', rol:'1.8.7', cName:'subMenuL2',
        options: [
          {title: 'Administracion', rol: '1.8.7.1', cName:'subMenuL2'},
          {title: 'Ajuste de Cuenta Corriente', rol: '1.8.7.2', cName:'subMenuL2'},
          {title: 'Cuenta Corriente', rol: '1.8.7.3', cName:'subMenuL2'},
        ]},
      {title: 'Presupuestos', rol:'1.8.8', cName:'subMenuL2',
        options:[
          {title: 'Plan Cuentas Presupuesto ABM', rol: '1.8.8', cName:'subMenuL2'}, /*ROL A REVISAR */
          {title: 'Presupuesto', rol: '1.8.8.1', cName:'subMenuL2'},
          {title: 'ABM de Presupuesto', rol: '1.8.8.3', cName:'subMenuL2'},
          {title: 'Promedio Presupuesto Real Ult 6 Meses', rol: '1.8.8.4', cName:'subMenuL2'},
        ]},
      {title: 'Patentamientos Plan de Ahorro', rol:'1.8.9', cName:'subMenuL2',
        options:[
          {title: 'Alta Gastos Entrega', rol: '1.8.9', cName:'subMenuL2'}, /**ROL A REVISAR */
          {title: 'Movimientos', rol: '1.8.9.3', cName:'subMenuL2'},
          {title: 'Cierre de Operaciones', rol: '1.8.9.5', cName:'subMenuL2'},
          {title: 'Autorizacion de Operaciones', rol: '1.8.9.6', cName:'subMenuL2'},
          {title: 'Conceptos E.C.', rol: '1.8.9.1', cName:'subMenuL2'},
          {title: 'Medios de Pago', rol: '1.8.9.4', cName:'subMenuL2'},
          {title: 'Reportes', rol: '1.8.9.2', cName:'subMenuL2'},
          {title: 'Registraciones', rol: '1.8.9.8', cName:'subMenuL2', 
            options:[
              {title: 'Registrcion de Comprobantes', rol: '1.8.9.8.1', cName:'subMenuL2'},
              {title: 'Consulta de Comprobantes', rol: '1.8.9.8.2', cName:'subMenuL2'},
              {title: 'Cierre de Operaciones', rol: '1.8.9.8.5', cName:'subMenuL2',
                options:[
                  {title: 'Procesar Cierre', rol: '1.8.9.8.5.1', cName:'subMenuL2'},
                  {title: 'Consultas', rol: '1.8.9.8.2', cName:'subMenuL2'},
                  {title: 'Anular Cierre', rol: '1.8.9.8.3', cName:'subMenuL2'},
                ]},
              {title: 'Motivos', rol: '1.8.9.8.3', cName:'subMenuL2'},
              {title: 'Modificacion Importe Comprobante', rol: '1.8.9.8.6', cName:'subMenuL2'},
              {title: 'Reporte Diario', rol: '1.8.9.8.4', cName:'subMenuL2'},
            ]},
        ]},
    ]
  },
  {
    title: 'Reportes',
    icon: <BiPrinter />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Ejecuta InterEmpresa', rol:'1.10.0', cName:'subMenuL2'},
      {title: 'Administracion de Planes', rol:'1.10.1', cName:'subMenuL2'},
      {title: 'Ventas', rol:'1.10.2', cName:'subMenuL2'},
      {title: 'Mora', rol:'1.10.3', cName:'subMenuL2'},
      {title: 'Facturacion', rol:'1.10.4', cName:'subMenuL2'},
      {title: 'Call Center', rol:'1.10.5', cName:'subMenuL2'},
      {title: 'Mesa de Planes', rol:'1.10.6', cName:'subMenuL2'},
      {title: 'Scoring', rol:'1.10.7', cName:'subMenuL2'},
      {title: 'Micro Emprendedores', rol:'1.10.8', cName:'subMenuL2'},
    ]
  },
  {
    title: 'Plan Subite Fiat',
    icon: <BiTachometer />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Oficiales', rol:'1.11.1', cName:'subMenuL2'},
      {title: 'Estado de la Gestión', rol:'1.11.2', cName:'subMenuL2'},
      {title: 'Gestión de Datos', rol:'1.11.3', cName:'subMenuL2'},
      {title: 'Asignación de Datos', rol:'1.11.4', cName:'subMenuL2'},
      {title: 'Importación de Datos', rol:'1.11.5', cName:'subMenuL2'},
      {title: 'Importacion de HN', rol:'1.11.9', cName:'subMenuL2'},
      {title: 'Reporte de Compras', rol:'1.11.10', cName:'subMenuL2'},
      {title: 'Reporte de Asignaciones por Período', rol:'1.11.11', cName:'subMenuL2'},
    ]
  },
  {
    title: 'Entregas Convencionales',
    icon: <BiLinkExternal />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Alta y Modificación de Convencionales', rol:'1.12.1', cName:'subMenuL2'},
      {title: 'Seguimiento Service', rol:'1.12.2', cName:'subMenuL2'},
      {title: 'Turnos', rol:'1.12.3', cName:'subMenuL2'},
    ]
  },
  {
    title: 'Compra Rescindidos',
    icon: <BiCart />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Oficiales', rol:'1.14.1', cName:'subMenuL2'},
      {title: 'Estado de la Gestión', rol:'1.14.2', cName:'subMenuL2'},
      {title: 'Gestión de Datos', rol:'1.14.3', cName:'subMenuL2'},
      {title: 'Asignación de Datos', rol:'1.14.4', cName:'subMenuL2'},
      {title: 'Importación de Datos', rol:'1.14.5', cName:'subMenuL2'},
    ]
  },
  
  {
    title: 'Usados',
    icon: <BiCar />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Cotizaciones', rol:'1.15.1', unique:true, cName:'subMenuL2'},
      {title: 'Recepcion de Unidades Plan de Ahorro', rol:'1.15.2', cName:'subMenuL2'},
      {title: 'Recepcion de Unidades Convencional', rol:'1.15.3', cName:'subMenuL2'},
      {title: 'Stock', rol:'1.15.4', cName:'subMenuL2'},
      {title: 'Egreso de Unidades', rol:'1.15.5', cName:'subMenuL2'},
      {title: 'Envio de Mails', rol:'1.15.6', cName:'subMenuL2'},
      {title: 'Cotizacion Gerencia', rol:'1.15.7', cName:'subMenuL2'},
      {title: 'Listado De Ventas', rol:'1.15.8', cName:'subMenuL2'},
      {title: 'Listado de Ventas Interempresa', rol:'1.15.9', cName:'subMenuL2'},
      {title: 'Ventas Interempresa', rol:'1.15.10', cName:'subMenuL2'},
      {title: 'Usados Interempresa', rol:'1.15.11', cName:'subMenuL2'},
      {title: 'Cargar PVS', rol:'1.15.12', cName:'subMenuL2'},
      {title: 'Modificar Tasa Por Tenencia', rol:'1.15.13', cName:'subMenuL2'},
      {title: 'Imagenes', rol:'1.15.14', cName:'subMenuL2'},
      {title: 'Vendedores ABM', rol:'1.15.15', cName:'subMenuL2'},
      {title: 'Capital Vehiculos Usados', rol:'1.15.16', cName:'subMenuL2'},
      {title: 'Control Precio Toma', rol:'1.15.17', cName:'subMenuL2'},
      {title: 'Analisis Ingreso-Egreso', rol:'1.15.18', cName:'subMenuL2'},
    ]
  },
  {
    title: 'Stock Vehiculos Plan Ahorro',
    icon: <BiBus/>,
    cName: 'nav-text',
    options: 
    [
      {title: 'Ver', rol:'1.17.1', cName:'subMenuL2'},
      {title: 'Excel', rol:'1.17.2', cName:'subMenuL2'},
      {title: 'Imprimir', rol:'1.17.3', cName:'subMenuL2'},
    ]
  },
  {
    title: 'Seguros',
    icon: <BiLock />,
    cName: 'nav-text',
    options: 
    [
      {title: 'Alta', rol:'1.18.0', cName:'subMenuL2'},
      {title: 'Modificar', rol:'1.18.1', cName:'subMenuL2'},
      {title: 'Asignar Oficial', rol:'1.18.2', cName:'subMenuL2'},
      {title: 'Excel', rol:'1.18.3', cName:'subMenuL2'},
    ]
  },
];