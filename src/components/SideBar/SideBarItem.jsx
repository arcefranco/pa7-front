import React, {useState} from 'react'
import styles from './SideBar.module.css'
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { useSelector, useDispatch } from 'react-redux'
import { setToggle,  logout  } from '../../reducers/Login/loginSlice.js'




const SideBarItem = ({item, index}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const {user, toggle} = useSelector(
        (state) => state.login)
        const [sidebar, setSidebar] = useState(false);
        const showSideBar = () => {setSidebar(!sidebar)
         dispatch(setToggle())   }

        

    return (
        
    <div  key={index}  className={open ? styles.textOpen : styles.text}>
        {/**Si el Item no tiene un rol asignado, es un Menú (Nivel 0) */}
        {
            !item.rol || 
            user.roles?.find(e=> e.rl_codigo === item.rol) || 
            (user.roles?.find(e=> e.rl_codigo === "1") && !item.unique)
            ? <div className={styles.sidebarTitle}>
                {
                    item.path ? 
                    <span>
                    <Link to={item.path}>
                    {item.icon}
                    {item.title}
                    </Link>
                    
                    </span> : 
                
            <span >
                {toggle
                ?<div style={{fontSize : "12px"}}>{item.icon}</div>
                :<div style={{fontSize : "14px"}} onClick={showSideBar} data-tip={item.title} data-effect="solid" data-place="right">{item.icon}<ReactTooltip /></div>}
                <div style={{display: toggle? "block" : "none" }}> 
                {item.title}
                {open ? <AiIcons.AiOutlineArrowUp  onClick={() => setOpen(!open)} /> :<AiIcons.AiOutlineArrowDown  onClick={() => setOpen(!open)} />}
                </div>    
            </span>
                }
        </div> : <option value="*" disabled>{item.title}</option>
        }
            <div className={styles.sidebarContent}>
             {
            open && item.options ? 
            
                
            item.options.map((item, index) =>
            
            
                <SideBarItem item={item}  index={index} />

            
            
            )
             : null
        }
    </div>
      
    
    

   
    </div>
    )
    
}

export default SideBarItem