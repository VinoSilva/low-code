// Import libraries
import React, { useEffect } from "react";

// Import types
import type { NodeProps } from "./CustomNode";

// Import components
import CustomNode from "./CustomNode";
import CustomNodeHeader from "./CustomNodeHeader";
import CustomNodeContent from "./CustomNodeContent";
import DebouncedInput from "@components/shared/DebouncedInput";
import { useFormik } from "formik";

export type TEmailNodeValues = {
  recipient: string;
  subject: string;
  body: string;
};

interface EmailNodeProps extends NodeProps {
  recipient?: string;
  subject?: string;
  body?: string;
  onChange?: (val: TEmailNodeValues) => void;
}

const initialValues: TEmailNodeValues = {
  body: "",
  recipient: "",
  subject: "",
};

const EmailNode = React.memo(
  ({
    recipient = "",
    body = "",
    subject = "",
    onChange,
    ...props
  }: EmailNodeProps) => {
    const formik = useFormik<TEmailNodeValues>({
      onSubmit: () => {},
      initialValues: {
        body: body || initialValues.body,
        recipient: recipient || initialValues.recipient,
        subject: subject || initialValues.subject,
      },
    });

    useEffect(() => {
      if (formik.dirty && onChange) {
        onChange(formik.values);
      }
    }, [formik.dirty, formik.values, onChange]);

    return (
      <CustomNode {...props}>
        <CustomNodeHeader>Email</CustomNodeHeader>
        <CustomNodeContent
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <DebouncedInput
            value={formik.values.recipient}
            onChange={(e) => {
              if (onChange) {
                formik.setFieldValue("recipient", e.target.value);
              }
            }}
            style={{ width: 300 }}
            placeholder="Recipient"
          />

          <DebouncedInput
            value={formik.values.subject}
            onChange={(e) => {
              if (onChange) {
                formik.setFieldValue("subject", e.target.value);
              }
            }}
            style={{ width: 300 }}
            placeholder="Subject"
          />

          <DebouncedInput
            value={formik.values.body}
            onChange={(e) => {
              if (onChange) {
                formik.setFieldValue("body", e.target.value);
              }
            }}
            style={{ width: 300 }}
            placeholder="Body"
          />
        </CustomNodeContent>
      </CustomNode>
    );
  },
  (prevProps, nextProps) => {
    const props: (keyof EmailNodeProps)[] = [
      "x",
      "y",
      "$selected",
      "body",
      "recipient",
      "subject",
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

export default EmailNode;
