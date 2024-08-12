import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,} from '@mui/material';
import {useMutation} from 'react-query';
import {createPod} from "../../apis/podApi";

interface AddPodModalProps {
    open: boolean;
    onClose: () => void;
    refetchPods: () => void;
}

const AddPodModal: React.FC<AddPodModalProps> = ({ open, onClose, refetchPods }) => {
    const [name, setName] = useState('');
    const [containerName, setContainerName] = useState('');
    const [image, setImage] = useState('');

    const addPodMutation = useMutation(
        () => createPod({name, containerName, image}),
        {
            onSuccess: () => {
                refetchPods();
                onClose();
            },
        }
    );

    const handleSubmit = () => {
        addPodMutation.mutate();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New PodApi</DialogTitle>
            <DialogContent>
                <TextField
                    label="PodApi Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Container Name"
                    fullWidth
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Image"
                    fullWidth
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Add PodApi
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPodModal;
