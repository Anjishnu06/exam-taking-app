import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";
import { FirebaseProvider } from "./context/FirebaseContext";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <FirebaseProvider>
    <Router>
      <StrictMode>
        <App />
      </StrictMode>
    </Router>
  </FirebaseProvider>
);
