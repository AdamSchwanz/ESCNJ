import './ContractRecordsTable.css';
import { MdEdit, MdDelete } from "react-icons/md";

const ContractRecordsTable = ({ records }) => {
    return (
        <table className="contract-records-table">
            <thead>
                <tr>
                    <th>Member Name</th>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {records.map((record, index) => (
                    <tr className='contract-record-row' key={index}>
                        <td>{record.EntityName}</td>
                        <td>{record.ReportItem}</td>
                        <td>{record.ReportAmount}</td>
                        <td>
                            <MdEdit size={22} className='icon' />
                            <MdDelete size={22} className='icon' />
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>

    )
};

export default ContractRecordsTable;
