// Import library
import styled from "styled-components";

interface DrawerProps {
  $isOpen?: boolean;
  $width?: number;
}

const Drawer = styled.div<DrawerProps>`
  position: fixed;
  top: 0;
  left: ${({ $width = 250, $isOpen }) => ($isOpen ? "0" : `${$width * -1}px`)};
  width: ${({ $width = 250 }) => `${$width}px`};
  height: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  transition: left 0.3s ease;
  box-shadow: ${(props) =>
    props.$isOpen ? `2px 0 5px ${props.theme.colors.grey.main}` : "none"};
  z-index: 1000;
`;

export default Drawer;
