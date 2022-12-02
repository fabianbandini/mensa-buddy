import React, { createContext, useContext, useEffect, useState } from "react";

const useSession = () => {
  return {};
};

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {
  const state = useSession();
  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
