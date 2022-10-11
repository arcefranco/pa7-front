import styled from "styled-components";

export default styled.button`
    padding:.25rem .3rem .25rem .3rem;
    border: none;
    background-color: #3c8dbc;
    border-radius: .25em;
    box-shadow: none;
    min-width:4.5em;
    color: white;
    margin: 0.8em;
    font-size: 1em;
   
    text-align-last: center;
   
&:hover{
       background-color: #1971a4
   }

&:disabled{
    background-color: gray;
}
`