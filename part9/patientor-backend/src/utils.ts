import { Discharge, EntryWithoutId, Gender, HealthCheckRating, NewPatient, SickLeave } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn.');
    }
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation.');
    }
    return occupation;
};

export type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
    return {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };
};

const parseType = (type: unknown): string => {
    const allowedTypes = ['Hospital', 'OccupationalHealthcare', 'HealthCheck'];

    if (!type || !isString(type) || !allowedTypes.includes(type)) {
        throw new Error('Incorrect or missing type.');
    }
    return type;
};

const parseString = (input: unknown): string => {
    if (!input || !isString(input)) {
        throw new Error('Incorrect or missing input.');
    }
    return input;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringArray = (param: any[]): param is string[] => {
    return param.every(i => isString(i));
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] | undefined => {
    if (!diagnosisCodes) {
        return undefined;
    } else if (!Array.isArray(diagnosisCodes) || !isStringArray(diagnosisCodes)) {
        throw new Error('Incorrect diagnosis codes');
    }
    return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
    const maybeDischarge = param as Discharge;
    return isDate(maybeDischarge.date) && isString(maybeDischarge.criteria);
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Missing or incorrect discharge object.');
    }
    return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
    const maybeSickLeave = param as SickLeave;
    return isDate(maybeSickLeave.startDate) && isDate(maybeSickLeave.endDate);
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
    if (!sickLeave) {
        return undefined;
    } else if (!isSickLeave(sickLeave)) {
        throw new Error('Incorrect sick leave.');
    }
    return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isHealthCheckRating(rating)) {
        throw new Error('Missing or incorrect rating');
    }
    return rating;
};

const assertNever = (value: unknown): never => {
    throw new Error(
        `Unhandled discriminated union member: ${value}`
    );
};

export type EntryFields = {
    type: unknown,
    description: unknown,
    date: unknown,
    specialist: unknown,
    diagnosisCodes: unknown,
    discharge: unknown,
    employerName: unknown,
    sickLeave: unknown,
    healthCheckRating: unknown
};

const toNewEntry = ({
                        type,
                        description,
                        date,
                        specialist,
                        diagnosisCodes,
                        discharge,
                        employerName,
                        sickLeave,
                        healthCheckRating
                    }: EntryFields): EntryWithoutId => {
    const typeParsed = parseType(type);

    const baseEntry = {
        description: parseString(description),
        date: parseDate(date),
        specialist: parseName(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };

    switch (typeParsed) {
        case 'Hospital':
            return {
                type: typeParsed,
                discharge: parseDischarge(discharge),
                ...baseEntry
            };
        case 'OccupationalHealthcare':
            return {
                type: typeParsed,
                employerName: parseName(employerName),
                sickLeave: parseSickLeave(sickLeave),
                ...baseEntry
            };
        case 'HealthCheck':
            return {
                type: typeParsed,
                healthCheckRating: parseHealthCheckRating(healthCheckRating),
                ...baseEntry
            };
        default:
            return assertNever(type);
    }
};

export { toNewPatient, toNewEntry };
