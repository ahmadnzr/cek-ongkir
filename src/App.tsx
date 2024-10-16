import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ConfigProvider, theme as antdTheme } from "antd";

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
      <ConfigProvider
        theme={{
          algorithm:
            themeCtx === "light"
              ? antdTheme.defaultAlgorithm
              : antdTheme.darkAlgorithm,
        }}
      >
        <FilterResultContainer>
          <RouterProvider router={router} />;
        </FilterResultContainer>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
