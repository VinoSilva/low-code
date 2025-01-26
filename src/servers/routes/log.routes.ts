// Import libraries
import { Server, Response } from "miragejs";

import { API } from "@constants/api";

// Import types
import { Log } from "types/log.type";
import { TFetchLogResponse } from "types/api/log.api.type";

// Import types
export const logRoutes = (server: Server) => {
  server.get(
    API.EXECUTION_LOG.fetch,
    (schema): TFetchLogResponse | Response => {
      const categories = schema.db.logs as Log[]; // Get all vehicles

      return {
        data: categories,
        isSuccess: true,
        message: "Successfully fetched categories",
      };
    }
  );
};

export default logRoutes;
