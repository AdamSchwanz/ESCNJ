import { useState } from "react";
import "./ContactForm.css";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import { message } from "antd";
import contractService from "../../../../services/contractService";

const ContactForm = ({
    userName,
    handleModalClose,
    fetchContacts,
    editContact,
    setRefetchMainInfo
}) => {
    const [formData, setFormData] = useState({
        firstName: editContact?.firstName ? editContact.firstName : "",
        lastName: editContact?.lastName ? editContact.lastName : "",
        email: editContact?.email ? editContact.email : "",
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateData = () => {
        const newErrors = { ...errors };
        let hasErrors = false;
        const { firstName, lastName, email } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName) {
            newErrors.firstName = "Please enter the first name";
            hasErrors = true;
        } else {
            newErrors.firstName = "";
        }
        if (!lastName) {
            newErrors.lastName = "Please enter the last name";
            hasErrors = true;
        } else {
            newErrors.lastName = "";
        }
        if (!email) {
            newErrors.email = "Please enter the email";
            hasErrors = true;
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Please enter the valid email";
            hasErrors = true;
        } else {
            newErrors.email = "";
        }

        setErrors((prevState) => ({ ...prevState, ...newErrors }));
        return !hasErrors;
    };

    const handleSubmit = async () => {
        if (!validateData()) {
            return;
        }
        const data = formData;
        // console.log("Data: ", data);
        if (!editContact) {
            try {
                dispatch(ShowLoading());
                const response = await contractService.addContact(data);
                // console.log("Response: ", response);
                await contractService.updateUserLog({ name: userName });
                setRefetchMainInfo(true);
                message.success(response.message);
                handleModalClose();
                fetchContacts();
            } catch (error) {
                message.error(error?.response?.data?.error || "Something Went Wrong!");
            } finally {
                dispatch(HideLoading());
            }
        } else {
            try {
                dispatch(ShowLoading());
                const response = await contractService.updateContact(
                    editContact.contactId,
                    data
                );
                // console.log("Response: ", response);
                await contractService.updateUserLog({ name: userName });
                setRefetchMainInfo(true);
                message.success(response.message);
                handleModalClose();
                fetchContacts();
            } catch (error) {
                message.error(error?.response?.data?.error || "Something Went Wrong!");
            } finally {
                dispatch(HideLoading());
            }
        }
    };

    return (
        <div className="add-contact">
            <div className="title">{editContact ? "Edit Contact" : "Add Contact"}</div>
            <div className="add-contact-form">
                <div className="input-container">
                    <label htmlFor="firstName" className="label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="firstName"
                        name="firstName"
                        autoComplete="off"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && (
                        <div className="error">{errors.firstName}</div>
                    )}
                </div>
                <div className="input-container">
                    <label htmlFor="lastName" className="label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && (
                        <div className="error">{errors.lastName}</div>
                    )}
                </div>
                <div className="input-container">
                    <label htmlFor="email" className="label">
                        Email
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className="error">{errors.email}</div>
                    )}
                </div>
                <button className="add-contact-button" onClick={handleSubmit}>
                    {editContact ? "Update Contact" : "Add Contact"}
                </button>
            </div>
        </div>
    );
};

export default ContactForm;