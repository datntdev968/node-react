import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import "@mantine/core/styles.css"; // import CSS của Mantine
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <MantineProvider
    theme={{
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    }}
  >
    <App />
  </MantineProvider>
);
