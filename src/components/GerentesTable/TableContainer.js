import styled from "styled-components";

export default styled.div`

text-align: -webkit-center;
padding: 5px;
  table {
    border-spacing: 0;
    width: 100%;
    height:75vh;

    th{
      border: ridge 0.5px;
      margin: auto;
      padding-left: 2px;
      min-width:45px;
      max-width: 170px;
      max-height: 50px;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      font-size: 12px;
    }
   
    tr {
      
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
      font-size: 12px;
      min-width:45px;
      max-width: 210px;
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