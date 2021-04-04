import { Gender, NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (entryValue: unknown): string => {
  if (!entryValue || !isString(entryValue)) {
    throw new Error('Incorrect or missing value: ' + entryValue);
  }
  return entryValue;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
}

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: Fields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation)
  };
  return newPatient;
};

export default toNewPatientEntry;