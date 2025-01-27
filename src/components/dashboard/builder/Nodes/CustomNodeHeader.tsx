import styled from "styled-components";

const CustomNodeHeader = styled.div`
  padding: 8px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.grey.main}`};
`;

export default CustomNodeHeader;
