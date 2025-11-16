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
    deleteRecord: async (recordId) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/delete-record/${recordId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateRecord: async (payload, recordId) => {
        try {
            const response = await axiosInstance.patch(`${BASE_URL}/update-record/${recordId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getContactLastView: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-contact-last-view`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateContactLastView: async () => {
        try {
            const response = await axiosInstance.patch(`${BASE_URL}/update-contact-last-view`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getContactInfo: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-contact-info`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateUserLog: async (payload) => {
        try {
            const response = await axiosInstance.patch(`${BASE_URL}/update-user-log`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getContacts: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-contacts`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addContact: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/add-contact`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateContact: async (contactId, payload) => {
        try {
            const response = await axiosInstance.put(`${BASE_URL}/update-contact/${contactId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteContact: async (contactId) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/delete-contact/${contactId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAddresses: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-addresses`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addAddress: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/add-address`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateAddress: async (addressId, payload) => {
        try {
            const response = await axiosInstance.put(`${BASE_URL}/update-address/${addressId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteAddress: async (addressId) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/delete-address/${addressId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getPhones: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-phones`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addPhone: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/add-phone`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updatePhone: async (phoneId, payload) => {
        try {
            const response = await axiosInstance.put(`${BASE_URL}/update-phone/${phoneId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deletePhone: async (phoneId) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/delete-phone/${phoneId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default contractService;
