export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

type SickLeave = {
  startDate: string;
  endDate: string;
}

type Discharge = {
  date: string;
  criteria: string;
}


export interface Diagnose {
  code: string;
  name: string;
  latin?: string
}

export interface BaseEntry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

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

export type NewPatientEntry = Omit<Patient, 'id' >;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >