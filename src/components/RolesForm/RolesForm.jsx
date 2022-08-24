import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getAllUsuarios, getSelectedRoles, getUserSelectedRoles, addRol, deleteRol } 
from "../../reducers/Usuarios/UsuariosSlice";


const RolesForm = () => {

    const dispatch = useDispatch()
    const {selectedRoles, usuarios, userSelectedRoles, rolStatus} = useSelector(state => state.usuarios)
    useEffect(() => {
        dispatch(getAllUsuarios())

    }, [])
    useEffect(() => {
        rolStatus.length &&
        Swal.fire({
            icon:'info',
            timer: 15000,
            text: rolStatus
          }).then((result) => {
            if(result.isConfirmed){
                window.location.reload()
            }
          })

    }, [rolStatus])

    const handleRolChange = () => {
        var d = document.getElementById("rol").value
        console.log(d)
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
                <option value="operaciones">Operaciones</option>
                    <option value="1.2.1._%">--Alta Pre Solicitudes</option>

                    <option disabled value="1.2.11_%">--Importaciones</option>
                        <option value="1.2.11.1._%">----Agrupamientos</option>
                        <option value="1.2.11.10._%">----Adjudicaciones Vencidas</option>
                        <option value="1.2.11.12._%">----Mora tardia</option>
                        <option value="1.2.11.2._%">----Rescindidos</option>
                        <option value="1.2.11.3._%">----Adjudicaciones</option>
                        <option value="1.2.11.4._%">----Comision Vendedores</option>
                        <option value="1.2.11.5._%">----Cambios Concesionaria</option>
                        <option value="1.2.11.7._%">----Fecha Arribo Unidad y Doc</option>
                        <option value="1.2.11.8._%">----Importacion Ingreso / Regreso Gestoria</option>
                        <option value="1.2.11.9._%">----Obvservaciones Acto Adj</option>
                        <option value="1.2.11.6._%">----Cuotas</option>

                    <option value="scoring">--Scoring</option>
                        <option value="1.2.6.3._%">----Scoring Avanzado</option>

                    <option value="1.2.17.1._%">--Licitaciones</option>
                        <option value="1.2.17.2%">----Cliente en Condiciones de Licitar</option>
                        <option value="1.2.17.3.%">----Control Llave por Llave</option>
                        <option value="1.2.17.4.%">----Reintegro Licitacion</option>
                    
                    <option value="1.2.3.%">--Actualizacion de Operaciones</option>
                    <option value="1.2.4.%">--Alta de Cartera</option>
                    <option value="1.2.5.%">--Agrupamientos/Adjudicaciones/Pedidos/Entregas</option>
                    <option value="1.2.7.%">--Conciliacion Tarjetas</option>
                    <option value="1.2.12.%">--Control Solicitudes</option>
                    <option value="1.2.13.%">--Control Recibos</option>
                    <option value="1.2.14.%">--Impresion Recibos X</option>
                    <option value="1.2.15.%">--Reclamos</option>
                    <option value="1.2.19.%">--Control Transferencias</option>
                    <option value="1.2.20.%">--Reintegros</option>
                    <option value="1.2.22.1.%">--Agrupamientos</option>
             
                <option value="mesa">Mesa de Planes</option>
                    <option value="1.3.1.%">--Admin Ahorristas/Adjudicados</option>
                    <option value="1.3.2.%">--Scoring</option>
                    <option value="1.3.3.%">--Haberes Netos</option>
                    <option value="1.3.5.%">--Gestion de Señas Anuladas</option>
                    <option value="1.3.8.%">--Stock para Ventas</option>
                
                <option value="mora">Mora</option>
                    <option value="1.4.1.%">--Cuotas Encuadre</option>
                    <option value="1.4.10.%">--Cola de llamados de Mora Especializada</option>
                    <option value="1.4.13.%">--Mora Tardía</option>
                    <option value="1.4.9.%">--Cola de llamados de Mora Temprana</option>


                <option value="call">Call Center</option>
                    <option value="1.5.1.%">--Definicion Campaña Mails</option>
                    <option value="1.5.2.%">--Definicion Campaña SMS</option>

                <option value="personal">Personal</option>
                    <option value="1.6.1.%">--Legajos</option>
                    <option disabled value="1.6.2.%">----Reportes</option>
                        <option value="1.6.2.1.%">----Estados</option>
                        <option value="1.6.2.2.%">----Obsequios</option>
                        <option value="1.6.2.3.%">----Sueldos Mensual</option>
                        <option value="1.6.2.4.%">----Sueldos Trimestral</option>
                        <option value="1.6.2.5">----Resumen del Período</option>


                <option value="config">Config Datos Generales</option>
                <option value="1.7.16_%">--Usuarios</option>
                <option value="1.8%">Contabilidad 1</option>
                <option value="1.8.1_%">--Tesoreria</option>
                <option value="1.8.2_%">--Ventas</option>
                <option value="1.8.4.7_%">----Clientes Facturacion</option>
                <option value="1.8.2.3_%">----Facturacion</option>
                <option value="1.8.3_%">--Bancos</option>
                <option value="1.8.4_%">--Contabilidad General</option>
                <option value="1.8.4.2_%">----Consultas</option>
                <option value="1.8.6_%">--Centro de costos</option>
                <option value="1.8.7_%">--Proveedores</option>
                <option value="1.8.8_%">--Presupuestos</option>
                <option value="1.8.9_%">--Patentamiento Planes de Ahorro</option>
                <option value="1.8.9.8_%">----Registraciones</option>
                <option value="1.9%">Contabilidad 2</option>
                <option value="1.10%">Reportes</option>
                <option value="1.11%">Plan Subite</option>
                <option value="1.12%">Entrega Convencionales</option>
                <option value="1.13%">Mini Emprendedores</option>
                <option value="1.14%">Compra Rescindidos</option>
                <option value="1.15%">Usados</option>
                <option value="1.16%">Pilot</option>
                <option value="1.17%">Stock vehiculos Plan Ahorro</option>
                <option value="1.18%">Seguros</option>
            </select>
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            padding: '2rem'
        }}>
            {
               selectedRoles.length && selectedRoles.map(e => 
                    <span key={e.rl_codigo} style={{width: 'fit-content'}}>
                        {e.rl_descripcion} {' '}
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


                    </span>
                    
                    )
            }
        </div>

        </div>
    )
}

export default RolesForm