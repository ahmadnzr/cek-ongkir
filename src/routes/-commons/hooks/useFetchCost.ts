import { useMutation } from "@tanstack/react-query";

import { getCost } from "@helpers/api";

export const useFetchCost = () => {
  return useMutation({
    mutationKey: ["cost"],
    mutationFn: getCost,
  });
};
