import React from "react";
import {
  QueryClient,
  QueryClientProvider as TNQueryClient,
} from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <TNQueryClient client={queryClient}>{children}</TNQueryClient>;
};
