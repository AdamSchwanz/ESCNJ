import { useState, useEffect } from "react";
import "./PhoneTab.css";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import PhoneTable from "../PhoneTable/PhoneTable";
import PhoneForm from "../PhoneForm/PhoneForm";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import contractService from "../../../../services/contractService";

const PhoneTab = ({ name, setRefetchMainInfo }) => {
    const [phones, setPhones] = useState([]);
    const [editPhone, setEditPhone] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const fetchPhones = async () => {
        try {
            dispatch(ShowLoading());
            const response = await contractService.getPhones();
            // console.log("Response: ", response);
            setPhones(response.phones);
        } catch (error) {
            console.log(
                "Error: ",
                error?.response?.data?.error || "Something Went Wrong!"
            );
        } finally {
            dispatch(HideLoading());
        }
    };

    useEffect(() => {
        fetchPhones();
    }, []);

    useEffect(() => {
        if (editPhone) {
            setShowModal(true);
        }
    }, [editPhone]);

    const handleNewPhone = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (editPhone) {
            setEditPhone(null);
        }
    };

    return (
        <div className="tab-section phone-tab">
            <div className="button-container">
                <button className="new-phone-button" onClick={handleNewPhone}>Add New Phone</button>
            </div>
            {(phones && phones.length > 0) &&
                <PhoneTable phones={phones} fetchPhones={fetchPhones} setEditPhone={setEditPhone} userName={name} setRefetchMainInfo={setRefetchMainInfo} />
            }

            <CustomModal isOpen={showModal} onRequestClose={handleModalClose} contentLabel="Phone Form" width='40%'>
                <PhoneForm userName={name} handleModalClose={handleModalClose} fetchPhones={fetchPhones} editPhone={editPhone} setRefetchMainInfo={setRefetchMainInfo} />
            </CustomModal>
        </div>
    )
};

export default PhoneTab;
