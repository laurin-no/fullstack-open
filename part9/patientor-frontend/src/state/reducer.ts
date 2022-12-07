import { State } from './state';
import { Patient } from '../types';

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

export { setPatientList, setPatientDetails, addPatient };