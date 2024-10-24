import axios, { AxiosInstance } from "axios";
import {
  APIRes,
  City,
  CostRequest,
  Courier,
  Province,
  THistoryResponse,
} from "@helpers/types";
import { getLocalStorage, setLocalStorage } from "../utils";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://rajaongkir-gate.vercel.app",
});

export const getProvince = async () => {
  const res = await axiosInstance.get<APIRes<Province[]>>("/province");

  return res.data;
};

export const getCities = async (provinceId?: string) => {
  if (!provinceId) return;
  const res = await axiosInstance.get<APIRes<City[]>>(
    `/city?province=${provinceId}`,
  );

  return res.data;
};

export const getCost = async (req: CostRequest) => {
  const res = await axiosInstance.post<APIRes<Courier[]>>(`/cost`, req);

  return res.data;
};

export type TCreateResponse = {
  status: number;
  message: string;
};

export const createHistory = (
  params: THistoryResponse,
): Promise<TCreateResponse> => {
  const histories = getLocalStorage<THistoryResponse[]>("SAVE_FILTER") || [];
  const invalidID = histories.some((item) => item.id === params.id);

  if (invalidID) {
    return Promise.reject({
      status: 400,
      message:
        "Filter sudah ada pada history. Silakan buat filter baru untuk menyimpan filter.",
    });
  }

  setLocalStorage<THistoryResponse[]>("SAVE_FILTER", [...histories, params]);

  return Promise.resolve({
    status: 200,
    message: "Silakan melihat filter yang tersimpan pada tab histori",
  });
};

export const getHistory = (): Promise<THistoryResponse[]> => {
  const histories = getLocalStorage<THistoryResponse[]>("SAVE_FILTER") || [];

  return Promise.resolve(histories);
};
