import React, { useState, createContext } from "react";

import { Courier } from "../types";

interface FilterResultType {
  results: Courier[];
  setResults: (courier: Courier[]) => void;
}

export const FilterResultCtx = createContext<FilterResultType>({
  results: [],
  setResults: () => {},
});

export const FilterResultContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filterResult, setFilterResult] = useState<Courier[]>([]);

  const handleSetResult = (result: Courier[]) => {
    setFilterResult(result);
  };

  return (
    <FilterResultCtx.Provider
      value={{
        results: filterResult,
        setResults: handleSetResult,
      }}
    >
      {children}
    </FilterResultCtx.Provider>
  );
};
