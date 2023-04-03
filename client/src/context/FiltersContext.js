import React, { createContext, useState } from 'react'

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    region: '',
    cause: '',
    amount: '',
  });

  return (
    <FiltersContext.Provider value={{ 
      filters, 
      setFilters 
    }}> 
      {children}
    </FiltersContext.Provider>
  );
}


