// Import libraries
import { createServer, Server } from "miragejs";
// import { Model } from "miragejs";

export const mirageModel = {
  // post: Model.extend<Partial<TPost>>({}),
  // user: Model.extend<Partial<TUser>>({}),
  // tag: Model.extend<Partial<TTag>>({}),
  // category: Model.extend<Partial<TCategory>>({}),
};

declare global {
  interface Window {
    server?: Server;
  }
}

export const createMockServer = () => {
  if (window.server) {
    window.server.shutdown();
  }

  const server = createServer({
    timing: 800,
    models: mirageModel,
    // seeds(server) {},
    namespace: "/",
    routes() {},
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
