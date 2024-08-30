import dayjs from "dayjs";

export const formatDate = (date: Date | null) => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};

export const getDateDiff = (lastDate: Date | null) => {
  if (!lastDate) return "";

  const now = dayjs();

  return dayjs(lastDate).diff(now, "day");
};
