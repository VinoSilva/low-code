import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  font-size: 14px;

  th,
  td {
    padding: 10px;
    text-align: left;
    border: 1px solid ${(props) => props.theme.colors.grey.main};
    border-top: 0px;
  }

  th:first-child {
    border-top-left-radius: 10px;
    border-left: 0px;
  }

  th:last-child {
    border-top-right-radius: 10px;
    border-top: 0px;
    border-right: 0px;
  }

  tr td:first-child {
    border-left: 0px;
  }

  tr td:last-child {
    border-right: 0px;
  }

  tr:last-child {
    border-bottom: 0px;
  }

  th {
    background-color: ${(props) => props.theme.colors.grey.dark};
    color: ${(props) => props.theme.colors.white};
    font-family: Poppins, sans-serif;
  }

  tr {
    background-color: ${(props) => props.theme.colors.grey.dark};
    color: ${(props) => props.theme.colors.white};
    transition: background-color 0.3s ease, color 0.3s ease;
    font-family: Montserrat, sans-serif;

    &:hover {
      background-color: ${(props) => props.theme.colors.grey.light};
      color: ${(props) => props.theme.colors.secondary};
    }
  }

  thead tr {
    background-color: ${(props) => props.theme.colors.white};
  }
`;

export default StyledTable;
