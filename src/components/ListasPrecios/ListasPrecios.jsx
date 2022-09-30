import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListas, getModelos, createLista } from "../../reducers/ListasPrecios/ListaSlice";
import TitleLogo from "../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import styles from './ListaItem.module.css'
import Swal from "sweetalert2";
import { ReturnLogo } from "../../helpers/ReturnLogo";
import * as AiIcons from 'react-icons/ai';
import ListaItem from "./ListaItem";

const ListasPrecios = () => {

    const dispatch = useDispatch()
    const {listas, nuevaLista, deletedLista} = useSelector((state) => state.listasprecios)
    const {empresaReal, marca, codigoMarca} = useSelector((state) => state.login.user)
    const [newList, setNewList] = useState(false)
    const [input, setInput] = useState({
        Marca: codigoMarca,
        Nombre: '',
        VigenciaD: '',
        VigenciaH: ''
    })

    useEffect(() => {
        dispatch(getListas())
    }, [])

    useEffect(() => {

     if(nuevaLista.status === true) dispatch(getListas())
     if(nuevaLista.status === false) {
        Swal.fire({
            icon: 'error',
            title: nuevaLista.message,
            showConfirmButton: true,
            showCancelButton: true,
            timer: 10000,
          })
     }
     if(deletedLista.status === true) dispatch(getListas())
     if(deletedLista.status === false) {
        Swal.fire({
            icon: 'error',
            title: deletedLista.message,
            showConfirmButton: true,
            showCancelButton: true,
            timer: 10000,
          })
     }  
    }, [nuevaLista, deletedLista])

    
    useEffect(() => {
        dispatch(getModelos())

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newForm = { ...input, [name]: value };
        setInput(newForm);        

    };

    return (
        <div>
        <TitleLogo>
          <div>
            <span>{empresaReal}</span>
            <ReturnLogo empresa={empresaReal}/>
          </div>
        <TitlePrimary>Listas de precios ({marca})</TitlePrimary>
        </TitleLogo>
        <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
        }}>
        <AiIcons.AiFillPlusCircle style={{
                marginRight: '20px',
                marginBottom: '20px',
                width: '2rem',
                height: '2rem',
                cursor: 'pointer'
            }} onClick={() => setNewList(!newList)}/>

        </div>
        <div style={{textAlign: '-webkit-center'}}>
            {
                newList && <div className={styles.item} style={{    display: 'flex',
                    justifyContent: 'space-between'}}>

                    <input type="text" name="Nombre" onChange={handleChange} placeholder="Nombre"/>
                    <div>
                    <span>Vigencia Desde: </span>
                    <input type="date" onChange={handleChange}  name="VigenciaD" />
                    </div>
                    <div>
                    <span>Vigencia Hasta: </span>
                    <input type="date" onChange={handleChange}  name="VigenciaH" />
                    </div>
                    <button onClick={() =>{
                        
                        dispatch(createLista(input))
                        setInput({
                            Marca: codigoMarca,
                            Nombre: '',
                            VigenciaD: '',
                            VigenciaH: ''
                        })
                        setNewList(false)
                        
                        }}>Agregar</button>
                </div>
            }

            {
                listas && listas.map(e => 
                    <ListaItem Codigo={e.Codigo} Descripcion={e.Descripcion} VigenciaD={e.VigenciaDesde.slice(0,10)} VigenciaH={e.VigenciaHasta ? e.VigenciaHasta.slice(0,10) : null}/>
                    )
            }

        </div>

        </div>
    )
}

export default ListasPrecios