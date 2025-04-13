import { useState, useEffect } from 'react';
import './AddReport.css';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import { FixedSizeList as List } from 'react-window';
import contractService from '../../../../services/contractService';

const AddReport = ({ contractId }) => {
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
    const [showList, setShowList] = useState(false);
    const [members, setMembers] = useState([]);
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
        if (ReportAmount <= 0) {
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
        console.log("Form Data: ", formData);
    };

    const handleMemberSelect = (memberId) => {
        console.log("Selected Member: ", memberId);
    };

    const Row = ({ index, style }) => (
        <div key={members[index].EntityID} id={members[index].EntityID} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style} onClick={() => handleMemberSelect(members[index].EntityID)}>
            {members[index].EntityName}
        </div>
    );

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
                        value={formData.MemberEntityID}
                        onChange={handleChange}
                        onFocus={() => setShowList(true)}
                        onBlur={() => setShowList(false)}
                    />
                    {!showList &&
                        <List
                            className="List"
                            height={150}
                            itemCount={members.length}
                            itemSize={35}
                            width={300}
                        >
                            {Row}
                        </List>
                    }
                    {errors.MemberEntityID && <div>{errors.MemberEntityID}</div>}
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
                    {errors.ReportItem && <div>{errors.ReportItem}</div>}
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
                    {errors.ReportAmount && <div>{errors.ReportAmount}</div>}
                </div>
                <button onClick={handleSubmit}>Add Report</button>
            </div>
        </div>
    )
};

export default AddReport;
