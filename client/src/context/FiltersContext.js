import React, { createContext, useState } from 'react'

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    region: '',
    cause: ''
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}> 
      {children}
    </FiltersContext.Provider>
  );
}


