// Import types
import type { Log } from "types/log.type";

export type TFetchLogResponse = {
  data: Log[];
  isSuccess: boolean;
  message: string;
};

export type TCreateLogRequest = {
  data: Omit<Log, "timestamp" | "logId">[];
};

export type TCreateLogResponse = {
  isSuccess: boolean;
  message: string;
};
