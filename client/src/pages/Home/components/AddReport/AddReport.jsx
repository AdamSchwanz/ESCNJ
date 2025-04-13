import { useState, useEffect } from 'react';
import './AddReport.css';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import { FixedSizeList as List } from 'react-window';
import { message } from 'antd';
import contractService from '../../../../services/contractService';

const AddReport = ({ contractId, handleAddModalClose, fetchRecordsByContract }) => {
    const [formData, setFormData] = useState({
        MemberEntityID: 0,
        ReportItem: '',
        ReportAmount: 0
    });
    const [errors, setErrors] = useState({
        MemberEntityID: '',
        ReportItem: '',
        ReportAmount: ''
    });
    const [query, setQuery] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [showList, setShowList] = useState(false);
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMembersList = async () => {
            try {
                dispatch(ShowLoading());
                const response = await contractService.getMembersList();
                console.log("Response: ", response);
                setMembers(response.members);
            } catch (error) {
                console.log("Error: ", error?.response?.data?.error || "Something Went Wrong!");
            } finally {
                dispatch(HideLoading());
            }
        };

        fetchMembersList();
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                const lowerQuery = query.toLowerCase();
                const filtered = members.filter(member =>
                    member.EntityName.toLowerCase().includes(lowerQuery)
                );
                setFilteredMembers(filtered);
            } else {
                setFilteredMembers(members);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query, members]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateData = () => {
        const newErrors = { ...errors };
        let hasErrors = false;
        const { MemberEntityID, ReportItem, ReportAmount } = formData;
        if (MemberEntityID <= 0) {
            newErrors.MemberEntityID = "Please select a valid member";
            hasErrors = true;
        } else {
            newErrors.MemberEntityID = "";
        }
        if (!ReportItem) {
            newErrors.ReportItem = "Please enter a valid item";
            hasErrors = true;
        } else {
            newErrors.ReportItem = "";
        }
        if (!ReportAmount || ReportAmount <= 0) {
            newErrors.ReportAmount = "Please enter a valid amount";
            hasErrors = true;
        } else {
            newErrors.ReportAmount = "";
        }
        setErrors((prevState) => ({ ...prevState, ...newErrors }));
        return !hasErrors;
    };

    const handleSubmit = async () => {
        if (!validateData()) {
            return;
        }
        const data = {
            ...formData,
            ReportAmount: parseFloat(formData.ReportAmount),
            ContractID: contractId
        }
        console.log("Data: ", data);
        try {
            dispatch(ShowLoading());
            const response = await contractService.addRecord(data);
            console.log("Response: ", response);
            message.success(response.message);
            handleAddModalClose();
            fetchRecordsByContract();
        } catch (error) {
            message.error(error?.response?.data?.error || "Something Went Wrong!");
        } finally {
            dispatch(HideLoading());
        }
    };

    const handleMemberSelect = (member) => {
        console.log("Selected Member: ", member);
        setFormData((prevState) => ({ ...prevState, MemberEntityID: member.EntityID }));
        setSelectedMember(member.EntityName);
        setQuery('');
    };

    const Row = ({ index, style }) => (
        <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style} onClick={() => handleMemberSelect(filteredMembers[index])}>
            {filteredMembers[index].EntityName}
        </div>
    );

    const handleInputBlur = () => {
        setTimeout(() => setShowList(false), 150);
    };

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="add-report">
            <div className='title'>Add Report</div>
            <div className='add-report-form'>
                <div className='input-container'>
                    <label htmlFor='MemberEntityID' className='label'>Member</label>
                    <input
                        type='text'
                        className='input'
                        id='MemberEntityID'
                        name='MemberEntityID'
                        value={showList ? query : selectedMember ? selectedMember : "Please Select Member"}
                        onChange={handleQueryChange}
                        onFocus={() => setShowList(true)}
                        onBlur={handleInputBlur}
                    />
                    {showList &&
                        <List
                            className="List"
                            height={150}
                            itemCount={filteredMembers.length}
                            itemSize={35}
                            width={450}
                        >
                            {Row}
                        </List>
                    }
                    {errors.MemberEntityID && <div className="error">{errors.MemberEntityID}</div>}
                </div>
                <div className='input-container'>
                    <label htmlFor='ReportItem' className='label'>Item</label>
                    <input
                        type='text'
                        className='input'
                        id='ReportItem'
                        name='ReportItem'
                        value={formData.ReportItem}
                        onChange={handleChange}
                    />
                    {errors.ReportItem && <div className="error">{errors.ReportItem}</div>}
                </div>
                <div className='input-container'>
                    <label htmlFor='ReportAmount' className='label'>Amount</label>
                    <input
                        type='number'
                        className='input'
                        id='ReportAmount'
                        name='ReportAmount'
                        value={formData.ReportAmount}
                        onChange={handleChange}
                    />
                    {errors.ReportAmount && <div className="error">{errors.ReportAmount}</div>}
                </div>
                <button className="add-report-button" onClick={handleSubmit}>Add Report</button>
            </div>
        </div>
    )
};

export default AddReport;
