import { useState, useEffect } from "react";
import "./AddressTab.css";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import AddressTable from "../AddressTable/AddressTable";
import AddressForm from "../AddressForm/AddressForm";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import contractService from "../../../../services/contractService";

const AddressTab = ({ name, setRefetchMainInfo }) => {
    const [addresses, setAddresses] = useState([]);
    const [editAddress, setEditAddress] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const fetchAddresses = async () => {
        try {
            dispatch(ShowLoading());
            const response = await contractService.getAddresses();
            // console.log("Response: ", response);
            setAddresses(response.addresses);
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
        fetchAddresses();
    }, []);

    useEffect(() => {
        if (editAddress) {
            setShowModal(true);
        }
    }, [editAddress]);

    const handleNewAddress = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (editAddress) {
            setEditAddress(null);
        }
    };

    return (
        <div className="tab-section address-tab">
            <div className="button-container">
                <button className="new-address-button" onClick={handleNewAddress}>Add New Address</button>
            </div>
            {(addresses && addresses.length > 0) &&
                <AddressTable addresses={addresses} fetchAddresses={fetchAddresses} setEditAddress={setEditAddress} userName={name} setRefetchMainInfo={setRefetchMainInfo} />
            }

            <CustomModal isOpen={showModal} onRequestClose={handleModalClose} contentLabel="Address Form" width='40%'>
                <AddressForm userName={name} handleModalClose={handleModalClose} fetchAddresses={fetchAddresses} editAddress={editAddress} setRefetchMainInfo={setRefetchMainInfo} />
            </CustomModal>
        </div>
    )
};

export default AddressTab;
