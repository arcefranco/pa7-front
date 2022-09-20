import React, {useState} from 'react'
import styles from './SideBar.module.css'
import './SideBar.module.css'
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
        
    <div  key={index}  className={open ? styles.textOpen : styles.text} onMouseOver={showSideBar}>
        {/**Si el Item no tiene un rol asignado, es un Menú (Nivel 0) */}
        {
            !item.rol || 
            user.roles?.find(e=> e.rl_codigo === item.rol) || 
            (user.roles?.find(e=> e.rl_codigo === "1") && !item.unique)
            ? <div className={styles[item.cName]} onMouseOver={showSideBar}>
                {
                    item.path && item.cName !== 'nav-text2' ? 
                    
                    <Link to={item.path} onClick={()=>window.localStorage.removeItem("pageIndex")} ><span className={styles[item.cName]}>
                    {item.icon}
                    {item.title}
                    
                    </span>
                    </Link>
                    
                    : 
                    
                    <span key={index} onClick={() => setOpen(!open)}>
                {toggle
                ?<div style={{fontSize : "1.2em",color: open? "#3483fa":"#545e65", marginLeft: open? "-.15em":"0em"}} onMouseOver={showSideBar}>{item.icon}</div>
                :<div style={{fontSize : "3.2em" , marginLeft: open? "-.15em" : "0em",
                color: open? "#3483fa":"#545e65", marginBottom: open? ".2em" : "auto"}}
                onMouseOver={showSideBar}   >{item.icon}</div>}
                {
                    item.cName !== 'nav-text2' ?
                <div style={{display: toggle? "block" : "none" , fontSize:"1.2em" }} onClick={() => setOpen(!open)}> 
                <div  className={styles[item.cName]} style={{color: open? "#3483fa":"#545e65",alignItems:'center', /*marginRight: open? ".5em" : ".2em"*/ }}>{item.title}
                {
                    item.cName !== 'nav-text2' ?
                <div style={{textAlign:"right", /* marginTop:"-1.5em" */ }}>
                    
                {open ? <MdIcons.MdOutlineKeyboardArrowDown className={styles.arrow}  onClick={() => setOpen(!open)} /> 
                :<MdIcons.MdOutlineKeyboardArrowDown className={styles.arrowDown} onClick={() => setOpen(!open)} />}
                </div> : null
                }
                </div>
                </div>    :                 <div onClick={() => window.location.replace(item.path)} style={{display: toggle? "block" : "none" , fontSize:"1em", alignSelf: 'center'}} > 
                <div  className={styles[item.cName]} style={{color: "#545e65",alignItems:'center', /*marginRight: open? ".5em" : ".2em"*/ }}>{item.title}
                </div>
                </div>
                }
            </span>
                }
        </div> : <p value="*"  disabled>{item.title}</p>
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