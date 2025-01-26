import styled from "styled-components";

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1.25em;
  border-radius: 3px;
  border-radius: 7.5px;
  cursor: pointer;

  /* Color the border and text with theme.main */
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.colors.secondary
      : props.theme.colors.primary};
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  border: 1px solid
    ${(props) =>
      props.variant === "secondary"
        ? props.theme.colors.white
        : props.theme.colors.primary};

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

export default Button;
