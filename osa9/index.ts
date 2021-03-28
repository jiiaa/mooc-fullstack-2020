import express from 'express';
import calculateBMI from './bmiCalculator';
const app = express();

// import calculateBMI from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello, Full Stack.');
});

app.get('/bmi/:height?/:weight?', (req, res) => {
  const height: number = Number(req.params.height);
  const weight: number = Number(req.params.weight);

  console.log(height);
  console.log(weight);

  try {
    if (isNaN(height) || isNaN(weight)) {
      throw new Error ('Parameter(s) is/are invalid');
    } else {
      res.json(calculateBMI(height, weight));
    }
  } catch (e) {
    res.status(404).json(e.message);
  }
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
