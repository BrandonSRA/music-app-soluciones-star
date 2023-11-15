"use client";

import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { useSingers, UseSingersType } from "../hooks";

export interface SingersContextType extends UseSingersType {}

const SingersContext = createContext<SingersContextType>(
  {} as SingersContextType
);

export const useSingersContext = () => useContext(SingersContext);

export const SingersProvider = ({ children }: { children: ReactNode }) => {
  const context = useSingers();

  return (
    <SingersContext.Provider value={context}>
      {children}
    </SingersContext.Provider>
  );
};
