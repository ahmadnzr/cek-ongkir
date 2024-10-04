import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import "./index.css";
import { myTheme } from "./helpers/lib/theme.ts";

import App from "./App.tsx";
import { FilterResultContainer } from "./helpers/lib/FilterResultContext.tsx";
import { QueryClientProvider } from "./helpers/lib/QueryClient.tsx";

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
