const determineNewPosition = () => {
  const maxX = window.innerWidth - 250;
  const maxY = window.innerHeight - 250;

  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * (maxY - 100)) + 100,
  };
};
export default determineNewPosition;
