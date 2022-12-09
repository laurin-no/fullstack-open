import patientData from '../../data/patients';
import { Entry, EntryWithoutId, NewPatient, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
    const maybePatientIndex = patients.findIndex(p => p.id === patientId);

    if (!maybePatientIndex) {
        throw new Error('Patient not found.');
    }

    const newEntry = {
        id: uuid(),
        ...entry
    };

    patients[maybePatientIndex].entries.push(newEntry);
    return newEntry;
};

const findById = (id: string) => {
    return patients.find(p => p.id === id);
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findById,
    addEntry
};