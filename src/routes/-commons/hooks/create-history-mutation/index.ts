import { Modal } from "antd";
import { useMutation } from "@tanstack/react-query";

import { createHistory, TCreateResponse } from "@/helpers/api";
import { THistoryResponse } from "@/helpers/types";

export const useCreateHistoryMutation = () => {
  return useMutation<TCreateResponse, TCreateResponse, THistoryResponse>({
    mutationKey: ["create-history"],
    mutationFn: createHistory,
    onSuccess: (data) => {
      Modal.success({
        title: "Filter Berhasil Disimpan",
        content: data?.message,
      });
    },
    onError: (err) => {
      Modal.error({
        title: "Filter Gagal Disimpan",
        content: err?.message,
      });
    },
  });
};
