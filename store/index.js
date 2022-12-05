import React, { createContext, useContext, useEffect, useState } from "react";

const useSession = () => {
  const [selectedLocation, setSelectedLocaton] = useState("");

  const selectLocation = (location) => {
    setSelectedLocaton(location);
  }

  const resetLocation = () => {
    setSelectedLocaton("");
  }

  return {selectLocation, resetLocation, selectedLocation};
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
