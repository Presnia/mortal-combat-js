const getRandom = (n) => {
  return Math.ceil(Math.random() * n);
};

const getTime = () => {
  let date = new Date();
  const formatDigit = (n) => n < 10 ? '0' + n : n;
  const time = `${formatDigit(date.getHours())}:${formatDigit(date.getMinutes())}`;

  return time;
};

const createElement = (tag, className) => {
  tag = document.createElement(tag);
  if (className) {
    tag.classList.add(className);
  }
  
  return tag;
};

export { getRandom, getTime, createElement };