interface bmiResult {
  height: number;
  weight: number;
  bmi: string;
}

// interface indexParameters {
//   height: number;
//   weight: number;
// }

// const validateArguments = (args: Array<string>): indexParameters => {
//   if (args.length < 4) throw new Error('Parameter(s) missing.');
//   if (args.length > 4) throw new Error('Too many arguments.');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers.');
//   }
// }

const calculateBMI = (h: number, w: number): bmiResult => {
  const index = Number((w / ((h / 100) * (h / 100))).toFixed(1));
  if (index < 18.5) {
    return {
      height: h,
      weight: w,
      bmi: 'Underweight (unhealthy weight)'
    };
  } else if (index >= 18.5 && index <= 25) {
    return {
      height: h,
      weight: w,
      bmi: 'Normal (healthy weight)',
    };
  } else {
    return {
      height: h,
      weight: w,
      bmi: 'Overweight (heavy weight)',
    };
  }
};

export default calculateBMI;

// try {
//   const { height, weight } = validateArguments(process.argv);
//   console.log(calculateBMI(height, weight));
// } catch (e) {
//   console.error('Oops, something went wrong: ', e.message);
// }
