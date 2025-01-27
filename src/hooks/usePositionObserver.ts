import { useEffect, useRef } from "react";

type Position = { x: number; y: number };
type UsePositionObserverProps = {
  targetId: string;
  onPositionChange: (values: {
    position: Position;
    width: number;
    height: number;
  }) => void;
};

const usePositionObserver = ({
  targetId,
  onPositionChange,
}: UsePositionObserverProps) => {
  const prevPosition = useRef<Position | null>(null);

  useEffect(() => {
    const element = document.getElementById(targetId);

    if (!element) {
      return;
    }

    const checkPosition = () => {
      const rect = element.getBoundingClientRect();
      const currentPosition = { x: rect.left, y: rect.top };

      // Trigger callback if position changes
      if (
        !prevPosition.current ||
        prevPosition.current.x !== currentPosition.x ||
        prevPosition.current.y !== currentPosition.y
      ) {
        prevPosition.current = currentPosition;
        onPositionChange({
          position: currentPosition,
          height: rect.height,
          width: rect.width,
        });
      }
    };

    // Use ResizeObserver to detect size/position changes
    const resizeObserver = new ResizeObserver(() => checkPosition());

    // Use MutationObserver for DOM changes
    const mutationObserver = new MutationObserver(() => checkPosition());

    resizeObserver.observe(element);
    mutationObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Initial position check
    checkPosition();

    // Cleanup observers
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [targetId, onPositionChange]);
};

export default usePositionObserver;
