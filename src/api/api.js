import axios from 'axios';

const API_URL = 'http://localhost:3000/api/animals';

export const fetchAnimals = async (filters = {}) => {
    try {
        const response = await axios.get(API_URL, { params: filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching animals:', error);
        throw error;
    }
};

export const fetchAnimalById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching animal ${id}:`, error);
        throw error;
    }
};