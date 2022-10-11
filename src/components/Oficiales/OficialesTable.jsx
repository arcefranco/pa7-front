import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/Table.module.css';
import { ExportCSV } from '../../helpers/exportCSV';
import { getOficialSelected, getOficialCategoria } from "../../reducers/Oficiales/OficialesSlice";
import Swal from 'sweetalert2';
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
import ButtonPrimary from '../../styled-components/buttons/ButtonPrimary';




const OficialesTable = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

        const {roles, empresaReal} = useSelector((state) => state.login.user)
        const rolAltayModif = roles.find(e => e.rl_codigo === '1.2.2' || e.rl_codigo === '1')
        const {oficialesSelected, oficialStatus, oficialCategoria} = useSelector(state => state.oficiales)
        const {table} = useParams()
/*         const [columnsName, setColumnsName] = useState(oficialCategoria ? oficialCategoria : [])  */

        const onChange = (e) => {
            /* setColumnsName(e.target.value) */
            dispatch(getOficialCategoria(e.target.value))
            dispatch(getOficialSelected({oficialName: e.target.value}))
        }
        useEffect(() => {
          dispatch(getAllSupervisores())
          if(oficialCategoria){
            dispatch(getOficialCategoria(oficialCategoria))
            /* setColumnsName(oficialCategoria) */
          }
        }, [])
        useEffect(() => {
            if(oficialStatus && oficialStatus.status === false){
                Swal.fire({
                  icon:'error',
                  text: oficialStatus.message
                })
              }
              if(oficialStatus && oficialStatus.status === true){
                Swal.fire({
                  icon:'success',
                  showConfirmButton: true,
                  text: oficialStatus.message
                }).then((result) => {
                  if(result.isConfirmed){
                    window.location.reload()
                  }
                })
              }
            }
        ,[oficialStatus])

    
    return (
        <div style={{height: '100vh'}}>
          <TitleLogo>
            <div>
              <span>{empresaReal}</span>
              <ReturnLogo empresa={empresaReal}/>
            </div>
            <TitlePrimary style={{textAlign: 'start'}}>Oficiales {table === 'Licitacion' ? 'Licitación' : table === 'Asignacion' ? 'Asignación' : table === 'Adjudicacion' ? 'Adjudicación' : table}</TitlePrimary>

          </TitleLogo>
         
{/*             <span>Seleccione oficial: </span>
            <select id='select' defaultValue={oficialCategoria ? oficialCategoria : null} onChange={(e) => onChange(e)}>
                <option value="">---</option>
                <option value="Adjudicaciones">Adjudicacion</option>
                <option value="Licitaciones">Licitacion</option>
                <option value="Plan Canje">Plan Canje</option>
                <option value="Scoring">Scoring</option>
                <option value="Mora">Mora</option>
                <option value="Subite">Subite</option>
                <option value="Compra">Compra Rescind</option>
                <option value="Carga">Carga</option>
                <option value="Patentamiento">Patentamiento</option>
                <option value="Asignacion">Asignacion</option>
            </select> */}
            <span className={styles.titleContainer}>
      <div className={styles.buttonContainer}>
        <Link to={'/oficiales'}>Volver a oficiales</Link>
      {rolAltayModif ?
       <><Link to={`/modifOficiales/${table}`}><button>Nuevo</button></Link>
        <ExportCSV csvData={oficialesSelected} fileName={'sucursales'} /></> :
         <Link to={'/altaOficiales'}><button disabled>Nuevo</button></Link>
      }</div>
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