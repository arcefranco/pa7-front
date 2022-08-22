import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setToggle,  logout  } from '../../reducers/Login/loginSlice.js'
import {SidebarData} from './SideBarData.js'
import * as FaIcons from 'react-icons/fa'
import {BiLogOut } from "react-icons/bi";
import SideBarItem from './SideBarItem'
import { Link } from 'react-router-dom'
import styles from './SideBar.module.css'
import ReactTooltip from 'react-tooltip';



const SideBar = () => {

    
    
    const dispatch = useDispatch()    
    const [sidebar, setSidebar] = useState(false);
    const showSideBar = () => {setSidebar(!sidebar)
        dispatch(setToggle())
    }
    const {user,toggle} = useSelector(
        (state) => state.login)

    const closeSideBar = () => {
        setSidebar(false)
        dispatch(setToggle())
    }
  
    return (
    <>
        
            <nav style={{width: toggle?  "250px" : "55px" }} className={styles.menu} >
                <div className={styles.menuItems}>
                    <div className={styles.toggle}>
                    <p style={{display: toggle ? "grid" : "none" }} className={styles.menuBars}><b>Planes de Ahorro 7</b></p>
                <div style={{marginLeft: toggle ? "0px" : "auto"}} className={styles.menuBars}>
                    
                <FaIcons.FaBars onClick={showSideBar}/>
            </div>
                    </div>
                    <div className={styles.sidebar}>
                       
                        
                   
                    {
                    SidebarData.map((item, index) => {
                        return (
                                
                                <SideBarItem item={item} key={index}/>
                            
                                )})
                     }
                     </div>         
             
                </div>
                <div className={styles.navbar} style={{width: toggle ? "230px" : "55px"}}>
                <div className={styles.username} style={{display: toggle ? "block" : "none" }}>
                            {/* <AiIcons.AiOutlineUser className={styles.username}/> */}
                            <h5 className={styles.username}>{user.Nombre}</h5>
                        </div>
            <Link to="/"><button data-tip="Salir del Sistema" data-effect="solid" data-place="right" style={{marginRight: toggle ? "10px" : "-52px"}} className={styles.logOut} onClick={() => dispatch(logout())}><ReactTooltip/><BiLogOut/></button></Link>
        </div>
            </nav>

        
    </>
  )
}

export default SideBar