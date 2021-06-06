import express from 'express';
import cors from 'cors';

import diagnosisRouter from './routes/diagnosis';
import patientsRouter from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('Someone pinged here');
  res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);

app.use('/api/patients', patientsRouter);

app.get('/', (_req, res) =>{
  res.send('Unknown route');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
