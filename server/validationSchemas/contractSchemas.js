const yup = require('yup');

const getRecords = yup.object().shape({
    contractId: yup.number().required('Contract ID is required'),
});

const addRecord = yup.object().shape({
    ContractID: yup.number().required('Contract ID is required'),
    MemberEntityID: yup.number().required('Member Entity ID is required'),
    ReportAmount: yup.number().required('Report Amount is required'),
    ReportItem: yup.string().trim().required('Report Item is required'),
});

const deleteRecord = yup.object().shape({
    recordId: yup.number().required('Record ID is required'),
});

const updateRecordParams = yup.object().shape({
    recordId: yup.number().required('Record ID is required'),
});

const updateRecordBody = yup.object().shape({
    MemberEntityID: yup.number().required('Member Entity ID is required'),
    ReportAmount: yup.number().required('Report Amount is required'),
    ReportItem: yup.string().trim().required('Report Item is required'),
});

const updateUserLog = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
});

const addContact = yup.object().shape({
    firstName: yup.string().trim().required('First Name is required'),
    lastName: yup.string().trim().required('Last Name is required'),
    email: yup.string().trim().required('Email is required'),
});

const updateContactParams = yup.object().shape({
    contactId: yup.number().required('Contact ID is required'),
});

const updateContactBody = yup.object().shape({
    firstName: yup.string().trim().required('First Name is required'),
    lastName: yup.string().trim().required('Last Name is required'),
    email: yup.string().trim().required('Email is required'),
});

const deleteContact = yup.object().shape({
    contactId: yup.number().required('Contact ID is required'),
});

module.exports = {
    getRecords,
    addRecord,
    deleteRecord,
    updateRecordParams,
    updateRecordBody,
    updateUserLog,
    addContact,
    updateContactParams,
    updateContactBody,
    deleteContact
};
