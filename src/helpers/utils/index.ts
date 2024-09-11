export * from "./color";
export * from "./date";
export * from "./courier";

export const formatRupiah = (number: number) => {
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};
