import { useState, useEffect } from "react";
import "./MainContact.css";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import contractService from "../../../../services/contractService";

const MainContact = ({ refetchMainInfo, setRefetchMainInfo }) => {
    const [info, setInfo] = useState(null);
    const dispatch = useDispatch();

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

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        const refetchInfo = async () => {
            if (refetchMainInfo) {
                await fetchInfo();
                setRefetchMainInfo(false);
            }
        };

        refetchInfo();
    }, [refetchMainInfo]);

    return (
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
    )
};

export default MainContact;
