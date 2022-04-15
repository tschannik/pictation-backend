export const isWeekday = (date: Date): boolean => {
  const tempDate = new Date(date);
  const day = tempDate.getDay();
  return day !== 0 && day !== 6;
};
