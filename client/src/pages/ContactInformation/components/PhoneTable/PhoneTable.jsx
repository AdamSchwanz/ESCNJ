import "./PhoneTable.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import { message, Popconfirm } from "antd";
import contractService from "../../../../services/contractService";

const PhoneTable = ({ phones, fetchPhones, setEditPhone, userName, setRefetchMainInfo }) => {
    const dispatch = useDispatch();

    const handleEdit = (phone) => {
        const data = {
            phoneId: phone.PhoneID,
            phoneNumber: phone.PhoneNumber,
            ext: phone.Ext,
        };
        // console.log("Phone to edit: ", data);
        setEditPhone(data);
    };

    const handleDelete = async (phoneId) => {
        try {
            dispatch(ShowLoading());
            const response = await contractService.deletePhone(phoneId);
            // console.log("Response: ", response);
            await contractService.updateUserLog({ name: userName });
            setRefetchMainInfo(true);
            message.success(response.message);
            fetchPhones();
        } catch (error) {
            message.error(error?.response?.data?.error || "Something Went Wrong!");
        } finally {
            dispatch(HideLoading());
        }
    };

    return (
        <table className="phone-table">
            <thead>
                <tr>
                    <th style={{ width: "50%" }}>Phone Number</th>
                    <th style={{ width: "40%" }}>Ext</th>
                    <th style={{ width: "10%" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {phones.map((phone, index) => (
                    <tr className="contract-phone-row" key={index}>
                        <td>{phone.PhoneNumber}</td>
                        <td>{phone.Ext}</td>
                        <td className="table-action">
                            <div
                                className="table-action-icon"
                                onClick={() => handleEdit(phone)}
                            >
                                <MdEdit size={22} className="icon" />
                            </div>
                            <Popconfirm
                                title="Delete the phone"
                                description="Are you sure to delete this phone?"
                                onConfirm={() => handleDelete(phone.PhoneID)}
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

export default PhoneTable;
