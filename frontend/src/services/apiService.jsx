import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getRoles = () => axios.get(`${API_URL}/roles`);
export const createRole = (data) => axios.post(`${API_URL}/roles`, data);

export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (data) => axios.post(`${API_URL}/users`, data);