import express from 'express';

import patientsService from '../services/patientsService';

const router = express.Router();


router.get('/public', (_req, res) => {
  res.send(patientsService.getPublicPatients());
});

router.get('/', (_req, res) => {
  res.send(patientsService.getAllPatients());
});

export default router;
