// Import libraries
import styled from "styled-components";

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  margin: 8px 0;
  border: 1px solid ${(props) => props.theme.colors.grey.main};
  border-radius: 4px;

  font-size: 16px;
  outline: none;
  /* appearance: none;  */
  background-color: ${(props) => props.theme.colors.white};
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.grey.dark};
  }
`;

export default Select;
