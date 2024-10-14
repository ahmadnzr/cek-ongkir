import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { FilterResultContainer, useTheme, useThemeContext } from "@helpers/lib";

import HomePage from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

function App() {
  const { theme: themeCtx } = useThemeContext();

  const theme = useTheme(themeCtx);

  return (
    <ThemeProvider theme={theme}>
      <FilterResultContainer>
        <RouterProvider router={router} />;
      </FilterResultContainer>
    </ThemeProvider>
  );
}

export default App;
