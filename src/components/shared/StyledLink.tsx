import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.grey.main}; // Default color
  padding: 10px;
  font-weight: bold;

  &.active {
    color: ${(props) => props.theme.colors.primary}; // Active link color
  }

  &:hover {
    color: ${(props) => props.theme.colors.white}; // Hover color
  }
`;

export default StyledLink;
