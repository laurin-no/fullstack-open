import React from 'react';
import { Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HospitalEntryFormValues) => void;
    error?: string;
}

const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add new hospital entry</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity='error'>{`Error: ${error}`}</Alert>}
            <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);

export default AddHospitalEntryModal;