import React, {useEffect} from "react";

export const GlobalFilter = ({filter, setFilter}) => {
    useEffect(() => {
        console.log(filter)
      }, [filter])
    return (
        <div style={{
            padding: '1rem'
        }}>
            <span>
                Buscar:{' '}
            </span>
             <input type="text" value={filter/*  || '' */} onChange={e => setFilter(e.target.value)}></input>
        </div>
    )
}