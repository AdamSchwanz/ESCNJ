import axiosInstance from './axiosInstance';

const BASE_URL = '/api/contract';

const contractService = {
    getContracts: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-contracts`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getRecordsByContract: async (contractId) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-records-by-contract/${contractId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getMembersList: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-members-list`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addRecord: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/add-record`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default contractService;
