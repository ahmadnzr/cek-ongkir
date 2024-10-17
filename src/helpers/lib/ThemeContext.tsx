import React, { createContext, useContext, useEffect, useState } from "react";

import { Theme } from "../types";
import { getLocalStorage, setLocalStorage } from "../utils";

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
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
