import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setToggle,  logout, setToggleFalse  } from '../../reducers/Login/loginSlice.js'
import {SidebarData} from './SideBarData.js'
import * as FaIcons from 'react-icons/fa'
import * as ImIcons from 'react-icons/im';
import {BiLogOut } from "react-icons/bi";
import SideBarItem from './SideBarItem'
import { Link } from 'react-router-dom'
import styles from './SideBar.module.css'
import ReactTooltip from 'react-tooltip';

const SideBar = () => {
    const dispatch = useDispatch()    
    const [sidebar, setSidebar] = useState(false);
    const showSideBar = () => {
        setSidebar(!sidebar)
        dispatch(setToggle())
    }
    const {user,toggle, } = useSelector(
        (state) => state.login)

    const closeSideBar = () => {
        setSidebar(false)
        dispatch(setToggle())
    }
  
    return (
    <>
            <nav style={{width: toggle?  "190px" : "70px" }} className={styles.menu}  onMouseLeave={() => dispatch(setToggleFalse())}  >
                <div className={styles.menuItems}>
                    <div className={styles.toggle}>
                    <p style={{display: toggle ? "grid" : "none" }} className={styles.menuBars}><b>Planes de Ahorro 7</b></p>
                <div style={{marginLeft: toggle ? "0px" : "auto"}} className={styles.menuBars}>
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
                <div className={styles.navbar} style={{width: toggle ? "190px" : "55px"}}>
                <div className={styles.username} style={{display: toggle ? "block" : "none" }}>
                            {/* <AiIcons.AiOutlineUser className={styles.username}/> */}
                            <p style={{fontSize:"12.5px"}} >{user.empresa}</p>
                            <p style={{fontSize:"11.5px", fontStyle:"italic"}} >{user.Nombre}</p>
                        </div>
            <Link to="/"><button data-tip="Salir del Sistema" data-effect="solid" data-place="right" style={{marginRight: toggle ? "4px" : "-52px"}} className={styles.logOut} onClick={() => dispatch(logout())}><ReactTooltip/><BiLogOut/></button></Link>
        </div>
            </nav>
    </>
  )
}

export default SideBar