import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPuntosDeVenta, createPuntoDeVenta, endUpdate, resetStatus } from "../../reducers/PuntosDeVenta/puntosSlice";
import styles from '../../styles/Table.module.css'
import * as AiIcons from 'react-icons/ai';
import PuntosItem from "./PuntosItem";
import Pagination from "../Pagination/Pagination";
import TitleLogo from "../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import TableContainer from "../GerentesTable/TableContainer";
import ModalStatus from "../ModalStatus";
import ReactTooltip from "react-tooltip";
import { ReturnLogo } from "../../helpers/ReturnLogo";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";


const PuntosDeVenta = () => {
    const dispatch = useDispatch()
    const {empresaReal} = useSelector(state => state.login.user)
    const {puntosDeVenta, puntoStatus} = useSelector(state => state.puntosDeVenta)
    const [puntosFiltered, setPuntosFiltered] = useState('')
    const [filterNombre, setFilterNombre] = useState('')  
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(13);
    const [modal, setModal] = useState(false)
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const [inEdit, setInEdit] = useState('')
    const [newField, setNewField] = useState(false)
    const [newPunto, setNewPunto] = useState({
        Nombre: ''
    })
    const actualInEdit = useRef(inEdit);
    useEffect(() => {

        dispatch(getAllPuntosDeVenta())

    }, [])

    useEffect(() => {
        setPuntosFiltered(puntosDeVenta)
    }, [puntosDeVenta]) 
    
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

         if(Object.keys(puntoStatus).length){ 
            setTimeout(resetModal, 5000)
            
        } 

        if(puntoStatus?.status === true){
            resetNewField()
            dispatch(getAllPuntosDeVenta())
        }

    }, [puntoStatus]) 
    
    useEffect(() => {
        if(Object.keys(puntoStatus).includes('codigo')) {
            setInEdit(puntoStatus?.codigo)
        }

        if(puntoStatus?.status === false) {
            setModal(true)
        }
        
    }, [puntoStatus])


    useEffect(() => {
        if(filterNombre.length){
            setCurrentPage(1)
            
                setPuntosFiltered(
                    puntosDeVenta
                .filter(e => {
                    return e.Nombre.toLowerCase().includes(filterNombre.toLocaleLowerCase())
                }))
            
            
        }else{
            setPuntosFiltered(puntosDeVenta)
        }
    },[filterNombre])

    const handleChange = (e) => {
                
        const {name , value} = e.target
        const newForm = {...newPunto,
            [name]: value,
        }
        
        setNewPunto(newForm)
    }

    const handleSubmit = () => {
        dispatch(createPuntoDeVenta(newPunto))
    }

    const resetNewField = () => {
        setNewField(false)
        setNewPunto({
            Nombre: ''
        })
    }



    const currentRecords = puntosFiltered.slice(indexOfFirstRecord, 
        indexOfLastRecord);

    const nPages = Math.ceil(puntosFiltered?.length / recordsPerPage)

    return (
        
        <div className={styles.container}>
        {
                modal && Object.keys(puntoStatus).length && Object.keys(puntoStatus).includes('status') ? 
                <ModalStatus status={puntoStatus?.status} message={puntoStatus?.message}/> :
                null
            }

        <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Puntos de Venta</TitlePrimary>
        </TitleLogo>
        <div className={styles.buttonAddContainer}>
            <ReactTooltip id="botonTooltip2">
                Agregar nuevo punto de venta
                </ReactTooltip>  
            <AiIcons.AiFillPlusCircle className={styles.plusCircle}
             onClick={() => setNewField(!newField)} data-tip data-for="botonTooltip2" />

        </div>

        <TableContainer>
            <table>
                <tr>
                    <th>Código</th>
                    <th>Nombre
                    <br />
                    <input type="text" 
                className={styles.inputFilterColumn} 
                value={filterNombre}
                onChange={(e) => setFilterNombre(e.target.value)}    
                    />
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>

                {
                    newField && 

                    <tr>
                        <td></td>
                        <td><input type="text" name="Nombre" value={newPunto.Nombre} onChange={handleChange}/></td>
                        <td></td>
                        <td><ButtonPrimary onClick={handleSubmit}>Agregar</ButtonPrimary></td>
                        <td></td>
                    </tr>
                }

                {
                    currentRecords && currentRecords.map(e => <PuntosItem key={e.Codigo} Codigo={e.Codigo} Nombre={e.Nombre}/>)
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

export default PuntosDeVenta