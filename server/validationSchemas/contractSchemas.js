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
    name: yup.string().trim(),
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

const addAddress = yup.object().shape({
    address: yup.string().trim().required('Address is required'),
    address2: yup.string().trim(),
    city: yup.string().trim().required('City is required'),
    state: yup.string().trim().required('State is required'),
    zip: yup.string().trim().required('ZIP is required'),
    county: yup.string().trim().required('County is required'),
    country: yup.string().trim().required('Country is required'),
});

const updateAddressParams = yup.object().shape({
    addressId: yup.number().required('Address ID is required'),
});

const updateAddressBody = yup.object().shape({
    address: yup.string().trim().required('Address is required'),
    address2: yup.string().trim(),
    city: yup.string().trim().required('City is required'),
    state: yup.string().trim().required('State is required'),
    zip: yup.string().trim().required('ZIP is required'),
    county: yup.string().trim().required('County is required'),
    country: yup.string().trim().required('Country is required'),
});

const deleteAddress = yup.object().shape({
    addressId: yup.number().required('Address ID is required'),
});

const addPhone = yup.object().shape({
    phoneNumber: yup.string().trim().required('Phone Number is required'),
    ext: yup.string().trim().required('Ext is required'),
});

const updatePhoneParams = yup.object().shape({
    phoneId: yup.number().required('Phone ID is required'),
});

const updatePhoneBody = yup.object().shape({
    phoneNumber: yup.string().trim().required('Phone Number is required'),
    ext: yup.string().trim().required('Ext is required'),
});

const deletePhone = yup.object().shape({
    phoneId: yup.number().required('Phone ID is required'),
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
    deleteContact,
    addAddress,
    updateAddressParams,
    updateAddressBody,
    deleteAddress,
    addPhone,
    updatePhoneParams,
    updatePhoneBody,
    deletePhone
};
