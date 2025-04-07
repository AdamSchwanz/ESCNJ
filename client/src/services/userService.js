import axiosInstance from './axiosInstance';

const BASE_URL = '/api/user';

const userService = {
    loginUser: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/login`, payload, { withCredentials: true, skipAuthRefresh: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    setPassword: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/set-password`, payload, { withCredentials: true, skipAuthRefresh: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default userService;
