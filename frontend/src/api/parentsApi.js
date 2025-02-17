import axios from 'axios';

const API_URL = 'http://localhost:8000/api/parents/';

export const getParents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addParent = async (parentData) => {
    const response = await axios.post(API_URL, parentData);
    return response.data;
};

export const updateParent = async (id, parentData) => {
    const response = await axios.put(`${API_URL}${id}/`, parentData);
    return response.data;
};

export const deleteParent = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
};
