import React, {
  useState,
  createContext,
  useCallback,
  useEffect,
  useContext,
} from "react";

import { Courier, SaveFilterType } from "../types";
import { getLocalStorage, setLocalStorage } from "../utils";

interface FilterResultType {
  results: Courier[];
  history: SaveFilterType[];
  setResults: (courier: Courier[]) => void;
  setHistory: (history: SaveFilterType) => void;
  deleteHistory: (history: SaveFilterType) => void;
}

export const FilterResultCtx = createContext<FilterResultType>({
  results: [],
  history: [],
  setResults: () => {},
  setHistory: () => {},
  deleteHistory: () => {},
});

export const FilterResultContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filterResult, setFilterResult] = useState<Courier[]>([]);
  const [history, setHistory] = useState<SaveFilterType[]>([]);

  const handleSetResult = (result: Courier[]) => {
    setFilterResult(result);
  };

  const handleSaveHistory = (histories: SaveFilterType[]) => {
    setHistory(histories);
    setLocalStorage<SaveFilterType[]>("SAVE_FILTER", histories);
  };

  const handleSetHistory = (item: SaveFilterType) => {
    const newHistory = [...history, item];
    handleSaveHistory(newHistory);
  };

  const handleDeleteHistory = (item: SaveFilterType) => {
    const newHistory = history.filter((hsr) => hsr.id !== item.id);
    handleSaveHistory(newHistory);
  };

  const getHistory = useCallback(() => {
    const savedFilter = getLocalStorage<SaveFilterType[]>("SAVE_FILTER") || [];

    setHistory(savedFilter);
  }, []);

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <FilterResultCtx.Provider
      value={{
        history,
        results: filterResult,
        setResults: handleSetResult,
        setHistory: handleSetHistory,
        deleteHistory: handleDeleteHistory,
      }}
    >
      {children}
    </FilterResultCtx.Provider>
  );
};

export const useFilterResultCtx = () => useContext(FilterResultCtx);
