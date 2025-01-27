import styled from "styled-components";

const StyledPin = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: crosshair;
  pointer-events: all;
  transition: transform left 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export type PinType = "in" | "out";

export type PinMouseEvent = (values: { type: PinType; nodeId: string }) => void;

interface PinProps {
  type: PinType;
  nodeId: string;
  onHoverOver: PinMouseEvent;
  onSelect: PinMouseEvent;
  id?: string;
}

const Pin = ({ nodeId, onHoverOver, onSelect, type, id }: PinProps) => {
  return (
    <StyledPin
      onMouseOver={(e) => {
        onHoverOver({ nodeId, type });
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        onSelect({ nodeId, type });
        e.stopPropagation();
      }}
      id={id}
    />
  );
};

export default Pin;
