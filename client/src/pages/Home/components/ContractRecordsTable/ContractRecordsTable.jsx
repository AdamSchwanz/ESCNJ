import './ContractRecordsTable.css';
import { MdEdit, MdDelete } from "react-icons/md";

const ContractRecordsTable = ({ records }) => {
    return (
        <table className="contract-records-table">
            <thead>
                <tr>
                    <th style={{ width: '50%' }}>Member Name</th>
                    <th style={{ width: '30%' }}>Item</th>
                    <th style={{ width: '10%' }}>Amount</th>
                    <th style={{ width: '10%' }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {records.map((record, index) => (
                    <tr className='contract-record-row' key={index}>
                        <td>{record.EntityName}</td>
                        <td>{record.ReportItem}</td>
                        <td>{record.ReportAmount}</td>
                        <td className="table-action">
                            <div className="table-action-icon">
                                <MdEdit size={22} className='icon' />
                            </div>
                            <div className="table-action-icon">
                                <MdDelete size={22} className='icon' />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table >

    )
};

export default ContractRecordsTable;
