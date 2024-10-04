import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getCities, getCost, getProvince } from "../api";
import { APIRes, CostRequest, Courier } from "../types/";

export const useFetchProvince = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    retry: false,
    queryKey: ["province"],
    queryFn: getProvince,
    select: (data) => {
      const newData = data.rajaongkir.results;
      return newData;
    },
  });
};

export const useFetchCity = (provinceId?: string) =>
  useQuery({
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
    queryKey: ["city", provinceId],
    queryFn: () => getCities(provinceId),
    select: (data) => data?.rajaongkir.results,
    enabled: Boolean(provinceId),
  });

export const useFetchCost = () => {
  return useMutation<APIRes<Courier[]>, AxiosError<object>, CostRequest>({
    mutationKey: ["cost"],
    mutationFn: (vars) => getCost(vars),
  });
};
