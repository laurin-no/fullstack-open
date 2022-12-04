import { Diagonse } from '../types';
import diagnoses from '../../data/diagnoses';

const getDiagnoses = (): Array<Diagonse> => {
    return diagnoses;
};

export default {
    getDiagnoses
};