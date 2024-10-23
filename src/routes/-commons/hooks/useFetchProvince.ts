import { useQuery } from "@tanstack/react-query";

import { getProvince } from "@helpers/api";

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
