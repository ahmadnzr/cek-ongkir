import { message } from "antd";
import { useMutation } from "@tanstack/react-query";

import { deleteHistory } from "@/helpers/api";
import { queryClient } from "@/helpers/lib";

export const useDeleteHistoryMutation = () => {
  return useMutation({
    mutationKey: ["delete-history"],
    mutationFn: deleteHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      message.success("History berhasil dihapus");
    },
    onError: () => {
      message.error("History gagal dihapus");
    },
  });
};
