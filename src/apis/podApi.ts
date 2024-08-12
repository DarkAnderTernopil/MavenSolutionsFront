import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000';

export interface SmallPod {
    name: string;
    status: string;
}

export interface Pod extends SmallPod {
    namespace: string;
    resourceVersion: string;
    uid: string;
}
export const fetchPods = async () => {
    const { data } = await axios.get<SmallPod[]>('/pods');
    return data;
};

export const deletePod = (name: string) => axios.delete(`/pods/${name}`);

export const getPod = async (name: string): Promise<Pod> => {
    const { data } = await axios.get<Pod>(`/pods/${name}`);
    return data as Pod;
};

export const createPod = async ({name, containerName, image}: {name: string, containerName: string, image: string}) => {
  return await axios.post('/pods', {
        name,
        spec: {
            containers: [
                { name: containerName, image }
            ]
        }
    })
}