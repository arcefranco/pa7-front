import React, {useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getGerentes, postGerentes, reset, endUpdate, resetGerenteById, resetStatus,  getGerentesById } from '../../reducers/Gerentes/gerentesSlice'
import TableContainer from '../GerentesTable/TableContainer'
import Gerentes2Item from './Gerentes2Item'
import * as AiIcons from 'react-icons/ai';
import styles from './Gerentes.module.css'
import Pagination from '../Pagination/Pagination'
import TitlePrimary from '../../styled-components/h/TitlePrimary'
import TitleLogo from '../../styled-components/containers/TitleLogo'
import { ReturnLogo } from '../../helpers/ReturnLogo'
import ButtonPrimary from '../../styled-components/buttons/ButtonPrimary'
import ModalStatus from '../ModalStatus'


const Gerentes2 = () => {
    const dispatch = useDispatch()
    const {empresaReal} = useSelector(
      (state) => state.login.user)

   const {gerentes, statusNuevoGerente, gerentesById} = useSelector(


      (state) => state.gerentes)
    const [newField, setNewField] = useState(false)
    const [newGerente, setNewGerente] = useState({
        Nombre: '',
        Activo: 0
    })
    const [modal, setModal] = useState(true)
    const [gerentesFiltered, setGerentesFiltered] = useState('')
    const [filterNombre, setFilterNombre] = useState('')
    const [filterActivo, setFilterActivo] = useState('')
    const [inEdit, setInEdit] = useState('')
    const actualInEdit = useRef(inEdit);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    
        useEffect(() => {
            
            dispatch(getGerentes())
            

            }, [])

        useEffect(() => {
            
            actualInEdit.current = inEdit; //Actualizar el estado de inEdit para hacer el endUpdate al actualizar/desmontar
        
        }, [inEdit]);

        useEffect(() => {

            function endEdit () {
                dispatch(endUpdate({Codigo: actualInEdit.current}))
            }
 
            window.addEventListener('beforeunload', endEdit) //evento para remover el inUpdate cuando esta abierto inEdit y se actualiza
            
            return () => {
                window.removeEventListener('beforeunload', endEdit)
                dispatch(endUpdate({Codigo: actualInEdit.current}))
            } 
        }, []) 


        useEffect(() => {
            setGerentesFiltered(gerentes)
        }, [gerentes])

        useEffect(() => {
            if(gerentesById?.status === true){

                setInEdit(gerentesById?.codigo)
            }
        }, [gerentesById])

    
    useEffect(() => {
        if(filterNombre.length || filterActivo.length){
            setCurrentPage(1)
            
            if(filterActivo.length){
                setGerentesFiltered(
                    gerentes
                .filter(e => {
                    return e.Nombre.toLowerCase().includes(filterNombre.toLocaleLowerCase()) && e.Activo === parseInt(filterActivo) 
                }))
                    

            }else{
                setGerentesFiltered(
                    gerentes
                .filter(e => {
                    return e.Nombre.toLowerCase().includes(filterNombre.toLocaleLowerCase())
                }))
            }
            
        }else{
            setGerentesFiltered(gerentes)
        }
    },[filterActivo, filterNombre])

    

    const currentRecords = gerentesFiltered.slice(indexOfFirstRecord, 
            indexOfLastRecord);

    const nPages = Math.ceil(gerentesFiltered?.length / recordsPerPage)

    
    useEffect(() => {
        if(gerentesById?.status === false){
            setTimeout(() => {setModal(false)}, 5000)
        }
    }, [gerentesById])
    
    useEffect(() => {
        setModal(true)

        function resetModal () {
                dispatch(resetStatus())
                setModal(false)
        }
        function resetGerente () {
            dispatch(resetGerenteById())
            setModal(false)
    }

        
        if(statusNuevoGerente && statusNuevoGerente.length){
            setTimeout(resetModal, 5000)
            
        }
        if(gerentesById && Object.keys(gerentesById).length){
             setTimeout(resetGerente, 5000) 
            
        }  
        if(statusNuevoGerente[0]?.status === true){  //como no se limpia el estado y el status queda en true no me deja editar porque hace el getGerentes automaticamente
            dispatch(getGerentes())
        } 
        
    }, [statusNuevoGerente, gerentesById])     
    
/*     useEffect(() => {
        setTimeout(() => {dispatch(reset())}, 5000)
    }, [modal]) */

    const handleCheckChange = (e) => {
        const { name} = e.target;
        var value = e.target.checked
        value = e.target.checked? 1 : 0
        const newForm = { ...newGerente, [name]: value };
        setNewGerente(newForm);
    };
    
    
    
    const HandleChange =  (e) =>{
  
    
        const {name , value} = e.target
        const newForm = {...newGerente,
          [name]:value,
          }
        
        setNewGerente(newForm)
        
      }
    return (
        <div>
            {
                (statusNuevoGerente.length && modal) ? 
                <ModalStatus message={statusNuevoGerente[0]?.data} status={statusNuevoGerente[0]?.status}/> :
                null

            }
            {
                (gerentesById?.status === false && modal) ? 
                <ModalStatus message={gerentesById?.message} status={gerentesById?.status}/> :
                null

            }

            <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Gerentes</TitlePrimary>
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
                            <input value={newGerente.Nombre} name="Nombre" onChange={HandleChange} type="text" />
                        </td>
                        <td>
                            <input value={newGerente.Activo} name="Activo" onChange={handleCheckChange} type="checkbox" />
                        </td>
                        <td></td>
                        <td>
                            <ButtonPrimary style={{margin: '0.8em'}}
                            onClick={() =>{
                                 dispatch(postGerentes(newGerente))
                                    setNewGerente({
                                        Nombre: '',
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
                    <Gerentes2Item key={e.Codigo} Codigo={e.Codigo} Nombre={e.Nombre} Activo={e.Activo}/>)
                }

                </table>
            </TableContainer>
        </div>
    )
}

export default Gerentes2