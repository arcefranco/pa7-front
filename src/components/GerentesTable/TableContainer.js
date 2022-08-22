import styled from "styled-components";

export default styled.div`

text-align: -webkit-center;
padding: 0.5rem;
  table {
    border-spacing: 0;
    border: 1px solid burlywood;
    width: 100%;
    
   
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
      padding: 0.05rem;
      border-bottom: 0px solid black;
      border-right: 0px solid black;

      :last-child {
        border-right: 0;
      }
    }

    tfoot {
      tr:first-child {
        td {
          border-top: 2px solid black;
        }
      }
      font-weight: bolder;
    }
  }
`;