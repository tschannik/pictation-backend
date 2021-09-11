export const isWeekday = (date: Date) => {
  const tempDate = new Date(date);
  const day = tempDate.getDay();
  return day !== 0 && day !== 6;
};
