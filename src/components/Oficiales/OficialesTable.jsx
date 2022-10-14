import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles/Table.module.css';
import { ExportCSV } from '../../helpers/exportCSV';
import {  getOficialCategoria, resetStatus } from "../../reducers/Oficiales/OficialesSlice";
import TableMora from './tables/TableMora';
import TableSubite from './tables/TableSubite';
import TableScoring from './tables/TableScoring';
import TableAdjudicacion from './tables/TableAdjudicacion';
import TableCanje from './tables/TableCanje';
import TableLicitaciones from './tables/TableLicitaciones';
import TableAsignacion from './tables/TableAsignacion';
import TablePatentamiento from './tables/TablePatentamiento';
import TableCarga from './tables/TableCarga';
import TableCompra from './tables/TableCompra';
import { useEffect } from 'react';
import { getAllSupervisores } from '../../reducers/Usuarios/UsuariosSlice';
import TitlePrimary from '../../styled-components/h/TitlePrimary';
import { ReturnLogo } from "../../helpers/ReturnLogo";
import TitleLogo from '../../styled-components/containers/TitleLogo';
import ModalStatus from '../ModalStatus';




const OficialesTable = () => {

    const dispatch = useDispatch()

        const {roles, empresaReal} = useSelector((state) => state.login.user)
        const rolAltayModif = roles.find(e => e.rl_codigo === '1.2.2' || e.rl_codigo === '1')
        const {oficialesSelected, oficialStatus, oficialCategoria} = useSelector(state => state.oficiales)
        const [modal, setModal] = useState(false)
        const {table} = useParams()




        useEffect(() => {
          dispatch(getAllSupervisores())
          if(oficialCategoria){
            dispatch(getOficialCategoria(oficialCategoria))
          }
        }, [])

        useEffect(() => {
          const reloadCount = sessionStorage.getItem('reloadCount');
          if(reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
          } else {
            sessionStorage.removeItem('reloadCount');
          }
        }, [])
        

        useEffect(() => { //Manejar actualizaciones de vendedores (ABM) y su inUpdate
          setModal(true)
  
          function resetModal () {
              dispatch(resetStatus())
              setModal(false)
          }
  
           if(Object.keys(oficialStatus).length){ 
              setTimeout(resetModal, 5000)
              
          } 
  
      }, [oficialStatus]) 

    
    return (
        <div style={{height: '100vh'}}>
                            {
                modal && Object.keys(oficialStatus).length && Object.keys(oficialStatus).includes('status') ? 
                <ModalStatus status={oficialStatus?.status} message={oficialStatus?.message}/> :
                null
            } 
          <TitleLogo>
            <div>
              <span>{empresaReal}</span>
              <ReturnLogo empresa={empresaReal}/>
            </div>
            <TitlePrimary style={{textAlign: 'start'}}>Oficiales {table === 'Licitacion' ? 'Licitación' : table === 'Asignacion' ? 'Asignación' : table === 'Adjudicacion' ? 'Adjudicación' : table}</TitlePrimary>

          </TitleLogo>
         

            <span className={styles.titleContainer}>
      <div className={styles.buttonContainer}>
        <Link to={'/oficiales'}>Volver a oficiales</Link>
</div>
      </span>
          
            {
        {
          'Mora': <TableMora />,
          'Scoring': <TableScoring/>,
          'Adjudicacion': <TableAdjudicacion/>,
          'Licitacion': <TableLicitaciones/>,
          'Plan Canje': <TableCanje />,
          'Carga': <TableCarga />,
          'Patentamiento': <TablePatentamiento />,
          'Asignacion': <TableAsignacion />,
          'Subite': <TableSubite/>,
          'Compra': <TableCompra/>
        }[table]
      }

        </div>
    )
}

export default OficialesTable