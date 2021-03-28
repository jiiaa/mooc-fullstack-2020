interface CalculatedExeHours {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface validatedValues {
  target: number;
  hours: Array<number>;
}

const validateArgs = (args: Array<string>): validatedValues => {
  console.log(args[2], '/', args[3]);
  if (args[2] === undefined || args[3] === undefined) {
    throw new Error('Values are missing');
  }

  const target: number = Number(args[2]);
  if (isNaN(target)) {
    throw new Error('Target is invalid');
  }

  const hours: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Hours are invalid');
    } else {
      hours.push(Number(process.argv[i]));
    }
  }
  return {
    target,
    hours
  }
}

const calculateExercises = (
  hours: Array<number>,
  target: number
): CalculatedExeHours => {

  const hoursAverage = (data: Array<number>): number => {
    const average: number = data.reduce((sum, curVal) => sum + curVal, 0) / data.length;
    return average;
  }

  const rating = (averageRes: number, targetValue: number): number => {
    if (averageRes < targetValue) {
      return 1;
    } else if (averageRes >= targetValue && averageRes < (targetValue + 1)) {
      return 2;
    } else {
      return 3;
    }
  }

  const description = (averageRes: number, targetValue: number): string  => {
    if (averageRes < targetValue) {
      return 'You are below target. Get a grip.';
    } else if (averageRes >= targetValue && averageRes < (targetValue + 1)) {
      return 'You are on target. Well done.';
    } else {
      return 'You are above target. No limits.';
    }
  }

  let exerciseResults = {
    periodLength: hours.length,
    trainingDays: hours.filter(hour => hour > 0).length,
    target,
    average: hoursAverage(hours),
    success: hoursAverage(hours) >= target ? true : false,
    rating: rating (hoursAverage(hours), target),
    ratingDescription: description(hoursAverage(hours), target),
  };

  return exerciseResults;
}

try {
  const { target, hours } = validateArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  console.error('Ooops, something was not right: ', e.message);
}