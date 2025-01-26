import styled from "styled-components";

const DrawerHeader = styled.div`
  padding: 20px;
  padding-bottom: 5px;
  color: ${(props) => props.theme.colors.white};
  font-family: Poppins, sans-serif;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
`;

export default DrawerHeader;
