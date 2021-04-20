export const getTime = () => {
  let date = new Date();
  const formatDigit = (n) => n < 10 ? '0' + n : n;
  const time = `${formatDigit(date.getHours())}:${formatDigit(date.getMinutes())}`;

  return time;
};