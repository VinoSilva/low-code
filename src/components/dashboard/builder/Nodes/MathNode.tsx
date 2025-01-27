// Import libraries
import React, { useEffect } from "react";
import { useFormik } from "formik";

// Import types
import type { NodeProps } from "./CustomNode";

// Import components
import CustomNode from "./CustomNode";
import CustomNodeHeader from "./CustomNodeHeader";
import CustomNodeContent from "./CustomNodeContent";
import Select from "@components/shared/Select";

import DebouncedInput from "@components/shared/DebouncedInput";

export type OperatorType = "*" | "+";

export type TMathNodeValues = {
  input1: number;
  input2: number;
  operator: OperatorType;
};

const initialValues: TMathNodeValues = {
  input1: 1,
  input2: 1,
  operator: "*",
};

interface MathProps extends NodeProps {
  input1: number;
  input2: number;
  operator: OperatorType;
  onChange: (values: TMathNodeValues) => void;
}

const MathNode = React.memo(
  ({ input1, input2, onChange, operator, ...props }: MathProps) => {
    const formik = useFormik<TMathNodeValues>({
      initialValues: {
        input1: input1 || initialValues.input1,
        input2: input2 || initialValues.input2,
        operator: operator || initialValues.operator,
      },
      onSubmit: () => {},
    });

    useEffect(() => {
      if (formik.dirty) {
        onChange(formik.values);
      }
    }, [formik.values, formik.dirty, onChange]);

    return (
      <CustomNode {...props}>
        <CustomNodeHeader>Math</CustomNodeHeader>
        <CustomNodeContent style={{ display: "flex", gap: 20 }}>
          <DebouncedInput
            value={input1}
            onChange={(e) => {
              if (!isNaN(parseInt(e.target.value))) {
                formik.setFieldValue("input1", parseInt(e.target.value));
              }
            }}
            style={{ width: 100 }}
            type="number"
            placeholder="Input 1"
          />
          <Select
            value={operator}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              formik.setFieldValue("operator", e.target.value);
              e.stopPropagation();
            }}
          >
            <option label="Multiply" value="*" />
            <option label="Plus" value="+" />
          </Select>
          <DebouncedInput
            value={input2}
            onChange={(e) => {
              if (!isNaN(parseInt(e.target.value))) {
                formik.setFieldValue("input2", parseInt(e.target.value));
              }
            }}
            style={{ width: 100 }}
            type="number"
            placeholder="Input 2"
          />
        </CustomNodeContent>
      </CustomNode>
    );
  },
  (prevProps, nextProps) => {
    const props: (keyof MathProps)[] = [
      "input1",
      "input2",
      "operator",
      "x",
      "y",
      "$selected",
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

export default MathNode;
