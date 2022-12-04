import { Diagnose } from '../types';
import diagnoses from '../../data/diagnoses';

const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

export default {
    getDiagnoses
};