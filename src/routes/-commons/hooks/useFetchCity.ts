import { useQuery } from "@tanstack/react-query";

import { getCities } from "@helpers/api";

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
