import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }

  &:hover {
    border-color: #888;
  }
`;

export default Input;
