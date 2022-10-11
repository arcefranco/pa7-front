import React, {useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getVendedores, getAllOficialesScoring, 
    reset, getAllTeamLeaders, getAllOficialesMora, postVendedores, endUpdate, resetStatus, resetVendedoresById } from '../../reducers/Vendedores/vendedoresSlice';
import TableContainer from '../GerentesTable/TableContainer'
import * as AiIcons from 'react-icons/ai';
import VendedorItem from './VendedorItem';
import styles from '../../styles/Table.module.css'
import Pagination from '../Pagination/Pagination'
import TitlePrimary from '../../styled-components/h/TitlePrimary'
import TitleLogo from '../../styled-components/containers/TitleLogo'
import { ReturnLogo } from '../../helpers/ReturnLogo'
import ButtonPrimary from '../../styled-components/buttons/ButtonPrimary'
import ModalStatus from '../ModalStatus'


const Vendedores2 = () => {


    const dispatch = useDispatch()
    const {empresaReal} = useSelector(
      (state) => state.login.user)
   const {vendedores, statusNuevoVendedor, teamleader, oficialesScoring, oficialesMora, vendedoresById} = useSelector(
      (state) => state.vendedores)
    const [newField, setNewField] = useState(false)
    const [newVendedor, setNewVendedor] = useState({
        Nombre: '',
        TeamLeader: '',
        OficialS: '',
        OficialM: '',
        FechaBaja: '',
        Escala: '',
        Activo: 0
    })
    const [vendedoresFiltered, setVendedoresFiltered] = useState('')
    const [filterNombre, setFilterNombre] = useState('')
    const [filterActivo, setFilterActivo] = useState('')
    const [modal, setModal] = useState(true)
    const [inEdit, setInEdit] = useState('')
    const actualInEdit = useRef(inEdit);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    
        useEffect(() => {
            
            Promise.all([dispatch(getVendedores()), dispatch(getAllOficialesScoring(),
                    dispatch(getAllTeamLeaders(), dispatch(getAllOficialesMora()))
                )])
           
            }, [])

            useEffect(() => {
                actualInEdit.current = inEdit; //Actualizar el estado de inEdit para hacer el endUpdate al actualizar/desmontar
              }, [inEdit]);


         useEffect(() => {
            setVendedoresFiltered(vendedores)
        }, [vendedores]) 

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
    
    useEffect(() => {
        if(filterNombre.length || filterActivo.length){
            setCurrentPage(1)
            
            if(filterActivo.length){
                setVendedoresFiltered(
                    vendedores
                .filter(e => {
                    return e.Nombre.toLowerCase().includes(filterNombre.toLocaleLowerCase()) && e.Activo === parseInt(filterActivo) 
                }))
                    

            }else{
                setVendedoresFiltered(
                    vendedores
                .filter(e => {
                    return e.Nombre.toLowerCase().includes(filterNombre.toLocaleLowerCase())
                }))
            }
            
        }else{
            setVendedoresFiltered(vendedores)
        }
    },[filterActivo, filterNombre])

    

    const currentRecords = vendedoresFiltered.slice(indexOfFirstRecord, 
            indexOfLastRecord);

    const nPages = Math.ceil(vendedoresFiltered?.length / recordsPerPage)

    const HandleChange =  (e) =>{
  
    
        const {name , value} = e.target
        let parseValue = value
        if(name === "OficialS" || name === "OficialM" || name === "TeamLeader" || name === "Escala") {
            parseValue = parseInt(value)
        }
        const newForm = {...newVendedor,
          [name]: parseValue,
          }
        
        setNewVendedor(newForm)
        
      }

    useEffect(() => { //Manejar actualizaciones de vendedores (ABM) y su inUpdate
        setModal(true)

        function resetModal () {
            dispatch(resetStatus())
            setModal(false)
        }
        
        function resetGerente () {
            dispatch(resetVendedoresById())
            setModal(false)
        }

         if(statusNuevoVendedor && statusNuevoVendedor.length){ 
            setTimeout(resetModal, 5000)
            
        } 
        if(vendedoresById && Object.keys(vendedoresById).length && vendedoresById?.status === false){
            setTimeout(resetGerente, 5000)
            
        } 
        if(statusNuevoVendedor[0]?.status === true){
            dispatch(getVendedores())
        }

    }, [statusNuevoVendedor, vendedoresById]) 
    

    useEffect(() => {
        setTimeout(() => {dispatch(reset())}, 5000)
    }, [modal])

      const handleCheckChange = (e) => {
        const { name} = e.target;
        var value = e.target.checked
        value = e.target.checked? 1 : 0
        const newForm = { ...newVendedor, [name]: value };
        setNewVendedor(newForm);
    };
    useEffect(() => {
        if(vendedoresById?.status === true){

            setInEdit(vendedoresById?.codigo)
        }
    }, [vendedoresById])
    
  

    

    return (
        <div>
            {
                (statusNuevoVendedor.length && modal) ? 
                <ModalStatus message={statusNuevoVendedor[0]?.data} status={statusNuevoVendedor[0]?.status}/> :
                null
            }
            {
                (vendedoresById?.status === false && modal) ? 
                <ModalStatus message={vendedoresById?.message} status={vendedoresById?.status}/> :
                null
            }

            <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Vendedores</TitlePrimary>
        </TitleLogo>
        <div className={styles.buttonAddContainer}>
            <AiIcons.AiFillPlusCircle className={styles.plusCircle}
             onClick={() => setNewField(!newField)} data-tip data-for="botonTooltip2" />

        </div>
            <Pagination
            nPages = { nPages }
            currentPage = { currentPage } 
            setCurrentPage = { setCurrentPage }
            />
            <TableContainer>
                <table>
                <tr>
                    <th>Codigo

                    </th>
                    <th >
                        <span>
                          Nombre   
                        </span> <br />
                            
                <input type="text" 
                className={styles.inputFilterColumn} 
                value={filterNombre}
                onChange={(e) => setFilterNombre(e.target.value)}    
                    />
                </th>
                    <th>Team Leader</th>
                    <th>Oficial Scoring</th>
                    <th>Oficial Mora</th>
                    <th>Fecha Baja</th>
                    <th>Escala</th>
                    <th>
                        <span>  
                            Activo
                            </span> <br />
                        <select onChange={(e) => setFilterActivo(e.target.value)} name="" id="">
                            <option value={''}>Todos</option>
                            <option value={1}>Si</option>
                            <option value={0}>No</option>
                        </select>

                        
                      
                    </th>
                    <th></th>
                    <th></th>
                </tr>

                {
                    newField && 
                    <tr>
                        <td></td>
                        <td>
                            <input value={newVendedor.Nombre} name="Nombre" onChange={HandleChange} type="text" />
                        </td>
                        <td>
                            <select name="TeamLeader" id="" value={newVendedor.TeamLeader} onChange={HandleChange}>
                                <option value="*">---</option>
                                {
                                    teamleader && teamleader.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                }
                            </select>
                        </td>
                        <td>
                            <select name="OficialS" id="" value={newVendedor.OficialS} onChange={HandleChange}>
                                <option value="*">---</option>
                                {
                                    oficialesScoring && oficialesScoring.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                }
                            </select>
                        </td>
                        <td>
                            <select name="OficialM" id="" value={newVendedor.OficialM} onChange={HandleChange}>
                                <option value="*">---</option>
                                {
                                    oficialesMora && oficialesMora.map(e => <option value={e.Codigo}>{e.Nombre}</option>)
                                }
                            </select>
                        </td>
                        <td>
                                <input type="date" name='FechaBaja' value={newVendedor.FechaBaja} onChange={HandleChange}/>
                        </td>
                        <td>
                                <select name="Escala" value={newVendedor.Escala} onChange={HandleChange} id="">
                                    <option value="*">---</option>
                                    <option value={1}>Margian</option>
                                    <option value={2}>Gestión Financiera</option>
                                </select>
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <input value={newVendedor.Activo} name="Activo" onChange={handleCheckChange} type="checkbox" />
                        </td>
                        <td></td>
                        <td>
                            <ButtonPrimary style={{margin: '0.8em'}}
                             onClick={() =>{
                                 dispatch(postVendedores(newVendedor))
                                    setNewVendedor({
                                        Nombre: '',
                                        TeamLeader: '',
                                        OficialS: '',
                                        OficialM: '',
                                        FechaBaja: '',
                                        Escala: '',
                                        Activo: 0
                                    })
                                    setNewField(false)
                                }} 
                            >Agregar</ButtonPrimary>
                        </td>
                        <td></td>
                    </tr>
                }
                 
                {
                    currentRecords && currentRecords.map(e => 
                    <VendedorItem 
                    key={e.Codigo} 
                    Codigo={e.Codigo} 
                    Nombre={e.Nombre} 
                    TeamLeader={e.TeamLeader}
                    OficialS={e.OficialScoring}
                    OficialM={e.OficialMora}
                    Categoria={e.Categoria}
                    Escala={e.Escala} 
                    FechaBaja={e.FechaBaja}
                    Activo={e.Activo}/>)
                }

                </table>
            </TableContainer>
        </div>
    )
}

export default Vendedores2