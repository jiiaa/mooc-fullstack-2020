export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string
}

export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export interface PatientPublic {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >