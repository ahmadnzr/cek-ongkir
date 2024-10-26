import { useQuery } from "@tanstack/react-query";

import { getHistory } from "@helpers/api";

export const useFetchHistory = ({ enabled }: { enabled: boolean }) =>
  useQuery({
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
    queryKey: ["history"],
    queryFn: getHistory,
    enabled,
  });
