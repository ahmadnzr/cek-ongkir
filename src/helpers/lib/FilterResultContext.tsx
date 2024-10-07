import React, {
  useState,
  createContext,
  useCallback,
  useEffect,
  useContext,
} from "react";

import { Courier, SaveFilterType } from "@helpers/types";
import { getLocalStorage, setLocalStorage } from "@helpers/utils";
import { useFetchCost } from "@helpers/hooks";

interface FilterResultType {
  defaultFilter: SaveFilterType | null;
  results: Courier[];
  history: SaveFilterType[];
  setResults: (courier: Courier[]) => void;
  setHistory: (history: SaveFilterType) => void;
  deleteHistory: (history: SaveFilterType) => void;
  applyHistory: (history: SaveFilterType) => void;
}

export const FilterResultCtx = createContext<FilterResultType>({
  defaultFilter: null,
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
  const { mutate } = useFetchCost();

  const [filterResult, setFilterResult] = useState<Courier[]>([]);
  const [history, setHistory] = useState<SaveFilterType[]>([]);
  const [appliedHistory, setAppliedHistory] = useState<SaveFilterType | null>(
    null,
  );

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

  const handleApplyHistory = async (item: SaveFilterType) => {
    setAppliedHistory(item);
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
        defaultFilter: appliedHistory,
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
