import express from 'express';
import calculateBMI from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello, Full Stack.');
});

app.get('/bmi/:height?/:weight?', (req, res) => {
  const height = Number(req.params.height);
  const weight = Number(req.params.weight);

  try {
    if (isNaN(height) || isNaN(weight)) {
      throw new Error ('Parameter(s) is/are invalid');
    } else {
      res.json(calculateBMI(height, weight));
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json(e.message);
    } else {
      res.status(400).json({ message: "Unknown error" });
    }
  }
});

app.post('/exercises', (req, res) => {
  const hours: Array<number> = req.body.hours;
  const target = Number(req.body.target);

  try {
    if (target === undefined || hours.length < 1) {
      throw new Error ('Parameters missing');
    } else if (isNaN(target) || !Array.isArray(hours)) {
      throw new Error ('Malformatted parameters');
    } else {
      res.json(calculateExercises(hours, target));
    }
  }catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json(e.message);
    } else {
      res.status(400).json({ message: "Unknown error" });
    }
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
