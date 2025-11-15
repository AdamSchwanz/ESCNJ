import "./ContactTable.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import { message, Popconfirm } from "antd";
import contractService from "../../../../services/contractService";

const ContactTable = ({ contacts, fetchContacts, setEditContact, userName, setError, setRefetchMainInfo }) => {
    const dispatch = useDispatch();

    const handleEdit = (contact) => {
        const data = {
            contactId: contact.ContactID,
            firstName: contact.FirstName,
            lastName: contact.LastName,
            email: contact.Email,
        };
        // console.log("Contact to edit: ", data);
        setEditContact(data);
    };

    const handleDelete = async (contactId) => {
        if (!userName) {
            setError("Please enter the name");
            return;
        } else {
            setError("");
        }

        try {
            dispatch(ShowLoading());
            const response = await contractService.deleteContact(contactId);
            // console.log("Response: ", response);
            await contractService.updateUserLog({ name: userName });
            setRefetchMainInfo(true);
            message.success(response.message);
            fetchContacts();
        } catch (error) {
            message.error(error?.response?.data?.error || "Something Went Wrong!");
        } finally {
            dispatch(HideLoading());
        }
    };

    return (
        <table className="contact-table">
            <thead>
                <tr>
                    <th style={{ width: "50%" }}>First Name</th>
                    <th style={{ width: "30%" }}>Last Name</th>
                    <th style={{ width: "10%" }}>Email</th>
                    <th style={{ width: "10%" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index) => (
                    <tr className="contract-contact-row" key={index}>
                        <td>{contact.FirstName}</td>
                        <td>{contact.LastName}</td>
                        <td>{contact.Email}</td>
                        <td className="table-action">
                            <div
                                className="table-action-icon"
                                onClick={() => handleEdit(contact)}
                            >
                                <MdEdit size={22} className="icon" />
                            </div>
                            <Popconfirm
                                title="Delete the contact"
                                description="Are you sure to delete this contact?"
                                onConfirm={() => handleDelete(contact.ContactID)}
                                onCancel={() => { }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <div className="table-action-icon">
                                    <MdDelete size={22} className="icon" />
                                </div>
                            </Popconfirm>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default ContactTable;
