import express from 'express';

import toNewPatientEntry from '../utils';
import patientsService from '../services/patientsService';

const router = express.Router();

// Get all patients with all data
router.get('/', (_req, res) => {
  res.send(patientsService.getAllPatients());
});

// Get all patient with public only data
router.get('/public', (_req, res) => {
  res.send(patientsService.getPublicPatients());
});

// Get a patient by ID
router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  const patient = (patientsService.findPatientById(id));
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Uknown ID');
  }
});

// Add a new patient
router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
