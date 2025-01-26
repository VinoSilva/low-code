export type Log = {
  logId: string; // Unique identifier for the log
  nodeId: string; // ID of the node being executed
  nodeType: "Alert" | "Add" | "Divide"; // Type of the node
  timestamp: string; // ISO 8601 format timestamp
  inputs: number[]; // Inputs used during execution
  output: number | null; // Output of the node execution
  status: "Success" | "Error"; // Execution status
  errorMessage?: string; // Optional error message in case of failure
};
