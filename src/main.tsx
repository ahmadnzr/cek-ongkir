import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import "./index.css";
import { myTheme } from "./helpers/lib/theme.ts";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={myTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
