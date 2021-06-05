import { Entry, Gender, NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (entryValue: unknown): string => {
  if (!entryValue || !isString(entryValue)) {
    throw new Error('Incorrect or missing value: ' + entryValue);
  }
  return entryValue;
};

const isArray = (arrayA: unknown): arrayA is Entry[] => {
  return Array.isArray(arrayA) || arrayA instanceof Array;
};

const parseArray = (entries: unknown): Entry[] => {
  if (!entries || !isArray(entries)) {
    throw new Error('Incorrect or missing value: ' + entries);
  }
  return entries;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseArray(entries),
  };
  return newPatient;
};

export default toNewPatientEntry;