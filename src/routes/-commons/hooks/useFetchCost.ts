import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import { getCost } from "@helpers/api";
import { Route, THistorySearch } from "@/routes";

export const useFetchCost = () => {
  const navigate = useNavigate({ from: Route.fullPath });

  return useMutation({
    mutationKey: ["cost"],
    mutationFn: getCost,
    onSuccess: (data) => {
      const {
        rajaongkir: { query, destination_details, origin_details },
      } = data;
      navigate({
        search: (): THistorySearch => ({
          tab: "1",
          fromProvince: origin_details.province_id,
          toProvince: destination_details.province_id,
          fromCity: origin_details.city_id,
          toCity: destination_details.city_id,
          weight: String(query.weight / 1000), // convert to kg
          courier: query.courier,
        }),
      });
    },
  });
};
