import { useState } from "react";
import "./AddressForm.css";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import { message } from "antd";
import contractService from "../../../../services/contractService";

const AddressForm = ({
    userName,
    handleModalClose,
    fetchAddresses,
    editAddress,
    setRefetchMainInfo
}) => {
    const [formData, setFormData] = useState({
        address: editAddress?.address ? editAddress.address : "",
        address2: editAddress?.address2 ? editAddress.address2 : "",
        city: editAddress?.city ? editAddress.city : "",
        state: editAddress?.state ? editAddress.state : "",
        zip: editAddress?.zip ? editAddress.zip : "",
        county: editAddress?.county ? editAddress.county : "",
        country: editAddress?.country ? editAddress.country : "",
    });
    const [errors, setErrors] = useState({
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        county: "",
        country: ""
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateData = () => {
        const newErrors = { ...errors };
        let hasErrors = false;
        const { address, address2, city, state, zip, county, country } = formData;

        if (!address) {
            newErrors.address = "Please enter the address";
            hasErrors = true;
        } else {
            newErrors.address = "";
        }
        if (!city) {
            newErrors.city = "Please enter the city";
            hasErrors = true;
        } else {
            newErrors.city = "";
        }
        if (!state) {
            newErrors.state = "Please enter the state";
            hasErrors = true;
        } else {
            newErrors.state = "";
        }
        if (!zip) {
            newErrors.zip = "Please enter the zip";
            hasErrors = true;
        } else {
            newErrors.zip = "";
        }
        if (!county) {
            newErrors.county = "Please enter the county";
            hasErrors = true;
        } else {
            newErrors.county = "";
        }
        if (!country) {
            newErrors.country = "Please enter the country";
            hasErrors = true;
        } else {
            newErrors.country = "";
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
        if (!editAddress) {
            try {
                dispatch(ShowLoading());
                const response = await contractService.addAddress(data);
                // console.log("Response: ", response);
                await contractService.updateUserLog({ name: userName });
                setRefetchMainInfo(true);
                message.success(response.message);
                handleModalClose();
                fetchAddresses();
            } catch (error) {
                message.error(error?.response?.data?.error || "Something Went Wrong!");
            } finally {
                dispatch(HideLoading());
            }
        } else {
            try {
                dispatch(ShowLoading());
                const response = await contractService.updateAddress(
                    editAddress.addressId,
                    data
                );
                // console.log("Response: ", response);
                await contractService.updateUserLog({ name: userName });
                setRefetchMainInfo(true);
                message.success(response.message);
                handleModalClose();
                fetchAddresses();
            } catch (error) {
                message.error(error?.response?.data?.error || "Something Went Wrong!");
            } finally {
                dispatch(HideLoading());
            }
        }
    };

    return (
        <div className="add-address">
            <div className="title">{editAddress ? "Edit Address" : "Add Address"}</div>
            <div className="add-address-form">
                <div className="input-container">
                    <label htmlFor="address" className="label">
                        Address
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="address"
                        name="address"
                        autoComplete="off"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {errors.address && (
                        <div className="error">{errors.address}</div>
                    )}
                </div>
                <div className="input-container">
                    <label htmlFor="address2" className="label">
                        Address2
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="address2"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                    />
                    {errors.address2 && (
                        <div className="error">{errors.address2}</div>
                    )}
                </div>
                <div className="csz">
                    <div className="input-container">
                        <label htmlFor="city" className="label">
                            City
                        </label>
                        <input
                            type="text"
                            className="input"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && (
                            <div className="error">{errors.city}</div>
                        )}
                    </div>
                    <div className="input-container">
                        <label htmlFor="state" className="label">
                            State
                        </label>
                        <input
                            type="text"
                            className="input"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                        {errors.state && (
                            <div className="error">{errors.state}</div>
                        )}
                    </div>
                    <div className="input-container">
                        <label htmlFor="zip" className="label">
                            ZIP
                        </label>
                        <input
                            type="text"
                            className="input"
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                        />
                        {errors.zip && (
                            <div className="error">{errors.zip}</div>
                        )}
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="county" className="label">
                        County
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="county"
                        name="county"
                        value={formData.county}
                        onChange={handleChange}
                    />
                    {errors.county && (
                        <div className="error">{errors.county}</div>
                    )}
                </div>
                <div className="input-container">
                    <label htmlFor="country" className="label">
                        Country
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                    {errors.country && (
                        <div className="error">{errors.country}</div>
                    )}
                </div>
                <button className="add-address-button" onClick={handleSubmit}>
                    {editAddress ? "Update Address" : "Add Address"}
                </button>
            </div>
        </div>
    );
};

export default AddressForm;