import { useState, useEffect } from "react";
import "./ContactTab.css";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import ContactTable from "../ContactTable/ContactTable";
import ContactForm from "../ContactForm/ContactForm";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import contractService from "../../../../services/contractService";

const ContactTab = ({ name, setRefetchMainInfo }) => {
    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const fetchContacts = async () => {
        try {
            dispatch(ShowLoading());
            const response = await contractService.getContacts();
            // console.log("Response: ", response);
            setContacts(response.contacts);
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
        fetchContacts();
    }, []);

    useEffect(() => {
        if (editContact) {
            setShowModal(true);
        }
    }, [editContact]);

    const handleNewContact = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (editContact) {
            setEditContact(null);
        }
    };

    return (
        <div className="tab-section contact-tab">
            <button className="new-contact-button" onClick={handleNewContact}>Add New Contact</button>
            {(contacts && contacts.length > 0) &&
                <ContactTable contacts={contacts} fetchContacts={fetchContacts} setEditContact={setEditContact} userName={name} setRefetchMainInfo={setRefetchMainInfo} />
            }

            <CustomModal isOpen={showModal} onRequestClose={handleModalClose} contentLabel="Contact Form" width='40%'>
                <ContactForm userName={name} handleModalClose={handleModalClose} fetchContacts={fetchContacts} editContact={editContact} setRefetchMainInfo={setRefetchMainInfo} />
            </CustomModal>
        </div>
    )
};

export default ContactTab;
