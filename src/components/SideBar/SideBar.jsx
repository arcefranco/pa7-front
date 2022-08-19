import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setToggle,  logout  } from '../../reducers/Login/loginSlice.js'
import {SidebarData} from './SideBarData.js'
import * as FaIcons from 'react-icons/fa'
import {BiLogOut } from "react-icons/bi";
import SideBarItem from './SideBarItem'
import { Link } from 'react-router-dom'
import styles from './SideBar.module.css'

const SideBar = () => {

    const [sidebar, setSidebar] = useState(false)
    const {user} = useSelector(
        (state) => state.login)
    const dispatch = useDispatch()    
    
    const showSideBar = () => {setSidebar(!sidebar)
        dispatch(setToggle())
    }

    const closeSideBar = () => {
        setSidebar(false)
        dispatch(setToggle())
    }
  
    return (
    <>
        
            <nav style={{width: sidebar ?  "250px" : "55px" }} className={styles.menu} >
                <div className={styles.menuItems}>
                    <div className={styles.toggle}>
                    <p style={{display: sidebar ? "grid" : "none" }} className={styles.menuBars}><b>Planes de Ahorro 7</b></p>
                <div style={{marginLeft: sidebar ? "25px" : "0px"}} className={styles.menuBars}>
                    
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
                <div className={styles.navbar} style={{width: sidebar ? "250px" : "55px"}}>
                <div className={styles.username} style={{display: sidebar ? "block" : "none" }}>
                            {/* <AiIcons.AiOutlineUser className={styles.username}/> */}
                            <h3 className={styles.username}>{user.username}</h3>
                        </div>
            <Link to="/"><button className={styles.logOut} onClick={() => dispatch(logout())}><BiLogOut/></button></Link>
        </div>
            </nav>

        
    </>
  )
}

export default SideBar