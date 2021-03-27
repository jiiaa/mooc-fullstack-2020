interface CalculatedExeHours {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (
  hours: Array<number>,
  target: number
): CalculatedExeHours => {

  const hoursAverage = (data: Array<number>): number => {
    const average: number = hours.reduce((sum, curVal) => sum + curVal, 0) / hours.length;
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

const target: number = Number(process.argv[2]);
const hours: number[] = [];

for (let i = 3; i < process.argv.length; i++) {
  hours.push(Number(process.argv[i]));
}

console.log(calculateExercises(hours, target));
