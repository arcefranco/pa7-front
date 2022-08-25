import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getAllUsuarios, getSelectedRoles, getUserSelectedRoles, addRol, deleteRol, reset } 
from "../../reducers/Usuarios/UsuariosSlice";


const RolesForm = () => {

    const dispatch = useDispatch()

    const {selectedRoles, usuarios, userSelectedRoles, rolStatus, isSuccess} = useSelector(state => state.usuarios)
    useEffect(() => {
        Promise.all([dispatch(getAllUsuarios()), dispatch(reset())])

    }, [])
    useEffect(() => {
        rolStatus.length &&
        Swal.fire({
            icon:'info',
            timer: 15000,
            text: rolStatus
          }).then((result) => {
            if(result.isConfirmed && isSuccess){
             window.location.reload()
            }
          })

    }, [rolStatus])

    const handleRolChange = () => {
        var d = document.getElementById("rol").value
        dispatch(getSelectedRoles({rol: d}))
            
      }
    const handleUserChange = () => {
        var d = document.getElementById("user").value;  
        dispatch(getUserSelectedRoles(d))
        console.log(d)
    }  
    const handleCheck = (e) => {
        if(!e.target.checked) {
            const rolData = {
                Usuario: document.getElementById("user").value,
                rol: e.target.value 
             }
            Swal.fire({
                icon:'info',
                showConfirmButton: true,
                showCancelButton:true,
                timer: 5000,
                text: `Esta seguro que desea eliminarle este rol a ${document.getElementById("user").value}?`
              }).then((result) => {
                if(result.isConfirmed){
                  dispatch(deleteRol(rolData))
                  
                }
              })
        }
        else if(e.target.checked) {
            const rolData = {
               Usuario: document.getElementById("user").value,
               rol: e.target.value 
            }
            Swal.fire({
                icon:'info',
                showConfirmButton: true,
                showCancelButton:true,
                timer: 5000,
                text: `Esta seguro que desea agregar este rol a ${document.getElementById("user").value}?`
              }).then((result) => {
                if(result.isConfirmed){
                  dispatch(addRol(rolData))
                  
                }
              })
        }
       
    }
    
    var d = document.getElementById('rol')

    return (
        <div>
            <h1>Formulario Roles</h1>
            <span>Usuario: </span>
            <select name="" id="user" onChange={handleUserChange}>
                <option value="*">---</option>
                {
                    usuarios && usuarios.map(e => 
                        <option key={e.Usuario} value={e.Usuario}>{e.Nombre}</option>
                        )
                }
            </select>
            {' '}
            <span>Categoría: </span>
            <select name="" id="rol" onChange={handleRolChange}>
                <option value="*">---</option>
                <option value="operaciones" className="Operaciones">Operaciones</option>
                    <option value="1.2.1._%" className="Alta Pre Solicitudes (Operaciones)">--Alta Pre Solicitudes</option>

                    <option disabled value="1.2.11_%" className="Importaciones (Operaciones)">--Importaciones</option>
                            <option value="1.2.11.1._%" className="Agrupamientos (Importaciones)(Operaciones)">----Agrupamientos</option>
                            <option value="1.2.11.10._%"className="Adjudicaciones Vencidas (Importaciones)(Operaciones)">----Adjudicaciones Vencidas</option>
                            <option value="1.2.11.12._%" className="Mora (Importaciones)(Operaciones)">----Mora tardia</option>
                            <option value="1.2.11.2._%" className="Rescindidos (Importaciones)(Operaciones)">----Rescindidos</option>
                            <option value="1.2.11.3._%" className="Adjudicaciones (Importaciones)(Operaciones)">----Adjudicaciones</option>
                            <option value="1.2.11.4._%" className="Comision Vendedores (Importaciones)(Operaciones)">----Comision Vendedores</option>
                            <option value="1.2.11.5._%" className="Cambios Concesionaria (Importaciones)(Operaciones)">----Cambios Concesionaria</option>
                            <option value="1.2.11.7._%" className="Fecha Arribo Unidad y Doc (Importaciones)(Operaciones)">----Fecha Arribo Unidad y Doc</option>
                            <option value="1.2.11.8._%" className="Importacion Ingreso / Regreso Gestoria (Importaciones)(Operaciones)">----Importacion Ingreso / Regreso Gestoria</option>
                            <option value="1.2.11.9._%" className="Obvservaciones Acto Adj (Importaciones)(Operaciones)">----Obvservaciones Acto Adj</option>
                            <option value="1.2.11.6._%" className="Cuotas (Importaciones)(Operaciones)">----Cuotas</option>

                    <option value="scoring" className="Scoring (Operaciones)">--Scoring</option>
                        <option value="1.2.6.3._%" className="Scoring Avanzado (Alta Pre)(Operaciones)">----Scoring Avanzado</option>

                    <option value="1.2.17.1._%" className="Licitaciones (Operaciones)">--Licitaciones</option>
                        <option value="1.2.17.2%" className="Cliente en Condiciones de Licitar (Licitaciones)(Operaciones)">----Cliente en Condiciones de Licitar</option>
                        <option value="1.2.17.3.%" className="Control Llave por Llave (Licitaciones)(Operaciones)">----Control Llave por Llave</option>
                        <option value="1.2.17.4.%" className="Reintegro Licitacion (Licitaciones)(Operaciones)">----Reintegro Licitacion</option>
                    
                    <option value="1.2.3.%" className="Actualizacion de Operaciones (Operaciones)">--Actualizacion de Operaciones</option>
                    <option value="1.2.4.%" className="Alta de Cartera (Operaciones)">--Alta de Cartera</option>
                    <option value="1.2.5.%" className="Agrupamientos/Adjudicaciones/Pedidos/Entregas (Operaciones)">--Agrupamientos/Adjudicaciones/Pedidos/Entregas</option>
                    <option value="1.2.7.%" className="Conciliacion Tarjetas (Operaciones)">--Conciliacion Tarjetas</option>
                    <option value="1.2.12.%" className="Control Solicitudes (Operaciones)">--Control Solicitudes</option>
                    <option value="1.2.13.%" className="Control Recibos (Operaciones)">--Control Recibos</option>
                    <option value="1.2.14.%" className="Impresion Recibos X (Operaciones )">--Impresion Recibos X</option>
                    <option value="1.2.15.%" className="Reclamo (Operaciones)">--Reclamos</option>
                    <option value="1.2.19.%" className="Control de Transferencias (Operaciones)">--Control Transferencias</option>
                    <option value="1.2.20.%" className="Reintegros (Operaciones)">--Reintegros</option>
                    <option value="1.2.22.1.%" className="Agrupamientos (Operaciones)">--Agrupamientos</option>
             
                <option value="mesa" className="Mesa de Planes">Mesa de Planes</option>
                    <option value="1.3.1.%" className="Admin Ahorristas/Adjudicados (Mesa de Planes)">--Admin Ahorristas/Adjudicados</option>
                    <option value="1.3.2.%" className="Scoring (Mesa de Planes)">--Scoring</option>
                    <option value="1.3.3.%" className="Haberes Netos (Mesa de Planes)">--Haberes Netos</option>
                    <option value="1.3.5.%" className="Gestion de Señas Anuladas (Mesa de Planes)">--Gestion de Señas Anuladas</option>
                    <option value="1.3.8.%" className="Stock para Ventas (Mesa de Planes)">--Stock para Ventas</option>
                
                <option value="mora" className="Mora">Mora</option>
                    <option value="1.4.1.%" className="Cuotas Encuadre (Mora)">--Cuotas Encuadre</option>
                    <option value="1.4.10.%" className="Cola de llamados de Mora Especializada (Mora)">--Cola de llamados de Mora Especializada</option>
                    <option value="1.4.13.%" className="Mora Tardía (Mora)">--Mora Tardía</option>
                    <option value="1.4.9.%" className="Cola de llamados Mora Temprana (Mora)">--Cola de llamados de Mora Temprana</option>


                <option value="call" className="Call Center">Call Center</option>
                    <option value="1.5.1.%" className="Definicion Campaña Mails (Call Center)">--Definicion Campaña Mails</option>
                    <option value="1.5.2.%" className="Definicion Campaña SMS (Call Center)">--Definicion Campaña SMS</option>

                <option value="personal" className="Personal">Personal</option>
                    <option value="1.6.1.%" className="Legajos (Personal)">--Legajos</option>
                    <option disabled value="1.6.2.%" className="Reportes (Legajos)(Personal)">----Reportes</option>
                        <option value="1.6.2.1.%" className="Estados (Legajos)(Personal)">----Estados</option>
                        <option value="1.6.2.2.%" className="Obsequios (Legajos)(Personal)">----Obsequios</option>
                        <option value="1.6.2.3.%" className="Sueldos Mensual (Legajos)(Personal)">----Sueldos Mensual</option>
                        <option value="1.6.2.4.%" className="Sueldos Trimestral (Legajos)(Personal)">----Sueldos Trimestral</option>
                        <option value="1.6.2.5" className="Resumen del Período (Legajos)(Personal)">----Resumen del Período</option>


                <option value="config" className="Configuracion de Datos Generales">Config Datos Generales</option>
                <option disabled value="1.7.16_%" className="Usuarios (Configuracion de Datos Generales)">--Usuarios</option>
                    <option value="1.7.16.1_%" className="Admin de Permisos (Usuarios)(Configuracion de Datos Generales)">----Administracion de Permisos</option>
                    <option value="1.7.16.2_%" className="Alta y Modificacion de roles (Usuarios)(Configuracion de Datos Generales)">----Alta y modificación de roles</option>
                    <option value="1.7.16.3_%" className="Alta y Modificacion de Usuarios (Usuarios) (Configuracion de Datos Generales)">----Alta y modificacion de Usuarios</option>
                <option  value="1.7.17._%" className="ABM Intereses (Configuracion de Datos Generales)">--ABM Intereses</option>
                <option  value="1.7.11._%" className="Objetivos x Marca (Configuracion de Datos Generales)">--Objetivos x Marca</option>
                <option  value="1.7.13._%" className="Objetivos x Grupo Mora (Configuracion de Datos Generales)">--Objetivos x Grupo Mora</option>
                <option  value="objMesaDePlanes" className="Objetivos Altas Bajas Mesa Planes (Configuracion de Datos Generales)">--Objetivos Altas Bajas Mesa Planes</option>
                    <option  value="1.7.14.3._%" className="Precio Unitario Automatico (Objetivos Altas Bajas Mesa Planes)(Configuracion de Datos Generales)">----Precio Unitario Automatico</option>
                <option  value="1.7.15._%" className="Parametros (Configuracion de Datos Generales)">--Parametros</option>    
                <option  value="1.7.18._%" className="Gerentes (Configuracion de Datos Generales)">--Gerentes</option>
                <option  value="1.7.19._%" className="Team Leader (Configuracion de Datos Generales)">--Team Leader</option>
                <option  value="1.7.2._%" className="Supervisores (Configuracion de Datos Generales)">--Supervisores</option>
                <option  value="configVendedores" className="Vendedores (Configuracion de Datos Generales)">--Vendedores</option>
                    <option  value="1.7.1.4._%" className="Objetivos (Vendedores)(Configuracion de Datos Generales)">----Objetivos</option>
                    <option  value="1.7.1.5%" className="Importar Vendedores (Vendedores)(Configuracion de Datos Generales)">----Importar vendedores</option>
                <option  value="1.7.3._%" className="Sucursales (Configuracion de Datos Generales)">--Sucursales</option>
                <option  value="1.7.21._%" className="Entrega Asegurada (Configuracion de Datos Generales)">--Entrega Asegurada</option>
                <option  value="1.7.6._%" className="Modelos (Configuracion de Datos Generales)">--Modelos</option>
                <option  value="1.7.7._%" className="Lista de Precios (Configuracion de Datos Generales)">--Lista de Precios</option>
                <option disabled value="1.7.8._%" className="Oficiales (Configuracion de Datos Generales)">--Oficiales</option>
                    <option  value="1.7.8.1._%" className="Adjudicacion (Oficiales)(Configuracion de Datos Generales)">----Adjudicación</option>
                    <option  value="1.7.8.2._%" className="Licitacion (Oficiales)(Configuracion de Datos Generales)">----Licitación</option>
                    <option  value="1.7.8.3._%" className="Plan Canje (Oficiales)(Configuracion de Datos Generales)">----Plan Canje</option>
                    <option  value="1.7.8.4._%" className="Scoring (Oficiales)(Configuracion de Datos Generales)">----Scoring</option>
                    <option  value="1.7.8.5._%" className="Mora (Oficiales)(Configuracion de Datos Generales)">----Mora</option>
                    <option  value="1.7.8.6._%" className="Carga (Oficiales)(Configuracion de Datos Generales)">----Carga</option>
                    <option  value="1.7.8.7._%" className="Patentamiento (Oficiales)(Configuracion de Datos Generales)">----Patentamiento</option>
                    <option  value="1.7.8.8._%" className="Asignacion (Oficiales)(Configuracion de Datos Generales)">----Asignación</option>
                <option  value="1.7.9._%" className="Puntos de Venta (Oficiales)(Configuracion de Datos Generales)">--Puntos de Venta</option>

                <option disabled value="1.8%" className="Contabilidad I">Contabilidad 1</option>
                <option value="tesoreria" className="Tesoreria (Contabilidad I)">--Tesoreria</option>
                <option value="1.8.1.1.%" className="Pagos (Tesoreria)(Contabilidad I)">----Pagos</option>
                <option value="ventas" className="Ventas (Contabilidad I)">--Ventas</option>
                    <option value="1.8.2.2.%" className="Conformacion Contable (Ventas)(Contabilidad I)">----Conformacion Contabale</option>
                    <option value="facturacion" className="Facturacion (Ventas)(Contabilidad I)">----Facturación</option>
                        <option value="facturacionElectronica" className="Facturacion Electronica (Ventas)(Contabilidad I)">------Facturacion Electronica</option>
                            <option value="1.8.2.3.10.5.%" className="Consultar Comprobantes (Ventas)(Contabilidad I)">--------Consultar Comprobantes</option>
                        <option value="1.8.2.3.4.%" className="Conceptos de Facturas Manual (Ventas)(Contabilidad I)">------Conceptos de Facturas Manual</option>
                        <option value="1.8.2.3.8.%" className="Listas de Comisiones (Ventas)(Contabilidad I)">------Listas de Comisiones</option>
                        <option value="1.8.2.3.9.%" className="Conceptos Facturacion (Ventas)(Contabilidad I)">------Conceptos Facturacion</option>
                <option value="1.8.3.1%" className="Bancos (Contabilidad I)">--Bancos</option>
                    <option value="1.8.3.2.%" className="Administracion de Chequeras (Bancos)(Contabilidad I)">----Administracion de Chequeras</option>
                <option disabled value="">--Contabilidad General</option>
                    <option value="1.8.4.1.%" className="Plan de Cuentas (Contabilidad General)(Contabilidad I)">----Plan de Cuentas</option>
                    <option value="consultas" className="Consultas (Contabilidad General)(Contabilidad I)">----Consultas</option>
                        <option value="1.8.4.2.6.%" className="Retenciones (Consultas)(Contabilidad General)(Contabilidad I)">------Retenciones</option>
                        <option value="1.8.4.2.7.%" className="Percepciones (Consultas)(Contabilidad General)(Contabilidad I)">------Percepciones</option>
                    <option value="1.8.4.3.%" className="Asientos Modelo (Contabilidad General)(Contabilidad I)">----Asientos Modelo</option>
                    <option value="1.8.4.4.%" className="Asiento Contable (Contabilidad General)(Contabilidad I)">----Asiento Contable</option>
                    <option value="1.8.4.5.%" className="Modelos O.P.V  (Contabilidad General)(Contabilidad I)">----Modelos O.P.V</option>
                    <option value="1.8.4.6.%" className="Fecha Minima Contabilización  (Contabilidad General)(Contabilidad I)">----Fecha Mínima Contabilización</option>
                    <option value="clientesFacturacion" className="Clientes Facturacion  (Contabilidad General)(Contabilidad I)">----Clientes Facturacion</option>
                        <option value="1.8.4.7.1.%" className="Administracion Clientes (Contabilidad General)(Contabilidad I)">------Administracion Clientes</option>
                        <option value="1.8.4.7.2.%" className="Medios de Pago (Contabilidad General)(Contabilidad I)">------Medios de Pago</option>
                        <option value="1.8.4.7.4.%" className="Composicion de Saldos (Contabilidad General)(Contabilidad I)">------Composicion de Saldos</option>
                <option value="1.8.5.2" className="Compras (Contabilidad I)">--Compras</option>
                    <option value="1.8.5.1.%" className="Comprobantes Proveedor (Compras)(Contabilidad I)">----Compobantes Proveedor</option>
                <option value="1.8.6.2" className="Centro de Costos (Contabilidad I)">--Centro de costos</option>
                    <option value="1.8.6.1." className="Administracion (Centro de costos)(Contabilidad I)">----Administracion</option>
                <option value="proveedores" className="Proveedores (Contabilidad I)">--Proveedores</option>
                    <option value="1.8.7.1.%" className="Administracion (Proveedores)(Contabilidad I)">----Administracion</option>
                <option value="1.8.8.1.%" className="Presupuestos (Contabilidad I)">--Presupuestos</option>
                    <option value="1.8.8.2.%" className="Presupuesto por Momentos (Presupuestos)(Contabilidad I)">----Presupuesto por Momentos</option>
                    <option value="1.8.8.3.%" className="ABM de Presupuesto (Presupuestos)(Contabilidad I)">----ABM de Presupuesto</option>

                <option disabled value="" >--Patentamiento Plan de Ahorro</option>
                    <option value="1.8.9.1.%" className="Conceptos E.C. (Patentamiento Plan de Ahorro)(Contabilidad I)">----Conceptos E.C.</option>
                    <option value="1.8.9.2.%" className="Reportes (Patentamiento Plan de Ahorro)(Contabilidad I)">----Reportes</option>
                    <option value="1.8.9.3.%" className="Movimientos (Patentamiento Plan de Ahorro)(Contabilidad I)">----Movimientos</option>
                    <option value="1.8.9.4.%" className="Medios de Pago (Patentamiento Plan de Ahorro)(Contabilidad I)">----Medios de Pago</option>
                    <option value="1.8.9.5.%" className="Cierre de Operaciones (Patentamiento Plan de Ahorro)(Contabilidad I)">----Cierre de Operaciones</option>
                    <option value="1.8.9.6.%" className="Autorizacion de Operaciones (Patentamiento Plan de Ahorro)(Contabilidad I)">----Autorizacion de Operaciones</option>
                    <option value="1.8.9.7.%" className="Alta Gastos Entrega (Patentamiento Plan de Ahorro)(Contabilidad I)">----Alta Gastos Entrega</option>
                    <option value="registraciones" className="Regitraciones (Patentamiento Plan de Ahorro)(Contabilidad I)">----Regisraciones</option>
                        <option value="1.8.9.8.3.%" className="Motivos (Patentamiento Plan de Ahorro)(Contabilidad I)">------Motivos</option>
                        <option value="1.8.9.8.5.%" className="Cierre de Operaciones (Patentamiento Plan de Ahorro)(Contabilidad I)">------Cierre de Operaciones</option>


                <option value="contabilidad2" className="Contabilidad II">Contabilidad 2</option>
                    <option value="1.9.1.1.%" className="Asiento Contable (Contabilidad II)">--Asiento Contable</option>

                <option value="reportes" className="Reportes">Reportes</option>
                    <option value="1.10.1.%" className="Administracion de Planes (Reportes)">--Administracion de Planes</option>
                    <option value="1.10.2.%" className="Ventas (Reportes)">--Ventas</option>
                    <option value="reportesMora" className="Mora (Reportes)">--Mora</option>
                        <option value="1.10.3.4.%" className="Mora por Oficial (Mora)(Reportes)">----Mora por Oficial</option>
                        <option value="1.10.3.5.%" className="Mora por Oficial Seguimiento (Mora)(Reportes)">----Mora por Oficial Seguimiento</option>
                        <option value="1.10.3.6.%" className="Mora por Vendedor (Mora)(Reportes)">----Mora por Vendedor</option>
                    <option value="1.10.4.%" className="Facturacion (Reportes)">--Facturación</option>
                    <option value="1.10.5.%" className="Call Center (Reportes)">--Call Center</option>
                    <option value="1.10.6.%" className="Mesa de Planes (Reportes)">--Mesa de Planes</option>
                    <option value="1.10.7.%" className="Scoring (Reportes)">--Scoring</option>
                    <option value="1.10.8.%" className="Micro Emprendedores (Reportes)">--Micro Emprendedores</option>

                <option value="planSubite" className="Plan Subite">Plan Subite</option>
                    <option value="1.11.1.%" className="Oficiales (Plan Subite)">--Oficiales</option>
                    <option value="1.11.4.%" className="Asignacion de Datos (Plan Subite)">--Asignación de datos</option>

                <option disabled value="">Entrega Convencionales</option>
                    <option value="1.12.1.%" className="Alta y Modificaion de Convencionales (Entrega Convencionales)">--Alta y Modificacion de Convencionales</option>
                    <option value="1.12.2.%" className="Seguimiento Service (Entrega Convencionales)">--Seguimiento Service</option>
                    <option value="1.12.3.%" className="Turnos (Entrega Convencionales)">--Turnos</option>

                <option value="1.13.1.%" className="Mini Emprendedores">Mini Emprendedores (Circulares)</option>

                <option value="compraRescindidos" className="Compra Rescindidos (Mini Emprendedores)">Compra Rescindidos</option>
                    <option value="1.14.1.%" className="Oficiales (Mini Emprendedores)">--Oficiales</option>
                    <option value="1.14.4.%" className="Asignacion de Datos (Mini Emprendedores)">--Asignacion de Datos</option>

                <option value="usados" className="Usados">Usados</option>
                    <option value="1.15.1.%" className="Cotizaciones (Usados)">--Cotizaciones</option>
                    <option value="1.15.14.%" className="Imagenes (Usados)">--Imagenes</option>
                    <option value="1.15.15.%" className="Vendedores ABM (Usados)">--Vendedores ABM</option>
                    <option value="1.15.7.%" className="Cotizacion Gerencia (Usados)">--Cotizacion Gerencia</option>
                <option value="1.16.%" className="Pilot">Pilot</option>
                <option value="1.17.%" className="Stock vehiculos Plan Ahorro">Stock vehiculos Plan Ahorro</option>
                <option value="1.18.%" className="Seguros">Seguros</option>
            </select>
        {
            d?.value.length && <h4 style={{paddingTop: '1rem'}}>{d.options[d.selectedIndex].className}</h4>
        }
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            padding: '2rem',
            placeContent:'center'
        }}>
            
            {
               selectedRoles.length ? selectedRoles.map(e => 
                    <span key={e.rl_codigo} style={{width: 'fit-content'}}>
                        
                        {
                        userSelectedRoles.find(u => u.rl_codigo === e.rl_codigo) ? 
                        <input value={e.rl_codigo} 
                        checked
                        onChange={(e) => handleCheck(e)} type="checkbox" 
                        style={{width: '1rem'}}/> : 
                        
                        <input value={e.rl_codigo} 
                        onChange={(e) => handleCheck(e)} type="checkbox" 
                        style={{width: '1rem'}} />


                        }
                        {e.rl_descripcion} {' '}

                    </span> 
                    
                    ) : null
            }
        </div>

        </div>
    )
}

export default RolesForm