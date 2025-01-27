// Import libraries
import styled from "styled-components";

const StyledMenuItem = styled.button`
  padding: 4px;
  height: 48px;
  font-family: Montserrat, sans-serif;
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.white};
  border: ${(props) => `1px solid ${props.theme.colors.grey.main}`};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    border: ${(props) => `1px solid ${props.theme.colors.secondary}`};
  }
`;

export type MenuItemType = {
  label: string;
  value: string;
};

interface MenuItemProps {
  label: string;
  value: string;
  onSelect?: (value: string) => void;
}

const MenuItem = ({ label, value, onSelect }: MenuItemProps) => {
  return (
    <StyledMenuItem
      onClick={() => {
        if (onSelect) {
          onSelect(value);
        }
      }}
    >
      {label}
    </StyledMenuItem>
  );
};

export default MenuItem;
