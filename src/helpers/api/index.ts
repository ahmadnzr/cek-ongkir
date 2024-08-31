import axios, { AxiosInstance } from "axios";
import {
  APIRes,
  City,
  CostRequest,
  Courier,
  Province,
} from "../types/responseApi";

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_URL || "https://rajaongkir-gate.vercel.app",
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
