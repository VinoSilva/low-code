// Import types
import type { NodeProps } from "./CustomNode";

// Import components
import CustomNode from "./CustomNode";
import CustomNodeContent from "./CustomNodeContent";
import CustomNodeHeader from "./CustomNodeHeader";
import React from "react";
import DebouncedInput from "@components/shared/DebouncedInput";

interface LogProps extends NodeProps {
  text?: string;
  onChange?: (value: string) => void;
}

const LogNode = React.memo(
  ({ text, onChange, ...props }: LogProps) => {
    return (
      <CustomNode {...props}>
        <CustomNodeHeader>Log</CustomNodeHeader>
        <CustomNodeContent>
          <DebouncedInput
            value={text}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value);
              }
            }}
            placeholder="Log Message"
          />
        </CustomNodeContent>
      </CustomNode>
    );
  },
  (prevProps, nextProps) => {
    const props: (keyof LogProps)[] = [
      "x",
      "y",
      "$selected",
      "text",
      "$playing",
      "onPinHovered",
    ];

    let isSame = true;

    props.forEach((key) => {
      if (isSame) {
        isSame = prevProps[key] === nextProps[key];
      }
    });

    return isSame;
  }
);

export default LogNode;
