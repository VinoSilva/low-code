// import { TPosition } from "./canvas.type";

export type Node = {
  id: string;
  type: NodeTypesEnum;
  data: { label: string };
  position: { x: number; y: number };
};

export type TEmailNode = {
  recipient: string;
  subject: string;
  body: string;
} & Node;

export type TMathNode = {
  input1: number;
  input2: number;
  operator: "*" | "+";
} & Node;

export type TLogNode = {
  text: string;
} & Node;

export type Edge = {
  from: string;
  to: string;
  // startPosition: TPosition;
  // endPosition: TPosition;
};

export type NodeTypes = Node | TEmailNode | TMathNode | TLogNode;
export type NodeTypesEnum = "EMAIL" | "CALCULATION" | "LOG";
