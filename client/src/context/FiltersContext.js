import React, { createContext, useState } from "react";

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    frequency: "all",
    category: "all",
  });

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
