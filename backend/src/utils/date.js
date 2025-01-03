import dayjs from "dayjs";

export const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};
