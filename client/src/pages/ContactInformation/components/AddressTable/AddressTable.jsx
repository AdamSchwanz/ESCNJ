import "./AddressTable.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import { message, Popconfirm } from "antd";
import contractService from "../../../../services/contractService";

const AddressTable = ({ addresses, fetchAddresses, setEditAddress, userName, setRefetchMainInfo }) => {
    const dispatch = useDispatch();

    const handleEdit = (address_) => {
        const data = {
            addressId: address_.AddressID,
            address: address_.Address,
            address2: address_.Address2,
            city: address_.City,
            state: address_.State,
            zip: address_.ZIP,
            county: address_.County,
            country: address_.Country,
        };
        // console.log("Address to edit: ", data);
        setEditAddress(data);
    };

    const handleDelete = async (addressId) => {
        try {
            dispatch(ShowLoading());
            const response = await contractService.deleteAddress(addressId);
            // console.log("Response: ", response);
            await contractService.updateUserLog({ name: userName });
            setRefetchMainInfo(true);
            message.success(response.message);
            fetchAddresses();
        } catch (error) {
            message.error(error?.response?.data?.error || "Something Went Wrong!");
        } finally {
            dispatch(HideLoading());
        }
    };

    return (
        <table className="address-table">
            <thead>
                <tr>
                    <th style={{ width: "20%" }}>Address</th>
                    <th style={{ width: "20%" }}>Address2</th>
                    <th style={{ width: "10%" }}>City</th>
                    <th style={{ width: "10%" }}>State</th>
                    <th style={{ width: "10%" }}>ZIP</th>
                    <th style={{ width: "10%" }}>County</th>
                    <th style={{ width: "10%" }}>Country</th>
                    <th style={{ width: "10%" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {addresses.map((address, index) => (
                    <tr className="contract-address-row" key={index}>
                        <td>{address.Address}</td>
                        <td>{address.Address2}</td>
                        <td>{address.City}</td>
                        <td>{address.State}</td>
                        <td>{address.ZIP}</td>
                        <td>{address.County}</td>
                        <td>{address.Country}</td>
                        <td className="table-action">
                            <div
                                className="table-action-icon"
                                onClick={() => handleEdit(address)}
                            >
                                <MdEdit size={22} className="icon" />
                            </div>
                            <Popconfirm
                                title="Delete the address"
                                description="Are you sure to delete this address?"
                                onConfirm={() => handleDelete(address.AddressID)}
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

export default AddressTable;