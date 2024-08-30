import axios, { AxiosInstance } from "axios";
import {
  APIRes,
  City,
  CostRequest,
  Courier,
  Province,
} from "../types/responseApi";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const getProvince = async () => {
  const res = await axiosInstance.get<APIRes<Province[]>>("/province");

  return res.data;
};

export const getCities = async (provinceId: string) => {
  const res = await axiosInstance.get<APIRes<City[]>>(
    `/city?province=${provinceId}`,
  );

  return res.data;
};

export const getCost = async (req: CostRequest) => {
  const res = await axiosInstance.post<APIRes<Courier[]>>(`/cost`, req);

  return res.data;
};
