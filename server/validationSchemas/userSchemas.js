const yup = require('yup');

const loginSchema = yup.object().shape({
    username: yup.string().trim().required('Username is required'),
    password: yup.string().trim().required('Password is required'),
});

module.exports = {
    loginSchema,
};
