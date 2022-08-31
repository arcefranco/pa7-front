import styled from "styled-components";

export default styled.div`

text-align: -webkit-center;
padding: 5px;
margin-top:5px;
  table {
    border-spacing: 0;
    width: 100%;
    // height:22em;

    th{
      border: ridge 0.5px;
      margin: auto;
      padding-left: 2px;
      min-width:45px;
      max-width: 180px;
      max-height: 40px;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      font-size: auto;
    }
    tr:nth-child(even){background-color: whitesmoke;}
    
    tr {
      height:4em;
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
      font-size: auto;
      min-width:45px;
      max-width: 200px;
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