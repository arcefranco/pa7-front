import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi'
import * as IoIcons from 'react-icons/io'

const ModalStatus = ({status, message}) => {
const [close, setClose] = useState(false)

useEffect(() => {
    if(close){
            setTimeout(() => {setClose(false)}, 5000)
            
        } 
}, [close])

    return (
                   
    <div style={{
        display: close ? 'none' : 'flex',
        height: '5rem',
        background: status === true ? '#1d8102' : 'red',
        color: '#eaebd6',
        textAlign: 'start',
        justifyContent: 'space-between'
    }}>
        <div style={{display: 'flex'}}>
        {
            status === true ? <AiIcons.AiOutlineCheckCircle style={{
            height: '5rem',
            width: '2rem',
            display: 'flex',
            alignItems: 'center',
            marginLeft: '1rem'
        }} /> : <BiIcons.BiErrorCircle  style={{
            height: '5rem',
            width: '2rem',
            display: 'flex',
            alignItems: 'center',
            marginLeft: '1rem'
        }}/>
        }

        <span
        style={{
            height: '5rem',
            display: 'flex',
            alignItems: 'center',
            marginLeft: '1rem'
        }}
        >{message}</span>

        </div>
        <span onClick={() => setClose(true)}>
        <IoIcons.IoIosClose style={{ marginRight: '0.3rem', cursor: 'pointer', width: '1.7rem', height: '1.7rem'}}/>

        </span>
  
    </div>
    
    )
}

export default ModalStatus