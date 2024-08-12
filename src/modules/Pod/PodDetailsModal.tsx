import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography,} from '@mui/material';
import {useQuery} from "react-query";
import {getPod, Pod, SmallPod} from "../../apis/podApi";


interface PodDetailsModalProps {
    pod: SmallPod;
    onClose: () => void;
}

const PodDetailsModal: React.FC<PodDetailsModalProps> = ({ pod, onClose }) => {
    const { data: localPod } = useQuery<Pod>('pod',() => getPod(pod.name));
    if (!localPod) {
        return null;
    }

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Pod Details</DialogTitle>
            <DialogContent>
                <Typography>Name: {localPod.name}</Typography>
                <Typography>Namespace: {localPod.namespace}</Typography>
                <Typography>Status: {localPod.status}</Typography>
                <Typography>Resource Version: {localPod.resourceVersion}</Typography>
                <Typography>UID: {localPod.uid}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PodDetailsModal;
