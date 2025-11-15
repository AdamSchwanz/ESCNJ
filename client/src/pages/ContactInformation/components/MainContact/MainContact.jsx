import { useState, useEffect } from "react";
import "./MainContact.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../../../redux/loaderSlice";
import contractService from "../../../../services/contractService";

const MainContact = () => {
    const [info, setInfo] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div className="main-contact">
            Main Content
        </div>
    )
};

export default MainContact;
