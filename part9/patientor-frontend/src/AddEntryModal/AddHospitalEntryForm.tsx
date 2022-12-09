import { HospitalEntry } from '../types';
import { useStateValue } from '../state';
import { Field, Form, Formik } from 'formik';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { Button, Grid } from '@material-ui/core';

export type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                type: 'Hospital',
                discharge: {
                    date: '',
                    criteria: ''
                }
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string; } = {};

                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.discharge || !values.discharge.date || !values.discharge.criteria) {
                    errors.discharge = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className='form ui'>
                        <Field
                            label='Description'
                            placeholder='Description'
                            name='description'
                            component={TextField}
                        />
                        <Field
                            label='Date'
                            placeholder='YYYY-MM-DD'
                            name='date'
                            component={TextField}
                        />
                        <Field
                            label='Specialist'
                            placeholder='Specialist'
                            name='specialist'
                            component={TextField}
                        />
                        <DiagnosisSelection
                            diagnoses={Object.values(diagnoses)}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                        />
                        <Field
                            label='Discharge Date'
                            placeholder='YYYY-MM-DD'
                            name='discharge.date'
                            component={TextField}
                        />
                        <Field
                            label='Discharge Criteria'
                            placeholder='Discharge Criteria'
                            name='discharge.criteria'
                            component={TextField}
                        />

                        <Grid>
                            <Grid item>
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    style={{ float: 'left' }}
                                    type='button'
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{ float: 'right' }}
                                    type='submit'
                                    variant='contained'
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddHospitalEntryForm;