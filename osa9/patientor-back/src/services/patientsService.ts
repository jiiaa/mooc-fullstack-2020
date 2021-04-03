import patientsData from '../../data/patients.json';
import { Patient, PatientPublic } from '../types';

const patients: Array<Patient> = patientsData;

const getAllPatients = (): Array<Patient> => {
  return patients;
};

const getPublicPatients = (): PatientPublic[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getAllPatients,
  getPublicPatients
};
