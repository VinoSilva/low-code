// Import libraries
import useClickOutside from "@hooks/useOnClickOutside";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
`;

interface StyledEdgeProps {
  $isSelected?: boolean;
}

const StyledEdge = styled.path<StyledEdgeProps>`
  pointer-events: all;
  stroke: ${(props) =>
    props.$isSelected
      ? props.theme.colors.primary
      : props.theme.colors.grey.dark};
  stroke-width: ${(props) => (props.$isSelected ? 3 : 2)};
  fill: transparent;
  cursor: pointer;
  z-index: ${(props) => (props.$isSelected ? 100 : "unset")};
`;

interface EdgeProps extends StyledEdgeProps {
  position: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  };
  onClick?: () => void;
  onClickOutside?: () => void;
}

const Edge = ({ onClick, onClickOutside, ...props }: EdgeProps) => {
  const pathData = `M ${props.position.x0},${props.position.y0} L ${props.position.x1},${props.position.y1}`;

  const [ref, setRef] = useState<SVGPathElement>();

  useClickOutside(ref, () => {
    if (props.$isSelected && onClickOutside) {
      onClickOutside();
    }
  });

  return (
    <Wrapper>
      <StyledEdge
        ref={(ref) => {
          if (ref) {
            setRef(ref);
          }
        }}
        $isSelected={props.$isSelected}
        d={pathData}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) {
            onClick();
          }
        }}
      />
    </Wrapper>
  );
};

export default Edge;
