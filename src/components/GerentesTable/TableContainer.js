import styled from "styled-components";

export default styled.div`

text-align: -webkit-center;
padding: 0.5rem;
  table {
    border-spacing: 0;
    border: 0.8px solid burlywood;
    width: 100%;

    th{
      border: ridge 0.5px
    }
   
    tr {
      
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.15rem;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      font-size: 14px;

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