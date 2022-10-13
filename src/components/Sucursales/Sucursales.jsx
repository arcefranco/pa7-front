import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSucursales, endUpdate, resetStatus, resetSucursales, createSucursal } from "../../reducers/Sucursales/SucursalesSlice";
import styles from '../../styles/Table.module.css'
import * as AiIcons from 'react-icons/ai';
import SucursalesItem from "./SucursalesItem";
import Pagination from "../Pagination/Pagination";
import TitleLogo from "../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import TableContainer from "../GerentesTable/TableContainer";
import ModalStatus from "../ModalStatus";
import ReactTooltip from "react-tooltip";
import { ReturnLogo } from "../../helpers/ReturnLogo";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";


const Sucursales = () => {
    const dispatch = useDispatch()
    const {empresaReal} = useSelector(state => state.login.user)
    const {sucursales, sucursalStatus} = useSelector(state => state.sucursales) 
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(15);
    const [modal, setModal] = useState(false)
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const [inEdit, setInEdit] = useState('')
    const [newField, setNewField] = useState(false)
    const [newSucursal, setNewSucursal] = useState({
        Nombre: ''
    })
    const actualInEdit = useRef(inEdit);
    useEffect(() => {

        dispatch(getAllSucursales())

    }, [])

    
    
    useEffect(() => {
        actualInEdit.current = inEdit; //Actualizar el estado de inEdit para hacer el endUpdate al actualizar/desmontar
    }, [inEdit]);
    
    
    useEffect(() => {
        
        function endEdit () {
            dispatch(endUpdate({Codigo: actualInEdit.current}))
        }
        
        window.addEventListener('beforeunload', endEdit) 
        
        return () => {
            window.removeEventListener('beforeunload', endEdit)
            dispatch(endUpdate({Codigo: actualInEdit.current}))
        } 
    }, [])

    useEffect(() => { //Manejar actualizaciones de vendedores (ABM) y su inUpdate
        setModal(true)

        function resetModal () {
            dispatch(resetStatus())
            setModal(false)
        }

         if(Object.keys(sucursalStatus).length){ 
            setTimeout(resetModal, 5000)
            
        } 

        if(sucursalStatus?.status === true){
            resetNewField()
            dispatch(getAllSucursales())
        }

    }, [sucursalStatus]) 
    
    useEffect(() => {
        if(Object.keys(sucursalStatus).includes('codigo')) {
            setInEdit(sucursalStatus?.codigo)
        }

        if(sucursalStatus?.status === false) {
            setModal(true)
        }
        
    }, [sucursalStatus])

    const handleChange = (e) => {
                
        const {name , value} = e.target
        const newForm = {...newSucursal,
            [name]: value,
        }
        
        setNewSucursal(newForm)
    }

    const handleSubmit = () => {
        dispatch(createSucursal(newSucursal))
    }

    const resetNewField = () => {
        setNewField(false)
        setNewSucursal({
            Nombre: ''
        })
    }



    const currentRecords = sucursales.slice(indexOfFirstRecord, 
        indexOfLastRecord);

    const nPages = Math.ceil(sucursales?.length / recordsPerPage)

    return (
        
        <div className={styles.container}>
        {
                modal && Object.keys(sucursalStatus).length && Object.keys(sucursalStatus).includes('status') ? 
                <ModalStatus status={sucursalStatus?.status} message={sucursalStatus?.message}/> :
                null
            }

        <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Sucursales</TitlePrimary>
        </TitleLogo>
        <div className={styles.buttonAddContainer}>
            <ReactTooltip id="botonTooltip2">
                Agregar nueva sucursal
                </ReactTooltip>  
            <AiIcons.AiFillPlusCircle className={styles.plusCircle}
             onClick={() => setNewField(!newField)} data-tip data-for="botonTooltip2" />

        </div>

        <TableContainer>
            <table>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>

                {
                    newField && 

                    <tr>
                        <td></td>
                        <td><input type="text" name="Nombre" value={newSucursal.Nombre} onChange={handleChange}/></td>
                        <td></td>
                        <td><ButtonPrimary onClick={handleSubmit}>Agregar</ButtonPrimary></td>
                        <td></td>
                    </tr>
                }

                {
                    currentRecords && currentRecords.map(e => <SucursalesItem key={e.Codigo} Codigo={e.Codigo} Nombre={e.Nombre}/>)
                }
            </table>
        <Pagination
            nPages = { nPages }
            currentPage = { currentPage } 
            setCurrentPage = { setCurrentPage }
            />
        </TableContainer>
        </div>
    )
}

export default Sucursales