// Import libraries
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import store
import store, { persistor } from "@store/store";

// Import pages
import Builder from "@pages/Builder";
import ExecutionLog from "@pages/ExecutionLog";

// Import react
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path={"/builder"} element={<Builder />} />
            <Route path={"/execution-log"} element={<ExecutionLog />} />
            <Route path="*" element={<Navigate to={"/builder"} />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
