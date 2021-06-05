import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatientEntry } from '../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

// Return all patients as json
const getAllPatients = (): Array<Patient> => {
  return patients;
};

// Return all patients as json but omit ssn data
const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

// Find a patient by ID
const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

// Add new patient
const addNewPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getAllPatients,
  getPublicPatients,
  findPatientById,
  addNewPatient
};
