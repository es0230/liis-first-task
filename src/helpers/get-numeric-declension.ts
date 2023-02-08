export const getNumericDeclension = (count: number, [w1, w2, w5]: string[]) => {
  if (`${count}`.at(-1) === '0' || (count >= 5 && count <= 19)) {
    return `${count} ${w5}`;
  }
  if (`${count}`.at(-1) === '2' || `${count}`.at(-1) === '3' || `${count}`.at(-1) === '4') {
    return `${count} ${w2}`;
  }
  return `${count} ${w1}`;
};
