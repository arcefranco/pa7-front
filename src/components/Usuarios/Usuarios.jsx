import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGerentes, getAllSupervisores, getAllTeamLeaders, 
    getAllVendedores, createUsuario, reset, getAllUsuarios, resetStatus, updateUsuario, endUpdate} from "../../reducers/Usuarios/UsuariosSlice";
import styles from '../../styles/Table.module.css'
import * as AiIcons from 'react-icons/ai';
import UsuariosItem from "./UsuariosItem";
import Pagination from "../Pagination/Pagination";
import TitleLogo from "../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import TableContainer from "../GerentesTable/TableContainer";
import ModalStatus from "../ModalStatus";
import ReactTooltip from "react-tooltip";
import { ReturnLogo } from "../../helpers/ReturnLogo";
import ButtonPrimary from "../../styled-components/buttons/ButtonPrimary";
import { useNavigate } from "react-router-dom";


const Usuarios = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {empresaReal} = useSelector(state => state.login.user)
    const {usuarios, statusNuevoUsuario} = useSelector(state => state.usuarios)
    const [usuariosFiltered, setUsuariosFiltered] = useState('') 
    const [filterNombre, setFilterNombre] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(14);
    const [modal, setModal] = useState(false)
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const [inEdit, setInEdit] = useState('')
    const [newUsuario, setNewUsuario] = useState({
        Nombre: ''
    })
    const actualInEdit = useRef(inEdit);
    useEffect(() => {

        Promise.all([dispatch(getAllUsuarios()), dispatch(getAllVendedores()), dispatch(getAllTeamLeaders()),
            dispatch(getAllSupervisores()), dispatch(getAllGerentes())
        ])
        

    }, [])

    useEffect(() => {
        setUsuariosFiltered(usuarios)
    }, [usuarios]) 

    
    
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
 
         if(Object.keys(statusNuevoUsuario).length){ 
            setTimeout(resetModal, 5000)
            
        }  

        if(statusNuevoUsuario?.status === true){
            dispatch(getAllUsuarios())
        }

    }, [statusNuevoUsuario]) 
    
    useEffect(() => {
        if(Object.keys(statusNuevoUsuario).includes('codigo')) {
            setInEdit(statusNuevoUsuario?.codigo)
        }

        if(statusNuevoUsuario?.status === false) {
            setModal(true)
        }
        
    }, [statusNuevoUsuario])

    useEffect(() => {
        if(filterNombre.length){
            setCurrentPage(1)
            
                setUsuariosFiltered(
                    usuarios
                .filter(e => {
                    return e.Usuario.toLowerCase().includes(filterNombre.toLocaleLowerCase())
                }))
            
            
        }else{
            setUsuariosFiltered(usuarios)
        }
    },[filterNombre])

    const handleChange = (e) => {
                
        const {name , value} = e.target
        const newForm = {...newUsuario,
            [name]: value,
        }
        
        setNewUsuario(newForm)
    }

    const handleSubmit = () => {
        dispatch(createUsuario(newUsuario))
    }





    const currentRecords = usuariosFiltered.slice(indexOfFirstRecord, 
        indexOfLastRecord);

    const nPages = Math.ceil(usuariosFiltered?.length / recordsPerPage)

    return (
        
        <div className={styles.container}>
        {
                modal && Object.keys(statusNuevoUsuario).length && Object.keys(statusNuevoUsuario).includes('status') ? 
                <ModalStatus status={statusNuevoUsuario?.status} message={statusNuevoUsuario?.message}/> :
                null
            }

        <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Usuarios</TitlePrimary>
        </TitleLogo>
        <div className={styles.buttonAddContainer}>
            <ReactTooltip id="botonTooltip2">
                Agregar nuevo usuario
                </ReactTooltip>  
            <AiIcons.AiFillPlusCircle className={styles.plusCircle}
             onClick={() => navigate('/altaUsuarios')} data-tip data-for="botonTooltip2" />

        </div>

        <TableContainer>
            <table>
                <tr>
                    <th>Código</th>
                    <th>Usuario
                    <br />
                    <input type="text" 
                className={styles.inputFilterColumn} 
                value={filterNombre}
                onChange={(e) => setFilterNombre(e.target.value)}    
                    />

                    </th>
                    <th>Nombre</th>
                    <th>Vendedor</th>
                    <th>Team Leader</th>
                    <th>Supervisor</th>
                    <th>Gerente</th>
                    <th>Email</th>
                    <th>Usuario Anura</th>
                    <th>Scoring</th>
                    <th>Bloqueado</th>
                    <th>Activo</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>



                {
                    currentRecords && currentRecords.map(e => 
                    <UsuariosItem 
                    key={e.ID} 
                    Codigo={e.ID} 
                    Usuario={e.Usuario} 
                    Nombre={e.Nombre}
                    Vendedor={e.Vendedor}
                    TeamLeader={e.teamLeader}
                    Supervisor={e.Supervisor}
                    Email={e.email}
                    Gerente={e.Gerente}
                    Anura={e.UsuarioAnura}
                    Scoring={e.VerSoloScoringAsignado}
                    Bloqueado={e.us_bloqueado}
                    Activo={e.us_activo}
                    
                    />)
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

export default Usuarios