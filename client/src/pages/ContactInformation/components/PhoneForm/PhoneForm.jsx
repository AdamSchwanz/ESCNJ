import { useState } from "react";
import "./PhoneForm.css";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import { message } from "antd";
import contractService from "../../../../services/contractService";

const PhoneForm = ({
    userName,
    handleModalClose,
    fetchPhones,
    editPhone,
    setRefetchMainInfo
}) => {
    const [formData, setFormData] = useState({
        phoneNumber: editPhone?.phoneNumber ? editPhone.phoneNumber : "",
        ext: editPhone?.ext ? editPhone.ext : "",
    });

    const [errors, setErrors] = useState({
        phoneNumber: "",
        ext: "",
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateData = () => {
        const newErrors = { ...errors };
        let hasErrors = false;
        const { phoneNumber, ext } = formData;

        if (!phoneNumber) {
            newErrors.phoneNumber = "Please enter the Phone Number";
            hasErrors = true;
        } else {
            newErrors.phoneNumber = "";
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
        if (!editPhone) {
            try {
                dispatch(ShowLoading());
                const response = await contractService.addPhone(data);
                // console.log("Response: ", response);
                await contractService.updateUserLog({ name: userName });
                setRefetchMainInfo(true);
                message.success(response.message);
                handleModalClose();
                fetchPhones();
            } catch (error) {
                message.error(error?.response?.data?.error || "Something Went Wrong!");
            } finally {
                dispatch(HideLoading());
            }
        } else {
            try {
                dispatch(ShowLoading());
                const response = await contractService.updatePhone(
                    editPhone.phoneId,
                    data
                );
                // console.log("Response: ", response);
                await contractService.updateUserLog({ name: userName });
                setRefetchMainInfo(true);
                message.success(response.message);
                handleModalClose();
                fetchPhones();
            } catch (error) {
                message.error(error?.response?.data?.error || "Something Went Wrong!");
            } finally {
                dispatch(HideLoading());
            }
        }
    };

    return (
        <div className="add-phone">
            <div className="title">{editPhone ? "Edit Phone" : "Add Phone"}</div>
            <div className="add-phone-form">
                <div className="input-container">
                    <label htmlFor="phoneNumber" className="label">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="phoneNumber"
                        name="phoneNumber"
                        autoComplete="off"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    {errors.phoneNumber && (
                        <div className="error">{errors.phoneNumber}</div>
                    )}
                </div>
                <div className="input-container">
                    <label htmlFor="ext" className="label">
                        Extension
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="ext"
                        name="ext"
                        autoComplete="off"
                        value={formData.ext}
                        onChange={handleChange}
                    />
                    {errors.ext && (
                        <div className="error">{errors.ext}</div>
                    )}
                </div>
                <button className="add-phone-button" onClick={handleSubmit}>
                    {editPhone ? "Update Phone" : "Add Phone"}
                </button>
            </div>
        </div>
    );
};

export default PhoneForm;