import styled from "styled-components";
import IconButton from "./IconButton";

interface FloatingButtonProps {
  $left?: number;
}

const FloatingButton = styled(IconButton)<FloatingButtonProps>`
  position: fixed;
  top: 20px;
  /* left: ${({ $left = 0 }) => `${$left}px`}; */
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1100;
  transition: transform left 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export default FloatingButton;
