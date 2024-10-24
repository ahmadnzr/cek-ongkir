export type CourierType = "jne" | "pos" | "tiki";

export interface APIRes<T> {
  rajaongkir: {
    query: object;
    status: object;
    results: T;
  };
}

export interface Province {
  province_id?: string;
  province?: string;
}

export interface City {
  city_id?: string;
  city_name?: string;
  postal_code?: string;
  province?: string;
  province_id?: string;
  type?: string;
}

export interface Cost {
  value?: number;
  etd?: string;
  note?: string;
}

export interface CourierDetail {
  service?: string;
  description?: string;
  cost?: Cost[];
}

export interface Courier {
  code?: CourierType;
  name?: string;
  costs: CourierDetail[];
}

export interface CostRequest {
  origin: string;
  destination: string;
  weight: string;
  courier: CourierType;
}

export type CourierTypeButton = {
  label: string;
  value: CourierType;
};

export type FilterInputs = {
  fromProvince: string;
  fromCity: string;
  toProvince: string;
  toCity: string;
  weight: string;
  courier: CourierType;
};

export interface THistoryResponse {
  id: string;
  fromProvince?: Province;
  fromCity?: City;
  toProvince?: Province;
  toCity?: City;
  weight: string;
  courier: CourierType;
}
