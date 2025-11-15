import { useState, useEffect } from "react";
import "./MainContact.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import contractService from "../../../../services/contractService";

const MainContact = () => {
    const [info, setInfo] = useState(null);
    const [activeTab, setActiveTab] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseClick = () => {
        navigate("/");
    }

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                dispatch(ShowLoading());
                const response = await contractService.getContactInfo();
                // console.log("Response: ", response);
                setInfo(response.contactInfo);
            } catch (error) {
                setInfo(null);
                console.log(
                    "Error: ",
                    error?.response?.data?.error || "Something Went Wrong!"
                );
            } finally {
                dispatch(HideLoading());
            }
        };

        fetchInfo();
    }, []);

    return (
        <div>
            <div className="main-contact">
                {info && (
                    <div className="main-contact-info">
                        <p><strong>Entity Name:</strong> {info.EntityName}</p>
                        <p><strong>Last Verified:</strong> {info.LastVerified}</p>
                        <p><strong>Initials:</strong> {info.Initials}</p>
                        <p><strong>User Last Viewed:</strong> {info.UserLastViewed}</p>
                        <p><strong>User Last Changed:</strong> {info.UserLastChanged || "N/A"}</p>
                        <p><strong>User Verified By:</strong> {info.UserVerifiedBy || "N/A"}</p>
                    </div>
                )}
            </div>
            <div className="change-name-container">
                <div className="change-name">
                    <label className="tab-label">Name of Person Making Changes - Require this to edit/add/delete</label>
                    <input type="text" placeholder="Please Enter Name" className="tab-input" />
                </div>
            </div>
            <div className="tab-container">
                The three tabs and sections can go here<br />
                <button onClick={() => setActiveTab("contact")}>Contact</button>
                <button onClick={() => setActiveTab("address")}>Address</button>
                <button onClick={() => setActiveTab("phone")}>Phone</button>
            </div>
            <div className="tab-section-container">
                {activeTab === "contact" &&
                    <div className="tab-section contact-tab">
                        <p>Contact Section</p>
                    </div>
                }
                {activeTab === "address" &&
                    <div className="tab-section address-tab">
                        <p>Address Section</p>
                    </div>
                }
                {activeTab === "phone" &&
                    <div className="tab-section phone-tab">
                        <p>Phone Section</p>
                    </div>
                }
            </div>
            <div className="close-button-container">
                <button className="close-button" onClick={handleCloseClick}>Close/Return to Contracts</button>
            </div>
        </div>
    )
};

export default MainContact;
