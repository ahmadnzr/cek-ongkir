import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { myTheme } from "./helpers/lib/theme.ts";

import App from "./App.tsx";
import { FilterResultContainer } from "./helpers/lib/FilterResultContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={myTheme}>
        <FilterResultContainer>
          <App />
        </FilterResultContainer>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
