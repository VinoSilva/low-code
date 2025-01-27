// Import libraries
import { createServer, Server } from "miragejs";
import { Model } from "miragejs";

// Import types
import { Log } from "types/log.type";

// Import data
// import { logsData } from "@data/log.data";

// Import routes
import logRoutes from "./routes/log.routes";

declare global {
  interface Window {
    server?: Server;
  }
}

export const mirageModel = {
  post: Model.extend<Partial<Log>>({}),
};

export const createMockServer = () => {
  if (window.server) {
    window.server.shutdown();
  }

  const server = createServer({
    timing: 800,
    models: mirageModel,
    seeds(server) {
      server.db.loadData({
        logs: [],
      });
    },
    namespace: "/",
    routes() {
      logRoutes(this);
    },
  });

  window.server = server;

  // FIX For Axios Not Resolving with Mirage -->
  const NativeXMLHttpRequest = window.XMLHttpRequest;

  // @ts-expect-error Ignore
  window.XMLHttpRequest = function XMLHttpRequest() {
    // @ts-expect-error Ignore
    const request = new NativeXMLHttpRequest(arguments);
    // @ts-expect-error Ignore
    delete request.onloadend;
    return request;
  };
  // <-- FIX`;

  return server;
};
