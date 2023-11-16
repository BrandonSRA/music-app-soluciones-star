"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { SingersProvider } from "./shared";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {
      text: {
        primary: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SingersProvider>{children}</SingersProvider>
    </ThemeProvider>
  );
};
