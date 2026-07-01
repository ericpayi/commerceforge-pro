import axios from 'axios';
export const apiClient = axios.create({ baseURL: '/mock-api', timeout: 5000 });
export const mockDelay = async () => new Promise((resolve) => window.setTimeout(resolve, Number(import.meta.env.VITE_MOCK_LATENCY ?? 180)));
