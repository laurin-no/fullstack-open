import { Diagnosis } from '../types';
import diagnoses from '../../data/diagnoses';

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnoses;
};

export default {
    getDiagnoses
};