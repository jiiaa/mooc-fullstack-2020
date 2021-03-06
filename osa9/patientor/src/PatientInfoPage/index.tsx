import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Icon, List } from 'semantic-ui-react';

import EntriesList from './EntriesList';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatient } from '../state';

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string}>();
  const [{ patientsFull }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );
        // dispatch({ type: "SET_PATIENT", payload: patientInfoFromApi });
        dispatch(setPatient(patientInfoFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!Object.keys(patientsFull).includes(id)) {
      void fetchPatientInfo();
    }
  }, [dispatch]);
  return (
    <div className="App">
          {Object.values(patientsFull).map((patient: Patient) => {
            if (patient.id === id) {
              return (
                <Container text key={patient.id}>
                  <h3>{patient.name} <Icon name={patient.gender === 'male' ? 'mars' : 'venus'} /></h3>
                  <List>
                    <List.Item>Date of Birth: {patient.dateOfBirth}</List.Item>
                    <List.Item>SSN: {patient.ssn}</List.Item>
                    <List.Item>Occupation: {patient.occupation}</List.Item>
                  </List>
                  <h4>Diagnosis Entries</h4>
                  {patient.entries && patient.entries.map((entry: Entry) =>
                    <EntriesList key={entry.id} entry={entry} />
                  )}
                </Container>
              );
            }
          })}
    </div>
  );
};

export default PatientInfoPage;