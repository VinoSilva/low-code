// Import libraries
import axios, { AxiosResponse } from "axios";

// Import types
import type { TFetchLogResponse } from "types/api/log.api.type";

// Import constants
import { API } from "@constants/api";

export const fetchLogs = async () => {
  const res = await axios.get<null, AxiosResponse<TFetchLogResponse>>(
    API.EXECUTION_LOG.fetch
  );

  return res.data;
};
