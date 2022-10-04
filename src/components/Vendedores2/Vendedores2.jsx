import React, {useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getVendedores, getAllOficialesScoring, reset, getAllTeamLeaders, getAllOficialesMora } from '../../reducers/Vendedores/vendedoresSlice';
import TableContainer from '../GerentesTable/TableContainer'
import * as AiIcons from 'react-icons/ai';
import VendedorItem from './VendedorItem';
import styles from '../Gerentes2/Gerentes.module.css'
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
   const {vendedores, statusNuevoVendedor} = useSelector(
      (state) => state.vendedores)
    const [newField, setNewField] = useState(false)
    const [newVendedor, setNewVendedor] = useState({
        Nombre: '',
        Activo: 0
    })
    const [vendedoresFiltered, setVendedoresFiltered] = useState('')
    const [filterNombre, setFilterNombre] = useState('')
    const [filterActivo, setFilterActivo] = useState('')

    const [modal, setModal] = useState(true)

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
            setVendedoresFiltered(vendedores)
        }, [vendedores]) 

    
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
        const newForm = {...newVendedor,
          [name]:value,
          }
        
        setNewVendedor(newForm)
        
      }

    useEffect(() => {
        setModal(true)

         if(statusNuevoVendedor && statusNuevoVendedor.length){
            setTimeout(() => {setModal(false)}, 5000)
            
        } 
        if(statusNuevoVendedor[0]?.status === true){
            dispatch(getVendedores())
        }

    }, [statusNuevoVendedor]) 
    

    useEffect(() => {
        setTimeout(() => {dispatch(reset())}, 7000)
    }, [modal])

      const handleCheckChange = (e) => {
        const { name} = e.target;
        var value = e.target.checked
        value = e.target.checked? 1 : 0
        const newForm = { ...newVendedor, [name]: value };
        setNewVendedor(newForm);
    };

    

    return (
        <div>
            {
                (statusNuevoVendedor.length && modal) ? 
                <ModalStatus message={statusNuevoVendedor[0]?.data} status={statusNuevoVendedor[0]?.status}/> :
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
                            <input value={newVendedor.Activo} name="Activo" onChange={handleCheckChange} type="checkbox" />
                        </td>
                        <td>
                            <ButtonPrimary style={{margin: '0.8em'}}
   /*                          onClick={() =>{
                                 dispatch(postGerentes(newVendedor))
                                    setnewVendedor({
                                        Nombre: '',
                                        Activo: 0
                                    })
                                    setNewField(false)
                                }} */
                            >Agregar</ButtonPrimary>
                        </td>
                        <td></td>
                    </tr>
                }
                 
                {
                    currentRecords && currentRecords.map(e => 
                    <VendedorItem key={
                    e.Codigo} 
                    Codigo={e.Codigo} 
                    Nombre={e.Nombre} 
                    TeamLeader={e.TeamLeader}
                    OficialS={e.OficialScoring}
                    OficialM={e.OficialM}
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