// Import libraries
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Import hooks
import useClickOutside from "@hooks/useOnClickOutside";

// Import components
import Pin, { type PinMouseEvent } from "../Pin";
import OutputWrapper from "./OutputWrapper";
import InputWrapper from "./InputWrapper";

import type { TPosition } from "types/canvas.type";

interface StyledNodeContainerProps {
  $selected?: boolean;
  $playing?: boolean;
}

const StyledNodeContainer = styled.div<StyledNodeContainerProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  cursor: grab;
  background-color: ${(props) => props.theme.colors.white};
  border: 2px solid
    ${(props) =>
      props.$playing
        ? props.theme.colors.yellow
        : props.$selected
        ? props.theme.colors.primary
        : props.theme.colors.grey.main};
  border-radius: 6px;
  box-shadow: 1px 1px 11px -6px rgba(0, 0, 0, 0.75);
  user-select: none;
  z-index: 1;
  transition: border ease 0.2s, box-shadow ease 0.2s;
  min-width: 120px;
  min-height: 120px;

  &:hover {
    box-shadow: 2px 2px 12px -6px rgba(0, 0, 0, 0.75);
  }
`;

export interface NodeProps extends StyledNodeContainerProps {
  id: string;
  x: number;
  y: number;
  onSelect: (id: string | null) => void;
  onPinSelected: PinMouseEvent;
  onPinHovered: PinMouseEvent;
  onMoved: (values: { newPosition: TPosition; nodeId: string }) => void;
}

const CustomNode = ({
  children,
  x,
  y,
  $selected,
  $playing,
  id,
  onSelect,
  onPinHovered,
  onPinSelected,
  onMoved,
}: React.PropsWithChildren<NodeProps>) => {
  const [isGrabbing, setIsGrabbing] = useState<boolean>();

  const [xPos, setXPos] = useState<number>(x);
  const [yPos, setYPos] = useState<number>(y);

  const positionRef = useRef<TPosition>({ x: 0, y: 0 });

  const [ref, setRef] = useState<HTMLElement>();

  useClickOutside(ref, () => {
    if ($selected) {
      onSelect(null);
    }
  });

  useEffect(() => {
    if (isGrabbing) {
      const mouseMoveFunc = (e: MouseEvent) => {
        const newX =
          xPos +
          (positionRef.current.x ? e.clientX - positionRef.current.x : 0);
        const newY =
          yPos +
          (positionRef.current.y ? e.clientY - positionRef.current.y : 0);

        setXPos(newX);
        setYPos(newY);

        positionRef.current.x = e.clientX;
        positionRef.current.y = e.clientY;
      };

      const mouseUpFunc = () => {
        setIsGrabbing(false);
        onMoved({
          newPosition: {
            x: positionRef.current.x,
            y: positionRef.current.y,
          },
          nodeId: id,
        });
      };

      window.addEventListener("mousemove", mouseMoveFunc);
      window.addEventListener("mouseup", mouseUpFunc);

      return () => {
        window.removeEventListener("mousemove", mouseMoveFunc);
        window.removeEventListener("mouseup", mouseUpFunc);
      };
    }
  }, [id, isGrabbing, xPos, yPos, onMoved]);

  useClickOutside(ref, () => {
    if ($selected) {
      onSelect(null);
    }
  });

  const onMouseDownNode = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsGrabbing(true);
    onSelect(id);
  };

  const onClickNode = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onSelect(id);
  };

  return (
    <StyledNodeContainer
      onMouseDown={onMouseDownNode}
      onClick={onClickNode}
      $selected={$selected}
      $playing={$playing}
      style={{
        transform: `translate(${xPos}px, ${yPos}px)`,
      }}
      ref={(ref) => {
        if (ref) {
          setRef(ref);
        }
      }}
      id={`node-${id}`}
    >
      {children}
      <OutputWrapper>
        <Pin
          onSelect={onPinSelected}
          onHoverOver={onPinHovered}
          type="out"
          nodeId={id}
          id={`${id}-${"out"}`}
        />
      </OutputWrapper>
      <InputWrapper>
        <Pin
          onSelect={onPinSelected}
          onHoverOver={onPinHovered}
          type="in"
          nodeId={id}
          id={`${id}-${"in"}`}
        />
      </InputWrapper>
    </StyledNodeContainer>
  );
};

export default CustomNode;
