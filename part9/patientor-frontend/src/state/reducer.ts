import { State } from './state';
import { Diagnosis, Patient } from '../types';

export type Action =
    | {
    type: 'SET_PATIENT_LIST';
    payload: Patient[];
}
    | {
    type: 'ADD_PATIENT';
    payload: Patient;
}
    | {
    type: 'SET_PATIENT_DETAILS';
    payload: Patient;
}
    | {
    type: 'SET_DIAGNOSES';
    payload: Diagnosis[];
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENT_LIST':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients
                }
            };
        case 'ADD_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case 'SET_PATIENT_DETAILS':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case 'SET_DIAGNOSES':
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }), {}
                    ),
                    ...state.diagnoses
                }
            };
        default:
            return state;
    }
};


const setPatientList = (patientListFromApi: Patient[]): Action => {
    return {
        type: 'SET_PATIENT_LIST',
        payload: patientListFromApi
    };
};

const setPatientDetails = (patientDetails: Patient): Action => {
    return { type: 'SET_PATIENT_DETAILS', payload: patientDetails };
};

const addPatient = (newPatient: Patient): Action => {
    return { type: 'ADD_PATIENT', payload: newPatient };
};

const setDiagnosisList = (diagnosesFromApi: Diagnosis[]): Action => {
    return {
        type: 'SET_DIAGNOSES',
        payload: diagnosesFromApi
    };
};

export { setPatientList, setPatientDetails, addPatient, setDiagnosisList };