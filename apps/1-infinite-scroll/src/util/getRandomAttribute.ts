export const getRandomRatio = (): number => {
  const choices = [1, 2, 0.5];
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
};

export const getRandomColor = (): string => {
  return Math.floor(Math.random() * 16777215).toString(16);
};
