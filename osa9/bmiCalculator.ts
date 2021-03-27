const calculateBMI = (h: number, m: number): string => {
  const hSquare: number = h / 100;
  const index: number = Number((m / (hSquare * hSquare)).toFixed(1));
  if (index < 18.5) {
    return (`Underweight (unhealthy weight), index is ${index}`);
  } else if (index >= 18.5 && index <= 25) {
    return (`Normal (healthy weight), index is ${index}`);
  } else if (index > 25) {
    return (`Overweight (heavy weight), index is ${index}`);
  };
}

const height: number = Number(process.argv[2]);
const mass: number = Number(process.argv[3]);

console.log(calculateBMI(height, mass));
