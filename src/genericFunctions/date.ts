export const getDate = (date: String): String => {
  const absoluteInformation = date.split("T");
  const dateEvent = absoluteInformation[0].split("-");
  const hour = absoluteInformation[1].split(":");
  const finale =
    dateEvent[2] +
    "/" +
    dateEvent[1] +
    "/" +
    dateEvent[0] +
    " à " +
    hour[0] +
    "h" +
    hour[1];
  return finale;
};

export type dateEvent = {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
};

export const getDateObject = (date: String): dateEvent => {
  const absoluteInformation = date.split("T");
  const dateEvent = absoluteInformation[0].split("-");
  const hour = absoluteInformation[1].split(":");
  const finaleDate: dateEvent = {
    day: Number(dateEvent[2]),
    month: Number(dateEvent[1]),
    year: Number(dateEvent[0]),
    hour: Number(hour[0]),
    minute: Number(hour[1]),
  };
  return finaleDate;
};
