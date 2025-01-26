// Import libraries
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import store
import store, { persistor } from "@store/store";

// Import pages
import Dashboard from "@pages/Dashboard";
const Builder = lazy(() => import("@pages/Builder"));
const ExecutionLog = lazy(() => import("@pages/ExecutionLog"));

// Import constants
import theme from "@constants/theme";
import { ROUTES } from "@constants/routes";

const queryClient = new QueryClient();

// Import react
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Router>
              <Routes>
                <Route path={ROUTES.DASHBOARD.route} element={<Dashboard />}>
                  <Route path={ROUTES.BUILDER.route} element={<Builder />} />
                  <Route
                    path={ROUTES.EXECUTION_LOG.route}
                    element={<ExecutionLog />}
                  />
                </Route>
                <Route
                  path="*"
                  element={<Navigate to={ROUTES.BUILDER.route} />}
                />
              </Routes>
            </Router>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
