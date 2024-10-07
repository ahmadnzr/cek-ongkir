import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import {
  myTheme,
  FilterResultContainer,
  QueryClientProvider,
} from "@helpers/lib";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <ThemeProvider theme={myTheme}>
        <FilterResultContainer>
          <App />
        </FilterResultContainer>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
