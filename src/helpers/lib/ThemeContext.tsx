import React, { createContext, useContext, useEffect, useState } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { ThemeProvider } from "styled-components";

import { Theme } from "../types";
import { getLocalStorage, setLocalStorage } from "../utils";
import { useTheme } from "./theme";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const savedTheme = getLocalStorage<Theme>("THEME") || "light";
  const [theme, setTheme] = useState<Theme>(savedTheme);

  const themeStyle = useTheme(theme);

  const handleSetTheme = (theme: Theme) => {
    setTheme(theme);
    setLocalStorage("THEME", theme);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("color-scheme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
      }}
    >
      <ThemeProvider theme={themeStyle}>
        <ConfigProvider
          theme={{
            algorithm:
              theme === "light"
                ? antdTheme.defaultAlgorithm
                : antdTheme.darkAlgorithm,
          }}
        >
          {children}
        </ConfigProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
