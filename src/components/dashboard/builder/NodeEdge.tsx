// Import libraries
import usePositionObserver from "@hooks/usePositionObserver";
import { useMemo, useState } from "react";

// Import types
import type { TPosition } from "types/canvas.type";
import Edge from "./Edge";

interface NodeEdgeProps {
  fromId: string;
  toId: string;
  selected?: boolean;
  onSelectEdge: () => void;
  onDeselectEdge: () => void;
}

const NodeEdge = ({
  toId,
  fromId,
  selected = false,
  onSelectEdge,
  onDeselectEdge,
}: NodeEdgeProps) => {
  const [startPosition, setStartPosition] = useState<TPosition>({
    x: -1,
    y: -1,
  });
  const [endPosition, setEndPosition] = useState<TPosition>({ x: -1, y: -1 });

  const visible = useMemo(() => {
    const arr = [
      startPosition.x,
      startPosition.y,
      endPosition.x,
      endPosition.y,
    ];

    return arr.every((el) => el !== -1);
  }, [startPosition, endPosition]);

  usePositionObserver({
    targetId: fromId,
    onPositionChange: ({ height, width, position: { x, y } }) => {
      setStartPosition({ x: x + width / 2, y: y + height / 2 });
    },
  });

  usePositionObserver({
    targetId: toId,
    onPositionChange: ({ height, width, position: { x, y } }) => {
      setEndPosition({ x: x + width / 2, y: y + height / 2 });
    },
  });

  return (
    <>
      {visible ? (
        <Edge
          position={{
            x0: startPosition.x,
            y0: startPosition.y,
            x1: endPosition.x,
            y1: endPosition.y,
          }}
          $isSelected={selected}
          onClick={onSelectEdge}
          onClickOutside={onDeselectEdge}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default NodeEdge;
