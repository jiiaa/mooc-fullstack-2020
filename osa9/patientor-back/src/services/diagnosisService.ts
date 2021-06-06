import diagnosisData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnosis: Array<Diagnose> = diagnosisData;

const getAllDiagnosis = () => {
  return diagnosis;
};

export default {
  getAllDiagnosis
};
