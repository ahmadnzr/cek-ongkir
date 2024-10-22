import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import {
  ThemeContextProvider,
  QueryClientProvider,
  queryClient,
  FilterResultContainer,
} from "@helpers/lib";

import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <ThemeContextProvider>
        <FilterResultContainer>
          <RouterProvider router={router} />
        </FilterResultContainer>
      </ThemeContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
