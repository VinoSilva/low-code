// Import libraries
import useClickOutside from "@hooks/useOnClickOutside";
import { useState } from "react";
import styled from "styled-components";
import type { TPosition } from "types/canvas.type";

const StyledModal = styled.div<TPosition>`
  position: fixed;
  top: ${(props) => (props.x ? `${props.y}px` : "50%")};
  left: ${(props) => (props.y ? `${props.x}px` : "50%")};
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1500;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export interface ModalProps extends TPosition {
  onClose?: () => void;
}

const Modal = ({
  x,
  y,
  onClose,
  children,
}: React.PropsWithChildren<ModalProps>) => {
  const [ref, setRef] = useState<HTMLElement>();

  useClickOutside(ref, () => {
    if (onClose) {
      onClose();
    }
  });

  return (
    <StyledModal
      ref={(ref) => {
        if (ref) {
          setRef(ref);
        }
      }}
      x={x}
      y={y}
    >
      {children}
    </StyledModal>
  );
};

export default Modal;
