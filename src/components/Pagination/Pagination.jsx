import React from 'react'
import styles from './Pagination.module.css'
import * as AiIcons from 'react-icons/ai';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = nPages > 20 ? [...Array(nPages + 1).keys()].slice(currentPage, currentPage+10) : [...Array(nPages + 1).keys()].slice(1)

    

    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <ul style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    listStyle: 'none',
                    padding: '0'
            }}>
                <li className={styles.pageItem} >
                    <AiIcons.AiFillBackward
                    style={{cursor: 'pointer'}}
                   
                        onClick={prevPage} 
                        href='#'>
                        
                        
                    </AiIcons.AiFillBackward>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                     className={`${styles.pageItem} ${currentPage == pgNumber ? styles.active : ''}`}>

                        <a className={styles.pgNumber} onClick={() => setCurrentPage(pgNumber)}  
                          
                            href='#'>
                            
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className={styles.pageItem}  >
                    <AiIcons.AiFillForward
                    style={{cursor: 'pointer'}}
                   
                        onClick={nextPage}
                        href='#'>
                        
                       
                    </AiIcons.AiFillForward>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination