"use client";
import React, { ReactNode, createContext } from "react";
import type { ThemeContextType } from "../../types/global"


const ContextTheme = createContext<ThemeContextType>({
  themeValue: true,
  changeTheme: () => {},
  light : '',
  dark : '',
  lightText : '',
  DarkText : '',
});


interface ThemeProviderProps {
  children: ReactNode;
}


const ThemeContext = ({ children }: ThemeProviderProps) => {
  const value = {
    themeValue: true,
    changeTheme: () => {},
    light: "bg-white",
    dark: "bg-white",
    lightText: "text-gray-900",
    DarkText: "text-gray-900",
  };

  return <ContextTheme.Provider value={value}>{children}</ContextTheme.Provider>;
};

export { ContextTheme, ThemeContext };