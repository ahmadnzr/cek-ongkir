import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeContextProvider, QueryClientProvider } from "@helpers/lib";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
