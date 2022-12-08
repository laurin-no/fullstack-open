import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { setPatientDetails, useStateValue } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientDetailPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [patient, setPatient] = useState<Patient>();

    const maybePatient = Object.values(patients).find(p => p.id === id);

    useEffect(() => {
        const fetchPatientDetails = async (id: string) => {
            const { data: patientDetails } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            setPatient(patientDetails);
            dispatch(setPatientDetails(patientDetails));
        };

        if (!maybePatient?.ssn && id) {
            void fetchPatientDetails(id);
        } else {
            setPatient(maybePatient);
        }
    }, [dispatch]);

    if (!patient) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h2>{patient.name}</h2>
            gender: {patient.gender}<br />
            ssn: {patient.ssn}<br />
            occupation: {patient.occupation}<br />
            <h3>entries</h3>
            {patient.entries.map(entry => (
                    <div key={entry.id}>
                        <p>{entry.description}</p>
                        <ul>
                            {entry.diagnosisCodes?.map(code => (
                                <li key={code}>{code}</li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </div>
    );
};

export default PatientDetailPage;