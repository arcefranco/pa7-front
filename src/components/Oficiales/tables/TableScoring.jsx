import { useMemo } from "react";
import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import TableContainer from '../../GerentesTable/TableContainer';
import * as BiIcons from 'react-icons/bi';
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters} from 'react-table';
import styles from '../../GerentesTable/Gerentes.module.css';
import Swal from 'sweetalert2';
import { deleteOficiales } from "../../../reducers/Oficiales/OficialesSlice";
import { useNavigate } from "react-router-dom";
import { ActiveFilter, SearchFilter } from "../../GerentesTable/ActiveFilter";
import {InactiveFilter} from "../InactiveFilter"
const TableScoring = () => {

    const {oficialesSelected} = useSelector(state => state.oficiales)
    const {roles} = useSelector((state) => state.login.user)
    const rolAltayModif = roles.find(e => e.rl_codigo === '1.2.2' || e.rl_codigo === '1')
    const dispatch = useDispatch()
    
    const navigate = useNavigate()
    const defaultColumns = useMemo(() => [
        {
            Header: "Código ",
            accessor: "Codigo",
            Cell: ({ value }) => <strong>{value}</strong>,
            Filter: false
            
          },      
          {
            Header: "Nombre",
            accessor: "Nombre",
            ShortHeader:"Nombre",
            Filter: SearchFilter
          },
          {
            Header: "Usuario",
            accessor: "IdUsuarioLogin",
            ShortHeader: "Usuario",
            Filter: SearchFilter
          },
          {
            Header: "Activo",
            accessor: "Inactivo",
            Cell: (value) => value.value === 0 ? 'Si' : 'No',
            ShortHeader: "Activo",
            Filter: InactiveFilter
          },
          {
            Header: "Objetivo",
            accessor: "Objetivo",
            ShortHeader: "Objetivo",
            Filter: false
          },
          {
            Header: "",
            accessor: "Codigo",
            id: 'modify',
            Cell: (value) => ( rolAltayModif ? 
            <button style={{background:"burlywood"}} className={styles.buttonRows}  onClick={(()=> navigate(`/modifOficiales/Scoring/${value.value}`))}>Modificar</button> :
            <button style={{background:"silver"}} className={styles.buttonRows} disabled>Modificar</button>
            ),
            Filter: false
          },
          {
            Header: "",
            accessor: "Codigo",
            id: 'delete',
            Cell: (value) => (
              rolAltayModif ? 
              <button style={{background:"red"}} onClick={(()=> {
                Swal.fire({
                  icon:'info',
                  showConfirmButton: true,
                  showCancelButton:true,
                  text: 'Esta seguro que desea eliminar?'
                }).then((result) => {
                  if(result.isConfirmed){
                     dispatch(deleteOficiales({oficialName: 'Scoring', Codigo: value.value})) 
                  }
                })
    
            })} className={styles.buttonRows} >Eliminar</button> : <button style={{background:"silver"}} className={styles.buttonRows} disabled>Eliminar</button> ),
            Filter: false
          },     
    ],
    []

)

    const { getTableProps, getTableBodyProps, 
        headerGroups, page,  nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        state,
        setGlobalFilter,
        prepareRow,
      } =
        useTable({ columns: defaultColumns , data: oficialesSelected, initialState:{pageSize:15} }, useGlobalFilter, useFilters, 
            useSortBy, usePagination,
            );
            const {pageIndex, pageSize} = state
    const {globalFilter} = state

    return   (         
    
    <TableContainer>
    <div className={styles.tableContainer}>
    <table {...getTableProps()}>

      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              
              <th>
                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                 
                 <span>
                  {column.isSorted? (column.isSortedDesc? column.render("ShortHeader") +' ▼' : column.render("ShortHeader")+ '▲'  ): 
                  column.render("Header")}</span>
                 
                 </div>
              <div>{column.canFilter ?  column.render('Filter')  : null}</div>
              </th>
             
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
    <div>
      <span className={styles.pageIndex}>Página {' '}
      <strong>
        {pageIndex + 1} de {pageOptions.length}
      </strong>{' '}
      </span>
      <button className={styles.pageButton} onClick={()=> previousPage()} disabled={!canPreviousPage}>Anterior</button>
      <button className={styles.pageButton} onClick={()=> nextPage()} disabled={!canNextPage}>Siguiente</button>
    </div>
    
     </TableContainer>
    )

}

export default TableScoring