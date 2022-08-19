import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setToggle,  logout  } from '../../reducers/Login/loginSlice.js'
import {SidebarData} from './SideBarData.js'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import SideBarItem from './SideBarItem'
import { Link } from 'react-router-dom'
import styles from './SideBar.module.css'

const SideBar = () => {

    const [sidebar, setSidebar] = useState(false)
    const {user} = useSelector(
        (state) => state.login)
    const dispatch = useDispatch()    
    
    const showSideBar = () => {
        setSidebar(!sidebar)
        dispatch(setToggle())
    }

    const closeSideBar = () => {
        setSidebar(false)
        dispatch(setToggle())
    }
  
    return (
    <>
        <div className={styles.navbar}>
            <Link to="#" className={styles.menuBars}>
                <FaIcons.FaBars onClick={showSideBar}/>
            </Link>
            <Link to="/"><button className={styles.logOut} onClick={() => dispatch(logout())}>Log out</button></Link>
        </div>
            <nav className={sidebar ? styles.menuActive : styles.menu}>
                <div className={styles.menuItems}>
                    <div className={styles.toggle}>
                    <Link to="#" className={styles.menuBars}>
                        <AiIcons.AiOutlineClose onClick={closeSideBar}/>
                    </Link>
                    </div>
                    <div className={styles.sidebar}>
                        <div className={styles.username}>
                            <AiIcons.AiOutlineUser className={styles.username}/>
                            <h3 className={styles.username}>{user.username}</h3>
                        </div>
                        
                   
                    {
                    SidebarData.map((item, index) => {
                        return (
                                
                                <SideBarItem item={item} key={index}/>
                            
                                )})
                     }
                     </div>         
             
                </div>
            </nav>

        
    </>
  )
}

export default SideBar