import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import TitleLogo from "../../styled-components/containers/TitleLogo";
import TitlePrimary from "../../styled-components/h/TitlePrimary";
import { ReturnLogo } from "../../helpers/ReturnLogo";
import { getEstructura } from "../../reducers/Estructura/EstructuraSlice";
import EstructuraItem from "./EstructuraItem";
const Estructura = () => {
    const {empresaReal} = useSelector  ((state) => state.login.user)
    const {allEstructura, estructuraActivos} = useSelector ((state) => state.estructura)
    const [activos, setActivos] = useState(false)
    const [filteredGerentes, setFilteredGerentes] = useState([])


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEstructura())
    }, [])

    useEffect(() => {
        let arr = []

        if(!activos){
            allEstructura.forEach(function(el) {
                if(!arr.find(e => e.Nombre === el.NombreGerente))
                    if(el.CodigoSupervisor) 
                arr.push({Title: 'Gerente', Codigo: el.CodigoGerente, Nombre: el.NombreGerente, Childrens: []})
                else
                arr.push({Title: 'Gerente', Codigo: el.CodigoGerente, Nombre: el.NombreGerente})
            })
    
            allEstructura.forEach(function(el) {
                arr.forEach(function(sup) {
                if(!sup.Childrens?.find(e => e.Nombre === el.NombreSupervisor) && sup.Codigo === el.CodigoGerente)
                    if(el.CodigoTL)    
                sup.Childrens?.push({Title: 'Supervisor', Codigo: el.CodigoSupervisor, Nombre: el.NombreSupervisor, Childrens: []})
                    else
                sup.Childrens?.push({Title: 'Supervisor', Codigo: el.CodigoSupervisor, Nombre: el.NombreSupervisor})
                })
            })
    
            allEstructura.forEach(function(el) {
                arr.forEach(function(sup) {
                    sup.Childrens?.forEach(function(tl) {
                    if(!tl.Childrens?.find(e => e.Nombre === el.NombreTL) && tl.Codigo === el.CodigoSupervisor) 
                        if(el.CodigoVendedor)
                    tl.Childrens?.push({Title: 'Team Leader', Codigo: el.CodigoTL, Nombre: el.NombreTL, Childrens: []})
                        else
                    tl.Childrens?.push({Title: 'Team Leader', Codigo: el.CodigoTL, Nombre: el.NombreTL})
                    })
                })
            })
    
            allEstructura.forEach(function(el) {
                arr.forEach(function(sup) {
                    sup.Childrens?.forEach(function(tl) {
                        tl.Childrens?.forEach(function(vend) {
                            if(!vend.Childrens?.find(e => e.Nombre === el.NombreVendedor) && vend.Codigo === el.CodigoTL) 
                            vend.Childrens?.push({Title: 'Vendedor', Codigo: el.CodigoVendedor, Nombre: el.NombreVendedor})
                            })
                            
                        })
                })
            })
    
            setFilteredGerentes(arr)

        }else{
            estructuraActivos.forEach(function(el) {
                if(!arr.find(e => e.Nombre === el.NombreGerente))
                    if(el.CodigoSupervisor) 
                arr.push({Title: 'Gerente', Codigo: el.CodigoGerente, Nombre: el.NombreGerente, Childrens: []})
                else
                arr.push({Title: 'Gerente', Codigo: el.CodigoGerente, Nombre: el.NombreGerente})
            })
    
            estructuraActivos.forEach(function(el) {
                arr.forEach(function(sup) {
                if(!sup.Childrens?.find(e => e.Nombre === el.NombreSupervisor) && sup.Codigo === el.CodigoGerente)
                    if(el.CodigoTL)    
                sup.Childrens?.push({Title: 'Supervisor', Codigo: el.CodigoSupervisor, Nombre: el.NombreSupervisor, Childrens: []})
                    else
                sup.Childrens?.push({Title: 'Supervisor', Codigo: el.CodigoSupervisor, Nombre: el.NombreSupervisor})
                })
            })
    
            estructuraActivos.forEach(function(el) {
                arr.forEach(function(sup) {
                    sup.Childrens?.forEach(function(tl) {
                    if(!tl.Childrens?.find(e => e.Nombre === el.NombreTL) && tl.Codigo === el.CodigoSupervisor) 
                        if(el.CodigoVendedor)
                    tl.Childrens?.push({Title: 'Team Leader', Codigo: el.CodigoTL, Nombre: el.NombreTL, Childrens: []})
                        else
                    tl.Childrens?.push({Title: 'Team Leader', Codigo: el.CodigoTL, Nombre: el.NombreTL})
                    })
                })
            })
    
            estructuraActivos.forEach(function(el) {
                arr.forEach(function(sup) {
                    sup.Childrens?.forEach(function(tl) {
                        tl.Childrens?.forEach(function(vend) {
                            if(!vend.Childrens?.find(e => e.Nombre === el.NombreVendedor) && vend.Codigo === el.CodigoTL) 
                            vend.Childrens?.push({Title: 'Vendedor', Codigo: el.CodigoVendedor, Nombre: el.NombreVendedor})
                            })
                            
                        })
                })
            })
    
            setFilteredGerentes(arr)

        }

        
    }, [activos, allEstructura])

    const handleCheck = (e) => {
        if(e.target.checked){
            setActivos(true)
        }else{
            setActivos(false)
        }
    }


      return (
        <div>
            <TitleLogo style={{width: '25rem'}}>
            <div>
              <span>{empresaReal}</span>
              <ReturnLogo empresa={empresaReal}/>
            </div>
            <TitlePrimary style={{textAlign: 'start'}}>Estructura Comercial</TitlePrimary>
          </TitleLogo>
{/*           <button onClick={() => setActivos(!activos)}>Solo activos</button>
          <p>{activos ? 'si' : 'no'}</p> */}
          <div style={{
            display: 'flex',
            placeItems: 'center',
            placeContent: 'center'
          }}>
          <span>Ocultar inactivos</span> <input type="checkbox" style={{marginLeft:'4px'}}  onChange={(e) => handleCheck(e)}/>

          </div>
          <div style={{fontSize: '12px', textAlign:' -webkit-center'}}>
            {
                filteredGerentes && filteredGerentes.map(e => {
                    return (
                    <EstructuraItem 
                    key={e.Codigo}
                    Title={e.Title}
                    Nombre={e.Nombre} 
                    Childrens={e.Childrens} 
                    />
                    )
                })
            }

          </div>
        </div>
      );
    
}

export default Estructura
