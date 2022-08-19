import React, {useState} from 'react'
import styles from './SideBar.module.css'
import * as AiIcons from 'react-icons/ai';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const SideBarItem = ({item, index}) => {

    const [open, setOpen] = useState(false)
    const {user} = useSelector(
        (state) => state.login)
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
                
            <span>
                {open ? <AiIcons.AiOutlineArrowUp  onClick={() => setOpen(!open)} /> :<AiIcons.AiOutlineArrowDown  onClick={() => setOpen(!open)} />}
                    {item.icon}
                    {item.title}
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