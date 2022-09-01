import styled from "styled-components";

export default styled.div`

text-align: -webkit-center;
padding: 5px;
margin-top:5px;
  table {
    border-spacing: 0;
    width: 100%;
    // height:10rem;

    th{
      border: ridge 0.5px;
      margin: auto;
      padding-left: 0.2em;
      min-width:4.5em;
      max-width: 18em;
      height: 2em;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      font-size: 1em;
    }
    tr:nth-child(even){background-color: whitesmoke;}
    
    tr {
      height:2.8rem;
      ;
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    td {
      margin: 0;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      font-size: 1em;
      min-width:1rem;
      max-width: 15rem;
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
      font-weight: bolder;
    }
  }
`;