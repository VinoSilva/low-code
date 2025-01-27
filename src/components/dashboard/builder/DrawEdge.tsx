// Import libraries
import { useEffect, useMemo, useState } from "react";

// Import types
import type { PinType } from "./Pin";
import type { TPosition } from "types/canvas.type";
import Edge from "./Edge";

interface DrawEdgeProps {
  pinData: { nodeId: string; type: PinType };
}

const DrawEdge = ({ pinData }: DrawEdgeProps) => {
  const [mousePosition, setMousePosition] = useState<TPosition>({
    x: -1,
    y: -1,
  });

  const [startPosition, setStartPosition] = useState<TPosition>({
    x: -1,
    y: -1,
  });

  const visible = useMemo(() => {
    const arr = [
      startPosition.x,
      startPosition.y,
      mousePosition.x,
      mousePosition.y,
    ];

    return arr.every((el) => el !== -1);
  }, [startPosition, mousePosition]);

  useEffect(() => {
    const element = document.getElementById(
      `${pinData.nodeId}-${pinData.type}`
    );

    if (element) {
      const { width, height, x, y } = element.getBoundingClientRect();

      setStartPosition({
        x: x + width / 2,
        y: y + height / 2,
      });
    }
  }, [pinData]);

  useEffect(() => {
    const func = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", func);

    return () => {
      window.removeEventListener("mousemove", func);
    };
  }, []);

  return (
    <>
      {visible ? (
        <Edge
          position={{
            x1: startPosition.x,
            y1: startPosition.y,
            x0: mousePosition.x,
            y0: mousePosition.y,
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default DrawEdge;
