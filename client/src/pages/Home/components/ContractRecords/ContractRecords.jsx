import { useState } from 'react';
import './ContractRecords.css';
import ContractRecordsTable from '../ContractRecordsTable/ContractRecordsTable';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import AddReport from '../AddReport/AddReport';

const ContractRecords = ({ records, contractId }) => {
    const [showAddModal, setShowAddModal] = useState(false);

    const handleClick = () => {
        setShowAddModal(true);
    };

    const handleAddModalClose = () => {
        setShowAddModal(false);
    };

    return (
        <div className='contract-records'>
            <button className="new-report-button" onClick={handleClick}>Add New Report</button>
            {(records && records.length > 0) &&
                <ContractRecordsTable records={records} />
            }
            <CustomModal isOpen={showAddModal} onRequestClose={handleAddModalClose} contentLabel="Add Report" width='40%'>
                <AddReport contractId={contractId} />
            </CustomModal>
        </div>
    )
};

export default ContractRecords;
