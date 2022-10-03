import React, {useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { deleteGerentes, getGerentes, getGerentesById, postGerentes, updateGerentes, reset } from '../../reducers/Gerentes/gerentesSlice'
import TableContainer from '../GerentesTable/TableContainer'
import Gerentes2Item from './Gerentes2Item'
import * as AiIcons from 'react-icons/ai';
import Pagination from './Pagination'
import styles from '../ListasPrecios/ListaItem.module.css'
import TitlePrimary from '../../styled-components/h/TitlePrimary'
import TitleLogo from '../../styled-components/containers/TitleLogo'
import { ReturnLogo } from '../../helpers/ReturnLogo'
import {Link, useNavigate} from 'react-router-dom'
import ButtonPrimary from '../../styled-components/buttons/ButtonPrimary'
import { ExportCSV } from '../../helpers/exportCSV';
import ModalStatus from '../ModalStatus'


const Gerentes2 = () => {
    const dispatch = useDispatch()
    const {user, empresaReal} = useSelector(
      (state) => state.login.user)
   const {gerentes, gerentesById,statusNuevoGerente} = useSelector(
      (state) => state.gerentes)
    const [newField, setNewField] = useState(false)
    const [newGerente, setNewGerente] = useState({
        Nombre: '',
        Activo: 0
    })
    const [gerentesFiltered, setGerentesFiltered] = useState('')
    const [filterNombre, setFilterNombre] = useState('')
    const [filterActivo, setFilterActivo] = useState('')

    const [modal, setModal] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    
        useEffect(() => {
            
            dispatch(getGerentes())
           
    
            }, [])

        useEffect(() => {
            setGerentesFiltered(gerentes)
        }, [gerentes])

    
    useEffect(() => {
        if(filterNombre.length || filterActivo.length){

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

    const HandleChange =  (e) =>{
  
    
        const {name , value} = e.target
        const newForm = {...newGerente,
          [name]:value,
          }
        
        setNewGerente(newForm)
        
      }

    useEffect(() => {
        setModal(true)

         if(statusNuevoGerente && statusNuevoGerente.length){
            setTimeout(() => {setModal(false)}, 5000)
            
        } 
        if(statusNuevoGerente[0]?.status === true){
            dispatch(getGerentes())
        }

    }, [statusNuevoGerente]) 
    

    useEffect(() => {
        setTimeout(() => {dispatch(reset())}, 7000)
    }, [modal])

      const handleCheckChange = (e) => {
        const { name} = e.target;
        var value = e.target.checked
        value = e.target.checked? 1 : 0
        const newForm = { ...newGerente, [name]: value };
        setNewGerente(newForm);
    };

    

    return (
        <div>
            {
                (statusNuevoGerente.length && modal) ? <ModalStatus message={statusNuevoGerente[0]?.data} status={statusNuevoGerente[0]?.status}/> : null
            }

            <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Gerentes</TitlePrimary>
        </TitleLogo>
            <AiIcons.AiFillPlusCircle style={{
                marginBottom: '20px',
                width: '2rem',
                height: '2rem',
                cursor: 'pointer'
            }} onClick={() => setNewField(!newField)} data-tip data-for="botonTooltip2" />
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
                    <th style={{flexDirection: 'column'}}>
                        <span>
                          Nombre   
                        </span> <br />
                            
                <input type="text"  
                style={{width: '7rem',
                        height:'1.2rem',
                        padding: '0.6em',
                        marginTop: '0.2em',
                        marginBottom: '0.2em'}}
                value={filterNombre}
                onChange={(e) => setFilterNombre(e.target.value)}    
                    />
                </th>
                    <th style={{flexDirection: 'column'}}>
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
                    currentRecords && currentRecords.map(e => <Gerentes2Item key={e.Codigo} Codigo={e.Codigo} Nombre={e.Nombre} Activo={e.Activo}/>)
                }

                </table>
            </TableContainer>
        </div>
    )
}

export default Gerentes2