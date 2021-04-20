export function createElement(tag, className) {
  tag = document.createElement(tag);
  if (className) {
    tag.classList.add(className);
  }
  
  return tag;
};