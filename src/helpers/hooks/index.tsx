import { useMutation, useQuery } from "@tanstack/react-query";
import { getCities, getCost, getProvince } from "../api";
import { APIRes, CostRequest, Courier } from "../types/responseApi";
import { AxiosError } from "axios";

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

export const useFetchCity = ({ provinceId }: { provinceId?: string }) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["city", provinceId],
    retry: false,
    queryFn: () => getCities(provinceId),
    select: (data) => {
      const newData = data?.rajaongkir.results;
      return newData;
    },
    enabled: Boolean(provinceId),
  });
};

export const useFecthCost = () => {
  return useMutation<APIRes<Courier[]>, AxiosError<object>, CostRequest>({
    mutationKey: ["cost"],
    mutationFn: (vars) => getCost(vars),
  });
};
