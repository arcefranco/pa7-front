import styled from "styled-components";

export default styled.div`

text-align: -webkit-center;
/* height: 39rem; */
position: relative;
  table {
    border-spacing: 0;
    width: 100%;
    // height:10rem;

    th{
      border: ridge 0.5px;
      margin: auto;
      padding-left: 0.2em;
      min-width:auto;
      max-width: auto;
      // max-height: 1em;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      font-size: 12px;
    }
    tr:nth-child(even){background-color: rgb(235, 235, 235);}
    
    tr {
      height:0.5rem;
      padding:.4em
      ;
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    td {
      margin: -.5em;
      padding: 0 17px 7px;
    
      
      // padding-top: -.5em;
      // padding-bottom: -.5em;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      font-size: .7em;
      min-width: 0.5rem;
 
      
      // max-width: 16.2rem;
      height:auto;


      :last-child {
        border-right: 0;
      }
    }

    tfoot {
      tr:first-child {
        td {
          border-top: 0px solid black;
        }
      }
      font-weight: 600;
    }
  }
`;