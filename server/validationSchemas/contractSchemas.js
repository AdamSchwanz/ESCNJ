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

module.exports = {
    getRecords,
    addRecord
};
