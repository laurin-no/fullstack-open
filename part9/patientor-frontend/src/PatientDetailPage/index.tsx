import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { setPatientDetails, useStateValue } from '../state';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AddHospitalEntryModal from '../AddEntryModal';
import { Button } from '@material-ui/core';
import { HospitalEntryFormValues } from '../AddEntryModal/AddHospitalEntryForm';

const PatientDetailPage = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [patient, setPatient] = useState<Patient>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
        try {
            if (!id || !patient) {
                throw new Error('id missing');
            }

            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );

            const updatedPatient = { ...patient, entries: patient.entries.concat(newEntry) };

            dispatch(setPatientDetails(updatedPatient));
            closeModal();
        } catch (e: unknown) {
            console.error('Error happened: ', e);
            setError('Some error');
        }
    };

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

    const findDiagnosis = (code: string) => {
        return Object.values(diagnoses).find(d => d.code === code);
    };

    if (!patient) {
        return <div>loading...</div>;
    }

    const HospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
        return (<div>
            <LocalHospitalIcon />
            discharge at {entry.discharge.date} for reason {entry.discharge.criteria}
        </div>);
    };

    const OccupationalHealthcareEntry = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
        return (
            <div>
                <WorkIcon />
                employer: {entry.employerName}<br />
                {entry.sickLeave &&
                    <div>
                        sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
                    </div>
                }
            </div>
        );
    };

    const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {
        return (
            <div>
                <MedicalInformationIcon />
                rating: {entry.healthCheckRating}
            </div>
        );
    };

    const entryStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const Entry = ({ entry }: { entry: Entry }) => {
        return (
            <div style={entryStyle}>
                {entry.date}
                <p>{entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map(code => (
                        <li key={code}>{code} {findDiagnosis(code)?.name}</li>
                    ))}
                </ul>
                <EntryDetails entry={entry} />
                diagnose by {entry.specialist}
            </div>
        );
    };

    const EntryDetails = ({ entry }: { entry: Entry }) => {
        switch (entry.type) {
            case 'Hospital':
                return <HospitalEntry entry={entry} />;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcareEntry entry={entry} />;
            case 'HealthCheck':
                return <HealthCheckEntry entry={entry} />;
            default:
                return null;

        }
    };

    return <div>
        <h2>{patient.name}</h2>
        gender: {patient.gender}<br />
        ssn: {patient.ssn}<br />
        occupation: {patient.occupation}<br />
        <h3>entries</h3>
        {patient.entries.map(entry => <Entry key={entry.id} entry={entry} />)}
        <AddHospitalEntryModal
            modalOpen={modalOpen}
            onClose={closeModal}
            onSubmit={submitNewHospitalEntry}
            error={error}
        />
        <Button variant='contained' onClick={() => openModal()}>
            Add New Hospital Entry
        </Button>
    </div>;
};

export default PatientDetailPage;