import type { NodeTypesEnum } from "./node.type";

export type Log = {
  logId: string; // Unique identifier for the log
  nodeId: string; // ID of the node being executed
  nodeType: NodeTypesEnum; // Type of the node
  timestamp: string; // ISO 8601 format timestamp
  inputs: number[] | string[] | string; // Inputs used during execution
  output: number | string | null; // Output of the node execution
  status: "Success" | "Error"; // Execution status
  errorMessage?: string; // Optional error message in case of failure
};
