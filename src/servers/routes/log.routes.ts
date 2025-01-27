// Import libraries
import { Server, Response } from "miragejs";
import { v4 as uuidv4 } from "uuid";

// Import constants
import { API } from "@constants/api";

// Import types
import type { Log } from "types/log.type";
import type {
  TCreateLogRequest,
  TCreateLogResponse,
  TFetchLogResponse,
} from "types/api/log.api.type";

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

  server.post(
    API.EXECUTION_LOG.create,
    (_, request): TCreateLogResponse | Response => {
      const body = JSON.parse(request.requestBody) as TCreateLogRequest;

      const now = new Date();

      const datas = body.data.map((el) => ({
        ...el,
        timestamp: now.toISOString(),
        logId: uuidv4(),
      }));

      server.db.logs.insert(datas);

      return {
        isSuccess: true,
        message: "Successfully created new log",
      };
    }
  );
};

export default logRoutes;
