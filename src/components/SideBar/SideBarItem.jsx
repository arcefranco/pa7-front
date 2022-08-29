import React, {useState} from 'react'
import styles from './SideBar.module.css'
import * as MdIcons from 'react-icons/md';
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
        const showSideBar = () => {
            if(toggle === false){
                dispatch(setToggle())
                setOpen(false)
            }
        }

        

    return (
        
    <div  key={index}    className={open ? styles.textOpen : styles.text} onMouseOver={showSideBar}>
        {/**Si el Item no tiene un rol asignado, es un Menú (Nivel 0) */}
        {
            !item.rol || 
            user.roles?.find(e=> e.rl_codigo === item.rol) || 
            (user.roles?.find(e=> e.rl_codigo === "1") && !item.unique)
            ? <div className={styles.sidebarTitle} onMouseOver={showSideBar}>
                {
                    item.path ? 
                    <span >
                    <Link to={item.path}>
                    {item.icon}
                    {item.title}
                    </Link>
                    
                    </span> : 
                
            <span  >
                {toggle
                ?<div style={{fontSize : "12px"}} onMouseOver={showSideBar}>{item.icon}</div>
                :<div style={{fontSize : "14px" , marginLeft: "10px"}} onMouseOver={showSideBar} onClick={showSideBar} data-tip={item.title} data-effect="solid" data-place="right">{item.icon}<ReactTooltip /></div>}
                <div style={{display: toggle? "block" : "none" , fontSize:"12px" }} onClick={() => setOpen(!open)}> 
                <div style={{fontSize:"12px", width:"130px"}}>{item.title}</div>
                <div style={{textAlign:"right", width:"150px", marginTop:"-20px"}}>
                {open ? <MdIcons.MdOutlineKeyboardArrowDown className={styles.arrow}  onClick={() => setOpen(!open)} /> :<MdIcons.MdOutlineKeyboardArrowDown className={styles.arrowDown} onClick={() => setOpen(!open)} />}
                </div>
                </div>    
            </span>
                }
        </div> : <option value="*"  disabled>{item.title}</option>
        }
            <div className={styles.sidebarContent} style={{ display: toggle? "block" : "none"}}>
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