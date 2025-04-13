const yup = require('yup');

const getRecords = yup.object().shape({
    contractId: yup.number().required('Contract ID is required'),
});

module.exports = {
    getRecords,
};
