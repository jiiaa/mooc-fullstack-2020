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

console.log(calculateBMI(183, 82));
console.log(calculateBMI(182, 72));
console.log(calculateBMI(183, 84));
