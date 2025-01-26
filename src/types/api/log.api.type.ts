// Import types
import type { Log } from "types/log.type";

export type TFetchLogResponse = {
  data: Log[];
  isSuccess: boolean;
  message: string;
};

export type TCreateLogRequest = {
  data: Log;
};

export type TCreateLogResponse = {
  data: Log;
  isSuccess: boolean;
  message: string;
};
