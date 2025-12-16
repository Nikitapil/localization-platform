export const toClientDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
