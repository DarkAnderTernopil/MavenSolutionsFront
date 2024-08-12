import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {Button, Container, Grid, IconButton, Paper, Typography,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPodModal from './AddPodModal';
import PodDetailsModal from './PodDetailsModal';
import {deletePod, fetchPods, SmallPod} from "../../apis/podApi";


const PodGrid: React.FC = () => {
    const queryClient = useQueryClient();
    const [selectedPod, setSelectedPod] = useState<SmallPod | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const { data: pods, refetch } = useQuery<SmallPod[]>('pods', fetchPods);

    const deletePodMutation = useMutation(
        deletePod,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('pods');
            },
        }
    );

    const handleDeletePod = (name: string) => {
        deletePodMutation.mutate(name);
    };

    const handleAddPod = () => {
        setIsAddModalOpen(true);
    };

    const handlePodClick = (pod: SmallPod) => {
        setSelectedPod(pod);
    };
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Kubernetes Pods
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddPod}>
                Add New Pod
            </Button>
            <Grid container spacing={3} marginTop={3}>
                {pods?.map((pod) => (
                    <Grid item xs={12} sm={6} md={4} key={pod.name}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="h6">{pod.name}</Typography>
                            <Typography>Status: {pod.status}</Typography>
                            <IconButton
                                color="secondary"
                                onClick={() => handleDeletePod(pod.name)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <Button
                                variant="outlined"
                                onClick={() => handlePodClick(pod)}
                            >
                                View Details
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {isAddModalOpen && (
                <AddPodModal
                    open={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    refetchPods={refetch}
                />
            )}

            {selectedPod && (
                <PodDetailsModal
                    pod={selectedPod as any}
                    onClose={() => setSelectedPod(null)}
                />
            )}
        </Container>
    );
};

export default PodGrid;
