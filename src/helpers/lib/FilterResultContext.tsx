import React, {
  useState,
  createContext,
  useCallback,
  useEffect,
  useContext,
} from "react";

import { Courier, SaveFilterType } from "../types";
import { getLocalStorage, setLocalStorage } from "../utils";
import { useFecthCost } from "../hooks";

interface FilterResultType {
  results: Courier[];
  history: SaveFilterType[];
  setResults: (courier: Courier[]) => void;
  setHistory: (history: SaveFilterType) => void;
  deleteHistory: (history: SaveFilterType) => void;
  applyHistory: (history: SaveFilterType) => void;
}

export const FilterResultCtx = createContext<FilterResultType>({
  results: [],
  history: [],
  setResults: () => {},
  setHistory: () => {},
  deleteHistory: () => {},
  applyHistory: () => {},
});

export const FilterResultContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { mutate } = useFecthCost();

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

  const handleApplyHistory = (item: SaveFilterType) => {
    mutate(
      {
        origin: item.fromCity?.city_id || "",
        destination: item.toCity?.city_id || "",
        weight: (parseInt(item.weight) * 1000).toString(), // in gram
        courier: item.courier,
      },
      {
        onSuccess: (data) => {
          setFilterResult(data.rajaongkir.results);
        },
      },
    );
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
        applyHistory: handleApplyHistory,
      }}
    >
      {children}
    </FilterResultCtx.Provider>
  );
};

export const useFilterResultCtx = () => useContext(FilterResultCtx);
