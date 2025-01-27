// Import libraries
import axios, { type AxiosResponse } from "axios";

// Import types
import type {
  TCreateLogRequest,
  TCreateLogResponse,
  TFetchLogResponse,
} from "types/api/log.api.type";

// Import constants
import { API } from "@constants/api";

export const fetchLogs = async () => {
  const res = await axios.get<null, AxiosResponse<TFetchLogResponse>>(
    API.EXECUTION_LOG.fetch
  );

  return res.data;
};

export const createLogs = async (data: TCreateLogRequest) => {
  const res = await axios.post<
    TCreateLogRequest,
    AxiosResponse<TCreateLogResponse>
  >(API.EXECUTION_LOG.create, data);

  return res.data;
};
